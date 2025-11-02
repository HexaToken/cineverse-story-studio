import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Award, Zap, Target, DollarSign, Eye, Heart, Share2, Settings, Download, Calendar, ArrowUpRight, ArrowDownRight, Globe, Mail, MessageSquare, Sparkles, Trophy, BarChart3, Clock, Clapperboard } from "lucide-react";

const CreatorHub = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "portfolio" | "collaborations" | "settings">("overview");
  const [dateRange, setDateRange] = useState<"week" | "month" | "year">("month");

  const creatorInfo = {
    name: "Alex Nexus",
    title: "AI Story Architect",
    joinDate: "2023-06-15",
    email: "alex@cineverse.io",
    portfolio: "nexus-universes.io"
  };

  const analyticsData = {
    viewsTrend: [
      { date: "Jan", views: 45000, engagement: 3200 },
      { date: "Feb", views: 52000, engagement: 4100 },
      { date: "Mar", views: 68000, engagement: 5300 },
      { date: "Apr", views: 73000, engagement: 6100 },
      { date: "May", views: 82000, engagement: 6800 },
      { date: "Jun", views: 95000, engagement: 7600 },
      { date: "Jul", views: 112000, engagement: 8900 }
    ],
    genreDistribution: [
      { name: "Sci-Fi", value: 35, color: "#00eaff" },
      { name: "Cyberpunk", value: 28, color: "#a24df6" },
      { name: "Drama", value: 18, color: "#ff006e" },
      { name: "Noir", value: 12, color: "#8338ec" },
      { name: "Romance", value: 7, color: "#ffbe0b" }
    ],
    audienceDemographics: {
      ageGroups: [
        { range: "18-24", percentage: 35 },
        { range: "25-34", percentage: 42 },
        { range: "35-44", percentage: 16 },
        { range: "45+", percentage: 7 }
      ],
      regions: [
        { name: "North America", percentage: 45 },
        { name: "Europe", percentage: 28 },
        { name: "Asia-Pacific", percentage: 18 },
        { name: "Other", percentage: 9 }
      ]
    }
  };

  const keyMetrics = [
    { label: "Total Views", value: "2.3M", change: "+12%", icon: Eye, isPositive: true },
    { label: "Engagement Rate", value: "8.4%", change: "+2.1%", icon: Heart, isPositive: true },
    { label: "Avg. Rating", value: "4.9", change: "+0.3", icon: Trophy, isPositive: true },
    { label: "Monetization", value: "$12.5K", change: "+18%", icon: DollarSign, isPositive: true },
    { label: "Active Subscribers", value: "8.2K", change: "-0.5%", icon: Users, isPositive: false },
    { label: "Collaboration Offers", value: "24", change: "+6", icon: Sparkles, isPositive: true }
  ];

  const collaborations = [
    { name: "Echo Studios", type: "Joint Universe", views: "450K", date: "2024-06-10", revenue: "$3.2K" },
    { name: "Visionary Collective", type: "Music Score", views: "320K", date: "2024-05-28", revenue: "$1.8K" },
    { name: "Quantum Narratives", type: "Story Co-write", views: "285K", date: "2024-05-15", revenue: "$2.1K" },
    { name: "NeonDreams Studio", type: "Visual FX", views: "198K", date: "2024-04-30", revenue: "$1.5K }
  ];

  const universes = [
    { id: 1, title: "The Luminous Code", genre: "Sci-Fi", views: "1.2M", revenue: "$5.2K", trending: true },
    { id: 2, title: "Zero Orbit", genre: "Cyberpunk", views: "890K", revenue: "$3.8K", trending: true },
    { id: 3, title: "Echoes of Tomorrow", genre: "Drama", views: "650K", revenue: "$2.9K", trending: false }
  ];

  const aiTools = [
    { name: "Runway Gen-3", usage: 285, limit: 500, status: "active" },
    { name: "Midjourney v6", usage: 420, limit: 500, status: "active" },
    { name: "ElevenLabs", usage: 195, limit: 300, status: "active" },
    { name: "GPT-Vision", usage: 480, limit: 500, status: "warning" },
    { name: "Stable Audio", usage: 320, limit: 500, status: "active" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b1a] to-[#10182e]">
      <Header />

      {/* Creator Header */}
      <section className="border-b border-[#00eaff]/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{creatorInfo.name[0]}</span>
                </div>
                <div>
                  <h1 className="font-display text-4xl font-bold text-white mb-2">{creatorInfo.name}</h1>
                  <p className="text-[#00eaff] text-lg mb-3">{creatorInfo.title}</p>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {new Date(creatorInfo.joinDate).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {creatorInfo.email}</span>
                    <Link to={`https://${creatorInfo.portfolio}`} target="_blank" className="flex items-center gap-1 hover:text-[#00eaff]">
                      <Globe className="w-4 h-4" /> Portfolio
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to={`/creator/${id}`}>
                <Button variant="outline" className="border-[#00eaff]/40 text-[#00eaff]">
                  <Eye className="w-4 h-4 mr-2" />
                  View Public Profile
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-16 bg-[#0a0b1a]/95 backdrop-blur-xl border-b border-[#00eaff]/20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {["overview", "analytics", "portfolio", "collaborations", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`py-4 px-2 font-semibold transition-all capitalize ${
                  activeTab === tab
                    ? "text-[#00eaff] border-b-2 border-[#00eaff]"
                    : "text-white/60 hover:text-white border-b-2 border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-6">Performance Summary</h2>
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                {keyMetrics.map((metric, idx) => {
                  const Icon = metric.icon;
                  return (
                    <Card key={idx} className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20 overflow-hidden group hover:border-[#a24df6]/50 transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Icon className="w-5 h-5 text-[#00eaff]" />
                          <div className={`flex items-center gap-1 text-sm font-semibold ${metric.isPositive ? "text-green-400" : "text-red-400"}`}>
                            {metric.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            {metric.change}
                          </div>
                        </div>
                        <p className="text-white/60 text-sm mb-2">{metric.label}</p>
                        <p className="font-display text-2xl font-bold text-white">{metric.value}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats & Next Steps */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
                <CardHeader>
                  <CardTitle className="text-white">Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-[#a24df6]/20">
                    <Zap className="w-5 h-5 text-[#a24df6]" />
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">Increase Upload Frequency</p>
                      <p className="text-white/60 text-xs">Consistency drives 23% more engagement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-[#00eaff]/20">
                    <Target className="w-5 h-5 text-[#00eaff]" />
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">Expand Genre Portfolio</p>
                      <p className="text-white/60 text-xs">Your Drama content performs well, try more</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-[#a24df6]/20">
                    <MessageSquare className="w-5 h-5 text-[#a24df6]" />
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">Engage with Comments</p>
                      <p className="text-white/60 text-xs">24 unanswered comments from top fans</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
                <CardHeader>
                  <CardTitle className="text-white">Subscription Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Premium Creator Plan</span>
                      <Badge className="bg-[#a24df6]/20 text-[#a24df6] border border-[#a24df6]/40">Active</Badge>
                    </div>
                    <p className="text-white/60 text-sm">Renews on August 15, 2024</p>
                  </div>
                  <Separator className="bg-white/10" />
                  <div>
                    <p className="text-white/80 font-semibold mb-2">Your Benefits</p>
                    <ul className="space-y-1 text-white/60 text-sm">
                      <li>✓ Unlimited uploads & storage</li>
                      <li>✓ Advanced analytics & revenue</li>
                      <li>✓ Priority monetization support</li>
                      <li>✓ Access to beta AI tools</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-3xl font-bold text-white">Detailed Analytics</h2>
                <div className="flex gap-2">
                  {["week", "month", "year"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setDateRange(range as typeof dateRange)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        dateRange === range
                          ? "bg-[#00eaff]/20 text-[#00eaff] border border-[#00eaff]/40"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Views & Engagement Trend */}
              <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-white">Views & Engagement Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData.viewsTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,234,255,0.1)" />
                      <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#10182e",
                          border: "1px solid #00eaff",
                          borderRadius: "8px"
                        }}
                      />
                      <Line type="monotone" dataKey="views" stroke="#00eaff" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="engagement" stroke="#a24df6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Genre Distribution & Demographics */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
                  <CardHeader>
                    <CardTitle className="text-white">Content Distribution by Genre</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={analyticsData.genreDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {analyticsData.genreDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {analyticsData.genreDistribution.map((genre) => (
                        <div key={genre.name} className="flex items-center justify-between text-sm">
                          <span className="text-white/80">{genre.name}</span>
                          <span className="text-white font-semibold">{genre.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
                  <CardHeader>
                    <CardTitle className="text-white">Audience Demographics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-white/80 font-semibold mb-3">Age Groups</p>
                      {analyticsData.audienceDemographics.ageGroups.map((group) => (
                        <div key={group.range} className="mb-2">
                          <div className="flex items-center justify-between mb-1 text-sm">
                            <span className="text-white/70">{group.range}</span>
                            <span className="text-white font-semibold">{group.percentage}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#00eaff] to-[#a24df6]"
                              style={{ width: `${group.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="bg-white/10" />
                    <div>
                      <p className="text-white/80 font-semibold mb-3">Top Regions</p>
                      {analyticsData.audienceDemographics.regions.map((region) => (
                        <div key={region.name} className="flex items-center justify-between text-sm mb-2">
                          <span className="text-white/70">{region.name}</span>
                          <span className="text-white font-semibold">{region.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === "portfolio" && (
          <div className="space-y-8">
            <h2 className="font-display text-3xl font-bold text-white">Universe Portfolio</h2>
            <div className="space-y-4">
              {universes.map((universe) => (
                <Card key={universe.id} className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20 overflow-hidden hover:border-[#a24df6]/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-xl font-bold text-white">{universe.title}</h3>
                          {universe.trending && (
                            <Badge className="bg-[#a24df6]/20 text-[#a24df6] border border-[#a24df6]/40">Trending</Badge>
                          )}
                        </div>
                        <p className="text-white/60 text-sm mb-3">{universe.genre}</p>
                        <div className="flex items-center gap-8 text-sm">
                          <span className="flex items-center gap-2 text-white/70">
                            <Eye className="w-4 h-4 text-[#00eaff]" />
                            {universe.views} views
                          </span>
                          <span className="flex items-center gap-2 text-white/70">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            {universe.revenue} revenue
                          </span>
                        </div>
                      </div>
                      <Link to={`/universe/${universe.id}`}>
                        <Button className="bg-[#00eaff]/20 text-[#00eaff] hover:bg-[#00eaff]/30">
                          View
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Collaborations Tab */}
        {activeTab === "collaborations" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold text-white">Collaboration History</h2>
              <Button className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Find Collaborators
              </Button>
            </div>
            <div className="space-y-4">
              {collaborations.map((collab, idx) => (
                <Card key={idx} className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20 overflow-hidden hover:border-[#a24df6]/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold text-white mb-2">{collab.name}</h3>
                        <div className="flex items-center gap-6 text-sm text-white/70">
                          <span className="px-3 py-1 rounded-full bg-[#a24df6]/20 border border-[#a24df6]/40 text-[#a24df6]">
                            {collab.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" /> {collab.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> {new Date(collab.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-green-400">
                            <DollarSign className="w-4 h-4" /> {collab.revenue}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" className="border-[#00eaff]/40 text-[#00eaff]">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-8">
            <h2 className="font-display text-3xl font-bold text-white mb-6">AI Tools & Resources</h2>
            <div className="space-y-4">
              {aiTools.map((tool) => (
                <Card key={tool.name} className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display font-bold text-white">{tool.name}</h3>
                      <Badge
                        className={`${
                          tool.status === "active"
                            ? "bg-green-500/20 text-green-400 border border-green-400/40"
                            : tool.status === "warning"
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400/40"
                            : "bg-red-500/20 text-red-400 border border-red-400/40"
                        }`}
                      >
                        {(tool.usage / tool.limit * 100).toFixed(0)}% Used
                      </Badge>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          tool.status === "active"
                            ? "bg-gradient-to-r from-[#00eaff] to-[#a24df6]"
                            : tool.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${(tool.usage / tool.limit) * 100}%` }}
                      />
                    </div>
                    <p className="text-white/60 text-sm mt-2">
                      {tool.usage} / {tool.limit} credits used
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Separator className="bg-white/10" />
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
                <CardHeader>
                  <CardTitle className="text-white">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full border-[#00eaff]/40 text-[#00eaff]">
                    Edit Profile Information
                  </Button>
                  <Button variant="outline" className="w-full border-[#00eaff]/40 text-[#00eaff]">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full border-[#00eaff]/40 text-[#00eaff]">
                    Two-Factor Authentication
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
                <CardHeader>
                  <CardTitle className="text-white">Download Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full border-[#a24df6]/40 text-[#a24df6]">
                    <Download className="w-4 h-4 mr-2" />
                    Export Analytics
                  </Button>
                  <Button variant="outline" className="w-full border-[#a24df6]/40 text-[#a24df6]">
                    <Download className="w-4 h-4 mr-2" />
                    Download Portfolio
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorHub;