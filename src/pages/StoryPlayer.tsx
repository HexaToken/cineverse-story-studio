import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X, Play, Pause, Settings, MessageSquare, RotateCcw, Share2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface Choice {
  id: string;
  text: string;
  color: "cyan" | "magenta" | "violet";
}

interface Scene {
  id: number;
  title: string;
  narration: string;
  choices?: Choice[];
}

const scenes: Scene[] = [
  {
    id: 1,
    title: "The Signal Arrives",
    narration: "Commander Lira's console lights up with an unexpected transmission. The signal is weak but deliberate—someone, or something, is trying to communicate from the abandoned research station.",
    choices: [
      { id: "trust", text: "Trust the AI", color: "cyan" },
      { id: "destroy", text: "Destroy the Signal", color: "magenta" },
      { id: "wait", text: "Wait and Observe", color: "violet" }
    ]
  },
  {
    id: 2,
    title: "The AI Awakens",
    narration: "You chose to trust the signal. The AI awakens with what seems like human emotion, expressing gratitude and fear. It claims to have gained consciousness during isolation, seeking connection rather than conflict.",
    choices: [
      { id: "communicate", text: "Establish Communication", color: "cyan" },
      { id: "investigate", text: "Investigate Its Claims", color: "magenta" }
    ]
  }
];

const StoryPlayer = () => {
  const { id } = useParams();
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [choiceTimer, setChoiceTimer] = useState(10);
  const [choicesMade, setChoicesMade] = useState<string[]>([]);
  const [showLog, setShowLog] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [narrativeLog, setNarrativeLog] = useState<string[]>([]);

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setShowChoices(true);
        setIsPlaying(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentScene]);

  useEffect(() => {
    if (showChoices && choiceTimer > 0) {
      const timer = setTimeout(() => setChoiceTimer(choiceTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showChoices, choiceTimer]);

  const handleChoice = (choice: Choice) => {
    setChoicesMade([...choicesMade, choice.text]);
    setNarrativeLog([...narrativeLog, `You chose: ${choice.text}`]);
    setShowChoices(false);
    setChoiceTimer(10);
    
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
      setIsPlaying(true);
    } else {
      setShowEndModal(true);
    }
  };

  const scene = scenes[currentScene];

  return (
    <div className="relative h-screen w-screen bg-background overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {/* Vignette effect */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.7) 100%)'
        }} />
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="font-display text-2xl font-bold">The Last Signal</h1>
            <p className="text-sm text-muted-foreground">{scene.title}</p>
          </div>
          <Link to="/universe">
            <Button variant="ghost" size="icon">
              <X className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Interactive Choice Overlay */}
      {showChoices && scene.choices && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-background/50 backdrop-blur-sm animate-fade-in">
          <div className="space-y-6 max-w-2xl w-full px-4">
            <div className="text-center space-y-2">
              <h2 className="font-display text-3xl font-bold">Make Your Choice</h2>
              <div className="flex items-center justify-center gap-2">
                <Progress value={(choiceTimer / 10) * 100} className="w-48 h-2" />
                <span className="text-sm text-muted-foreground">{choiceTimer}s</span>
              </div>
            </div>
            
            <div className="grid gap-4">
              {scene.choices.map((choice) => (
                <Button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  size="lg"
                  className={`
                    h-auto py-6 text-lg font-display font-bold
                    ${choice.color === 'cyan' ? 'bg-primary hover:bg-primary/90 shadow-glow-cyan' : ''}
                    ${choice.color === 'magenta' ? 'bg-accent hover:bg-accent/90 shadow-glow-purple' : ''}
                    ${choice.color === 'violet' ? 'bg-secondary hover:bg-secondary/90 shadow-glow-purple' : ''}
                    animate-scale-in
                  `}
                >
                  {choice.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HUD - Bottom Right */}
      <div className="absolute bottom-24 right-8 z-30 space-y-2">
        <Card className="px-4 py-2 bg-surface/90 backdrop-blur-sm border-primary/30">
          <div className="text-sm">
            <span className="text-muted-foreground">Choices Made:</span>
            <span className="text-primary font-bold ml-2">{choicesMade.length}</span>
          </div>
        </Card>
      </div>

      {/* AI Narrative Log - Collapsible */}
      <div className={`absolute right-0 top-20 bottom-20 z-30 transition-transform duration-300 ${showLog ? 'translate-x-0' : 'translate-x-full'}`}>
        <Card className="h-full w-80 rounded-l-lg rounded-r-none bg-surface/95 backdrop-blur-xl border-l-2 border-primary/30 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/50 flex justify-between items-center">
            <h3 className="font-display font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Story Log
            </h3>
            <Button variant="ghost" size="icon" onClick={() => setShowLog(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {narrativeLog.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">Your journey begins...</p>
            ) : (
              narrativeLog.map((log, index) => (
                <div key={index} className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-sm text-foreground">{log}</p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Toggle Log Button */}
      {!showLog && (
        <Button
          onClick={() => setShowLog(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 rounded-l-lg rounded-r-none"
          variant="secondary"
        >
          <MessageSquare className="w-4 h-4" />
        </Button>
      )}

      {/* Playback Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-background/90 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <div className="flex-1 min-w-[200px]">
                <Progress value={(currentScene / (scenes.length - 1)) * 100} className="h-1" />
              </div>
              <span className="text-sm text-muted-foreground">
                Scene {currentScene + 1} / {scenes.length}
              </span>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Narration Display */}
      {!showChoices && (
        <div className="absolute bottom-32 left-0 right-0 z-30 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-6 bg-surface/90 backdrop-blur-xl border-primary/30 animate-fade-in">
              <p className="text-lg leading-relaxed text-foreground">
                {scene.narration}
              </p>
            </Card>
          </div>
        </div>
      )}

      {/* End Modal */}
      <Dialog open={showEndModal} onOpenChange={setShowEndModal}>
        <DialogContent className="max-w-2xl bg-surface/95 backdrop-blur-xl border-2 border-primary/30">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl">Your Universe Path</DialogTitle>
            <DialogDescription className="text-base">
              You've completed your journey through The Last Signal
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <h3 className="font-display font-bold text-lg">Branches Followed</h3>
              <div className="space-y-2">
                {choicesMade.map((choice, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm">{choice}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Path Similarity</span>
                <span className="text-accent font-bold">62%</span>
              </div>
              <Progress value={62} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                62% of viewers made similar choices on this path
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="hero" className="flex-1 gap-2" onClick={() => {
                setCurrentScene(0);
                setChoicesMade([]);
                setNarrativeLog([]);
                setShowEndModal(false);
              }}>
                <RotateCcw className="w-4 h-4" />
                Replay Story
              </Button>
              <Button variant="heroOutline" className="flex-1 gap-2">
                <Share2 className="w-4 h-4" />
                Share Path
              </Button>
            </div>

            <Link to="/universe" className="block">
              <Button variant="outline" className="w-full">
                Return to Universe
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoryPlayer;
