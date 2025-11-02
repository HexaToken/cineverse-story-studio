import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Play,
  Sparkles,
  Heart,
  Search,
  TrendingUp,
  Zap,
  Star,
  Users,
  Radio,
} from "lucide-react";
import {
  CosmoButton,
  CosmoSection,
  CosmoHeading,
  CosmoGrid,
  CosmoBadge,
  SectionHeader,
  UniverseCard,
  CreatorCard,
  CosmoCard,
  CosmoCardBody,
} from "@/components/lib";

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const trendingUniverses = [
    { id: 1, title: "Neural Dawn", creator: "AetherMind", thumbnail: "gradient-cyan", genre: "Sci-Fi", views: "1.2M" },
    { id: 2, title: "Echo City", creator: "DreamWeaver", thumbnail: "gradient-purple", genre: "Neo-Noir", views: "890K" },
    { id: 3, title: "Quantum Hearts", creator: "VoidPoet", thumbnail: "gradient-pink", genre: "Romance", views: "2.1M" },
    { id: 4, title: "The Last Algorithm", creator: "CodeSage", thumbnail: "gradient-blue", genre: "Thriller", views: "1.5M" },
    { id: 5, title: "Celestial Dreams", creator: "StarForge", thumbnail: "gradient-teal", genre: "Fantasy", views: "950K" },
  ];

  const forYouUniverses = [
    { id: 1, title: "Synthetic Horizons", mood: "Hopeful", genre: "Sci-Fi" },
    { id: 2, title: "Neon Shadows", mood: "Dark", genre: "Cyberpunk" },
    { id: 3, title: "Digital Paradise", mood: "Surreal", genre: "Abstract" },
    { id: 4, title: "Memory Palace", mood: "Poetic", genre: "Drama" },
  ];

  const genres = [
    { name: "Sci-Fi Universes", icon: "🚀", count: 324 },
    { name: "AI Dramas", icon: "🧬", count: 218 },
    { name: "Romantic Simulations", icon: "💞", count: 156 },
    { name: "Dark Realities", icon: "😱", count: 189 },
    { name: "Animated Dreams", icon: "🎭", count: 267 },
    { name: "Shorts & Microstories", icon: "🪶", count: 542 },
  ];

  const liveEvents = [
    { id: 1, title: "Universe Premiere: Void Walker", viewers: 3420, status: "LIVE" },
    { id: 2, title: "Creator Q&A: Neural Networks", viewers: 1856, status: "LIVE" },
    { id: 3, title: "Cosmic Symphony Launch", viewers: 892, status: "Starting in 15m" },
  ];

  const creators = [
    { name: "AetherMind", universes: 42, specialty: "Sci-Fi & Cyberpunk" },
    { name: "DreamWeaver", universes: 38, specialty: "Fantasy & Dreams" },
    { name: "VoidPoet", universes: 29, specialty: "Romance & Poetry" },
    { name: "CodeSage", universes: 51, specialty: "Thriller & Mystery" },
  ];

  const communityPicks = [
    { title: "Echoes of Tomorrow", rating: 4.9, views: "2.3M", quote: "A hauntingly beautiful dreamscape — 10/10 visuals." },
    { title: "The Binary Garden", rating: 4.8, views: "1.8M", quote: "Mesmerizing AI storytelling at its finest." },
    { title: "Last Light", rating: 4.7, views: "1.5M", quote: "Emotionally powerful and visually stunning." },
  ];

  const originals = [
    { title: "CineVerse Chronicles: Season 1", episodes: 8 },
    { title: "The AI Awakening", episodes: 6 },
    { title: "Digital Genesis", episodes: 10 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b1a] to-[#10182e]">
      <Header />

      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00eaff]/10 via-[#a24df6]/10 to-[#00eaff]/10 animate-pulse" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,234,255,0.1),transparent_50%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center space-y-8">
          <h1 className="font-display text-6xl md:text-7xl font-bold text-white leading-tight">
            Explore Infinite AI-Driven Worlds
          </h1>
          <p className="text-2xl text-white/70 max-w-3xl mx-auto">
            Discover, Watch, and Co-Create universes powered by imagination.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search universes, genres, or creators…"
                className="pl-12 h-14 bg-white/5 backdrop-blur-xl border-[#00eaff]/30 text-white text-lg"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <CosmoButton
              asChild
              cosmicVariant="primary"
              size="lg"
              className="text-lg"
            >
              <Link to="/originals">
                <Play className="w-5 h-5 mr-2" />
                Watch Originals
              </Link>
            </CosmoButton>
            <CosmoButton
              asChild
              cosmicVariant="outline"
              size="lg"
              className="text-lg"
            >
              <Link to="/create">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Creating
              </Link>
            </CosmoButton>
            <CosmoButton
              cosmicVariant="secondary"
              size="lg"
              className="text-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              AI Surprise Me
            </CosmoButton>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Trending Now */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-[#00eaff]" />
            <CosmoHeading size="lg" level="h2">Trending Now</CosmoHeading>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {trendingUniverses.map((universe) => (
              <div key={universe.id} className="flex-shrink-0 w-80">
                <UniverseCard
                  id={universe.id}
                  title={universe.title}
                  creator={universe.creator}
                  thumbnail={universe.thumbnail as any}
                  genre={universe.genre}
                  views={universe.views}
                  href={`/universe/${universe.id}`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* For You */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-[#a24df6]" />
            <CosmoHeading size="lg" level="h2">Tailored by CineVerse AI</CosmoHeading>
          </div>
          <CosmoGrid columns={4}>
            {forYouUniverses.map((universe) => (
              <CosmoCard key={universe.id} variant="interactive" className="overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-[#a24df6]/20 to-[#00eaff]/20 flex items-center justify-center relative">
                  <Play className="w-12 h-12 text-white/50 group-hover:text-white/80 transition-all group-hover:scale-110" />
                  <button className="absolute top-2 right-2 text-white/60 hover:text-[#ff006e] transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <CosmoCardBody className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-white">{universe.title}</h3>
                  <div className="flex gap-2">
                    <CosmoBadge variant="purple" size="sm">
                      {universe.genre}
                    </CosmoBadge>
                    <CosmoBadge variant="default" size="sm">
                      {universe.mood}
                    </CosmoBadge>
                  </div>
                </CosmoCardBody>
              </CosmoCard>
            ))}
          </CosmoGrid>
        </section>

        {/* Genre Rows */}
        {genres.map((genre) => (
          <section key={genre.name}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{genre.icon}</span>
                <CosmoHeading size="lg" level="h2">{genre.name}</CosmoHeading>
                <CosmoBadge variant="default">{genre.count}</CosmoBadge>
              </div>
              <CosmoButton cosmicVariant="ghost" size="sm">
                View All →
              </CosmoButton>
            </div>
            <CosmoGrid columns={4} gap="md">
              {[1, 2, 3, 4, 5].map((i) => (
                <CosmoCard key={i} variant="subtle" className="group">
                  <div className="aspect-video bg-gradient-to-br from-[#00eaff]/10 to-[#a24df6]/10 flex items-center justify-center relative">
                    <Play className="w-10 h-10 text-white/40 group-hover:text-white/80 transition-all group-hover:scale-110" />
                  </div>
                  <CosmoCardBody className="space-y-1">
                    <p className="text-white font-semibold text-sm">Universe {i}</p>
                    <p className="text-white/50 text-xs">by Creator</p>
                  </CosmoCardBody>
                </CosmoCard>
              ))}
            </CosmoGrid>
          </section>
        ))}

        {/* Live & Interactive */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Radio className="w-6 h-6 text-red-500 animate-pulse" />
            <CosmoHeading size="lg" level="h2">Now Live in the CineVerse</CosmoHeading>
          </div>
          <CosmoGrid columns={3}>
            {liveEvents.map((event) => (
              <CosmoCard
                key={event.id}
                variant="default"
                className="border-red-500/30 hover:border-red-500/50"
              >
                <CosmoCardBody className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CosmoBadge variant="error" size="sm">
                      {event.status}
                    </CosmoBadge>
                    <div className="flex items-center gap-2 text-white/70">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{event.viewers.toLocaleString()}</span>
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{event.title}</h3>
                  <CosmoButton cosmicVariant="accent" className="w-full">
                    {event.status === "LIVE" ? "Join Now" : "Set Reminder"}
                  </CosmoButton>
                </CosmoCardBody>
              </CosmoCard>
            ))}
          </CosmoGrid>
        </section>

        {/* Creator Spotlights */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-[#a24df6]" />
            <CosmoHeading size="lg" level="h2">Visionaries of the CineVerse</CosmoHeading>
          </div>
          <CosmoGrid columns={4}>
            {creators.map((creator, idx) => (
              <CreatorCard
                key={creator.name}
                id={idx}
                name={creator.name}
                universes={creator.universes}
                specialty={creator.specialty}
                followers={Math.floor(Math.random() * 100000)}
                href={`/creator/${creator.name}`}
              />
            ))}
          </CosmoGrid>
        </section>

        {/* Community Picks */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-6 h-6 text-yellow-500" />
            <CosmoHeading size="lg" level="h2">Fan-Favorite Universes</CosmoHeading>
          </div>
          <CosmoGrid columns={3}>
            {communityPicks.map((pick, i) => (
              <CosmoCard
                key={i}
                variant="default"
                className="border-yellow-500/20 hover:border-yellow-500/40 flex flex-col"
              >
                <div className="aspect-video bg-gradient-to-br from-yellow-500/10 to-[#a24df6]/10 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white/50" />
                </div>
                <CosmoCardBody className="flex-1 space-y-3">
                  <h3 className="font-display text-lg font-bold text-white">{pick.title}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                      <span className="text-white/70 text-sm ml-2">{pick.rating}</span>
                    </div>
                    <span className="text-white/50 text-sm">{pick.views} views</span>
                  </div>
                  <blockquote className="text-white/60 text-sm italic border-l-2 border-yellow-500/40 pl-3">
                    "{pick.quote}"
                  </blockquote>
                </CosmoCardBody>
              </CosmoCard>
            ))}
          </CosmoGrid>
        </section>

        {/* CineVerse Originals */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white">CineVerse Originals</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {originals.map((original, i) => (
              <Card
                key={i}
                className="bg-white/5 backdrop-blur-xl border-[#00eaff]/30 hover:border-[#00eaff]/50 transition-all group cursor-pointer"
              >
                <div className="relative">
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white border-0 z-10">
                    ORIGINAL
                  </Badge>
                  <div className="aspect-video bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white/50 group-hover:text-white/80 transition-all group-hover:scale-110" />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="font-display text-xl font-bold text-white">{original.title}</h3>
                    <p className="text-white/60">{original.episodes} Episodes</p>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white">
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </Button>
                      <Button variant="outline" className="flex-1 border-white/20 text-white">
                        Info
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00eaff]/20 to-[#a24df6]/20" />
          <div className="relative text-center py-16 px-6 space-y-6">
            <h2 className="font-display text-4xl font-bold text-white">
              Your imagination deserves the big screen
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Start your own universe today and join thousands of creators shaping the future of storytelling.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                asChild
                className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white text-lg px-8 py-6"
              >
                <Link to="/create">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create with AI
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/40 text-white text-lg px-8 py-6"
              >
                <Link to="/dashboard">
                  <Play className="w-5 h-5 mr-2" />
                  Join CineVerse as Creator
                </Link>
              </Button>
            </div>
            <p className="text-white/40 text-sm pt-4">
              Powered by CineVerse AI Engine • 2025
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Discover;
