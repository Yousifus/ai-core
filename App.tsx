
import React, { useState, useCallback, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { useSimulation } from './hooks/useSimulation';
import { DEFAULT_PARAMS, INITIAL_DEPARTMENTS } from './constants';
import type { SimulationParams, Department } from './types';
import { Tab } from './types';

const App: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>(DEFAULT_PARAMS);
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.EXECUTIVE);
  const [budget, setBudget] = useState<number>(5_000_000);

  const simulationResult = useSimulation(params, departments);
  
  const handleDepartmentChange = useCallback((updatedDepartments: Department[]) => {
    setDepartments(updatedDepartments);
  }, []);

  const memoizedSidebar = useMemo(() => {
    return (
      <Sidebar 
        params={params} 
        setParams={setParams} 
        departments={departments}
        onDepartmentChange={handleDepartmentChange}
        budget={budget}
        setBudget={setBudget}
      />
    );
  }, [params, departments, handleDepartmentChange, budget, setBudget]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      {memoizedSidebar}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-white">AI Token Usage Dashboard</h1>
            <p className="text-gray-400">Modeling & Distribution Platform</p>
          </header>
          <div className="border-b border-gray-700 mb-6">
            <nav className="flex space-x-4" aria-label="Tabs">
              {Object.values(Tab).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                  } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <Dashboard result={simulationResult} activeTab={activeTab} params={params} budget={budget} />
        </div>
      </main>
    </div>
  );
};

export default App;
