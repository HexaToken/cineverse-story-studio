import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  MessageCircle,
  Share2,
  Repeat2,
  Search,
  Bell,
  User,
  Plus,
  Play,
  TrendingUp,
  Clock,
  Sparkles,
  Eye,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Feed = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"feed" | "trending" | "following" | "clips" | "discussions">("feed");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showRemixModal, setShowRemixModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  const posts = [
    {
      id: 1,
      creator: { name: "AetherMind", handle: "aethermind", avatar: "A" },
      action: "Created a new scene in Neural Dawn",
      timestamp: "3h ago",
      media: { type: "video", thumbnail: "gradient-cyan" },
      caption: "The moment consciousness transcends reality 🌌 #SciFi #AIOriginal #CineVerseShort",
      aiOrigin: "Runway Gen-3",
      stats: { likes: 2840, comments: 142, remixes: 89, views: 15200 },
      trending: true,
      liked: false,
    },
    {
      id: 2,
      creator: { name: "DreamWeaver", handle: "dreamweaver", avatar: "D" },
      action: "Reacted to Echo City",
      timestamp: "5h ago",
      media: { type: "image", thumbnail: "gradient-purple" },
      caption: "Neo-noir perfection. The lighting in this universe is absolutely stunning ✨ #NeoNoir #CineVerse",
      aiOrigin: "Midjourney v6",
      stats: { likes: 1920, comments: 78, remixes: 34, views: 9800 },
      trending: false,
      liked: true,
    },
    {
      id: 3,
      creator: { name: "VoidPoet", handle: "voidpoet", avatar: "V" },
      action: "Created a new universe",
      timestamp: "8h ago",
      media: { type: "video", thumbnail: "gradient-pink" },
      caption: "Love in the digital age 💖 Exploring connection in virtual spaces #Romance #AIFilm",
      aiOrigin: "Kaiber AI",
      stats: { likes: 3240, comments: 201, remixes: 156, views: 21500 },
      trending: true,
      liked: false,
    },
  ];

  const topCreators = [
    { name: "AetherMind", universes: 42, followers: "12.4K" },
    { name: "DreamWeaver", universes: 38, followers: "9.8K" },
    { name: "VoidPoet", universes: 29, followers: "8.2K" },
  ];

  const hotUniverses = [
    { title: "Neural Dawn", views: "1.2M" },
    { title: "Echo City", views: "890K" },
    { title: "Quantum Hearts", views: "2.1M" },
  ];

  const handleLike = (postId: number) => {
    toast({
      title: "Liked!",
      description: "Post added to your favorites",
    });
  };

  const handleRemix = (postId: number) => {
    setSelectedPost(postId);
    setShowRemixModal(true);
  };

  const toggleComments = (postId: number) => {
    if (expandedComments.includes(postId)) {
      setExpandedComments(expandedComments.filter(id => id !== postId));
    } else {
      setExpandedComments([...expandedComments, postId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b1a] to-[#10182e]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0b1a]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold">
                <span className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
                  CINEVERSE
                </span>
              </h1>
            </Link>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <Input
                  placeholder="Search universes, creators..."
                  className="pl-10 bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowCreatePost(true)}
                className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Post
              </Button>
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-6 mt-4 overflow-x-auto">
            {["feed", "trending", "following", "clips", "discussions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 px-1 font-medium text-sm whitespace-nowrap transition-colors relative ${
                  activeTab === tab
                    ? "text-[#00eaff]"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00eaff] to-[#a24df6]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Main Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center flex-shrink-0 border-2 border-[#00eaff]/40">
                    <span className="text-white font-bold text-lg">{post.creator.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/creator/${post.creator.handle}`} className="font-semibold text-white hover:text-[#00eaff] transition-colors">
                      {post.creator.name}
                    </Link>
                    <p className="text-white/60 text-sm truncate">
                      {post.action} · {post.timestamp}
                    </p>
                  </div>
                  {post.trending && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/40 animate-pulse">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>

                {/* Media */}
                <div className="relative aspect-video bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 group cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white/50 group-hover:text-white/80 transition-all group-hover:scale-110" />
                  </div>
                  <Badge className="absolute top-3 right-3 bg-black/60 text-white border-0">
                    {post.aiOrigin}
                  </Badge>
                </div>

                {/* Caption */}
                <div className="p-4 space-y-3">
                  <p className="text-white/90">{post.caption}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-white/60 text-sm">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {(post.stats.views / 1000).toFixed(1)}K
                    </span>
                    <span>{post.stats.likes.toLocaleString()} likes</span>
                    <span>{post.stats.comments} comments</span>
                    <span>{post.stats.remixes} remixes</span>
                  </div>

                  <Separator className="bg-white/10" />

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <Button
                      onClick={() => handleLike(post.id)}
                      variant="ghost"
                      className={`text-white/70 hover:text-red-400 ${post.liked ? "text-red-400" : ""}`}
                    >
                      <Heart className={`w-5 h-5 mr-2 ${post.liked ? "fill-red-400" : ""}`} />
                      Like
                    </Button>
                    <Button
                      onClick={() => toggleComments(post.id)}
                      variant="ghost"
                      className="text-white/70 hover:text-[#00eaff]"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Comment
                    </Button>
                    <Button
                      onClick={() => handleRemix(post.id)}
                      variant="ghost"
                      className="text-white/70 hover:text-[#a24df6]"
                    >
                      <Repeat2 className="w-5 h-5 mr-2" />
                      Remix
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white/70 hover:text-white"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Share
                    </Button>
                  </div>

                  {/* Comments Section */}
                  {expandedComments.includes(post.id) && (
                    <div className="pt-4 space-y-4 border-t border-white/10">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">U</span>
                        </div>
                        <div className="flex-1">
                          <Input
                            placeholder="Add a comment..."
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                        <Button size="icon" className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Sample Comments */}
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a24df6] to-[#00eaff] flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">C</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-white/90 text-sm">
                              <span className="font-semibold">@creator</span> This is absolutely stunning! The atmosphere is incredible 🔥
                            </p>
                            <div className="flex gap-3 mt-1 text-white/50 text-xs">
                              <button className="hover:text-white">Like</button>
                              <button className="hover:text-white">Reply</button>
                              <span>2h ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}

            {/* Load More */}
            <div className="text-center py-8">
              <Button variant="outline" className="border-[#00eaff]/40 text-[#00eaff]">
                Load More Posts
              </Button>
            </div>
          </div>

          {/* Side Panel (Desktop) */}
          <div className="hidden lg:block space-y-6">
            {/* Top Creators */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display text-lg font-bold text-white">Top Creators This Week</h3>
                <div className="space-y-3">
                  {topCreators.map((creator, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center">
                        <span className="text-white font-bold">{creator.name[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{creator.name}</p>
                        <p className="text-white/60 text-xs">{creator.universes} universes · {creator.followers}</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-[#00eaff]/40 text-[#00eaff] text-xs">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hot Universes */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display text-lg font-bold text-white">Hot Universes</h3>
                <div className="space-y-3">
                  {hotUniverses.map((universe, i) => (
                    <Link
                      key={i}
                      to="/universe/1"
                      className="block group"
                    >
                      <div className="aspect-video rounded-lg bg-gradient-to-br from-[#00eaff]/10 to-[#a24df6]/10 mb-2 flex items-center justify-center border border-white/10 group-hover:border-[#00eaff]/40 transition-all">
                        <Play className="w-8 h-8 text-white/50 group-hover:text-white/80 transition-all" />
                      </div>
                      <p className="text-white font-semibold text-sm">{universe.title}</p>
                      <p className="text-white/60 text-xs">{universe.views} views</p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Events */}
            <Card className="bg-white/5 backdrop-blur-xl border-red-500/20">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Live Events
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <p className="text-white text-sm font-semibold">Universe Premiere</p>
                    <p className="text-white/60 text-xs">Starting in 15 minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full bg-[#0a0b1a] border-[#00eaff]/30">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-white">Share to CineVerse Feed</h2>
                <Button
                  onClick={() => setShowCreatePost(false)}
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="aspect-video rounded-lg bg-gradient-to-br from-[#00eaff]/10 to-[#a24df6]/10 border-2 border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:border-[#00eaff]/40 transition-all">
                <div className="text-center">
                  <Plus className="w-12 h-12 text-white/50 mx-auto mb-2" />
                  <p className="text-white/60">Upload or select AI clip</p>
                </div>
              </div>

              <Textarea
                placeholder="Write a caption... (220 characters max)"
                className="bg-white/5 border-white/10 text-white resize-none"
                rows={3}
              />

              <Input
                placeholder="Tag a universe (optional)"
                className="bg-white/5 border-white/10 text-white"
              />

              <div className="flex items-center justify-between">
                <Button variant="outline" className="border-[#a24df6]/40 text-[#a24df6]">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Caption Generator
                </Button>
                <Button className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white">
                  Post Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Remix Modal */}
      {showRemixModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full bg-[#0a0b1a] border-[#a24df6]/30">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-white">Remix This Universe</h2>
                <Button
                  onClick={() => setShowRemixModal(false)}
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="aspect-video rounded-lg bg-gradient-to-br from-[#a24df6]/20 to-[#00eaff]/20 flex items-center justify-center border border-white/10">
                <Play className="w-16 h-16 text-white/50" />
              </div>

              <div className="text-center">
                <p className="text-white/70 mb-4">Every viewer can become a co-creator</p>
              </div>

              <Textarea
                placeholder="Describe your twist or continuation..."
                className="bg-white/5 border-white/10 text-white resize-none"
                rows={4}
              />

              <div className="grid grid-cols-3 gap-3">
                <button className="p-4 rounded-lg border-2 border-[#00eaff]/40 bg-[#00eaff]/5 hover:bg-[#00eaff]/10 transition-all text-center">
                  <Sparkles className="w-6 h-6 text-[#00eaff] mx-auto mb-2" />
                  <p className="text-white text-sm font-semibold">Generate AI Scene</p>
                </button>
                <button className="p-4 rounded-lg border-2 border-[#a24df6]/40 bg-[#a24df6]/5 hover:bg-[#a24df6]/10 transition-all text-center">
                  <MessageCircle className="w-6 h-6 text-[#a24df6] mx-auto mb-2" />
                  <p className="text-white text-sm font-semibold">Add Voice</p>
                </button>
                <button className="p-4 rounded-lg border-2 border-[#00eaff]/40 bg-[#00eaff]/5 hover:bg-[#00eaff]/10 transition-all text-center">
                  <Repeat2 className="w-6 h-6 text-[#00eaff] mx-auto mb-2" />
                  <p className="text-white text-sm font-semibold">Merge Universe</p>
                </button>
              </div>

              <Button className="w-full bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white">
                Create Remix
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer CTA */}
      <section className="mt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00eaff]/10 to-[#a24df6]/10" />
        <div className="relative max-w-4xl mx-auto text-center py-16 px-6 space-y-6">
          <h2 className="font-display text-4xl font-bold text-white">
            CineVerse isn't just for watching
          </h2>
          <p className="text-xl text-white/70">
            It's for creating, reacting, and belonging.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              asChild
              variant="outline"
              className="border-white/40 text-white text-lg px-8 py-6"
            >
              <Link to="/discover">
                <Eye className="w-5 h-5 mr-2" />
                Return to Discover Feed
              </Link>
            </Button>
            <Button
              onClick={() => setShowCreatePost(true)}
              className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white text-lg px-8 py-6"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Your Own Post
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feed;
