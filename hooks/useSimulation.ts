
import { useMemo } from 'react';
import type { SimulationParams, Department, SimulationResult, Timezone } from '../types';
import { USER_PERSONAS, TASK_COMPLEXITIES } from '../constants';

const WORKING_DAYS_PER_MONTH = 21;
const MONTHS_PER_YEAR = 12;

const parseTimezoneOffset = (timezone: Timezone): number => {
    return parseInt(timezone.replace('UTC', ''), 10);
};

export const useSimulation = (params: SimulationParams, departments: Department[]): SimulationResult => {
  const result = useMemo(() => {
    const totalUsers = departments.reduce((acc, dept) => acc + dept.managerCount + dept.seniorCount + dept.juniorCount, 0);

    const baseDailyQueries = totalUsers * params.baseUsageFrequency;
    const personaMultiplier = USER_PERSONAS.reduce((acc, p) => acc + (p.percentage / 100) * p.usageMultiplier, 0);
    const complexityMultiplier = TASK_COMPLEXITIES.reduce((acc, t) => acc + (t.percentage / 100) * t.tokenMultiplier, 0);
    const effectiveDailyQueries = baseDailyQueries * personaMultiplier;
    
    const avgTokensPerQuery = params.avgInputTokens + params.avgOutputTokens;
    const tokensBeforeAdjustments = effectiveDailyQueries * avgTokensPerQuery * complexityMultiplier;

    const retriedTokens = tokensBeforeAdjustments * (params.errorRetryRate / 100);
    const iteratedTokens = tokensBeforeAdjustments * (params.iterationMultiplier - 1);
    const totalGeneratedTokens = tokensBeforeAdjustments + retriedTokens + iteratedTokens;
    const finalTokensAfterCache = totalGeneratedTokens * (1 - params.cacheHitRate / 100);

    const totalCostPerDay = (finalTokensAfterCache / 1_000_000) * params.costPerMillionTokens;
    const totalCostPerMonth = totalCostPerDay * WORKING_DAYS_PER_MONTH;
    const totalCostPerYear = totalCostPerMonth * MONTHS_PER_YEAR;

    const costPerDepartment = departments.map(dept => {
      const deptUsers = dept.managerCount + dept.seniorCount + dept.juniorCount;
      const deptPercentage = totalUsers > 0 ? deptUsers / totalUsers : 0;
      return { name: dept.name, value: totalCostPerYear * deptPercentage };
    });

    // Timezone-aware hourly usage calculation
    const hourlyUsageBuckets = Array(24).fill(0);
    const totalDailyDeptCost = totalCostPerDay / (totalUsers || 1);

    departments.forEach(dept => {
        const deptUsers = dept.managerCount + dept.seniorCount + dept.juniorCount;
        if (deptUsers === 0) return;

        const offset = parseTimezoneOffset(dept.timezone);
        const dailyDeptCost = totalDailyDeptCost * deptUsers;
        let dailyMultiplierSum = 0;

        const hourlyMultipliers = Array.from({length: 24}, (_, localHour) => {
            if (localHour >= 9 && localHour <= 17) return params.peakHoursMultiplier;
            if (localHour < 7 || localHour > 20) return 0.4;
            return 1.0;
        });
        dailyMultiplierSum = hourlyMultipliers.reduce((a,b) => a + b, 0);

        const costUnit = dailyDeptCost / (dailyMultiplierSum || 1);

        for (let utcHour = 0; utcHour < 24; utcHour++) {
            const localHour = (utcHour + offset + 24) % 24;
            const multiplier = hourlyMultipliers[localHour];
            hourlyUsageBuckets[utcHour] += costUnit * multiplier;
        }
    });

    const hourlyUsage = hourlyUsageBuckets.map((usage, i) => ({
        hour: `${i}:00`,
        usage: usage
    }));

    const tokenBreakdown = [
        { name: 'Base Usage', value: tokensBeforeAdjustments },
        { name: 'Retries', value: retriedTokens },
        { name: 'Iterations', value: iteratedTokens },
    ];
    
    const growthForecast = Array.from({ length: 12 }, (_, i) => {
        const monthCost = totalCostPerMonth * Math.pow(1 + params.growthTrajectory / 100, i);
        return { month: `Month ${i+1}`, cost: monthCost };
    });

    return {
      totalUsers,
      totalQueriesPerDay: effectiveDailyQueries,
      totalTokensPerDay: finalTokensAfterCache,
      totalCostPerDay,
      totalCostPerMonth,
      totalCostPerYear,
      costPerDepartment,
      hourlyUsage,
      tokenBreakdown,
      growthForecast,
    };
  }, [params, departments]);

  return result;
};