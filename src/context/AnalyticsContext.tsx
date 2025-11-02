import React, { createContext, useContext, useState, useCallback } from 'react';

export interface AnalyticsMetrics {
  totalViews: number;
  totalLikes: number;
  totalFollowers: number;
  averageRating: number;
  engagementRate: number;
  revenueLast30Days: number;
  revenueTotal: number;
}

export interface DailyStats {
  date: string;
  views: number;
  likes: number;
  followers: number;
  revenue: number;
}

export interface AnalyticsContextType {
  metrics: AnalyticsMetrics | null;
  dailyStats: DailyStats[];
  isLoading: boolean;
  fetchMetrics: (userId: string) => Promise<void>;
  fetchDailyStats: (userId: string, days?: number) => Promise<void>;
  trackEvent: (event: string, data?: any) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMetrics = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockMetrics: AnalyticsMetrics = {
        totalViews: 5230000,
        totalLikes: 128500,
        totalFollowers: 45000,
        averageRating: 4.65,
        engagementRate: 2.46,
        revenueLast30Days: 15420,
        revenueTotal: 156280,
      };

      setMetrics(mockMetrics);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchDailyStats = useCallback(async (userId: string, days: number = 30) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const stats: DailyStats[] = Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));

        return {
          date: date.toISOString().split('T')[0],
          views: Math.floor(Math.random() * 50000) + 10000,
          likes: Math.floor(Math.random() * 5000) + 1000,
          followers: Math.floor(Math.random() * 500) + 100,
          revenue: Math.floor(Math.random() * 1000) + 200,
        };
      });

      setDailyStats(stats);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const trackEvent = useCallback((event: string, data?: any) => {
    // In production, send to analytics service (Google Analytics, Mixpanel, etc.)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics Event]', event, data);
    }
  }, []);

  return (
    <AnalyticsContext.Provider
      value={{
        metrics,
        dailyStats,
        isLoading,
        fetchMetrics,
        fetchDailyStats,
        trackEvent,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
