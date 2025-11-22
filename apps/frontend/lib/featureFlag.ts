/**
 * Frontend Feature Flag Client
 * 
 * Provides feature flag access for frontend components
 */

import { getFeatureFlag } from '@shared/config/featureFlags';

/**
 * Check if a feature flag is enabled
 */
export function isFeatureEnabled(key: string): boolean {
  // In Next.js, we need to access env vars via NEXT_PUBLIC_ prefix for client-side
  // For server components, we can use the shared function directly
  if (typeof window === 'undefined') {
    // Server-side: use shared function
    return getFeatureFlag(key);
  }

  // Client-side: check NEXT_PUBLIC_ prefixed env var
  const envKey = `NEXT_PUBLIC_FEATURE_FLAG_${key.toUpperCase().replace(/([A-Z])/g, '_$1')}`;
  const envValue = process.env[envKey];

  if (envValue === 'true' || envValue === '1') {
    return true;
  }
  if (envValue === 'false' || envValue === '0') {
    return false;
  }

  // Fallback to default (from shared config)
  return getFeatureFlag(key);
}

