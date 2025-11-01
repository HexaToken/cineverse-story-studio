import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Upload, Sparkles, Film, Music, Rocket, Check, Play, DollarSign, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface UniverseBuilderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UniverseBuilder = ({ open, onOpenChange }: UniverseBuilderProps) => {
  const [step, setStep] = useState(1);
  const [universeName, setUniverseName] = useState("");
  const [genre, setGenre] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [scriptDescription, setScriptDescription] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [voiceTone, setVoiceTone] = useState("");
  const [musicStyle, setMusicStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const progress = (step / 5) * 100;

  const genres = ["Sci-Fi", "Fantasy", "Mystery", "Romance", "Action", "Horror", "Comedy", "Drama"];
  const voiceTones = ["Heroic", "Calm", "Dramatic", "Playful", "Robotic"];
  const musicStyles = ["Lo-Fi", "Orchestral", "Cyberpunk", "Ambient", "Synthwave"];

  const handleNext = () => {
    if (step === 2 && !synopsis) {
      // Generate synopsis
      setIsGenerating(true);
      setTimeout(() => {
        setSynopsis(`In a universe where ${genre?.toLowerCase() || "stories"} collide with destiny, ${universeName || "an epic tale"} unfolds. Characters face impossible choices as their world transforms around them. The journey begins with a single decision that will echo through eternity.`);
        setIsGenerating(false);
        setStep(step + 1);
      }, 2000);
    } else if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetBuilder = () => {
    setStep(1);
    setUniverseName("");
    setGenre("");
    setUploadedFile(null);
    setScriptDescription("");
    setSynopsis("");
    setVoiceTone("");
    setMusicStyle("");
    setTitle("");
    setDescription("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const storyboardFrames = [
    { id: 1, label: "Opening Scene" },
    { id: 2, label: "Character Introduction" },
    { id: 3, label: "Rising Action" },
    { id: 4, label: "Climax" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#0a0b1a] to-[#10182e] backdrop-blur-xl border-2 border-primary/30 shadow-[0_0_50px_rgba(162,77,246,0.3)]">
        <div className="space-y-6 p-2">
          {/* Progress Steps with Glowing Dots */}
          <div className="flex justify-between items-center gap-2">
            {[
              { num: 1, label: "Universe Setup", icon: Sparkles },
              { num: 2, label: "Story Setup", icon: Upload },
              { num: 3, label: "Scene Generation", icon: Film },
              { num: 4, label: "Voice + Music", icon: Music },
              { num: 5, label: "Preview & Publish", icon: Rocket }
            ].map(({ num, label, icon: Icon }) => (
              <div key={num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                    step >= num 
                      ? 'bg-gradient-to-br from-[#a24df6] to-[#00eaff] border-[#00eaff] shadow-[0_0_20px_rgba(0,234,255,0.6)]' 
                      : 'bg-[#0a0b1a] border-border/50'
                  }`}>
                    {step > num ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : step === num ? (
                      <Icon className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-xs font-bold text-muted-foreground">{num}</span>
                    )}
                  </div>
                  <span className={`text-[10px] mt-2 text-center font-medium transition-colors hidden md:block ${
                    step >= num ? 'text-[#00eaff]' : 'text-muted-foreground'
                  }`}>
                    {label}
                  </span>
                </div>
                {num < 5 && (
                  <div className={`flex-1 h-0.5 mx-1 transition-all duration-500 ${
                    step > num ? 'bg-gradient-to-r from-[#00eaff] to-[#a24df6] shadow-[0_0_10px_rgba(0,234,255,0.5)]' : 'bg-border/30'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="h-1 bg-[#0a0b1a]" />

          {/* Step Content */}
          <div className="min-h-[450px]">
            {/* Step 1: Universe Setup */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center space-y-3">
                  <Sparkles className="w-16 h-16 mx-auto text-[#a24df6] animate-pulse" />
                  <h2 className="font-display text-4xl font-bold bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
                    Let's Begin Your Universe
                  </h2>
                  <p className="text-muted-foreground text-lg">Name your story and choose a genre to set the tone.</p>
                </div>

                <Card className="bg-white/5 backdrop-blur-md border border-[#00eaff]/20 shadow-[0_0_30px_rgba(0,234,255,0.1)]">
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-3">
                      <label className="font-display font-semibold text-foreground">Universe Name</label>
                      <Input
                        placeholder="The Last Horizon"
                        value={universeName}
                        onChange={(e) => setUniverseName(e.target.value)}
                        className="bg-[#0a0b1a]/50 border-[#00eaff]/30 focus:border-[#00eaff] text-lg h-12"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="font-display font-semibold text-foreground">Genre</label>
                      <Select value={genre} onValueChange={setGenre}>
                        <SelectTrigger className="bg-[#0a0b1a]/50 border-[#00eaff]/30 h-12 text-lg">
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#10182e] border-[#00eaff]/30">
                          {genres.map((g) => (
                            <SelectItem key={g} value={g} className="text-lg">{g}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Story Setup */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center space-y-3">
                  <Upload className="w-16 h-16 mx-auto text-[#00eaff] animate-pulse" />
                  <h2 className="font-display text-4xl font-bold bg-gradient-to-r from-[#a24df6] to-[#00eaff] bg-clip-text text-transparent">
                    Upload or Create Your Story
                  </h2>
                  <p className="text-muted-foreground text-lg">Bring your vision to life with a screenplay or let AI write the first draft.</p>
                </div>

                <Card className="bg-white/5 backdrop-blur-md border border-[#a24df6]/20 shadow-[0_0_30px_rgba(162,77,246,0.1)]">
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <label className="font-display font-semibold text-foreground flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Option A: Upload Script
                      </label>
                      <div className="relative border-2 border-dashed border-[#00eaff]/30 rounded-xl p-12 text-center hover:border-[#00eaff]/60 transition-all cursor-pointer bg-[#0a0b1a]/30">
                        <input
                          type="file"
                          accept=".pdf,.txt,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="w-12 h-12 mx-auto mb-3 text-[#00eaff]/50" />
                        <p className="text-foreground font-medium mb-2">
                          {uploadedFile ? uploadedFile.name : "Drop your script here or click to browse"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Accepts .pdf, .txt, .docx — CineVerse will convert it into AI-powered storyboards
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border/50" />
                      </div>
                      <div className="relative flex justify-center text-sm uppercase">
                        <span className="bg-[#10182e] px-4 text-muted-foreground font-semibold">Or</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="font-display font-semibold text-foreground flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Option B: Generate Script with AI
                      </label>
                      <Textarea
                        placeholder="Describe your first scene or main character..."
                        value={scriptDescription}
                        onChange={(e) => setScriptDescription(e.target.value)}
                        className="min-h-[180px] bg-[#0a0b1a]/50 border-[#a24df6]/30 focus:border-[#a24df6] text-base"
                      />
                    </div>

                    {synopsis && (
                      <Card className="bg-gradient-to-br from-[#a24df6]/10 to-[#00eaff]/10 border border-[#00eaff]/40 shadow-[0_0_20px_rgba(0,234,255,0.2)]">
                        <CardContent className="p-6">
                          <h3 className="font-display font-bold text-xl mb-3 text-[#00eaff]">AI Story Synopsis</h3>
                          <p className="text-foreground/90 leading-relaxed mb-4">{synopsis}</p>
                          <Button variant="hero" size="sm" className="w-full">
                            Looks Great → Continue
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>

                {isGenerating && (
                  <p className="text-center text-[#a24df6] animate-pulse text-lg font-medium">
                    ✨ Generating story synopsis...
                  </p>
                )}
              </div>
            )}

            {/* Step 3: AI Scene Generation */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center space-y-3">
                  <Film className="w-16 h-16 mx-auto text-[#a24df6] animate-pulse" />
                  <h2 className="font-display text-4xl font-bold bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
                    Visualize Your World
                  </h2>
                  <p className="text-muted-foreground text-lg">AI will render dynamic scenes and character visuals.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {storyboardFrames.map((frame) => (
                    <Card key={frame.id} className="bg-white/5 backdrop-blur-md border border-[#00eaff]/20 overflow-hidden group hover:border-[#a24df6]/50 transition-all">
                      <div className="aspect-video bg-gradient-to-br from-[#0a0b1a] via-[#10182e] to-[#1a1a2e] flex items-center justify-center relative">
                        <Film className="w-12 h-12 text-foreground/20 group-hover:text-[#00eaff]/50 transition-colors" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                          <p className="text-sm font-semibold text-white">{frame.label}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="heroOutline" className="flex-1 border-[#00eaff] text-[#00eaff] hover:bg-[#00eaff]">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Render More Scenes
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Voice + Music */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center space-y-3">
                  <Music className="w-16 h-16 mx-auto text-[#00eaff] animate-pulse" />
                  <h2 className="font-display text-4xl font-bold bg-gradient-to-r from-[#a24df6] to-[#00eaff] bg-clip-text text-transparent">
                    Bring It to Life
                  </h2>
                  <p className="text-muted-foreground text-lg">Auto-cast voice actors and add emotional soundtracks.</p>
                </div>

                <Card className="bg-white/5 backdrop-blur-md border border-[#a24df6]/20 shadow-[0_0_30px_rgba(162,77,246,0.1)]">
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <label className="font-display font-semibold text-foreground text-lg">Voice Tone</label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {voiceTones.map((tone) => (
                          <button
                            key={tone}
                            onClick={() => setVoiceTone(tone)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                              voiceTone === tone
                                ? 'bg-[#00eaff]/20 border-[#00eaff] shadow-[0_0_20px_rgba(0,234,255,0.4)]'
                                : 'bg-[#0a0b1a]/50 border-border/30 hover:border-[#00eaff]/50'
                            }`}
                          >
                            <span className="font-display font-semibold text-sm">{tone}</span>
                            {voiceTone === tone && (
                              <Play className="w-4 h-4 mx-auto mt-2 text-[#00eaff]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="font-display font-semibold text-foreground text-lg">Music Style</label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {musicStyles.map((style) => (
                          <button
                            key={style}
                            onClick={() => setMusicStyle(style)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                              musicStyle === style
                                ? 'bg-[#a24df6]/20 border-[#a24df6] shadow-[0_0_20px_rgba(162,77,246,0.4)]'
                                : 'bg-[#0a0b1a]/50 border-border/30 hover:border-[#a24df6]/50'
                            }`}
                          >
                            <span className="font-display font-semibold text-sm">{style}</span>
                            {musicStyle === style && (
                              <Play className="w-4 h-4 mx-auto mt-2 text-[#a24df6]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 5: Preview & Publish */}
            {step === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center space-y-3">
                  <Rocket className="w-16 h-16 mx-auto text-[#a24df6] animate-pulse" />
                  <h2 className="font-display text-4xl font-bold bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
                    Your Universe Is Ready
                  </h2>
                  <p className="text-muted-foreground text-lg">Preview your first AI-generated cinematic experience.</p>
                </div>

                <Card className="bg-white/5 backdrop-blur-md border border-[#00eaff]/30 overflow-hidden shadow-[0_0_40px_rgba(0,234,255,0.2)]">
                  <div className="aspect-video bg-gradient-to-br from-[#0a0b1a] via-[#1a1a2e] to-[#10182e] flex items-center justify-center relative">
                    <Play className="w-20 h-20 text-white/80 cursor-pointer hover:scale-110 transition-transform" />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <p className="text-sm font-semibold text-white">{universeName || "Your Universe"}</p>
                      <p className="text-xs text-white/70">{genre}</p>
                    </div>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="font-display font-semibold text-foreground">Title</label>
                        <Input
                          value={title || universeName}
                          onChange={(e) => setTitle(e.target.value)}
                          className="bg-[#0a0b1a]/50 border-[#00eaff]/30 h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-display font-semibold text-foreground">Description</label>
                        <Textarea
                          value={description || synopsis}
                          onChange={(e) => setDescription(e.target.value)}
                          className="min-h-[100px] bg-[#0a0b1a]/50 border-[#00eaff]/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/30">
                      <div className="text-center p-4 bg-[#00eaff]/10 rounded-lg border border-[#00eaff]/30">
                        <p className="text-xs text-muted-foreground mb-1">Voice</p>
                        <p className="font-semibold text-[#00eaff]">{voiceTone || "Not Set"}</p>
                      </div>
                      <div className="text-center p-4 bg-[#a24df6]/10 rounded-lg border border-[#a24df6]/30">
                        <p className="text-xs text-muted-foreground mb-1">Music</p>
                        <p className="font-semibold text-[#a24df6]">{musicStyle || "Not Set"}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button
                        variant="heroOutline"
                        className="flex-1 border-[#00eaff] text-[#00eaff] hover:bg-[#00eaff] h-12"
                        onClick={() => setStep(3)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Scenes
                      </Button>
                      <Button
                        variant="hero"
                        className="flex-1 bg-gradient-to-r from-[#a24df6] to-[#00eaff] text-white shadow-[0_0_30px_rgba(162,77,246,0.5)] h-12"
                      >
                        <Rocket className="w-4 h-4 mr-2" />
                        Publish to CineVerse
                      </Button>
                      <Button
                        variant="heroOutline"
                        className="flex-1 border-[#a24df6] text-[#a24df6] hover:bg-[#a24df6] h-12"
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Monetize
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t border-border/30">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="border-border/50"
            >
              Back
            </Button>
            {step < 5 ? (
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={isGenerating || (step === 1 && (!universeName || !genre)) || (step === 2 && !scriptDescription && !uploadedFile)}
                className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] shadow-[0_0_20px_rgba(0,234,255,0.4)]"
              >
                {isGenerating ? "Generating..." : `Next: ${step === 1 ? "Story Setup" : step === 2 ? "Scene Generation" : step === 3 ? "Voice + Music" : "Preview & Publish"}`}
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={() => {
                  resetBuilder();
                  onOpenChange(false);
                }}
                className="bg-gradient-to-r from-[#a24df6] to-[#00eaff]"
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

export default UniverseBuilder;
