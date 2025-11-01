import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import CreatorWizard from "@/components/CreatorWizard";

const Hero = () => {
  const [wizardOpen, setWizardOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase mb-6 tracking-tight">
          CineVerse
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-display mb-4 text-foreground/90">
          The Interactive, AI-Driven Entertainment Universe
        </p>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Where audiences don't just watch — they shape the story.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/universe">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
              Enter the Universe
            </Button>
          </Link>
          <Button 
            variant="heroOutline" 
            size="lg" 
            className="text-lg px-8 py-6 h-auto"
            onClick={() => setWizardOpen(true)}
          >
            Create with AI
          </Button>
        </div>
      </div>

      {/* Creator Wizard Modal */}
      <CreatorWizard open={wizardOpen} onOpenChange={setWizardOpen} />

      {/* Animated particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-2 h-2 bg-secondary rounded-full opacity-60 animate-pulse" style={{ top: '20%', left: '15%' }} />
        <div className="absolute w-3 h-3 bg-accent rounded-full opacity-40 animate-pulse" style={{ top: '60%', right: '20%', animationDelay: '0.5s' }} />
        <div className="absolute w-2 h-2 bg-primary rounded-full opacity-50 animate-pulse" style={{ top: '40%', right: '30%', animationDelay: '1s' }} />
      </div>
    </section>
  );
};

export default Hero;
