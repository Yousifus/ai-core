
export const TIMEZONES = [
    'UTC-11', 'UTC-10', 'UTC-9', 'UTC-8', 'UTC-7', 'UTC-6', 'UTC-5',
    'UTC-4', 'UTC-3', 'UTC-2', 'UTC-1', 'UTC+0', 'UTC+1', 'UTC+2',
    'UTC+3', 'UTC+4', 'UTC+5', 'UTC+6', 'UTC+7', 'UTC+8', 'UTC+9',
    'UTC+10', 'UTC+11', 'UTC+12'
] as const;

export type Timezone = typeof TIMEZONES[number];

export interface Department {
  id: string;
  name: string;
  managerCount: number;
  seniorCount: number;
  juniorCount: number;
  timezone: Timezone;
}

export interface UserPersona {
  name: string;
  percentage: number;
  usageMultiplier: number;
}

export interface TaskComplexity {
  name: string;
  percentage: number;
  tokenMultiplier: number;
}

export interface SimulationParams {
  // Temporal Dynamics
  baseUsageFrequency: number;
  peakHoursMultiplier: number;
  holidayImpact: number; // percentage reduction
  projectCycleSpike: number; // multiplier

  // User Behavior
  errorRetryRate: number; // percentage
  iterationMultiplier: number; // 1-10x
  
  // Technical Parameters
  avgInputTokens: number;
  avgOutputTokens: number;
  cacheHitRate: number; // percentage
  
  // Economic Modeling
  costPerMillionTokens: number;
  
  // Growth
  growthTrajectory: number; // percentage per month
}

export interface SimulationResult {
  totalUsers: number;
  totalQueriesPerDay: number;
  totalTokensPerDay: number;
  totalCostPerDay: number;
  totalCostPerMonth: number;
  totalCostPerYear: number;
  costPerDepartment: { name: string; value: number }[];
  hourlyUsage: { hour: string; usage: number }[];
  tokenBreakdown: { name: string; value: number }[];
  growthForecast: { month: string; cost: number }[];
}

export enum Tab {
    EXECUTIVE = 'Executive',
    OPERATIONAL = 'Operational',
    ANALYTICAL = 'Analytical',
    PLANNING = 'Planning'
}