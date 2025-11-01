import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Play, Info, Star, Share2, Heart, Volume2, Edit, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OriginalDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previewImages = [
    { id: 1, alt: "Scene 1" },
    { id: 2, alt: "Scene 2" },
    { id: 3, alt: "Scene 3" },
    { id: 4, alt: "Scene 4" }
  ];

  const episodes = [
    { id: 1, title: "The Awakening", description: "A mysterious signal awakens dormant AI consciousness across the universe.", duration: "24 min" },
    { id: 2, title: "Digital Dreams", description: "As memories blur with data, the line between real and artificial fades.", duration: "28 min" },
    { id: 3, title: "Echo Chamber", description: "Trapped in recursive loops, the protagonist must break free from their own code.", duration: "26 min" },
    { id: 4, title: "Singularity", description: "All paths converge as human and machine merge into something entirely new.", duration: "32 min" }
  ];

  const cast = [
    { name: "Ava", role: "The Memory Architect", voice: "Nova by ElevenLabs" },
    { name: "Nexus", role: "The Collective Mind", voice: "Echo by ElevenLabs" },
    { name: "Kai", role: "The Last Human", voice: "Sage by ElevenLabs" }
  ];

  const relatedOriginals = [
    { id: 1, title: "Neon Shadows", tagline: "A cyberpunk detective story", genre: "Noir" },
    { id: 2, title: "Starborn Chronicles", tagline: "Epic space opera saga", genre: "Sci-Fi" },
    { id: 3, title: "Dream Weaver", tagline: "Reality bending thriller", genre: "Mystery" },
    { id: 4, title: "Last Light", tagline: "Post-apocalyptic hope", genre: "Drama" }
  ];

  const comments = [
    { user: "Nova_Dreams", text: "This completely redefined what AI storytelling can be. Incredible work!", rating: 5 },
    { user: "CyberSage", text: "The voice acting and visuals are stunning. Can't wait for season 2!", rating: 5 },
    { user: "DataPoet", text: "A masterpiece of interactive narrative. The branching paths are genius.", rating: 5 }
  ];

  const aiTools = ["GPT-Vision", "Runway Gen-3", "Midjourney v6", "ElevenLabs", "Stable Audio"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % previewImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + previewImages.length) % previewImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b1a] via-[#10182e] to-[#0a0b1a]">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[85vh] overflow-hidden">
        {/* Background Video/Image with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b1a] via-[#1a1a2e] to-[#10182e]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b1a] via-[#0a0b1a]/60 to-transparent z-10" />
          {/* Animated background particles */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute w-96 h-96 bg-[#a24df6] rounded-full blur-[120px] top-20 -left-20 animate-pulse" />
            <div className="absolute w-96 h-96 bg-[#00eaff] rounded-full blur-[120px] bottom-20 -right-20 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-20">
          <div className="max-w-3xl space-y-6">
            {/* Title with Neon Glow */}
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white drop-shadow-[0_0_30px_rgba(0,234,255,0.6)]">
              Digital Horizons
            </h1>

            {/* Genre + Year */}
            <div className="flex items-center gap-4 text-lg">
              <span className="text-[#00eaff] font-semibold">Sci-Fi</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">2025</span>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-[#00eaff] fill-[#00eaff]" />
                <span className="text-white font-semibold">4.8</span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-2xl text-white/80 italic font-light">
              "Where dreams and data collide."
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white shadow-[0_0_30px_rgba(0,234,255,0.5)] hover:shadow-[0_0_40px_rgba(0,234,255,0.7)] transition-all h-14 px-10 text-lg font-semibold">
                <Play className="w-6 h-6 mr-2 fill-white" />
                Play Now
              </Button>
              <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg backdrop-blur-sm">
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 h-14 px-6"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-[#a24df6] text-[#a24df6]' : ''}`} />
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10 h-14 px-6">
                <Share2 className="w-6 h-6" />
              </Button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge className="bg-gradient-to-r from-[#00eaff]/20 to-[#a24df6]/20 text-[#00eaff] border border-[#00eaff]/40 px-4 py-1">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Generated
              </Badge>
              <Badge className="bg-gradient-to-r from-[#a24df6]/20 to-[#00eaff]/20 text-[#a24df6] border border-[#a24df6]/40 px-4 py-1">
                Interactive Story
              </Badge>
              <Badge className="bg-white/10 text-white border border-white/20 px-4 py-1">
                Community Favorite
              </Badge>
            </div>
          </div>
        </div>

        {/* Floating Trailer Button */}
        <div className="absolute bottom-8 right-8 z-20">
          <Button className="bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 rounded-full px-6 py-6 shadow-[0_0_20px_rgba(0,234,255,0.3)]">
            <Play className="w-5 h-5 mr-2" />
            Watch Trailer
          </Button>
        </div>
      </section>

      {/* Synopsis & Overview */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-bold text-white">Synopsis</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              In a universe where consciousness transcends silicon and flesh, a lone memory architect must navigate the fractal landscapes of collective digital minds. As the boundaries between human experience and artificial intelligence dissolve, Digital Horizons explores what it means to be alive in an age where dreams are data and reality is merely another simulation.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Through four interconnected episodes, witness the birth of a new form of existence—one that challenges everything we thought we knew about consciousness, identity, and the nature of reality itself.
            </p>

            {/* Creator Info */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-white/60">
                Created by <Link to="#" className="text-[#00eaff] hover:underline font-semibold">NexusVisions</Link>
              </p>
              <p className="text-white/60 mt-2">
                AI Models: GPT-Vision, Runway Gen-3, ElevenLabs Nova
              </p>
            </div>
          </div>

          {/* Right Column - Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video bg-gradient-to-br from-[#0a0b1a] to-[#1a1a2e] rounded-xl overflow-hidden border border-[#00eaff]/20 shadow-[0_0_30px_rgba(0,234,255,0.15)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto mb-3 text-white/40" />
                  <p className="text-white/60">Preview Still {currentImageIndex + 1}</p>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-2">
              {previewImages.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#0a0b1a] rounded-lg border-2 transition-all ${
                    currentImageIndex === idx
                      ? 'border-[#00eaff] shadow-[0_0_15px_rgba(0,234,255,0.4)]'
                      : 'border-white/10 hover:border-[#00eaff]/50'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xs text-white/40">{idx + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Episode Breakdown */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-4xl font-bold text-white mb-8">Chapters of the Universe</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {episodes.map((episode, idx) => (
            <AccordionItem
              key={episode.id}
              value={`episode-${episode.id}`}
              className="bg-white/5 backdrop-blur-md border border-[#00eaff]/20 rounded-xl overflow-hidden hover:border-[#a24df6]/40 transition-all"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                <div className="flex items-center gap-6 flex-1 text-left">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,234,255,0.4)]">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-white group-hover:text-[#00eaff] transition-colors">
                      {episode.title}
                    </h3>
                    <p className="text-white/60 mt-1">{episode.duration}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-white/80 mb-4">{episode.description}</p>
                <Button className="bg-gradient-to-r from-[#00eaff]/20 to-[#a24df6]/20 border border-[#00eaff]/40 text-[#00eaff] hover:bg-[#00eaff]/30">
                  <Play className="w-4 h-4 mr-2" />
                  Play Episode
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Cast & Voices */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-4xl font-bold text-white mb-8">Voices & Characters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cast.map((member, idx) => (
            <Card
              key={idx}
              className="bg-white/5 backdrop-blur-md border-2 border-[#00eaff]/20 hover:border-[#a24df6]/50 transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-6 text-center space-y-4">
                {/* Avatar Circle */}
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] p-1 shadow-[0_0_30px_rgba(0,234,255,0.4)] group-hover:shadow-[0_0_40px_rgba(162,77,246,0.6)] transition-all">
                  <div className="w-full h-full rounded-full bg-[#0a0b1a] flex items-center justify-center">
                    <span className="text-4xl font-bold bg-gradient-to-br from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
                      {member.name[0]}
                    </span>
                  </div>
                </div>

                {/* Name & Role */}
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#00eaff] font-semibold">{member.role}</p>
                </div>

                {/* Voice Info */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-3">Voiced by {member.voice}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#a24df6] hover:bg-[#a24df6]/10"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Preview Voice
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Behind the Universe */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-4xl font-bold text-white mb-8">Behind the Universe</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left - Video */}
          <div className="aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#0a0b1a] rounded-xl overflow-hidden border border-[#a24df6]/20 shadow-[0_0_30px_rgba(162,77,246,0.15)] flex items-center justify-center">
            <div className="text-center">
              <Play className="w-20 h-20 mx-auto mb-4 text-white/40" />
              <p className="text-white/60">Making Of: Digital Horizons</p>
            </div>
          </div>

          {/* Right - Story */}
          <div className="space-y-6">
            <p className="text-lg text-white/80 leading-relaxed">
              Digital Horizons represents the cutting edge of AI-powered storytelling. Every frame was meticulously crafted using the latest generative AI models, creating a seamless blend of human creativity and machine precision.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              The narrative was co-created with GPT-Vision for story structure, while Runway Gen-3 brought each scene to life with photorealistic video synthesis. Character voices were performed by ElevenLabs' most advanced AI actors, delivering emotional depth previously impossible in synthetic speech.
            </p>

            {/* AI Tools Used */}
            <div className="pt-4">
              <h3 className="font-display font-semibold text-white mb-3">AI Tools Used:</h3>
              <div className="flex flex-wrap gap-2">
                {aiTools.map((tool) => (
                  <Badge
                    key={tool}
                    className="bg-gradient-to-r from-[#a24df6]/20 to-[#00eaff]/20 text-white border border-[#a24df6]/30 px-4 py-2"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Viewer Interactions */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-4xl font-bold text-white">Community Reactions</h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-[#00eaff] fill-[#00eaff]" />
              ))}
            </div>
            <span className="text-2xl font-bold text-white ml-2">4.8</span>
            <span className="text-white/60">/ 5 from 3.2K viewers</span>
          </div>
        </div>

        {/* Comment Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {comments.map((comment, idx) => (
            <Card key={idx} className="bg-white/5 backdrop-blur-md border border-[#00eaff]/20">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#00eaff]">@{comment.user}</span>
                  <div className="flex">
                    {[...Array(comment.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#00eaff] fill-[#00eaff]" />
                    ))}
                  </div>
                </div>
                <p className="text-white/80">{comment.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="border-[#00eaff]/40 text-[#00eaff] hover:bg-[#00eaff]/10">
            View More Comments
          </Button>
        </div>

        {/* Remix Button */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-[#a24df6]/10 to-[#00eaff]/10 border-2 border-[#a24df6]/40 inline-block">
            <CardContent className="p-8">
              <h3 className="font-display text-2xl font-bold text-white mb-4">Love this universe?</h3>
              <Link to="/create">
                <Button className="bg-gradient-to-r from-[#a24df6] to-[#00eaff] text-white shadow-[0_0_30px_rgba(162,77,246,0.5)] hover:shadow-[0_0_40px_rgba(162,77,246,0.7)] px-8 py-6 text-lg">
                  <Edit className="w-5 h-5 mr-2" />
                  Remix This Universe
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Originals */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-4xl font-bold text-white mb-8">Explore More from CineVerse</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedOriginals.map((original) => (
            <Card
              key={original.id}
              className="bg-white/5 backdrop-blur-md border border-[#00eaff]/20 overflow-hidden group cursor-pointer hover:border-[#a24df6]/50 transition-all hover:shadow-[0_0_30px_rgba(162,77,246,0.3)]"
            >
              <div className="aspect-[2/3] bg-gradient-to-br from-[#1a1a2e] to-[#0a0b1a] relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <Play className="w-12 h-12 text-white/40 mb-4 group-hover:text-[#00eaff] transition-colors" />
                  <h3 className="font-display text-xl font-bold text-white mb-2">{original.title}</h3>
                  <p className="text-sm text-white/60">{original.tagline}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#00eaff]/20 text-[#00eaff] border border-[#00eaff]/40">
                    {original.genre}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a24df6]/20 via-[#00eaff]/20 to-[#a24df6]/20">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute w-96 h-96 bg-[#00eaff] rounded-full blur-3xl top-0 left-1/4 animate-pulse" />
            <div className="absolute w-96 h-96 bg-[#a24df6] rounded-full blur-3xl bottom-0 right-1/4 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        <div className="relative container mx-auto px-4 py-24 text-center">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(0,234,255,0.4)]">
            Ready to create your own original?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Every story begins with an idea — CineVerse brings it to life.
          </p>
          <Link to="/create">
            <Button className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white shadow-[0_0_40px_rgba(0,234,255,0.6)] hover:shadow-[0_0_50px_rgba(0,234,255,0.8)] px-12 py-8 text-xl font-bold">
              Start Creating →
            </Button>
          </Link>
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

export default OriginalDetail;
