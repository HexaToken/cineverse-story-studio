import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Upload, Mic, Clapperboard, DollarSign, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import UniverseBuilder from "@/components/UniverseBuilder";

const creatorTools = [
  {
    icon: Upload,
    title: "Upload Script",
    description: "Convert your screenplay into dynamic AI-powered storyboards and scene visualizations.",
    color: "secondary"
  },
  {
    icon: Mic,
    title: "Generate Voices",
    description: "Auto-cast AI voice actors with emotional depth powered by ElevenLabs technology.",
    color: "primary"
  },
  {
    icon: Clapperboard,
    title: "Render Scenes",
    description: "Visualize your stories with AI video generation and photorealistic environments.",
    color: "accent"
  },
  {
    icon: DollarSign,
    title: "Publish & Monetize",
    description: "Share your AI films on CineVerse and earn from viewer engagement and interactions.",
    color: "secondary"
  }
];

const workflowSteps = [
  { label: "Idea", active: true },
  { label: "Script Upload", active: false },
  { label: "AI Scene Generation", active: false },
  { label: "Voice + Music", active: false },
  { label: "Publish", active: false }
];

const Create = () => {
  const [builderOpen, setBuilderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-[hsl(266,100%,4%)] to-background">
      <Header />
      <UniverseBuilder open={builderOpen} onOpenChange={setBuilderOpen} />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            Create Your Own Universe
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Turn your ideas into living, AI-powered cinematic experiences
          </p>
          <Button 
            variant="hero" 
            size="lg" 
            className="text-lg px-10 py-7 h-auto"
            onClick={() => setBuilderOpen(true)}
          >
            Start Creating
          </Button>
        </div>
      </section>

      {/* Creator Tool Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {creatorTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden bg-card/30 backdrop-blur-glass border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow-purple"
                >
                  <CardContent className="p-8 space-y-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-transform duration-300 ${
                      tool.color === 'secondary' ? 'bg-secondary/10 shadow-glow-cyan' :
                      tool.color === 'accent' ? 'bg-accent/10 shadow-glow-magenta' :
                      'bg-primary/10 shadow-glow-purple'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        tool.color === 'secondary' ? 'text-secondary' :
                        tool.color === 'accent' ? 'text-accent' :
                        'text-primary'
                      }`} />
                    </div>
                    <h3 className="font-display text-2xl font-bold">
                      {tool.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </CardContent>

                  {/* Gradient Glow on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className={`absolute inset-0 ${
                      tool.color === 'secondary' ? 'bg-gradient-to-br from-secondary/5 via-transparent to-transparent' :
                      tool.color === 'accent' ? 'bg-gradient-to-br from-accent/5 via-transparent to-transparent' :
                      'bg-gradient-to-br from-primary/5 via-transparent to-transparent'
                    }`} />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-12 text-center">
            Your Creation Workflow
          </h2>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border/50 -translate-y-1/2 hidden md:block" />
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 relative">
              {workflowSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center group cursor-pointer">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                    step.active 
                      ? 'bg-primary shadow-glow-purple border-2 border-primary' 
                      : 'bg-surface border-2 border-border/50 group-hover:border-primary/50 group-hover:shadow-glow-purple'
                  }`}>
                    <span className={`font-display text-xl font-bold ${
                      step.active ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                  <p className={`font-display text-center transition-colors ${
                    step.active ? 'text-foreground font-semibold' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {step.label}
                  </p>
                  {index < workflowSteps.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-border mt-4 md:hidden" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Creator Stats Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-card/30 backdrop-blur-glass border-border/50 overflow-hidden">
            <CardContent className="p-8">
              <h3 className="font-display text-2xl font-bold mb-6 text-center">
                Track Your Creative Journey
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-secondary mb-2">3</p>
                  <p className="text-muted-foreground">Your Films</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">12K</p>
                  <p className="text-muted-foreground">Total Views</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-accent mb-2">$240</p>
                  <p className="text-muted-foreground">Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Join Creator Beta CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-accent/20 via-primary/20 to-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 bg-accent rounded-full blur-3xl top-10 -left-48 animate-pulse" />
          <div className="absolute w-96 h-96 bg-secondary rounded-full blur-3xl bottom-10 -right-48 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto text-center relative z-10 max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Pioneer AI-Powered Storytelling
          </h2>
          <p className="text-xl text-foreground/90 mb-10">
            Be among the first creators to shape the future of interactive cinema.
            Join our exclusive beta program and bring your visions to life.
          </p>
          <Button 
            variant="heroOutline" 
            size="lg" 
            className="text-lg px-10 py-7 h-auto shadow-glow-magenta"
            onClick={() => setBuilderOpen(true)}
          >
            Join the Beta
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-8 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <nav className="flex flex-wrap justify-center gap-6 mb-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/universe" className="text-muted-foreground hover:text-foreground transition-colors">
              Enter the Universe
            </Link>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Discord
            </a>
          </nav>
          <p className="text-center text-sm text-muted-foreground">
            © 2025 CineVerse Studios. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Create;
