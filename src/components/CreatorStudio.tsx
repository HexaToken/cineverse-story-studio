import { Card, CardContent } from "@/components/ui/card";
import { Film, Brain, Palette, DollarSign } from "lucide-react";

const features = [
  {
    icon: Film,
    title: "Upload Script",
    description: "AI converts your screenplay into dynamic storyboards and scene visualizations."
  },
  {
    icon: Brain,
    title: "Generate Voices",
    description: "Powered by ElevenLabs for authentic character voices and emotional depth."
  },
  {
    icon: Palette,
    title: "Render Scenes",
    description: "Unreal Engine + AI generation creates photorealistic cinematic environments."
  },
  {
    icon: DollarSign,
    title: "Monetize Your Universe",
    description: "Publish your AI films and earn from your creative vision."
  }
];

const CreatorStudio = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Create Your Own Universe
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your creative vision into immersive AI-powered experiences with our suite of creator tools.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-glass border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-glow-purple"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CreatorStudio;
