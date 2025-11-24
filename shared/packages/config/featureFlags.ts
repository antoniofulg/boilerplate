/**
 * Feature Flag Registry
 * 
 * Centralized feature flag definitions for risk reduction in releases
 */

export type FeatureFlag = {
  key: string;
  description: string;
  defaultValue: boolean;
};

export const featureFlags: Record<string, FeatureFlag> = {
  staticDashboardMvp: {
    key: 'staticDashboardMvp',
    description: 'Enable static dashboard MVP (no voting functionality)',
    defaultValue: true,
  },
};

/**
 * Get feature flag value from environment
 * 
 * Format: FEATURE_FLAG_<KEY>=true|false
 * Example: FEATURE_FLAG_STATIC_DASHBOARD_MVP=true
 */
export function getFeatureFlag(key: string): boolean {
  const flag = featureFlags[key];
  if (!flag) {
    return false;
  }

  const envKey = `FEATURE_FLAG_${key.toUpperCase().replace(/([A-Z])/g, '_$1')}`;
  const envValue = process.env[envKey];

  if (envValue === 'true' || envValue === '1') {
    return true;
  }
  if (envValue === 'false' || envValue === '0') {
    return false;
  }

  return flag.defaultValue;
}

