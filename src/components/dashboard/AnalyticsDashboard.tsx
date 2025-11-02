import React, { useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Eye, Heart, Users, TrendingUp, DollarSign, Trophy } from 'lucide-react';
import {
  CosmoCard,
  CosmoCardBody,
  CosmoCardTitle,
  CosmoHeading,
  CosmoGrid,
  CosmoBadge,
} from '@/components/lib';
import { useAnalytics } from '@/context';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change: string;
  positive: boolean;
  trend?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, change, positive, trend }) => {
  return (
    <CosmoCard variant="interactive" className="text-center">
      <CosmoCardBody className="space-y-4">
        <div className="flex justify-center text-[#00eaff] text-3xl">
          {icon}
        </div>
        <div>
          <p className="text-white/60 text-sm mb-1">{label}</p>
          <p className="font-display text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`text-sm font-semibold ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {positive ? '↑' : '↓'} {change}
        </div>
        {trend && (
          <div className="h-8 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[{ v: 0 }, { v: trend * 0.5 }, { v: trend }]}>
                <Line type="monotone" dataKey="v" stroke={positive ? '#10b981' : '#ef4444'} strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CosmoCardBody>
    </CosmoCard>
  );
};

interface AnalyticsDashboardProps {
  userId?: string;
  compact?: boolean;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ userId, compact = false }) => {
  const { metrics, dailyStats, isLoading, fetchMetrics, fetchDailyStats } = useAnalytics();

  useEffect(() => {
    if (userId) {
      fetchMetrics(userId);
      fetchDailyStats(userId);
    }
  }, [userId, fetchMetrics, fetchDailyStats]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-white/60">Loading analytics...</p>
      </div>
    );
  }

  if (!metrics) {
    return null;
  }

  const chartData = dailyStats.length > 0 ? dailyStats.map((stat, i) => ({
    date: stat.date,
    views: stat.views,
    likes: stat.likes,
    revenue: stat.revenue,
  })) : [
    { date: 'Jan', views: 45000, likes: 3200, revenue: 1200 },
    { date: 'Feb', views: 52000, likes: 4100, revenue: 1500 },
    { date: 'Mar', views: 68000, likes: 5300, revenue: 2100 },
    { date: 'Apr', views: 73000, likes: 6100, revenue: 2800 },
    { date: 'May', views: 82000, likes: 6800, revenue: 3200 },
    { date: 'Jun', views: 95000, likes: 7600, revenue: 3800 },
  ];

  return (
    <div className="space-y-8">
      {!compact && (
        <CosmoHeading size="lg" level="h2" gradient>
          Performance Analytics
        </CosmoHeading>
      )}

      {/* Key Metrics Grid */}
      <CosmoGrid columns={compact ? 2 : 3} gap="md">
        <MetricCard
          icon={<Eye className="w-6 h-6" />}
          label="Total Views"
          value={metrics.totalViews.toLocaleString()}
          change="+15%"
          positive={true}
          trend={15}
        />
        <MetricCard
          icon={<Heart className="w-6 h-6" />}
          label="Total Likes"
          value={metrics.totalLikes.toLocaleString()}
          change="+12%"
          positive={true}
          trend={12}
        />
        <MetricCard
          icon={<Users className="w-6 h-6" />}
          label="Followers"
          value={metrics.totalFollowers.toLocaleString()}
          change="+8%"
          positive={true}
          trend={8}
        />
        {!compact && (
          <>
            <MetricCard
              icon={<Trophy className="w-6 h-6" />}
              label="Average Rating"
              value={metrics.averageRating.toFixed(2)}
              change="+0.5"
              positive={true}
              trend={5}
            />
            <MetricCard
              icon={<TrendingUp className="w-6 h-6" />}
              label="Engagement Rate"
              value={`${metrics.engagementRate.toFixed(2)}%`}
              change="+2.3%"
              positive={true}
              trend={2.3}
            />
            <MetricCard
              icon={<DollarSign className="w-6 h-6" />}
              label="Monthly Revenue"
              value={`$${metrics.revenueLast30Days.toLocaleString()}`}
              change="+18%"
              positive={true}
              trend={18}
            />
          </>
        )}
      </CosmoGrid>

      {/* Charts */}
      {!compact && (
        <>
          {/* Views & Likes Trend */}
          <CosmoCard variant="default">
            <CosmoCardBody>
              <CosmoCardTitle size="sm" className="mb-4">Views & Likes Trend</CosmoCardTitle>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,234,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#10182e',
                      border: '1px solid #00eaff',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Line type="monotone" dataKey="views" stroke="#00eaff" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="likes" stroke="#a24df6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CosmoCardBody>
          </CosmoCard>

          {/* Revenue Chart */}
          <CosmoCard variant="default">
            <CosmoCardBody>
              <CosmoCardTitle size="sm" className="mb-4">Revenue Over Time</CosmoCardTitle>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,234,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#10182e',
                      border: '1px solid #00eaff',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="revenue" fill="#ff006e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CosmoCardBody>
          </CosmoCard>

          {/* Summary Stats */}
          <CosmoCard variant="subtle">
            <CosmoCardBody>
              <CosmoCardTitle size="sm" className="mb-4">Summary</CosmoCardTitle>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-white/60 text-sm mb-1">Total Revenue</p>
                  <p className="font-display text-2xl font-bold text-[#00eaff]">
                    ${metrics.revenueTotal.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Last 30 Days</p>
                  <p className="font-display text-2xl font-bold text-[#a24df6]">
                    ${metrics.revenueLast30Days.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Engagement</p>
                  <p className="font-display text-2xl font-bold text-green-400">
                    {metrics.engagementRate.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Rating</p>
                  <p className="font-display text-2xl font-bold text-yellow-400">
                    {metrics.averageRating.toFixed(1)}/5
                  </p>
                </div>
              </div>
            </CosmoCardBody>
          </CosmoCard>
        </>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
