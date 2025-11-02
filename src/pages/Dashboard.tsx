import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import AIAssistantSidebar from "@/components/dashboard/AIAssistantSidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import UniverseBuilder from "@/components/UniverseBuilder";
import { Bell, User, Sparkles, TrendingUp, DollarSign, Eye, Heart, Users, BarChart3, ArrowUpRight, ArrowDownRight, Download, Filter, Settings, Mail, Clock, CheckCircle2, AlertCircle, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [builderOpen, setBuilderOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-b from-[#0a0b1a] via-[#10182e] to-[#0a0b1a]">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-16 border-b border-white/10 bg-[#0a0b1a]/80 backdrop-blur-xl sticky top-0 z-40">
            <div className="h-full px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-white hover:text-[#00eaff]" />
                <h2 className="font-display text-lg font-semibold text-white">Creator Studio</h2>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
                  className={`bg-gradient-to-r from-[#00eaff]/20 to-[#a24df6]/20 border ${
                    aiAssistantOpen ? 'border-[#00eaff]' : 'border-[#00eaff]/40'
                  } text-[#00eaff] hover:bg-[#00eaff]/30 shadow-[0_0_20px_rgba(0,234,255,0.3)]`}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-[#00eaff] hover:bg-[#00eaff]/10">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-[#00eaff] hover:bg-[#00eaff]/10">
                  <User className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-8 overflow-auto">
            <Routes>
              <Route 
                path="/" 
                element={<DashboardOverview onNewUniverse={() => setBuilderOpen(true)} />} 
              />
              <Route path="/universes" element={<UniversesView />} />
              <Route path="/analytics" element={<AnalyticsView />} />
              <Route path="/monetization" element={<MonetizationView />} />
              <Route path="/workflow" element={<WorkflowView />} />
              <Route path="/collaboration" element={<CollaborationView />} />
              <Route path="/settings" element={<SettingsView />} />
            </Routes>
          </main>
        </div>
      </div>

      {/* AI Assistant Sidebar */}
      <AIAssistantSidebar isOpen={aiAssistantOpen} onClose={() => setAiAssistantOpen(false)} />

      {/* Universe Builder Modal */}
      <UniverseBuilder open={builderOpen} onOpenChange={setBuilderOpen} />

      {/* Floating AI Trigger (when sidebar is closed) */}
      {!aiAssistantOpen && (
        <button
          onClick={() => setAiAssistantOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] shadow-[0_0_40px_rgba(0,234,255,0.6)] hover:shadow-[0_0_50px_rgba(0,234,255,0.8)] transition-all z-40 flex items-center justify-center group animate-pulse"
        >
          <Sparkles className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#a24df6] rounded-full border-2 border-[#0a0b1a] animate-ping" />
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-[#0a0b1a]/95 backdrop-blur-sm border border-[#00eaff]/40 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <p className="text-sm text-white font-medium">Ask CineVerse AI</p>
          </div>
        </button>
      )}
    </SidebarProvider>
  );
};

// Enhanced Dashboard Views
const UniversesView = () => {
  const universes = [
    { id: 1, title: "The Luminous Code", genre: "Sci-Fi", status: "published", views: "1.2M", likes: "45K", rating: 4.9 },
    { id: 2, title: "Zero Orbit", genre: "Cyberpunk", status: "published", views: "890K", likes: "32K", rating: 4.8 },
    { id: 3, title: "Echoes of Tomorrow", genre: "Drama", status: "draft", views: "0", likes: "0", rating: 0 },
    { id: 4, title: "Neon Requiem", genre: "Noir", status: "in-review", views: "0", likes: "0", rating: 0 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
          Your Universes
        </h1>
        <Button className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white">
          <Sparkles className="w-4 h-4 mr-2" />
          Create Universe
        </Button>
      </div>

      <div className="space-y-3">
        {universes.map((universe) => (
          <Card key={universe.id} className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20 overflow-hidden hover:border-[#a24df6]/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-lg font-bold text-white">{universe.title}</h3>
                    <Badge className={`${
                      universe.status === "published" ? "bg-green-500/20 text-green-400" :
                      universe.status === "draft" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-blue-500/20 text-blue-400"
                    } border-0`}>
                      {universe.status.charAt(0).toUpperCase() + universe.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-white/60 text-sm mb-3">{universe.genre}</p>
                  <div className="flex items-center gap-6 text-sm">
                    {universe.status === "published" && (
                      <>
                        <span className="flex items-center gap-1 text-white/70">
                          <Eye className="w-4 h-4 text-[#00eaff]" /> {universe.views}
                        </span>
                        <span className="flex items-center gap-1 text-white/70">
                          <Heart className="w-4 h-4 text-red-400" /> {universe.likes}
                        </span>
                        <span className="flex items-center gap-1 text-white/70">
                          <Trophy className="w-4 h-4 text-yellow-400" /> {universe.rating}/5
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-[#00eaff]/40 text-[#00eaff]">Edit</Button>
                  <Button size="sm" variant="outline" className="border-[#a24df6]/40 text-[#a24df6]">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const analyticsData = [
  { date: "Jan", views: 45000, likes: 3200, engagement: 7.1 },
  { date: "Feb", views: 52000, likes: 4100, engagement: 7.9 },
  { date: "Mar", views: 68000, likes: 5300, engagement: 7.8 },
  { date: "Apr", views: 73000, likes: 6100, engagement: 8.4 },
  { date: "May", views: 82000, likes: 6800, engagement: 8.3 },
  { date: "Jun", views: 95000, likes: 7600, engagement: 8.0 },
  { date: "Jul", views: 112000, likes: 8900, engagement: 7.9 }
];

const AnalyticsView = () => {
  const metrics = [
    { label: "Total Views", value: "623K", change: "+15%", icon: Eye, positive: true },
    { label: "Engagement Rate", value: "7.9%", change: "+0.8%", icon: Heart, positive: true },
    { label: "Avg. Rating", value: "4.8", change: "+0.2", icon: Trophy, positive: true },
    { label: "Watch Duration", value: "12.5m", change: "-1.2m", icon: Clock, positive: false }
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
        Performance Insights
      </h1>

      <div className="grid md:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx} className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-5 h-5 text-[#00eaff]" />
                  <div className={`flex items-center gap-1 text-sm font-semibold ${metric.positive ? "text-green-400" : "text-red-400"}`}>
                    {metric.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
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

      <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
        <CardHeader>
          <CardTitle className="text-white">Views & Engagement Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,234,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip contentStyle={{ backgroundColor: "#10182e", border: "1px solid #00eaff", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="views" stroke="#00eaff" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="likes" stroke="#a24df6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

const MonetizationView = () => {
  const revenue = [
    { source: "Premium Subscriptions", amount: "$4,200", percentage: 42, trend: "+8%" },
    { source: "Ad Revenue", amount: "$2,100", percentage: 21, trend: "+3%" },
    { source: "NFT Sales", amount: "$1,850", percentage: 18, trend: "+12%" },
    { source: "Sponsorships", amount: "$1,450", percentage: 14, trend: "+5%" },
    { source: "Merchandise", amount: "$800", percentage: 8, trend: "+2%" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
        Earnings & Revenue
      </h1>

      <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
        <CardHeader>
          <CardTitle className="text-white">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-white/5 border border-[#00eaff]/20">
              <p className="text-white/60 text-sm mb-1">This Month</p>
              <p className="font-display text-3xl font-bold text-white">$10.4K</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-[#a24df6]/20">
              <p className="text-white/60 text-sm mb-1">Projected (Year)</p>
              <p className="font-display text-3xl font-bold text-[#a24df6]">$124.8K</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-[#00eaff]/20">
              <p className="text-white/60 text-sm mb-1">Pending Payout</p>
              <p className="font-display text-3xl font-bold text-white">$3.2K</p>
            </div>
          </div>

          <div className="space-y-3">
            {revenue.map((item) => (
              <div key={item.source}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">{item.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-semibold">{item.amount}</span>
                    <span className="text-green-400 text-sm font-semibold">{item.trend}</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00eaff] to-[#a24df6]"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const WorkflowView = () => {
  const stages = [
    { id: 1, name: "Concept", status: "completed", universes: 12, estimatedTime: "2-3 days" },
    { id: 2, name: "Scriptwriting", status: "in-progress", universes: 3, estimatedTime: "5-7 days" },
    { id: 3, name: "Visual Generation", status: "queued", universes: 5, estimatedTime: "3-5 days" },
    { id: 4, name: "Audio & VFX", status: "queued", universes: 5, estimatedTime: "4-6 days" },
    { id: 5, name: "Review & Polish", status: "pending", universes: 2, estimatedTime: "2-3 days" },
    { id: 6, name: "Publishing", status: "pending", universes: 0, estimatedTime: "1 day" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
        Creation Workflow
      </h1>

      <div className="space-y-3">
        {stages.map((stage) => (
          <Card key={stage.id} className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/5 border border-[#00eaff]/20 flex items-center justify-center">
                  {stage.status === "completed" && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                  {stage.status === "in-progress" && <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />}
                  {stage.status === "queued" && <Clock className="w-6 h-6 text-blue-400" />}
                  {stage.status === "pending" && <AlertCircle className="w-6 h-6 text-white/60" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-white mb-1">{stage.name}</h3>
                  <p className="text-white/60 text-sm">{stage.universes} universes • Est. {stage.estimatedTime}</p>
                </div>
                <Badge className={`${
                  stage.status === "completed" ? "bg-green-500/20 text-green-400" :
                  stage.status === "in-progress" ? "bg-yellow-500/20 text-yellow-400" :
                  stage.status === "queued" ? "bg-blue-500/20 text-blue-400" :
                  "bg-white/10 text-white/60"
                } border-0`}>
                  {stage.status.replace("-", " ").charAt(0).toUpperCase() + stage.status.slice(1).replace("-", " ")}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const CollaborationView = () => {
  const team = [
    { id: 1, name: "Alex Chen", role: "Story Lead", joinDate: "2024-01-15", status: "active", projects: 8 },
    { id: 2, name: "Maya Rodriguez", role: "Visual Artist", joinDate: "2024-02-20", status: "active", projects: 12 },
    { id: 3, name: "James Wilson", role: "Sound Designer", joinDate: "2024-03-10", status: "active", projects: 6 },
    { id: 4, name: "Sophie Liu", role: "AI Specialist", joinDate: "2024-04-01", status: "pending", projects: 0 }
  ];

  const invites = [
    { id: 1, email: "david@example.com", role: "Collaborator", sentDate: "2024-07-01" },
    { id: 2, email: "emma@example.com", role: "Reviewer", sentDate: "2024-06-28" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent mb-6">
          Team & Collaborations
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Team Members</h2>
            <div className="space-y-3">
              {team.map((member) => (
                <Card key={member.id} className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-bold text-white">{member.name}</h3>
                      <Badge className={`${member.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"} border-0`}>
                        {member.status}
                      </Badge>
                    </div>
                    <p className="text-white/60 text-sm mb-2">{member.role}</p>
                    <p className="text-white/50 text-xs">Joined {new Date(member.joinDate).toLocaleDateString()} • {member.projects} projects</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-bold text-white">Pending Invites</h2>
              <Button size="sm" className="bg-[#00eaff]/20 text-[#00eaff] border border-[#00eaff]/40">
                <Mail className="w-4 h-4 mr-2" />
                Invite
              </Button>
            </div>
            <div className="space-y-3">
              {invites.map((invite) => (
                <Card key={invite.id} className="bg-white/5 backdrop-blur-xl border-[#a24df6]/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display font-bold text-white">{invite.email}</p>
                        <p className="text-white/60 text-sm">{invite.role}</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-[#00eaff]/40 text-[#00eaff]">
                        Resend
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsView = () => (
  <div className="space-y-6">
    <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
      Studio Settings
    </h1>
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
        <CardHeader>
          <CardTitle className="text-white">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full border-[#00eaff]/40 text-[#00eaff]">Edit Profile</Button>
          <Button variant="outline" className="w-full border-[#00eaff]/40 text-[#00eaff]">Change Password</Button>
          <Button variant="outline" className="w-full border-[#00eaff]/40 text-[#00eaff]">Security Settings</Button>
        </CardContent>
      </Card>
      <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
        <CardHeader>
          <CardTitle className="text-white">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white">Email Alerts</span>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white">Push Notifications</span>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Dashboard;
