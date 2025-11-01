import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Sparkles, 
  Calendar, 
  Globe, 
  Lock, 
  DollarSign, 
  Share2, 
  CheckCircle2,
  Edit,
  Wallet,
  MessageSquare,
  Shuffle,
  Clock,
  Eye,
  Copy,
  TrendingUp,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Publish = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPublished, setIsPublished] = useState(false);
  const [publishMode, setPublishMode] = useState<"public" | "invite" | "scheduled">("public");
  const [monetizationMode, setMonetizationMode] = useState<"free" | "premium" | "tip" | "remix">("free");

  const [formData, setFormData] = useState({
    title: "Neural Dawn",
    subtitle: "Where consciousness meets the digital frontier",
    description: "An AI-generated sci-fi thriller exploring the boundaries between human thought and artificial intelligence in a neon-lit megacity.",
    genre: "Sci-Fi",
    tags: ["AI Drama", "Cyberpunk", "Neo-Noir"],
    rating: "Mature",
    type: "Series",
  });

  const handlePublish = () => {
    setIsPublished(true);
    toast({
      title: "Universe Published! 🎬",
      description: "Your universe is now live on CineVerse Originals.",
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://cineverse.app/originals/neural-dawn");
    toast({
      title: "Link Copied!",
      description: "Share your universe with the world.",
    });
  };

  if (isPublished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0b1a] to-[#10182e] flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border-[#00eaff]/30">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center shadow-[0_0_40px_rgba(0,234,255,0.4)]">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-4xl font-display font-bold text-white">
              Your Universe Has Gone Live!
            </CardTitle>
            <CardDescription className="text-lg text-white/70">
              Your creation is now available on CineVerse Originals. It will appear in the main feed within 15 minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button 
                onClick={() => navigate("/dashboard")} 
                className="flex-1 bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                View Performance
              </Button>
              <Button 
                onClick={handleCopyLink}
                variant="outline" 
                className="flex-1 border-[#00eaff]/40 text-[#00eaff]"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Share Link
              </Button>
            </div>
            <Button 
              onClick={() => navigate("/studio")}
              variant="outline" 
              className="w-full border-[#a24df6]/40 text-[#a24df6]"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get AI Promotion Tips
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b1a] to-[#10182e]">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00eaff]/5 to-[#a24df6]/5" />
        <div className="relative max-w-7xl mx-auto px-6 py-12 text-center space-y-6">
          <Button
            onClick={() => navigate("/studio")}
            variant="ghost"
            className="absolute left-6 top-6 text-white/60 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Studio
          </Button>
          <h1 className="font-display text-5xl font-bold text-white">
            Your Universe is Ready for the Spotlight
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Review, refine, and release your creation to the CineVerse multiverse.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button variant="outline" className="border-[#00eaff]/40 text-[#00eaff]">
              <Play className="w-4 h-4 mr-2" />
              Preview Universe
            </Button>
            <Button variant="outline" className="border-[#a24df6]/40 text-[#a24df6]">
              <Edit className="w-4 h-4 mr-2" />
              Edit Details
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* Project Summary Card */}
        <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
          <CardContent className="p-6">
            <div className="flex gap-6">
              <div className="w-48 h-72 rounded-lg bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 flex items-center justify-center border border-white/10">
                <span className="text-white/50">Thumbnail</span>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="font-display text-3xl font-bold text-white">{formData.title}</h2>
                  <p className="text-white/70 mt-1">{formData.subtitle}</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Badge className="bg-[#00eaff]/10 text-[#00eaff] border border-[#00eaff]/30">
                    {formData.genre}
                  </Badge>
                  {formData.tags.map((tag) => (
                    <Badge key={tag} className="bg-white/5 text-white/70">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div>
                    <p className="text-white/50 text-sm">Duration</p>
                    <p className="text-white font-semibold">24:30</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Render Time</p>
                    <p className="text-white font-semibold">2.5 hours</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Last Edit</p>
                    <p className="text-white font-semibold">2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Description & Metadata */}
          <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
            <CardHeader>
              <CardTitle className="text-white font-display">Describe Your Universe</CardTitle>
              <CardDescription className="text-white/60">
                Help viewers discover your creation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white/90">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-white/5 border-[#00eaff]/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle" className="text-white/90">Subtitle / Tagline</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="bg-white/5 border-[#00eaff]/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="description" className="text-white/90">Description</Label>
                  <span className="text-sm text-white/50">{formData.description.length} characters</span>
                </div>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-white/5 border-[#00eaff]/30 text-white min-h-[120px]"
                />
              </div>
              <Button variant="outline" className="w-full border-[#a24df6]/40 text-[#a24df6]">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Assist
              </Button>
            </CardContent>
          </Card>

          {/* Monetization Setup */}
          <Card className="bg-white/5 backdrop-blur-xl border-[#a24df6]/20">
            <CardHeader>
              <CardTitle className="text-white font-display">Set Your Earnings Mode</CardTitle>
              <CardDescription className="text-white/60">
                Choose how you want to monetize
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMonetizationMode("free")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    monetizationMode === "free"
                      ? "border-[#00eaff] bg-[#00eaff]/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <Globe className="w-6 h-6 text-[#00eaff] mb-2" />
                  <p className="text-white font-semibold text-sm">Free to Watch</p>
                  <p className="text-white/50 text-xs mt-1">Community growth</p>
                </button>
                <button
                  onClick={() => setMonetizationMode("premium")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    monetizationMode === "premium"
                      ? "border-[#00eaff] bg-[#00eaff]/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <Lock className="w-6 h-6 text-[#a24df6] mb-2" />
                  <p className="text-white font-semibold text-sm">Premium Access</p>
                  <p className="text-white/50 text-xs mt-1">Unlock with CVR</p>
                </button>
                <button
                  onClick={() => setMonetizationMode("tip")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    monetizationMode === "tip"
                      ? "border-[#00eaff] bg-[#00eaff]/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <DollarSign className="w-6 h-6 text-[#00eaff] mb-2" />
                  <p className="text-white font-semibold text-sm">Tip Jar</p>
                  <p className="text-white/50 text-xs mt-1">Direct support</p>
                </button>
                <button
                  onClick={() => setMonetizationMode("remix")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    monetizationMode === "remix"
                      ? "border-[#00eaff] bg-[#00eaff]/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <Shuffle className="w-6 h-6 text-[#a24df6] mb-2" />
                  <p className="text-white font-semibold text-sm">Remix Royalties</p>
                  <p className="text-white/50 text-xs mt-1">Earn from reuse</p>
                </button>
              </div>
              <Button variant="outline" className="w-full border-[#00eaff]/40 text-[#00eaff]">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
              <div className="bg-[#00eaff]/5 border border-[#00eaff]/20 rounded-lg p-4">
                <p className="text-white/70 text-sm">Estimated Monthly Earnings</p>
                <p className="text-2xl font-bold text-[#00eaff] mt-1">$240 - $580</p>
                <p className="text-white/50 text-xs mt-1">Based on similar universes</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visibility & Launch Settings */}
        <Card className="bg-white/5 backdrop-blur-xl border-[#a24df6]/20">
          <CardHeader>
            <CardTitle className="text-white font-display">Choose How to Launch</CardTitle>
            <CardDescription className="text-white/60">
              Control your universe's visibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => setPublishMode("public")}
                className={`p-6 rounded-lg border-2 transition-all ${
                  publishMode === "public"
                    ? "border-[#00eaff] bg-[#00eaff]/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <Globe className="w-8 h-8 text-[#00eaff] mb-3 mx-auto" />
                <p className="text-white font-semibold mb-1">Public Premiere</p>
                <p className="text-white/50 text-sm">Visible to all users</p>
              </button>
              <button
                onClick={() => setPublishMode("invite")}
                className={`p-6 rounded-lg border-2 transition-all ${
                  publishMode === "invite"
                    ? "border-[#00eaff] bg-[#00eaff]/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <Lock className="w-8 h-8 text-[#a24df6] mb-3 mx-auto" />
                <p className="text-white font-semibold mb-1">Invite-Only Screening</p>
                <p className="text-white/50 text-sm">Access code required</p>
              </button>
              <button
                onClick={() => setPublishMode("scheduled")}
                className={`p-6 rounded-lg border-2 transition-all ${
                  publishMode === "scheduled"
                    ? "border-[#00eaff] bg-[#00eaff]/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <Clock className="w-8 h-8 text-[#00eaff] mb-3 mx-auto" />
                <p className="text-white font-semibold mb-1">Scheduled Release</p>
                <p className="text-white/50 text-sm">Set date & time</p>
              </button>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
                <input type="checkbox" className="w-5 h-5" defaultChecked />
                <div className="flex items-center gap-2 flex-1">
                  <MessageSquare className="w-4 h-4 text-[#00eaff]" />
                  <span className="text-white">Enable Comments & Reactions</span>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
                <input type="checkbox" className="w-5 h-5" defaultChecked />
                <div className="flex items-center gap-2 flex-1">
                  <Shuffle className="w-4 h-4 text-[#a24df6]" />
                  <span className="text-white">Allow AI Remixing</span>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
                <input type="checkbox" className="w-5 h-5" />
                <div className="flex items-center gap-2 flex-1">
                  <Share2 className="w-4 h-4 text-[#00eaff]" />
                  <span className="text-white">Share to Social Media</span>
                </div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Universe Preview Panel */}
        <Card className="bg-white/5 backdrop-blur-xl border-[#00eaff]/20">
          <CardHeader>
            <CardTitle className="text-white font-display">Final Preview</CardTitle>
            <CardDescription className="text-white/60">
              Review your universe before publishing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 flex items-center justify-center border border-white/10">
              <Button variant="outline" className="border-white/40 text-white">
                <Play className="w-6 h-6 mr-2" />
                Play Preview
              </Button>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 border-[#a24df6]/40 text-[#a24df6]">
                <Sparkles className="w-4 h-4 mr-2" />
                Run AI Quality Check
              </Button>
              <Button variant="outline" className="flex-1 border-[#00eaff]/40 text-[#00eaff]">
                <Eye className="w-4 h-4 mr-2" />
                Regenerate Thumbnail
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Publish Confirmation */}
        <Card className="bg-gradient-to-r from-[#00eaff]/10 to-[#a24df6]/10 backdrop-blur-xl border-[#00eaff]/30">
          <CardContent className="p-8 text-center space-y-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Final Step — Launch to the Multiverse
              </h3>
              <p className="text-white/60">
                Once published, your universe will appear on CineVerse Originals within 15 minutes.
              </p>
            </div>
            <label className="flex items-center justify-center gap-2 text-white/70 text-sm">
              <input type="checkbox" className="w-4 h-4" />
              I confirm I have rights to all assets and AI content.
            </label>
            <Button 
              onClick={handlePublish}
              className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white text-lg px-12 py-6 shadow-[0_0_40px_rgba(0,234,255,0.4)] hover:shadow-[0_0_60px_rgba(0,234,255,0.6)] transition-all"
            >
              <Globe className="w-5 h-5 mr-2" />
              Publish Universe
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Publish;
