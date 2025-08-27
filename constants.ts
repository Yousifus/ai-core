import type { SimulationParams, Department } from './types';

export const DEFAULT_PARAMS: SimulationParams = {
  // Temporal Dynamics
  baseUsageFrequency: 20,
  peakHoursMultiplier: 1.8,
  holidayImpact: 70,
  projectCycleSpike: 1.5,
  
  // User Behavior
  errorRetryRate: 15,
  iterationMultiplier: 2.5,
  
  // Technical Parameters
  avgInputTokens: 1000,
  avgOutputTokens: 2000,
  cacheHitRate: 30,
  
  // Economic Modeling
  costPerMillionTokens: 0.50, // Example cost for a model like Gemini 1.5 Flash
  
  // Growth
  growthTrajectory: 5,
};

export const INITIAL_DEPARTMENTS: Department[] = [
    { id: 'eng', name: 'Engineering', managerCount: 5, seniorCount: 20, juniorCount: 25, timezone: 'UTC-7' },
    { id: 'mkt', name: 'Marketing', managerCount: 3, seniorCount: 10, juniorCount: 12, timezone: 'UTC-5' },
    { id: 'sales', name: 'Sales', managerCount: 4, seniorCount: 15, juniorCount: 20, timezone: 'UTC-5' },
    { id: 'hr', name: 'Human Resources', managerCount: 2, seniorCount: 5, juniorCount: 8, timezone: 'UTC+1' },
    { id: 'support', name: 'Support', managerCount: 6, seniorCount: 30, juniorCount: 50, timezone: 'UTC+8' },
];

export const USER_PERSONAS = [
    { name: 'Power Users', percentage: 20, usageMultiplier: 2.5 },
    { name: 'Regular Users', percentage: 60, usageMultiplier: 1.0 },
    { name: 'Casual Users', percentage: 20, usageMultiplier: 0.3 },
];

export const TASK_COMPLEXITIES = [
    { name: 'Simple', percentage: 40, tokenMultiplier: 0.5 },
    { name: 'Medium', percentage: 40, tokenMultiplier: 1.0 },
    { name: 'Complex', percentage: 20, tokenMultiplier: 2.5 },
];