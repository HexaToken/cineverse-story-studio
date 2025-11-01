import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Eye, Heart, Users, TrendingUp, Play, Edit, BarChart3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardOverview = ({ onNewUniverse }: { onNewUniverse: () => void }) => {
  const [countersVisible, setCountersVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setCountersVisible(true), 300);
  }, []);

  const stats = [
    { label: "Total Views", value: 2340000, icon: Eye, color: "#00eaff" },
    { label: "Earnings This Month", value: "$4,280", icon: TrendingUp, color: "#a24df6" },
    { label: "Followers", value: 48200, icon: Users, color: "#00eaff" },
    { label: "Total Likes", value: 127000, icon: Heart, color: "#a24df6" }
  ];

  const activeUniverses = [
    { id: 1, title: "The Luminous Code", status: "Published", views: "1.2M", poster: 1 },
    { id: 2, title: "Zero Orbit", status: "In Progress", views: "890K", poster: 2 },
    { id: 3, title: "Echoes of Tomorrow", status: "Published", views: "650K", poster: 3 },
    { id: 4, title: "Neon Requiem", status: "Draft", views: "—", poster: 4 }
  ];

  const aiCredits = { used: 740, total: 1000 };
  const creditsPercentage = (aiCredits.used / aiCredits.total) * 100;

  const AnimatedCounter = ({ target }: { target: number | string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!countersVisible || typeof target === 'string') return;
      
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }, [countersVisible, target]);

    const formatNumber = (num: number) => {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
      return num.toString();
    };

    return typeof target === 'string' ? target : formatNumber(count);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold text-white mb-2">
            Welcome Back, <span className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">Nova</span>
          </h1>
          <p className="text-white/60 text-lg">Here's what's happening across your universes.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={onNewUniverse}
            className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white shadow-[0_0_30px_rgba(0,234,255,0.4)] hover:shadow-[0_0_40px_rgba(0,234,255,0.6)]"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            + New Universe
          </Button>
          <Button variant="outline" className="border-[#00eaff]/40 text-[#00eaff] hover:bg-[#00eaff]/10">
            ⚙ Settings
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-white/5 backdrop-blur-md border border-[#00eaff]/20 hover:border-[#a24df6]/40 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 flex items-center justify-center">
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-1">
                  <AnimatedCounter target={stat.value} />
                </p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Universes */}
      <div>
        <h2 className="font-display text-2xl font-bold text-white mb-6">Active Universes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeUniverses.map((universe) => (
            <Card key={universe.id} className="group bg-white/5 backdrop-blur-md border border-[#00eaff]/20 overflow-hidden hover:border-[#a24df6]/50 transition-all cursor-pointer">
              <div className="aspect-[2/3] bg-gradient-to-br from-[#1a1a2e] to-[#0a0b1a] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white/10">{universe.poster}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" className="bg-[#00eaff]/20 border border-[#00eaff]/40 text-[#00eaff] hover:bg-[#00eaff]/30">
                    <Play className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" className="bg-[#a24df6]/20 border border-[#a24df6]/40 text-[#a24df6] hover:bg-[#a24df6]/30">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    universe.status === 'Published' ? 'bg-[#00eaff]/20 text-[#00eaff] border border-[#00eaff]/40' :
                    universe.status === 'In Progress' ? 'bg-[#a24df6]/20 text-[#a24df6] border border-[#a24df6]/40' :
                    'bg-white/10 text-white/60 border border-white/20'
                  }`}>
                    {universe.status}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-2">{universe.title}</h3>
                <div className="flex items-center justify-between text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{universe.views}</span>
                  </div>
                  <Link to={`/analytics/${universe.id}`}>
                    <BarChart3 className="w-4 h-4 hover:text-[#00eaff] transition-colors" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Credits & Engagement */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* AI Credits */}
        <Card className="bg-white/5 backdrop-blur-md border border-[#a24df6]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-white">AI Credits Remaining</h3>
              <Sparkles className="w-5 h-5 text-[#a24df6]" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Used: {aiCredits.used} / {aiCredits.total}</span>
                  <span className="text-[#a24df6] font-semibold">{Math.round(creditsPercentage)}%</span>
                </div>
                <Progress value={creditsPercentage} className="h-2" />
              </div>
              <Button className="w-full bg-gradient-to-r from-[#a24df6] to-[#00eaff] text-white">
                Add More Credits
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Followers Chart Preview */}
        <Card className="bg-white/5 backdrop-blur-md border border-[#00eaff]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-white">Followers & Engagement</h3>
              <TrendingUp className="w-5 h-5 text-[#00eaff]" />
            </div>
            <div className="h-32 flex items-end justify-between gap-2">
              {[45, 62, 58, 71, 83, 78, 92].map((height, idx) => (
                <div key={idx} className="flex-1 bg-gradient-to-t from-[#00eaff] to-[#a24df6] rounded-t-lg opacity-70 hover:opacity-100 transition-opacity" style={{ height: `${height}%` }} />
              ))}
            </div>
            <p className="text-sm text-white/60 mt-4">+12.4% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
