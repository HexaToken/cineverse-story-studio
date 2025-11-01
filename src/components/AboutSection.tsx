import { Button } from "@/components/ui/button";
import aboutVisual from "@/assets/about-visual.jpg";

const AboutSection = () => {
  return (
    <section className="py-20 px-4 bg-surface">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Visual */}
          <div className="relative rounded-lg overflow-hidden shadow-card">
            <img 
              src={aboutVisual} 
              alt="AI Meets Cinema"
              className="w-full h-full object-cover aspect-video"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20" />
          </div>

          {/* Right: Text */}
          <div className="space-y-6">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              AI Meets Cinema
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              CineVerse fuses storytelling, gaming, and AI to create experiences that evolve with the viewer. 
              Every choice influences the next scene, making each film truly alive.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Step into narratives that adapt to your decisions, where the boundary between viewer and creator 
              dissolves into pure imagination.
            </p>
            <Button variant="hero" size="lg" className="mt-4">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
