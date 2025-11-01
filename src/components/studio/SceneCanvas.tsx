import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCw, Sparkles, Camera, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SceneCanvas = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(1);
  const [showPrompt, setShowPrompt] = useState(true);

  const handleRegenerate = () => {
    setCurrentVersion(prev => prev + 1);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0a0b1a]/50">
      {/* Canvas Header */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-lg font-bold text-white">Scene Preview</h3>
          <Badge className="bg-[#00eaff]/10 text-[#00eaff] border border-[#00eaff]/30">
            Version {currentVersion}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPrompt(!showPrompt)}
            className="border-[#00eaff]/40 text-[#00eaff] hover:bg-[#00eaff]/10"
          >
            {showPrompt ? "Hide" : "Show"} Prompt
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00eaff] rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Scene Preview Frame */}
        <div className="relative w-full max-w-5xl aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#0a0b1a] rounded-xl border-2 border-[#00eaff]/30 overflow-hidden shadow-[0_0_40px_rgba(0,234,255,0.2)]">
          {/* Placeholder Scene */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Camera className="w-20 h-20 mx-auto text-white/20" />
              <p className="text-white/60 text-lg">AI-Generated Scene Preview</p>
              <p className="text-white/40 text-sm">Generate a scene to see it here</p>
            </div>
          </div>

          {/* Prompt Overlay */}
          {showPrompt && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
              <p className="text-white/90 italic text-sm">
                "Aerial view descending through neon-lit cityscape, rain-slicked streets reflecting holographic billboards..."
              </p>
            </div>
          )}

          {/* Frame Corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#00eaff]/50" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#00eaff]/50" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#00eaff]/50" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#00eaff]/50" />
        </div>
      </div>

      {/* Canvas Controls */}
      <div className="h-20 border-t border-white/10 flex items-center justify-center gap-4 px-6">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white shadow-[0_0_20px_rgba(0,234,255,0.4)] w-14 h-14 rounded-full"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </Button>

        <div className="flex gap-2">
          <Button
            onClick={handleRegenerate}
            variant="outline"
            className="border-[#a24df6]/40 text-[#a24df6] hover:bg-[#a24df6]/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
          <Button
            variant="outline"
            className="border-[#00eaff]/40 text-[#00eaff] hover:bg-[#00eaff]/10"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Enhance
          </Button>
          <Button
            variant="outline"
            className="border-[#a24df6]/40 text-[#a24df6] hover:bg-[#a24df6]/10"
          >
            <Camera className="w-4 h-4 mr-2" />
            Capture Frame
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SceneCanvas;
