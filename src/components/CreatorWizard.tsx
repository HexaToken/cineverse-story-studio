import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Upload, Sparkles, Play, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CreatorWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreatorWizard = ({ open, onOpenChange }: CreatorWizardProps) => {
  const [step, setStep] = useState(1);
  const [storyIdea, setStoryIdea] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const progress = (step / 3) * 100;

  const tones = ["Epic", "Intimate", "Suspenseful", "Comedic"];
  const visualStyles = ["Cinematic", "Anime", "Stylized 3D", "Realistic"];

  const handleNext = () => {
    if (step < 3) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setStep(step + 1);
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetWizard = () => {
    setStep(1);
    setStoryIdea("");
    setSelectedTone("");
    setSelectedStyle("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-surface/95 backdrop-blur-xl border-2 border-primary/30 shadow-glow-purple">
        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex justify-between items-center gap-4">
            {[
              { num: 1, label: "Upload Script" },
              { num: 2, label: "Generate Voices & Visuals" },
              { num: 3, label: "Preview Scene" }
            ].map(({ num, label }) => (
              <div key={num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    step >= num 
                      ? 'bg-primary border-primary shadow-glow-purple' 
                      : 'bg-surface border-border/50'
                  }`}>
                    {step > num ? (
                      <Check className="w-6 h-6 text-primary-foreground" />
                    ) : (
                      <span className={`font-display font-bold ${step >= num ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                        {num}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs mt-2 text-center font-medium transition-colors ${
                    step >= num ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {label}
                  </span>
                </div>
                {num < 3 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                    step > num ? 'bg-primary shadow-glow-cyan' : 'bg-border/50'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="h-1 bg-surface shadow-glow-cyan" />

          {/* Step Content */}
          <div className="min-h-[400px]">
            {/* Step 1: Upload or Describe Script */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center space-y-2">
                  <Upload className="w-12 h-12 mx-auto text-secondary" />
                  <h2 className="font-display text-3xl font-bold">Upload or Describe Script</h2>
                  <p className="text-muted-foreground">Start your AI story journey</p>
                </div>

                <Card className="bg-card/30 backdrop-blur-glass border-border/50">
                  <CardContent className="p-6 space-y-4">
                    <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-secondary/50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drop .txt, .pdf, or .docx file here or click to browse
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border/50" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-surface px-2 text-muted-foreground">Or</span>
                      </div>
                    </div>

                    <Textarea
                      placeholder="Describe your story idea in 2–3 sentences..."
                      value={storyIdea}
                      onChange={(e) => setStoryIdea(e.target.value)}
                      className="min-h-[150px] bg-background/50 border-border/50 focus:border-secondary"
                    />
                  </CardContent>
                </Card>

                {isGenerating && (
                  <p className="text-center text-secondary animate-pulse">
                    Generating story structure...
                  </p>
                )}
              </div>
            )}

            {/* Step 2: Generate Voices & Visuals */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center space-y-2">
                  <Sparkles className="w-12 h-12 mx-auto text-accent" />
                  <h2 className="font-display text-3xl font-bold">Generate Voices & Visuals</h2>
                  <p className="text-muted-foreground">Choose your creative style</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="font-display font-semibold">Choose Tone</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {tones.map((tone) => (
                        <button
                          key={tone}
                          onClick={() => setSelectedTone(tone)}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            selectedTone === tone
                              ? 'bg-secondary/20 border-secondary shadow-glow-cyan'
                              : 'bg-card/30 border-border/50 hover:border-secondary/50'
                          }`}
                        >
                          <span className="font-display font-semibold">{tone}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="font-display font-semibold">Visual Style</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {visualStyles.map((style) => (
                        <button
                          key={style}
                          onClick={() => setSelectedStyle(style)}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            selectedStyle === style
                              ? 'bg-accent/20 border-accent shadow-glow-magenta'
                              : 'bg-card/30 border-border/50 hover:border-accent/50'
                          }`}
                        >
                          <span className="font-display font-semibold">{style}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {isGenerating && (
                  <p className="text-center text-accent animate-pulse">
                    Rendering scene...
                  </p>
                )}
              </div>
            )}

            {/* Step 3: Preview Scene */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center space-y-2">
                  <Play className="w-12 h-12 mx-auto text-primary" />
                  <h2 className="font-display text-3xl font-bold">Preview Your Scene</h2>
                  <p className="text-muted-foreground">Your AI story is ready</p>
                </div>

                <Card className="bg-card/30 backdrop-blur-glass border-border/50 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 via-surface to-accent/20 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Play className="w-16 h-16 mx-auto text-foreground/50" />
                      <p className="text-lg text-muted-foreground">Sample scene preview</p>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto px-4">
                        {storyIdea || "Your AI-generated dialogue and visuals will appear here"}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="font-display font-semibold">Tone: {selectedTone || "Not selected"}</p>
                        <p className="text-sm text-muted-foreground">Visual Style: {selectedStyle || "Not selected"}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="heroOutline" size="sm">
                          Refine Story
                        </Button>
                        <Button variant="hero" size="sm">
                          Publish to CineVerse
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t border-border/50">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            {step < 3 ? (
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={isGenerating || (step === 1 && !storyIdea)}
              >
                {isGenerating ? "Generating..." : "Next Step"}
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={() => {
                  resetWizard();
                  onOpenChange(false);
                }}
              >
                Close
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatorWizard;
