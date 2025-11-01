import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Share2, Heart, Star, Eye, MessageCircle, Sparkles, Trophy, Users, Youtube, Twitter, Globe, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const CreatorProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [countersVisible, setCountersVisible] = useState(false);

  useEffect(() => {
    // Trigger counter animation on mount
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

  const communityRemixes = [
    { user: "QuantumDreamer", type: "Fan Art" },
    { user: "SynthWave", type: "Remix" },
    { user: "PixelPoet", type: "Tribute" },
    { user: "CodeMuse", type: "Analysis" }
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

      {/* Hero Section - Creator Identity */}
      <section className="relative min-h-[60vh] overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b1a] via-[#1a1a2e] to-[#10182e]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-[600px] h-[600px] bg-[#a24df6] rounded-full blur-[150px] -top-40 -right-40 animate-pulse" />
            <div className="absolute w-[600px] h-[600px] bg-[#00eaff] rounded-full blur-[150px] -bottom-40 -left-40 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        <div className="relative container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Profile Picture */}
            <div className="relative inline-block">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#00eaff] via-[#a24df6] to-[#00eaff] p-1 shadow-[0_0_60px_rgba(0,234,255,0.6)] animate-pulse">
                <div className="w-full h-full rounded-full bg-[#0a0b1a] flex items-center justify-center">
                  <span className="text-6xl font-bold bg-gradient-to-br from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
                    NR
                  </span>
                </div>
              </div>
              {/* Creator Level Badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#a24df6] to-[#00eaff] px-4 py-1 rounded-full shadow-[0_0_20px_rgba(162,77,246,0.6)]">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold text-white">Visionary</span>
                </div>
              </div>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <h1 className="font-display text-6xl font-bold text-white drop-shadow-[0_0_30px_rgba(0,234,255,0.4)]">
                Nova Rhys
              </h1>
              <p className="text-xl text-[#00eaff] font-medium">
                CineVerse Creator | AI Cinematic Storyteller
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-[#00eaff]/30 flex items-center justify-center hover:bg-[#00eaff]/20 hover:border-[#00eaff] transition-all group"
              >
                <Twitter className="w-5 h-5 text-white/60 group-hover:text-[#00eaff]" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-[#a24df6]/30 flex items-center justify-center hover:bg-[#a24df6]/20 hover:border-[#a24df6] transition-all group"
              >
                <Youtube className="w-5 h-5 text-white/60 group-hover:text-[#a24df6]" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-[#00eaff]/30 flex items-center justify-center hover:bg-[#00eaff]/20 hover:border-[#00eaff] transition-all group"
              >
                <Globe className="w-5 h-5 text-white/60 group-hover:text-[#00eaff]" />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white shadow-[0_0_30px_rgba(0,234,255,0.5)] hover:shadow-[0_0_40px_rgba(0,234,255,0.7)] h-12 px-8 text-base">
                  <Play className="w-5 h-5 mr-2" />
                  Open Studio Dashboard
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

            {/* Dynamic Counter Bar */}
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
          </div>
        </div>
      </section>

      {/* Bio & About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Left - Bio */}
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-bold text-white">About the Creator</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Nova merges AI direction, human storytelling, and visual synthesis to craft surreal, emotionally charged universes. Each project is a collaboration between imagination and algorithm, pushing the boundaries of what's possible in cinematic AI.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              With a background in film production and machine learning, Nova's work explores the intersection of consciousness, technology, and narrative—creating experiences that resonate across both digital and human audiences.
            </p>
          </div>

          {/* Right - AI Tools */}
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-bold text-white">AI Tools Pipeline</h2>
            <div className="space-y-3">
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
      </section>

      {/* Featured Work Gallery */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-4xl font-bold text-white">Signature Universes</h2>
            <Button variant="outline" className="border-[#00eaff]/40 text-[#00eaff] hover:bg-[#00eaff]/10">
              View All
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredWorks.map((work) => (
              <Card
                key={work.id}
                className="group bg-white/5 backdrop-blur-sm border border-[#00eaff]/20 overflow-hidden cursor-pointer hover:border-[#a24df6]/50 transition-all hover:shadow-[0_0_30px_rgba(162,77,246,0.3)]"
              >
                <div className="relative aspect-[2/3] bg-gradient-to-br from-[#1a1a2e] to-[#0a0b1a] overflow-hidden">
                  {/* Hover Light Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00eaff]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <Play className="w-16 h-16 text-white/40 mb-4 group-hover:text-[#00eaff] group-hover:scale-110 transition-all" />
                    <h3 className="font-display text-2xl font-bold text-white mb-2">{work.title}</h3>
                    <Badge className="bg-[#a24df6]/20 text-[#a24df6] border border-[#a24df6]/40 mb-3">
                      {work.genre}
                    </Badge>
                  </div>

                  {/* Synopsis Reveal on Hover */}
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
            ))}
          </div>
        </div>
      </section>

      {/* Behind-the-Scenes */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-white mb-8">Behind the Universes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left - Video */}
            <div className="relative aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#0a0b1a] rounded-xl overflow-hidden border border-[#a24df6]/20 shadow-[0_0_30px_rgba(162,77,246,0.15)]">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Play className="w-20 h-20 text-white/40 mb-4 cursor-pointer hover:text-[#00eaff] hover:scale-110 transition-all" />
                <p className="text-white/60">Creator Talk: The Making of Digital Horizons</p>
              </div>
              {/* Floating particles animation */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-[#00eaff] rounded-full animate-pulse"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`,
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right - Process */}
            <div className="space-y-6">
              <p className="text-lg text-white/80 leading-relaxed">
                "Every frame begins as a sentence. Using AI scene synthesis, I sculpt worlds driven by emotion, not algorithms."
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                My process starts with a narrative core—a feeling, a question, a moment of uncertainty. From there, I collaborate with AI models to visualize the impossible, letting machine learning amplify human intuition rather than replace it.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                The result is cinema that exists in the space between human imagination and artificial intelligence—stories that neither could tell alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Stats */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-white mb-8 text-center">Impact Metrics</h2>
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
        </div>
      </section>

      {/* Community Interaction */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-white mb-8">Join the Universe</h2>
          
          {/* Fan Remixes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {communityRemixes.map((remix, idx) => (
              <Card
                key={idx}
                className="group bg-white/5 backdrop-blur-sm border border-[#00eaff]/20 overflow-hidden cursor-pointer hover:border-[#a24df6]/50 transition-all"
              >
                <div className="aspect-square bg-gradient-to-br from-[#1a1a2e] to-[#0a0b1a] flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00eaff]/30 to-[#a24df6]/30 flex items-center justify-center mb-3 group-hover:shadow-[0_0_20px_rgba(0,234,255,0.4)] transition-all">
                    <Sparkles className="w-8 h-8 text-[#00eaff]" />
                  </div>
                  <p className="text-sm font-semibold text-white">@{remix.user}</p>
                  <Badge className="bg-[#a24df6]/20 text-[#a24df6] border-0 text-xs mt-2">
                    {remix.type}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Remix CTA */}
          <Card className="bg-gradient-to-r from-[#a24df6]/10 to-[#00eaff]/10 border-2 border-[#a24df6]/40 mb-8">
            <CardContent className="p-8 text-center">
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Inspired by Nova's Work?
              </h3>
              <Link to="/create">
                <Button className="bg-gradient-to-r from-[#a24df6] to-[#00eaff] text-white shadow-[0_0_30px_rgba(162,77,246,0.5)] px-8">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Remix This Universe
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Leave a Tribute */}
          <Card className="bg-white/5 backdrop-blur-sm border border-[#00eaff]/20">
            <CardContent className="p-8">
              <h3 className="font-display text-xl font-bold text-white mb-4">Leave a Tribute</h3>
              <div className="flex gap-3">
                <Textarea
                  placeholder="Share your thoughts about Nova's universes..."
                  className="flex-1 bg-[#0a0b1a]/50 border-[#00eaff]/30 text-white placeholder:text-white/40 min-h-[100px]"
                />
              </div>
              <Button className="mt-4 bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white shadow-[0_0_20px_rgba(0,234,255,0.4)]">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative overflow-hidden border-t-2 border-[#00eaff]/20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a24df6]/10 via-[#00eaff]/10 to-[#a24df6]/10">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-96 h-96 bg-[#00eaff] rounded-full blur-3xl top-1/2 left-1/4 -translate-y-1/2 animate-pulse" />
            <div className="absolute w-96 h-96 bg-[#a24df6] rounded-full blur-3xl top-1/2 right-1/4 -translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        <div className="relative container mx-auto px-4 py-20 text-center">
          <h2 className="font-display text-5xl font-bold text-white mb-4 drop-shadow-[0_0_20px_rgba(0,234,255,0.4)]">
            Create. Inspire. Evolve.
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Join the CineVerse Creator Network
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/create">
              <Button className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white shadow-[0_0_30px_rgba(0,234,255,0.5)] px-10 py-6 text-lg">
                Become a Creator →
              </Button>
            </Link>
            <Link to="/originals">
              <Button variant="outline" className="border-2 border-[#00eaff]/50 text-[#00eaff] hover:bg-[#00eaff]/10 px-10 py-6 text-lg">
                Return to Originals →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex flex-wrap justify-center gap-6 mb-6">
            <Link to="/" className="text-white/60 hover:text-[#00eaff] transition-colors">
              Home
            </Link>
            <Link to="/universe" className="text-white/60 hover:text-[#00eaff] transition-colors">
              Enter the Universe
            </Link>
            <Link to="/create" className="text-white/60 hover:text-[#00eaff] transition-colors">
              Create
            </Link>
            <a href="#" className="text-white/60 hover:text-[#00eaff] transition-colors">
              About
            </a>
            <a href="#" className="text-white/60 hover:text-[#00eaff] transition-colors">
              Discord
            </a>
          </nav>
          <p className="text-center text-sm text-white/40">
            © 2025 CineVerse Studios. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreatorProfile;
