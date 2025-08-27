
import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, CartesianGrid } from 'recharts';

interface DepartmentCostChartProps {
  data: { name: string; value: number }[];
}

const formatCurrency = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded-md shadow-lg">
          <p className="text-white font-bold">{label}</p>
          <p className="text-blue-400">{`Annual Cost: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
};

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#ef4444', '#f59e0b', '#64748b'];

export const CostSankeyDiagram: React.FC<DepartmentCostChartProps> = ({ data }) => {

    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => b.value - a.value);
    }, [data]);
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 h-full">
        <h3 className="text-lg font-semibold text-white mb-4">Annual Cost by Department</h3>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart
                    data={sortedData}
                    layout="vertical"
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                    <XAxis type="number" stroke="#9ca3af" tickFormatter={formatCurrency} />
                    <YAxis 
                        type="category" 
                        dataKey="name" 
                        stroke="#9ca3af" 
                        width={100}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(107, 114, 128, 0.2)'}} />
                    <Legend />
                    <Bar dataKey="value" name="Annual Cost">
                        {sortedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};
