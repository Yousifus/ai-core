
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceArea, ReferenceLine } from 'recharts';
import { Card } from '../common/Card';

interface CostGaugeProps {
  yearlyCost: number;
  budget: number;
}

const formatCurrency = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
};

export const CostGauge: React.FC<CostGaugeProps> = ({ yearlyCost, budget }) => {
  const percentage = budget > 0 ? (yearlyCost / budget) * 100 : 0;
  
  const data = [{ name: 'Cost', cost: yearlyCost }];
  
  const safeBudget = budget > 0 ? budget : 1;
  const chartMax = Math.max(yearlyCost, safeBudget) * 1.1;

  return (
    <Card title="Annual Cost vs. Budget" value={formatCurrency(yearlyCost)}>
      <div className="mt-4">
        <div className="text-sm text-gray-400 mb-2">{percentage.toFixed(1)}% of budget utilized</div>
        <div style={{ width: '100%', height: 60 }}>
          <ResponsiveContainer>
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis type="number" domain={[0, chartMax]} hide />
              <YAxis type="category" dataKey="name" hide />
              
              <ReferenceArea x1={0} x2={safeBudget * 0.5} fill="#22c55e" fillOpacity={0.2} strokeWidth={0} ifOverflow="visible" />
              <ReferenceArea x1={safeBudget * 0.5} x2={safeBudget * 0.8} fill="#f59e0b" fillOpacity={0.2} strokeWidth={0} ifOverflow="visible" />
              <ReferenceArea x1={safeBudget * 0.8} x2={safeBudget} fill="#ef4444" fillOpacity={0.2} strokeWidth={0} ifOverflow="visible" />
              
              <Bar dataKey="cost" fill="#3b82f6" barSize={20} radius={[4, 4, 4, 4]}/>

              <ReferenceLine 
                x={safeBudget} 
                stroke="#d1d5db" 
                strokeDasharray="3 3"
                label={{ value: 'Budget', position: 'top', fill: '#d1d5db', fontSize: 12 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$0</span>
          <span>{formatCurrency(budget)}</span>
        </div>
      </div>
    </Card>
  );
};
