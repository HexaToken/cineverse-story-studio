import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Wand2, 
  Users, 
  Image, 
  Camera, 
  RefreshCw, 
  Mic, 
  Music, 
  Sliders,
  Upload,
  Play
} from "lucide-react";

const StudioToolsSidebar = () => {
  const [script, setScript] = useState("");
  const [scenePrompt, setScenePrompt] = useState("");

  const visualStyles = [
    "Cyberpunk", "Neo-Noir", "Fantasy", "Sci-Fi", "Anime", "Realistic"
  ];

  const aiVoices = [
    { name: "Nova", tone: "Calm, Mysterious", preview: true },
    { name: "Echo", tone: "Deep, Commanding", preview: true },
    { name: "Sage", tone: "Warm, Friendly", preview: true },
    { name: "Aria", tone: "Energetic, Young", preview: true }
  ];

  const musicLayers = [
    "Ambient", "Orchestral", "Synthwave", "Cyberpunk", "Lo-Fi", "Epic"
  ];

  return (
    <div className="w-80 bg-[#0a0b1a]/95 backdrop-blur-xl border-r-2 border-[#00eaff]/20 overflow-y-auto">
      <div className="p-4 border-b border-white/10">
        <h2 className="font-display text-lg font-bold text-white">Creative Tools</h2>
      </div>

      <Tabs defaultValue="story" className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-white/5 border-b border-white/10 rounded-none">
          <TabsTrigger value="story" className="data-[state=active]:bg-[#00eaff]/20 data-[state=active]:text-[#00eaff]">
            <FileText className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="visuals" className="data-[state=active]:bg-[#a24df6]/20 data-[state=active]:text-[#a24df6]">
            <Image className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="audio" className="data-[state=active]:bg-[#00eaff]/20 data-[state=active]:text-[#00eaff]">
            <Mic className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="assets" className="data-[state=active]:bg-[#a24df6]/20 data-[state=active]:text-[#a24df6]">
            <Upload className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>

        {/* Story Tab */}
        <TabsContent value="story" className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00eaff]" />
              Script Input
            </h3>
            <Textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Paste or write your script here..."
              className="min-h-[200px] bg-white/5 border-[#00eaff]/30 text-white placeholder:text-white/40"
            />
          </div>

          <Button className="w-full bg-gradient-to-r from-[#00eaff]/20 to-[#a24df6]/20 border border-[#00eaff]/40 text-[#00eaff] hover:bg-[#00eaff]/30">
            <Wand2 className="w-4 h-4 mr-2" />
            Generate Dialogue
          </Button>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#a24df6]" />
              Character Builder
            </h3>
            <div className="space-y-2">
              <Input
                placeholder="Character name..."
                className="bg-white/5 border-[#a24df6]/30 text-white"
              />
              <Input
                placeholder="Tone & personality..."
                className="bg-white/5 border-[#a24df6]/30 text-white"
              />
              <Button variant="outline" className="w-full border-[#a24df6]/40 text-[#a24df6]">
                Add Character
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Visuals Tab */}
        <TabsContent value="visuals" className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#a24df6]" />
              Scene Generator
            </h3>
            <Textarea
              value={scenePrompt}
              onChange={(e) => setScenePrompt(e.target.value)}
              placeholder="Describe the scene you want to generate..."
              className="min-h-[120px] bg-white/5 border-[#a24df6]/30 text-white placeholder:text-white/40"
            />
            <Button className="w-full mt-3 bg-gradient-to-r from-[#a24df6] to-[#00eaff] text-white shadow-[0_0_20px_rgba(162,77,246,0.4)]">
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Scene
            </Button>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Environment Styles</h3>
            <div className="grid grid-cols-2 gap-2">
              {visualStyles.map((style) => (
                <button
                  key={style}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-[#a24df6]/30 text-white/80 hover:bg-[#a24df6]/20 hover:border-[#a24df6]/50 hover:text-white transition-all text-sm"
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full border-[#a24df6]/40 text-[#a24df6]">
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate Scene
          </Button>
        </TabsContent>

        {/* Audio Tab */}
        <TabsContent value="audio" className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#00eaff]" />
              Voice Casting
            </h3>
            <div className="space-y-2">
              {aiVoices.map((voice) => (
                <Card
                  key={voice.name}
                  className="bg-white/5 border border-[#00eaff]/20 hover:border-[#00eaff]/40 transition-all cursor-pointer"
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{voice.name}</span>
                      <Button size="sm" variant="ghost" className="h-6 px-2 text-[#00eaff]">
                        <Play className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-white/60">{voice.tone}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Music className="w-4 h-4 text-[#a24df6]" />
              Music Layer
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {musicLayers.map((layer) => (
                <button
                  key={layer}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-[#a24df6]/30 text-white/80 hover:bg-[#a24df6]/20 hover:border-[#a24df6]/50 hover:text-white transition-all text-sm"
                >
                  {layer}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#00eaff]" />
              Voice Tone Control
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-white/60 mb-1 block">Energy</label>
                <input type="range" className="w-full" />
              </div>
              <div>
                <label className="text-xs text-white/60 mb-1 block">Emotion</label>
                <input type="range" className="w-full" />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Assets Tab */}
        <TabsContent value="assets" className="p-4">
          <div className="border-2 border-dashed border-[#00eaff]/30 rounded-xl p-8 text-center hover:border-[#00eaff]/50 transition-all cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-3 text-[#00eaff]/50" />
            <p className="text-white/80 font-medium mb-2">Upload Assets</p>
            <p className="text-sm text-white/60">Drop files here or click to browse</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-white mb-3">Recent Uploads</h3>
            <div className="space-y-2 text-sm text-white/60">
              <p>No assets yet</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudioToolsSidebar;
