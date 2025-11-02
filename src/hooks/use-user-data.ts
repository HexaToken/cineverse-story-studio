import { useAuth } from '@/context';
import { useAnalytics } from '@/context';
import { useCallback, useEffect } from 'react';

/**
 * Custom hook that combines user auth data with analytics
 * Automatically fetches analytics when user is loaded
 */
export function useUserData() {
  const auth = useAuth();
  const analytics = useAnalytics();

  useEffect(() => {
    if (auth.user && !analytics.metrics) {
      analytics.fetchMetrics(auth.user.id);
      analytics.fetchDailyStats(auth.user.id);
    }
  }, [auth.user, analytics.metrics, analytics]);

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading || analytics.isLoading,
    metrics: analytics.metrics,
    dailyStats: analytics.dailyStats,
  };
}
