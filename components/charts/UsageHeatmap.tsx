
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { scaleLinear } from 'd3-scale';

interface UsageHeatmapProps {
  data: { hour: string; usage: number }[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded-md shadow-lg">
          <p className="text-white font-bold">{`Hour: ${label}`}</p>
          <p className="text-blue-400">{`Est. Cost: $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
};

export const UsageHeatmap: React.FC<UsageHeatmapProps> = ({ data }) => {
  const maxUsage = Math.max(...data.map(d => d.usage), 0);
  const colorScale = scaleLinear<string>().domain([0, maxUsage * 0.25, maxUsage]).range(['#1e3a8a', '#3b82f6', '#93c5fd']);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Hourly Usage Pattern (Daily Cost)</h3>
        <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }} barCategoryGap={0} barGap={0}>
                    <XAxis dataKey="hour" stroke="#9ca3af" interval={2} tickFormatter={(tick) => tick.split(':')[0]} />
                    <YAxis stroke="#9ca3af" tickFormatter={(tick) => `$${tick.toFixed(2)}`} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(107, 114, 128, 0.2)'}} />
                    <Bar dataKey="usage" name="Cost">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colorScale(entry.usage)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};
