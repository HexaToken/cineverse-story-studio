import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Info } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import story4 from "@/assets/story-4.jpg";
import story5 from "@/assets/story-5.jpg";

const genres = ["Sci-Fi", "Drama", "Romance", "Fantasy", "Noir", "Comedy", "Mystery"];

const storyRows = [
  {
    title: "AI Originals",
    stories: [
      { id: 1, title: "The Last Signal", rating: "9.2", image: story1 },
      { id: 2, title: "Echoes of Tomorrow", rating: "8.8", image: story2 },
      { id: 3, title: "Hearts of Code", rating: "9.0", image: story3 },
      { id: 4, title: "Project Mirage", rating: "8.5", image: story4 },
      { id: 5, title: "Eternal Memory", rating: "9.4", image: story5 },
    ]
  },
  {
    title: "Trending Interactive Stories",
    stories: [
      { id: 6, title: "Project Mirage", rating: "8.5", image: story4 },
      { id: 7, title: "Hearts of Code", rating: "9.0", image: story3 },
      { id: 8, title: "The Last Signal", rating: "9.2", image: story1 },
      { id: 9, title: "Eternal Memory", rating: "9.4", image: story5 },
      { id: 10, title: "Echoes of Tomorrow", rating: "8.8", image: story2 },
    ]
  },
  {
    title: "Recently Continued",
    stories: [
      { id: 11, title: "Echoes of Tomorrow", rating: "8.8", image: story2 },
      { id: 12, title: "The Last Signal", rating: "9.2", image: story1 },
      { id: 13, title: "Project Mirage", rating: "8.5", image: story4 },
      { id: 14, title: "Hearts of Code", rating: "9.0", image: story3 },
      { id: 15, title: "Eternal Memory", rating: "9.4", image: story5 },
    ]
  },
  {
    title: "New Universes This Week",
    stories: [
      { id: 16, title: "Eternal Memory", rating: "9.4", image: story5 },
      { id: 17, title: "Project Mirage", rating: "8.5", image: story4 },
      { id: 18, title: "Echoes of Tomorrow", rating: "8.8", image: story2 },
      { id: 19, title: "Hearts of Code", rating: "9.0", image: story3 },
      { id: 20, title: "The Last Signal", rating: "9.2", image: story1 },
    ]
  }
];

const Universe = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-[hsl(266,100%,4%)] to-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CINEVERSE
            </h1>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/universe" className="text-foreground hover:text-secondary transition-colors">
              Library
            </Link>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Genres
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Profile
            </button>
          </nav>
        </div>
      </header>

      {/* Animated Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ top: '15%', left: '10%' }} />
        <div className="absolute w-3 h-3 bg-accent rounded-full animate-pulse" style={{ top: '70%', right: '15%', animationDelay: '0.7s' }} />
        <div className="absolute w-2 h-2 bg-primary rounded-full animate-pulse" style={{ top: '45%', right: '40%', animationDelay: '1.4s' }} />
      </div>

      {/* Featured Story Banner */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${story1})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <h2 className="font-display text-5xl md:text-7xl font-bold">
              The Last Signal
            </h2>
            <p className="text-xl text-muted-foreground">
              A Sci-Fi Thriller That Adapts to Your Choices
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              When a lone astronaut receives an impossible transmission from deep space, 
              every decision you make alters the fabric of the story itself.
            </p>
            <div className="flex gap-4">
              <Button variant="hero" size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Play Now
              </Button>
              <Button variant="heroOutline" size="lg" className="gap-2">
                <Info className="w-5 h-5" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Genre Selector */}
      <section className="py-8 px-4 border-b border-border/20">
        <div className="container mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre === selectedGenre ? null : genre)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedGenre === genre
                    ? 'bg-primary text-primary-foreground shadow-glow-purple'
                    : 'bg-surface border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Story Rows */}
      <section className="py-12 px-4 space-y-12">
        <div className="container mx-auto space-y-12">
          {storyRows.map((row, rowIndex) => (
            <div key={rowIndex}>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-6">
                {row.title}
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                {row.stories.map((story) => (
                  <Card
                    key={story.id}
                    className="group relative min-w-[250px] md:min-w-[320px] flex-shrink-0 overflow-hidden rounded-lg bg-card/50 backdrop-blur-glass border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-glow-cyan snap-start cursor-pointer"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-secondary/50">
                        <span className="text-secondary font-semibold text-sm">★ {story.rating}</span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h4 className="font-display text-xl font-bold mb-2">{story.title}</h4>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          An AI-powered interactive experience that evolves with your choices.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="hero" size="sm">
                            Enter Story
                          </Button>
                          <Button variant="heroOutline" size="sm">
                            Preview
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-8 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <nav className="flex flex-wrap justify-center gap-6 mb-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/create" className="text-muted-foreground hover:text-foreground transition-colors">
              Create with AI
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

export default Universe;
