import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, ArrowLeft, Clock, Users, GitBranch } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Mock data - would come from API in production
const storyData = {
  title: "The Last Signal",
  genre: "Sci-Fi Thriller",
  duration: "45 min",
  branches: 12,
  synopsis: "In the depths of space, Commander Lira receives a mysterious signal from an abandoned research station. What begins as a rescue mission becomes a philosophical journey exploring trust, consciousness, and what it means to be human when the only companion is an awakening AI.",
  aiInsight: "This universe explores trust between human and machine under cosmic isolation. Every choice you make reshapes the relationship between Commander Lira and the AI entity, leading to dramatically different conclusions about consciousness and connection.",
  characters: [
    { id: 1, name: "Commander Lira", role: "Skeptical scientist", image: "/placeholder.svg" },
    { id: 2, name: "ARIA", role: "Awakening AI", image: "/placeholder.svg" },
    { id: 3, name: "Dr. Chen", role: "Missing researcher", image: "/placeholder.svg" },
    { id: 4, name: "Captain Vale", role: "Mission commander", image: "/placeholder.svg" }
  ],
  viewerStats: [
    { choice: "Trust the signal", percentage: 62 },
    { choice: "Destroy the signal", percentage: 28 },
    { choice: "Wait and observe", percentage: 10 }
  ]
};

const StoryPreview = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Trailer */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center" />
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <Link to="/universe" className="absolute top-8 left-8">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Universe
            </Button>
          </Link>

          <div className="max-w-3xl space-y-6 animate-fade-in">
            <div className="flex gap-3 flex-wrap">
              <Badge variant="outline" className="border-primary text-primary">
                {storyData.genre}
              </Badge>
              <Badge variant="outline" className="border-accent text-accent flex gap-2">
                <Clock className="w-3 h-3" />
                {storyData.duration}
              </Badge>
              <Badge variant="outline" className="border-secondary text-secondary flex gap-2">
                <GitBranch className="w-3 h-3" />
                {storyData.branches} branches
              </Badge>
            </div>

            <h1 className="font-display text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {storyData.title}
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              An AI-powered interactive experience that evolves with your choices.
            </p>

            <div className="flex gap-4 pt-4">
              <Link to={`/story/${id || '1'}`}>
                <Button variant="hero" size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  Enter Story
                </Button>
              </Link>
              <Button variant="heroOutline" size="lg">
                Watch Trailer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Synopsis & AI Insight */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold">Story Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed">
              {storyData.synopsis}
            </p>
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 shadow-glow-cyan">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <h3 className="font-display text-xl font-bold text-primary">AI Insight</h3>
              </div>
              <p className="text-foreground/90 italic leading-relaxed">
                "{storyData.aiInsight}"
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Character Gallery */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <h2 className="font-display text-3xl font-bold mb-8">Meet the Characters</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {storyData.characters.map((character) => (
            <Card
              key={character.id}
              className="min-w-[280px] snap-start group hover:shadow-glow-purple transition-all duration-300"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-display text-xl font-bold">{character.name}</h3>
                <p className="text-sm text-muted-foreground">{character.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Viewer Choice Stats */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-2 justify-center">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl font-bold">How Others Chose</h2>
          </div>
          <p className="text-center text-muted-foreground mb-8">
            See the paths taken by other viewers in critical moments
          </p>
          
          <div className="space-y-6">
            {storyData.viewerStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{stat.choice}</span>
                  <span className="text-primary font-bold">{stat.percentage}%</span>
                </div>
                <Progress value={stat.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="font-display text-4xl font-bold">
            Ready to shape your version of the story?
          </h2>
          <p className="text-muted-foreground text-lg">
            Every choice creates a unique narrative path. Your decisions will define the fate of Commander Lira and the awakening AI.
          </p>
          <Link to={`/story/${id || '1'}`}>
            <Button variant="hero" size="lg" className="gap-2">
              Enter Story
              <Play className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StoryPreview;
