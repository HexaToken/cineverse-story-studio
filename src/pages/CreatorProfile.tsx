import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Play, Share2, Heart, Star, Eye, MessageCircle, Sparkles, Trophy, Users, Youtube, Twitter, Globe, Send, TrendingUp, BarChart3, Clock, Repeat2, Clapperboard } from "lucide-react";

const CreatorProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"overview" | "universes" | "timeline" | "behind" | "analytics">("overview");
  const [isFollowing, setIsFollowing] = useState(false);
  const [countersVisible, setCountersVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setCountersVisible(true), 500);
  }, []);

  const stats = [
    { label: "Universes Created", value: 12, icon: Sparkles },
    { label: "Followers", value: 48200, icon: Users },
    { label: "Total Likes", value: 127000, icon: Heart },
    { label: "Total Views", value: 2300000, icon: Eye }
  ];

  const aiTools = [
    { name: "Runway Gen-3", description: "Video synthesis & scene generation" },
    { name: "Midjourney v6", description: "Concept art & character design" },
    { name: "ElevenLabs", description: "AI voice acting & narration" },
    { name: "GPT-Vision", description: "Story structure & dialogue" },
    { name: "Stable Audio", description: "Soundtrack & ambient soundscapes" }
  ];

  const featuredWorks = [
    { id: 1, title: "The Luminous Code", genre: "Sci-Fi", tagline: "Where AI dreams rewrite reality", rating: 4.9, views: "1.2M" },
    { id: 2, title: "Zero Orbit", genre: "Cyberpunk", tagline: "A rebellion born in digital silence", rating: 4.8, views: "890K" },
    { id: 3, title: "Echoes of Tomorrow", genre: "Drama", tagline: "When memories become quantum", rating: 4.9, views: "650K" },
    { id: 4, title: "Neon Requiem", genre: "Noir", tagline: "The last detective in a synthetic city", rating: 4.7, views: "720K" },
    { id: 5, title: "Fractal Hearts", genre: "Romance", tagline: "Love across infinite timelines", rating: 5.0, views: "980K" },
    { id: 6, title: "Silent Code", genre: "Mystery", tagline: "Decrypt the truth before it's deleted", rating: 4.8, views: "540K" }
  ];

  const achievements = [
    { label: "Average Viewer Rating", value: "4.9", icon: Star, suffix: "/5" },
    { label: "Views Across Universes", value: "2.3M", icon: Eye },
    { label: "Community Mentions", value: "12.8K", icon: MessageCircle },
    { label: "AI Collaborations", value: "4", icon: Sparkles }
  ];

  const timelinePosts = [
    {
      id: 1,
      type: "universe_launch",
      title: "New Universe Launch",
      content: "Just released 'The Luminous Code' - where AI dreams rewrite reality. This has been 3 months in the making! 🌌",
      timestamp: "2 days ago",
      media: "gradient-cyan",
      stats: { likes: 2840, comments: 142, remixes: 89, views: 15200 },
    },
    {
      id: 2,
      type: "behind_scenes",
      title: "Behind-the-Scenes Clip",
      content: "Testing Runway Gen-3 for atmospheric scene generation. The results are absolutely mind-blowing! ✨",
      timestamp: "5 days ago",
      media: "gradient-purple",
      stats: { likes: 1920, comments: 78, remixes: 34, views: 9800 },
    },
    {
      id: 3,
      type: "milestone",
      title: "Milestone Reached",
      content: "We hit 2M total views across all universes! Thank you to this incredible community for the support 💖",
      timestamp: "1 week ago",
      media: null,
      stats: { likes: 5240, comments: 301, remixes: 0, views: 18500 },
    },
  ];

  const collaborators = [
    { name: "SynthWave", role: "Voice Director", universes: 3 },
    { name: "PixelPoet", role: "Visual Effects", universes: 2 },
    { name: "CodeMuse", role: "Story Editor", universes: 4 },
  ];

  const AnimatedCounter = ({ target, suffix = "" }: { target: number | string; suffix?: string }) => {
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

    return (
      <span className="font-bold text-4xl bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
        {typeof target === 'string' ? target : formatNumber(count)}{suffix}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b1a] via-[#10182e] to-[#0a0b1a]">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b1a] via-[#1a1a2e] to-[#10182e]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-[600px] h-[600px] bg-[#a24df6] rounded-full blur-[150px] -top-40 -right-40 animate-pulse" />
            <div className="absolute w-[600px] h-[600px] bg-[#00eaff] rounded-full blur-[150px] -bottom-40 -left-40 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        <div className="relative container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="relative inline-block">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#00eaff] via-[#a24df6] to-[#00eaff] p-1 shadow-[0_0_60px_rgba(0,234,255,0.6)] animate-pulse">
                <div className="w-full h-full rounded-full bg-[#0a0b1a] flex items-center justify-center">
                  <span className="text-6xl font-bold bg-gradient-to-br from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
                    NR
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#a24df6] to-[#00eaff] px-4 py-1 rounded-full shadow-[0_0_20px_rgba(162,77,246,0.6)]">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold text-white">Visionary</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-6xl font-bold text-white drop-shadow-[0_0_30px_rgba(0,234,255,0.4)]">
                Nova Rhys
              </h1>
              <p className="text-xl text-[#00eaff] font-medium">
                @novarhys · AI Cinematic Storyteller
              </p>
              <p className="text-white/70 max-w-2xl mx-auto">
                Building cinematic dreams through AI. Exploring consciousness, technology, and narrative.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-[#00eaff]/30 flex items-center justify-center hover:bg-[#00eaff]/20 hover:border-[#00eaff] transition-all group"
              >
                <Twitter className="w-5 h-5 text-white/60 group-hover:text-[#00eaff]" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-[#a24df6]/30 flex items-center justify-center hover:bg-[#a24df6]/20 hover:border-[#a24df6] transition-all group"
              >
                <Youtube className="w-5 h-5 text-white/60 group-hover:text-[#a24df6]" />
              </a>
              <a
                href="https://cineverse.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-[#00eaff]/30 flex items-center justify-center hover:bg-[#00eaff]/20 hover:border-[#00eaff] transition-all group"
              >
                <Globe className="w-5 h-5 text-white/60 group-hover:text-[#00eaff]" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white shadow-[0_0_30px_rgba(0,234,255,0.5)] hover:shadow-[0_0_40px_rgba(0,234,255,0.7)] h-12 px-8 text-base">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Open Studio Dashboard
                </Button>
              </Link>
              <Link to="/feed">
                <Button variant="outline" className="border-[#a24df6]/40 text-[#a24df6] h-12 px-8 text-base hover:bg-[#a24df6]/10">
                  <Sparkles className="w-5 h-5 mr-2" />
                  View Creator Feed
                </Button>
              </Link>
              <Button
                variant="outline"
                className={`border-2 h-12 px-8 text-base transition-all ${
                  isFollowing
                    ? 'border-[#a24df6] bg-[#a24df6]/20 text-[#a24df6]'
                    : 'border-[#00eaff]/50 text-[#00eaff] hover:bg-[#00eaff]/10'
                }`}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                <Heart className={`w-5 h-5 mr-2 ${isFollowing ? 'fill-[#a24df6]' : ''}`} />
                {isFollowing ? 'Following' : 'Follow Creator'}
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10 h-12 px-6">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-[#00eaff]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <AnimatedCounter target={stat.value} />
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-6 mt-8 border-b border-white/10 overflow-x-auto">
              {[
                { id: "overview", label: "Overview" },
                { id: "universes", label: "Universes" },
                { id: "timeline", label: "Timeline" },
                { id: "behind", label: "Behind the Scenes" },
                { id: "analytics", label: "Analytics" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 px-1 font-medium text-sm whitespace-nowrap transition-colors relative ${
                    activeTab === tab.id
                      ? "text-[#00eaff]"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00eaff] to-[#a24df6]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-16">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h2 className="font-display text-3xl font-bold text-white">About the Creator</h2>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Nova merges AI direction, human storytelling, and visual synthesis to craft surreal, emotionally charged universes. Each project is a collaboration between imagination and algorithm, pushing the boundaries of what's possible in cinematic AI.
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed">
                    With a background in film production and machine learning, Nova's work explores the intersection of consciousness, technology, and narrative.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="font-display text-3xl font-bold text-white">Quick Metrics</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-[#00eaff]">12</p>
                        <p className="text-sm text-white/60 mt-1">Active Universes</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/5 backdrop-blur-xl border-[#a24df6]/20">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-[#a24df6]">2.3M</p>
                        <p className="text-sm text-white/60 mt-1">Total Views</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-[#00eaff]">4.9</p>
                        <p className="text-sm text-white/60 mt-1">Avg Rating</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/5 backdrop-blur-xl border-[#a24df6]/20">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-[#a24df6]">Sci-Fi</p>
                        <p className="text-sm text-white/60 mt-1">Top Genre</p>
                      </CardContent>
                    </Card>
                  </div>
                  <button
                    onClick={() => setActiveTab("universes")}
                    className="w-full px-4 py-2 rounded-lg border border-[#00eaff]/40 text-[#00eaff] hover:bg-[#00eaff]/10 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    View All Universes
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="font-display text-3xl font-bold text-white">AI Tools Pipeline</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {aiTools.map((tool, idx) => (
                    <div
                      key={idx}
                      className="group bg-white/5 backdrop-blur-sm border border-[#00eaff]/20 rounded-xl p-4 hover:border-[#a24df6]/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(0,234,255,0.4)] transition-all">
                          <Sparkles className="w-5 h-5 text-[#00eaff]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{tool.name}</h3>
                          <p className="text-sm text-white/60">{tool.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Universes Tab */}
          {activeTab === "universes" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-4xl font-bold text-white">Signature Universes</h2>
                <Link to="/studio">
                  <Button className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create New Universe
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredWorks.map((work) => (
                  <Link key={work.id} to={`/universe/${work.id}`}>
                    <Card className="group bg-white/5 backdrop-blur-sm border border-[#00eaff]/20 overflow-hidden cursor-pointer hover:border-[#a24df6]/50 transition-all hover:shadow-[0_0_30px_rgba(162,77,246,0.3)] h-full">
                      <div className="relative aspect-[2/3] bg-gradient-to-br from-[#1a1a2e] to-[#0a0b1a] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00eaff]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                          <Play className="w-16 h-16 text-white/40 mb-4 group-hover:text-[#00eaff] group-hover:scale-110 transition-all" />
                          <h3 className="font-display text-2xl font-bold text-white mb-2">{work.title}</h3>
                          <Badge className="bg-[#a24df6]/20 text-[#a24df6] border border-[#a24df6]/40 mb-3">
                            {work.genre}
                          </Badge>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-white/90 text-sm italic mb-3">{work.tagline}</p>
                          <div className="flex items-center justify-between text-xs text-white/60">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-[#00eaff] fill-[#00eaff]" />
                              <span>{work.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{work.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-4xl font-bold text-white mb-6">Creator Timeline</h2>
                <Link to="/feed">
                  <Button variant="outline" className="border-[#00eaff]/40 text-[#00eaff]">
                    <Eye className="w-4 h-4 mr-2" />
                    View Community Feed
                  </Button>
                </Link>
              </div>
              <div className="space-y-6">
                {timelinePosts.map((post) => (
                  <Card
                    key={post.id}
                    className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden"
                  >
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center flex-shrink-0 border-2 border-[#00eaff]/40">
                        <span className="text-white font-bold text-lg">NR</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white">Nova Rhys</p>
                        <p className="text-white/60 text-sm">
                          {post.title} · {post.timestamp}
                        </p>
                      </div>
                    </div>

                    {post.media && (
                      <div className="relative aspect-video bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 group cursor-pointer">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-16 h-16 text-white/50 group-hover:text-white/80 transition-all group-hover:scale-110" />
                        </div>
                      </div>
                    )}

                    <div className="p-4 space-y-3">
                      <p className="text-white/90">{post.content}</p>

                      <div className="flex items-center gap-6 text-white/60 text-sm">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {(post.stats.views / 1000).toFixed(1)}K
                        </span>
                        <span>{post.stats.likes.toLocaleString()} likes</span>
                        <span>{post.stats.comments} comments</span>
                        {post.stats.remixes > 0 && <span>{post.stats.remixes} remixes</span>}
                      </div>

                      <Separator className="bg-white/10" />

                      <div className="flex items-center justify-between">
                        <Button variant="ghost" className="text-white/70 hover:text-red-400">
                          <Heart className="w-5 h-5 mr-2" />
                          Like
                        </Button>
                        <Button variant="ghost" className="text-white/70 hover:text-[#00eaff]">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Comment
                        </Button>
                        <Link to="/studio">
                          <Button variant="ghost" className="text-white/70 hover:text-[#a24df6]">
                            <Repeat2 className="w-5 h-5 mr-2" />
                            Remix
                          </Button>
                        </Link>
                        <Button variant="ghost" className="text-white/70 hover:text-white">
                          <Share2 className="w-5 h-5 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Behind the Scenes Tab */}
          {activeTab === "behind" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-4xl font-bold text-white">Inside the Studio</h2>
                <Link to="/studio">
                  <Button className="bg-gradient-to-r from-[#a24df6] to-[#00eaff] text-white">
                    <Clapperboard className="w-4 h-4 mr-2" />
                    Open Studio
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Link key={i} to="/studio">
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-[#00eaff]/10 to-[#a24df6]/10 border border-white/10 cursor-pointer hover:border-[#00eaff]/40 transition-all group relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Eye className="w-10 h-10 text-white/50 group-hover:text-white/80 transition-all" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="text-white/90 text-sm">Prompt Test #{i}: Cyber Dreamscape</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Separator className="bg-white/10" />

              <div className="space-y-6">
                <h3 className="font-display text-2xl font-bold text-white">Collaborators & Credits</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {collaborators.map((collab, i) => (
                    <Link key={i} to={`/creator/${collab.name.toLowerCase()}`}>
                      <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-[#00eaff]/40 transition-all h-full cursor-pointer">
                        <CardContent className="p-4 text-center space-y-3">
                          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center">
                            <span className="text-2xl text-white font-bold">{collab.name[0]}</span>
                          </div>
                          <div>
                            <p className="text-white font-semibold">{collab.name}</p>
                            <p className="text-white/60 text-sm">{collab.role}</p>
                            <p className="text-white/50 text-xs mt-1">{collab.universes} universes together</p>
                          </div>
                          <Button variant="outline" className="w-full border-[#00eaff]/40 text-[#00eaff] text-sm">
                            View Profile
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              <h2 className="font-display text-4xl font-bold text-white">Performance Insights</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {achievements.map((achievement, idx) => {
                  const Icon = achievement.icon;
                  return (
                    <Card
                      key={idx}
                      className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-[#00eaff]/20 hover:border-[#a24df6]/50 transition-all"
                    >
                      <CardContent className="p-8 text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 shadow-[0_0_20px_rgba(0,234,255,0.3)]">
                          <Icon className="w-8 h-8 text-[#00eaff]" />
                        </div>
                        <div>
                          <AnimatedCounter target={achievement.value} suffix={achievement.suffix} />
                          <p className="text-sm text-white/60 mt-2">{achievement.label}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-display text-xl font-bold text-white">Engagement Trends</h3>
                  <div className="h-48 flex items-end gap-2">
                    {[40, 60, 45, 75, 50, 85, 70, 90].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[#00eaff] to-[#a24df6] rounded-t transition-all hover:opacity-80 cursor-pointer"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <p className="text-white/60 text-sm text-center">Last 8 weeks</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00eaff]/20 to-[#a24df6]/20" />
          <div className="relative text-center py-16 px-6 space-y-6">
            <h2 className="font-display text-4xl font-bold text-white">
              Keep creating. Keep evolving.
            </h2>
            <p className="text-xl text-white/70">
              Your next masterpiece awaits.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                asChild
                className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white text-lg px-8 py-6"
              >
                <Link to="/dashboard">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Open Creator Dashboard
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/40 text-white text-lg px-8 py-6"
              >
                <Link to="/discover">
                  <Eye className="w-5 h-5 mr-2" />
                  Explore More Creators
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatorProfile;
