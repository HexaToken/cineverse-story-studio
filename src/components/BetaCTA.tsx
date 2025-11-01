import { Button } from "@/components/ui/button";

const BetaCTA = () => {
  return (
    <section className="py-32 px-4 bg-gradient-to-r from-primary via-accent/50 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-64 h-64 bg-secondary rounded-full blur-3xl top-10 -left-32 animate-pulse" />
        <div className="absolute w-96 h-96 bg-accent rounded-full blur-3xl bottom-10 -right-48 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          "The future of film isn't written —<br className="hidden md:block" /> it's generated."
        </blockquote>
        <p className="text-lg md:text-xl text-foreground/90 mb-12 max-w-3xl mx-auto">
          Join the creators shaping the next cinematic frontier. Be part of the revolution where stories come alive through AI.
        </p>
        <Button variant="hero" size="lg" className="text-lg px-10 py-7 h-auto shadow-glow-cyan">
          Join the Beta
        </Button>
      </div>
    </section>
  );
};

export default BetaCTA;
