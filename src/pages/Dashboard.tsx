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

// Placeholder components for other routes
const UniversesView = () => (
  <div className="text-white">
    <h1 className="font-display text-4xl font-bold mb-4 bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
      Your Universes
    </h1>
    <p className="text-white/60">Manage all your AI-generated universes here.</p>
  </div>
);

const AnalyticsView = () => (
  <div className="text-white">
    <h1 className="font-display text-4xl font-bold mb-4 bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
      Performance Insights
    </h1>
    <p className="text-white/60">Track your universe performance and engagement metrics.</p>
  </div>
);

const MonetizationView = () => (
  <div className="text-white">
    <h1 className="font-display text-4xl font-bold mb-4 bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
      Earnings & Revenue
    </h1>
    <p className="text-white/60">Manage your monetization settings and track earnings.</p>
  </div>
);

const WorkflowView = () => (
  <div className="text-white">
    <h1 className="font-display text-4xl font-bold mb-4 bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
      AI Creation Workflow
    </h1>
    <p className="text-white/60">Your end-to-end creation pipeline.</p>
  </div>
);

const CollaborationView = () => (
  <div className="text-white">
    <h1 className="font-display text-4xl font-bold mb-4 bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
      Collaborations & Teams
    </h1>
    <p className="text-white/60">Manage your creative team and collaborators.</p>
  </div>
);

const SettingsView = () => (
  <div className="text-white">
    <h1 className="font-display text-4xl font-bold mb-4 bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
      Studio Settings
    </h1>
    <p className="text-white/60">Configure your studio preferences and account settings.</p>
  </div>
);

export default Dashboard;
