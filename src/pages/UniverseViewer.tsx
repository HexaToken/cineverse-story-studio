import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Play,
  Heart,
  Share2,
  Star,
  Volume2,
  Sparkles,
  Eye,
  MessageCircle,
  Shuffle,
  User,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UniverseViewer = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showEnterStory, setShowEnterStory] = useState(false);

  // Mock data - in production this would come from API
  const universe = {
    title: "Neural Dawn",
    subtitle: "Where consciousness meets the digital frontier",
    genre: "Sci-Fi",
    duration: "2h 14m",
    year: "2025",
    creator: "AetherMind",
    rating: 4.8,
    views: "1.2M",
    likes: "89K",
    synopsis: "In a neon-lit megacity where human consciousness can be uploaded to the cloud, a brilliant programmer discovers a hidden layer of reality—a digital realm where memories become tangible and thoughts can reshape existence. As she delves deeper into this Neural Dawn, she must confront the question: what does it truly mean to be human in an age where the mind can outlive the body?",
    tags: ["AI Original", "Interactive", "Immersive", "Community Favorite"],
    mood: { dark: 40, hopeful: 35, dreamlike: 25 },
  };

  const voices = [
    { name: "Ava", role: "The Dream Architect", voice: "Nova Voicepack", avatar: "gradient-cyan" },
    { name: "Marcus", role: "The Skeptic", voice: "Atlas AI", avatar: "gradient-purple" },
    { name: "Echo", role: "The Guide", voice: "Seraph Voice", avatar: "gradient-pink" },
    { name: "Dr. Chen", role: "The Scientist", voice: "Sage AI", avatar: "gradient-blue" },
  ];

  const scenes = [
    { id: 1, title: "The Awakening", thumbnail: "gradient-cyan", duration: "8:32" },
    { id: 2, title: "Digital Metropolis", thumbnail: "gradient-purple", duration: "12:15" },
    { id: 3, title: "Memory Palace", thumbnail: "gradient-pink", duration: "10:48" },
    { id: 4, title: "The Upload", thumbnail: "gradient-blue", duration: "15:22" },
    { id: 5, title: "Neural Collapse", thumbnail: "gradient-teal", duration: "9:17" },
    { id: 6, title: "Rebirth", thumbnail: "gradient-cyan", duration: "11:05" },
  ];

  const reviews = [
    { user: "DreamWeaver", rating: 5, comment: "A hauntingly beautiful dreamscape — 10/10 visuals." },
    { user: "VoidPoet", rating: 5, comment: "Mesmerizing AI storytelling at its finest." },
    { user: "CodeSage", rating: 4, comment: "Emotionally powerful and visually stunning." },
  ];

  const relatedUniverses = [
    { title: "Echo City", creator: "DreamWeaver", views: "890K" },
    { title: "Quantum Hearts", creator: "VoidPoet", views: "2.1M" },
    { title: "The Last Algorithm", creator: "CodeSage", views: "1.5M" },
  ];

  const handleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    toast({
      title: isInWatchlist ? "Removed from Watchlist" : "Added to Watchlist",
      description: isInWatchlist ? "Universe removed" : "Universe saved for later",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Share this universe with others",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b1a] to-[#10182e]">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b1a] via-transparent to-transparent" />
        
        <div className="relative h-full flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto">
          <Badge className="w-fit bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white border-0 mb-4 animate-pulse">
            AI Generated Universe
          </Badge>
          
          <h1 className="font-display text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-[0_0_30px_rgba(0,234,255,0.5)]">
            {universe.title}
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/80 mb-6 max-w-3xl">
            {universe.subtitle}
          </p>
          
          <div className="flex gap-4 text-white/70 mb-8 flex-wrap">
            <span className="flex items-center gap-2">
              <Badge className="bg-[#00eaff]/20 text-[#00eaff] border-[#00eaff]/40">
                {universe.genre}
              </Badge>
            </span>
            <span>•</span>
            <span>{universe.duration}</span>
            <span>•</span>
            <span>{universe.year}</span>
            <span>•</span>
            <Link to={`/creator/${universe.creator}`} className="hover:text-[#00eaff] transition-colors">
              by @{universe.creator}
            </Link>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <Button className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white text-lg px-8 py-6 shadow-[0_0_30px_rgba(0,234,255,0.4)]">
              <Play className="w-5 h-5 mr-2" />
              Play Now
            </Button>
            <Button
              onClick={() => setShowEnterStory(true)}
              variant="outline"
              className="border-[#a24df6]/40 text-[#a24df6] text-lg px-8 py-6"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Enter the Story
            </Button>
            <Button
              onClick={handleWatchlist}
              variant="outline"
              className={`border-white/40 text-white text-lg px-8 py-6 ${isInWatchlist ? "bg-white/10" : ""}`}
            >
              <Heart className={`w-5 h-5 mr-2 ${isInWatchlist ? "fill-red-500 text-red-500" : ""}`} />
              Watchlist
            </Button>
            <Button
              onClick={handleShare}
              variant="ghost"
              className="text-white/70 hover:text-white text-lg px-6 py-6"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Trailer & Preview */}
        <section>
          <h2 className="font-display text-4xl font-bold text-white mb-6">Official Trailer</h2>
          <div className="space-y-6">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 flex items-center justify-center border border-white/10">
              <Button className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white">
                <Play className="w-12 h-12" />
              </Button>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Scene Gallery</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-64 aspect-video rounded-lg bg-gradient-to-br from-[#00eaff]/10 to-[#a24df6]/10 border border-white/10 cursor-pointer hover:border-[#00eaff]/40 transition-all group"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white/50 group-hover:text-white/80 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Synopsis & Info */}
        <section className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-display text-4xl font-bold text-white mb-4">Synopsis</h2>
              <p className="text-white/70 text-lg leading-relaxed">{universe.synopsis}</p>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {universe.tags.map((tag) => (
                <Badge key={tag} className="bg-[#00eaff]/10 text-[#00eaff] border-[#00eaff]/30">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-3">Mood Spectrum</h3>
              <div className="space-y-2">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm text-white/60 mb-1">
                      <span>Dark</span>
                      <span>{universe.mood.dark}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#a24df6] to-[#00eaff]"
                        style={{ width: `${universe.mood.dark}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm text-white/60 mb-1">
                      <span>Hopeful</span>
                      <span>{universe.mood.hopeful}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00eaff] to-[#a24df6]"
                        style={{ width: `${universe.mood.hopeful}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm text-white/60 mb-1">
                      <span>Dreamlike</span>
                      <span>{universe.mood.dreamlike}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#a24df6] to-[#00eaff]"
                        style={{ width: `${universe.mood.dreamlike}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Creator Card */}
            <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-white font-semibold">Creator</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center">
                    <span className="text-2xl text-white font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">@{universe.creator}</p>
                    <p className="text-white/60 text-sm">42 Universes</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-[#00eaff]/40 text-[#00eaff]">
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Stats */}
            <Card className="bg-white/5 backdrop-blur-xl border-[#a24df6]/20">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-white font-semibold">Universe Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Views</span>
                    <span className="text-white font-semibold">{universe.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Likes</span>
                    <span className="text-white font-semibold">{universe.likes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-white font-semibold">{universe.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cast & Voices */}
        <section>
          <h2 className="font-display text-4xl font-bold text-white mb-6">Voices and Avatars</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {voices.map((voice) => (
              <Card
                key={voice.name}
                className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20 hover:border-[#00eaff]/40 transition-all group cursor-pointer"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 flex items-center justify-center border border-white/10 group-hover:shadow-[0_0_30px_rgba(0,234,255,0.4)] transition-all">
                    <span className="text-4xl text-white font-bold">{voice.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{voice.name}</h3>
                    <p className="text-white/60 text-sm">{voice.role}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-[#a24df6]/40 text-[#a24df6]"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Preview Voice
                  </Button>
                  <p className="text-white/50 text-xs text-center">Voiced by {voice.voice}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Scene Browser */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-4xl font-bold text-white">Explore the Universe</h2>
            <Button variant="ghost" className="text-[#00eaff]">
              Chronological Order
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenes.map((scene) => (
              <Card
                key={scene.id}
                className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-[#00eaff]/40 transition-all group cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-[#00eaff]/10 to-[#a24df6]/10 flex items-center justify-center relative">
                  <Play className="w-12 h-12 text-white/50 group-hover:text-white/80 transition-all group-hover:scale-110" />
                  <Badge className="absolute top-3 right-3 bg-black/60 text-white border-0">
                    <Clock className="w-3 h-3 mr-1" />
                    {scene.duration}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-2">{scene.title}</h3>
                  <Button variant="outline" className="w-full border-[#00eaff]/40 text-[#00eaff]">
                    <Eye className="w-4 h-4 mr-2" />
                    Enter Scene
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Hub */}
        <section>
          <h2 className="font-display text-4xl font-bold text-white mb-6">Community Reactions</h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20 text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-3xl font-bold text-white">{universe.rating}</p>
                  <p className="text-white/60 text-sm">Average Rating</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-xl border-[#a24df6]/20 text-center">
                <CardContent className="p-6">
                  <MessageCircle className="w-8 h-8 text-[#a24df6] mx-auto mb-2" />
                  <p className="text-3xl font-bold text-white">342</p>
                  <p className="text-white/60 text-sm">Comments</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20 text-center">
                <CardContent className="p-6">
                  <Shuffle className="w-8 h-8 text-[#00eaff] mx-auto mb-2" />
                  <p className="text-3xl font-bold text-white">89</p>
                  <p className="text-white/60 text-sm">Remixes</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              {reviews.map((review, i) => (
                <Card key={i} className="bg-white/5 backdrop-blur-xl border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{review.user[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-semibold">@{review.user}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-white/70">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 border-[#a24df6]/40 text-[#a24df6]"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Remix This Universe
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#00eaff]/40 text-[#00eaff]"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Discussion
              </Button>
            </div>
          </div>
        </section>

        {/* Related Universes */}
        <section>
          <h2 className="font-display text-4xl font-bold text-white mb-6">You Might Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedUniverses.map((related, i) => (
              <Card
                key={i}
                className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-[#00eaff]/40 transition-all group cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-[#00eaff]/10 to-[#a24df6]/10 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white/50 group-hover:text-white/80 transition-all group-hover:scale-110" />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-1">{related.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">by @{related.creator}</span>
                    <span className="text-white/50 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {related.views}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00eaff]/20 to-[#a24df6]/20" />
          <div className="relative text-center py-16 px-6 space-y-6">
            <h2 className="font-display text-4xl font-bold text-white">
              Ready to create your own universe?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              CineVerse makes imagination cinematic. Start building your story world today.
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
                <Link to="/discover">
                  <Eye className="w-5 h-5 mr-2" />
                  Back to Discover
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Enter Story Modal */}
      {showEnterStory && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="max-w-2xl w-full bg-[#0a0b1a] border-[#00eaff]/30">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center shadow-[0_0_40px_rgba(0,234,255,0.4)]">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="font-display text-3xl font-bold text-white">
                  Welcome to {universe.title}
                </h2>
                <p className="text-white/70 text-lg">
                  Who will you be in this universe?
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="p-6 rounded-lg border-2 border-[#00eaff]/40 bg-[#00eaff]/5 hover:bg-[#00eaff]/10 transition-all text-left">
                  <h3 className="text-white font-semibold mb-2">🔍 Explorer</h3>
                  <p className="text-white/60 text-sm">Discover the world's secrets</p>
                </button>
                <button className="p-6 rounded-lg border-2 border-[#a24df6]/40 bg-[#a24df6]/5 hover:bg-[#a24df6]/10 transition-all text-left">
                  <h3 className="text-white font-semibold mb-2">👁 Observer</h3>
                  <p className="text-white/60 text-sm">Watch events unfold</p>
                </button>
                <button className="p-6 rounded-lg border-2 border-[#00eaff]/40 bg-[#00eaff]/5 hover:bg-[#00eaff]/10 transition-all text-left">
                  <h3 className="text-white font-semibold mb-2">🎭 Character</h3>
                  <p className="text-white/60 text-sm">Become part of the story</p>
                </button>
                <button className="p-6 rounded-lg border-2 border-[#a24df6]/40 bg-[#a24df6]/5 hover:bg-[#a24df6]/10 transition-all text-left">
                  <h3 className="text-white font-semibold mb-2">🎬 Director</h3>
                  <p className="text-white/60 text-sm">Shape the narrative</p>
                </button>
              </div>
              
              <Button
                onClick={() => setShowEnterStory(false)}
                variant="outline"
                className="w-full border-white/40 text-white"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default UniverseViewer;
