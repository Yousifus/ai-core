
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GrowthForecastChartProps {
  data: { month: string; cost: number }[];
}

const formatYAxis = (tick: number) => {
    if (tick >= 1000) return `$${tick / 1000}K`;
    return `$${tick}`;
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded-md shadow-lg">
          <p className="text-white font-bold">{label}</p>
          <p className="text-blue-400">{`Projected Cost: $${Math.round(payload[0].value).toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
};

export const GrowthForecastChart: React.FC<GrowthForecastChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">12-Month Cost Growth Forecast</h3>
        <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" tickFormatter={formatYAxis} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="cost" name="Monthly Cost" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};