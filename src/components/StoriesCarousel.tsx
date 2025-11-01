import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import story4 from "@/assets/story-4.jpg";
import story5 from "@/assets/story-5.jpg";

const stories = [
  {
    id: 1,
    title: "The Last Signal",
    genre: "Sci-Fi Thriller",
    image: story1,
    synopsis: "A lone astronaut receives an impossible transmission from deep space that could change humanity forever."
  },
  {
    id: 2,
    title: "Echoes of Tomorrow",
    genre: "Psychological Mystery",
    image: story2,
    synopsis: "When timelines fracture, a detective must navigate multiple realities to solve a murder that hasn't happened yet."
  },
  {
    id: 3,
    title: "Hearts of Code",
    genre: "Romantic AI Drama",
    image: story3,
    synopsis: "Two AI researchers fall in love while creating the world's first truly conscious artificial being."
  },
  {
    id: 4,
    title: "Project Mirage",
    genre: "Action Espionage",
    image: story4,
    synopsis: "An elite operative uncovers a conspiracy hidden within layers of holographic deception and digital warfare."
  },
  {
    id: 5,
    title: "Eternal Memory",
    genre: "Deep Narrative Sci-Fi",
    image: story5,
    synopsis: "In a future where memories can be stored, one person holds the key to humanity's forgotten past."
  }
];

const StoriesCarousel = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-12 text-center">
          Featured Stories
        </h2>

        {/* Horizontal Scrollable Carousel */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {stories.map((story) => (
            <Card 
              key={story.id} 
              className="group relative min-w-[300px] md:min-w-[400px] flex-shrink-0 overflow-hidden rounded-lg border-border/50 bg-card shadow-card transition-all duration-300 hover:scale-105 hover:shadow-glow-purple snap-start"
            >
              {/* Story Image */}
              <div className="aspect-video overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="font-display text-2xl font-bold mb-2">{story.title}</h3>
                <p className="text-accent text-sm mb-3">{story.genre}</p>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{story.synopsis}</p>
                <Button variant="hero" size="sm">
                  Enter Story
                </Button>
              </div>

              {/* Title Visible by Default */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="font-display text-xl font-bold">{story.title}</h3>
                <p className="text-accent text-sm">{story.genre}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesCarousel;
