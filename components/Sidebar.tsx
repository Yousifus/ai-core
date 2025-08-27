
import React from 'react';
import type { SimulationParams, Department, Timezone } from '../types';
import { TIMEZONES } from '../types';
import { Slider } from './common/Slider';
import { Select } from './common/Select';

interface SidebarProps {
  params: SimulationParams;
  setParams: React.Dispatch<React.SetStateAction<SimulationParams>>;
  departments: Department[];
  onDepartmentChange: (departments: Department[]) => void;
  budget: number;
  setBudget: (budget: number) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <details className="group" open>
    <summary className="cursor-pointer text-lg font-semibold text-gray-200 hover:text-white list-none">
      <div className="flex items-center justify-between py-2 border-b border-gray-700">
        <span>{title}</span>
        <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </summary>
    <div className="py-4 space-y-4">{children}</div>
  </details>
);

export const Sidebar: React.FC<SidebarProps> = ({ params, setParams, departments, onDepartmentChange, budget, setBudget }) => {
  const handleParamChange = (key: keyof SimulationParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleDeptValueChange = (index: number, key: keyof Department, value: string) => {
    const updatedDepartments = [...departments];
    const isNumericField = key === 'managerCount' || key === 'seniorCount' || key === 'juniorCount';
    
    if (isNumericField) {
        const numValue = Number(value);
        if (!isNaN(numValue)) {
            (updatedDepartments[index] as any)[key] = numValue;
            onDepartmentChange(updatedDepartments);
        }
    } else {
        (updatedDepartments[index] as any)[key] = value;
        onDepartmentChange(updatedDepartments);
    }
  };

  return (
    <aside className="w-80 lg:w-96 bg-gray-800 p-6 overflow-y-auto h-full shadow-lg flex-shrink-0">
      <h2 className="text-2xl font-bold mb-6 text-white">Simulation Controls</h2>
      <div className="space-y-6">
        
        <Section title="Temporal Dynamics">
          <Slider label="Base Usage/User/Day" value={params.baseUsageFrequency} min={1} max={100} step={1} onChange={val => handleParamChange('baseUsageFrequency', val)} tooltipText="Average number of AI queries a single user makes during a standard workday." />
          <Slider label="Peak Hours Multiplier" value={params.peakHoursMultiplier} min={1} max={5} step={0.1} onChange={val => handleParamChange('peakHoursMultiplier', val)} tooltipText="Multiplier for AI usage during peak business hours (e.g., 9 AM - 5 PM local time)." />
        </Section>

        <Section title="User Behavior">
          <Slider label="Error/Retry Rate (%)" value={params.errorRetryRate} min={5} max={25} step={1} onChange={val => handleParamChange('errorRetryRate', val)} tooltipText="Percentage of queries that result in an error and are immediately retried, consuming additional tokens." />
          <Slider label="Iteration Multiplier" value={params.iterationMultiplier} min={1} max={10} step={0.1} onChange={val => handleParamChange('iterationMultiplier', val)} tooltipText="How many times a user refines their query on the same topic. A value of 2 means users, on average, send 2 follow-up queries." />
        </Section>
        
        <Section title="Technical Parameters">
          <Slider label="Avg. Input Tokens" value={params.avgInputTokens} min={50} max={5000} step={50} onChange={val => handleParamChange('avgInputTokens', val)} tooltipText="The average number of tokens sent to the model in a single query." />
          <Slider label="Avg. Output Tokens" value={params.avgOutputTokens} min={100} max={10000} step={100} onChange={val => handleParamChange('avgOutputTokens', val)} tooltipText="The average number of tokens received from the model in response to a query." />
          <Slider label="Cache Hit Rate (%)" value={params.cacheHitRate} min={20} max={80} step={1} onChange={val => handleParamChange('cacheHitRate', val)} tooltipText="Percentage of queries that are served from a cache instead of hitting the AI model, saving costs." />
        </Section>

        <Section title="Economic & Growth">
          <Slider label="Cost per 1M Tokens ($)" value={params.costPerMillionTokens} min={0.1} max={10} step={0.01} onChange={val => handleParamChange('costPerMillionTokens', val)} tooltipText="The billing cost for every one million tokens processed by the AI model." />
          <Slider label="Monthly Growth (%)" value={params.growthTrajectory} min={0} max={20} step={0.5} onChange={val => handleParamChange('growthTrajectory', val)} tooltipText="The expected month-over-month percentage increase in AI usage or user base." />
          <div className="space-y-2 pt-2">
            <label htmlFor="annual-budget" className="text-sm font-medium text-gray-300">Annual Budget ($)</label>
            <input
              id="annual-budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value) || 0)}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              step="100000"
              min="0"
            />
          </div>
        </Section>

        <Section title="Organizational Model">
          <div className="space-y-4">
            {departments.map((dept, index) => (
              <div key={dept.id} className="p-3 bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-200">{dept.name}</h4>
                <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                  <div>
                    <label className="block text-gray-400">Mgr</label>
                    <input type="number" value={dept.managerCount} onChange={(e) => handleDeptValueChange(index, 'managerCount', e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded p-1 text-center"/>
                  </div>
                  <div>
                    <label className="block text-gray-400">Sr</label>
                    <input type="number" value={dept.seniorCount} onChange={(e) => handleDeptValueChange(index, 'seniorCount', e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded p-1 text-center"/>
                  </div>
                  <div>
                    <label className="block text-gray-400">Jr</label>
                    <input type="number" value={dept.juniorCount} onChange={(e) => handleDeptValueChange(index, 'juniorCount', e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded p-1 text-center"/>
                  </div>
                </div>
                <div className="mt-2">
                    <Select
                        label="Timezone"
                        value={dept.timezone}
                        onChange={(e) => handleDeptValueChange(index, 'timezone', e.target.value)}
                        options={TIMEZONES.map(tz => ({ value: tz, label: tz }))}
                    />
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </aside>
  );
};
