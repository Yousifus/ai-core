
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface TokenWaterfallChartProps {
  breakdownData: { name: string; value: number }[];
  cacheHitRate: number; // percentage
}

const formatYAxis = (tick: number) => {
    if (tick >= 1_000_000) return `${(tick / 1_000_000).toFixed(1)}M`;
    if (tick >= 1_000) return `${(tick / 1_000).toFixed(1)}K`;
    return tick.toString();
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const change = payload[1]?.value;
      if (change === undefined) return null;

      const formattedValue = formatYAxis(Math.abs(change));
      const type = payload[1].payload.type;

      let description = '';
      if(type === 'total') description = 'Total: ';
      if(type === 'positive') description = 'Added: +';
      if(type === 'negative') description = 'Removed: -';


      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded-md shadow-lg">
          <p className="text-white font-bold">{label}</p>
          <p className={change < 0 ? "text-red-400" : "text-blue-400"}>
            {`${description}${formattedValue}`}
          </p>
        </div>
      );
    }
    return null;
};

export const TokenWaterfallChart: React.FC<TokenWaterfallChartProps> = ({ breakdownData, cacheHitRate }) => {
    
    const chartData = useMemo(() => {
        let runningTotal = 0;
        const data = [];

        for(const item of breakdownData) {
            data.push({
                name: item.name,
                start: runningTotal,
                change: item.value,
                type: 'positive',
            });
            runningTotal += item.value;
        }

        data.push({
            name: 'Total Generated',
            start: 0,
            change: runningTotal,
            type: 'total',
        });
        
        const cachedAmount = runningTotal * (cacheHitRate / 100);
        data.push({
            name: 'Cached',
            start: runningTotal - cachedAmount,
            change: -cachedAmount,
            type: 'negative'
        });
        runningTotal -= cachedAmount;

        data.push({
            name: 'Final Billed',
            start: 0,
            change: runningTotal,
            type: 'total',
        });

        return data;
    }, [breakdownData, cacheHitRate]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Daily Token Consumption Breakdown</h3>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" stroke="#9ca3af" tickFormatter={formatYAxis} />
            <YAxis type="category" dataKey="name" stroke="#9ca3af" width={120} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(107, 114, 128, 0.2)'}} />
            <Legend />
            <Bar dataKey="start" stackId="a" fill="transparent" name="Base" />
            <Bar dataKey="change" stackId="a" name="Tokens">
                {chartData.map((entry, index) => {
                    let color = '#3b82f6'; // Positive
                    if(entry.type === 'negative') color = '#ef4444'; // Negative
                    if(entry.type === 'total') color = '#10b981'; // Total
                    return <Cell key={`cell-${index}`} fill={color} />;
                })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};