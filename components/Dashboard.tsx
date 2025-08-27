
import React from 'react';
import type { SimulationResult, SimulationParams } from '../types';
import { Tab } from '../types';
import { Card } from './common/Card';
import { CostGauge } from './charts/CostGauge';
import { CostSankeyDiagram } from './charts/CostSankeyDiagram';
import { UsageHeatmap } from './charts/UsageHeatmap';
import { GrowthForecastChart } from './charts/GrowthForecastChart';
import { TokenWaterfallChart } from './charts/TokenWaterfallChart';

interface DashboardProps {
  result: SimulationResult;
  activeTab: Tab;
  params: SimulationParams;
  budget: number;
}

const formatCurrency = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
};

const formatNumber = (value: number) => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
    return Math.round(value).toLocaleString();
}

const ExecutiveDashboard: React.FC<{ result: SimulationResult, budget: number }> = ({ result, budget }) => (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card title="Projected Annual Cost" value={formatCurrency(result.totalCostPerYear)} />
            <Card title="Projected Monthly Cost" value={formatCurrency(result.totalCostPerMonth)} />
            <Card title="Total Users" value={result.totalUsers.toString()} />
            <Card title="Tokens Per Day" value={formatNumber(result.totalTokensPerDay)} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CostGauge yearlyCost={result.totalCostPerYear} budget={budget} />
            <div className="lg:col-span-2">
                <CostSankeyDiagram data={result.costPerDepartment} />
            </div>
        </div>
    </>
);

const OperationalDashboard: React.FC<{ result: SimulationResult }> = ({ result }) => (
    <div className="grid grid-cols-1 gap-6">
        <UsageHeatmap data={result.hourlyUsage} />
        <GrowthForecastChart data={result.growthForecast} />
    </div>
);

const AnalyticalDashboard: React.FC<{ result: SimulationResult, params: SimulationParams }> = ({ result, params }) => (
    <div className="grid grid-cols-1 gap-6">
        <TokenWaterfallChart breakdownData={result.tokenBreakdown} cacheHitRate={params.cacheHitRate} />
    </div>
);

const PlanningDashboard: React.FC<{ result: SimulationResult }> = ({ result }) => (
    <div className="text-center py-16">
        <h3 className="text-2xl font-bold">Planning & Scenario Tools</h3>
        <p className="text-gray-400 mt-2">Coming soon: Interactive budget allocation, scenario comparisons, and risk assessment charts.</p>
    </div>
);


export const Dashboard: React.FC<DashboardProps> = ({ result, activeTab, params, budget }) => {
    const renderContent = () => {
        switch (activeTab) {
            case Tab.EXECUTIVE:
                return <ExecutiveDashboard result={result} budget={budget} />;
            case Tab.OPERATIONAL:
                return <OperationalDashboard result={result} />;
            case Tab.ANALYTICAL:
                return <AnalyticalDashboard result={result} params={params} />;
            case Tab.PLANNING:
                 return <PlanningDashboard result={result} />;
            default:
                return <ExecutiveDashboard result={result} budget={budget} />;
        }
    };
    return <div className="animate-fade-in">{renderContent()}</div>;
};
