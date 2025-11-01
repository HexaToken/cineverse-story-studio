import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Play, Upload, Settings, Sparkles, Pause, RefreshCw, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StudioNavbarProps {
  projectTitle: string;
  onProjectTitleChange: (title: string) => void;
  onSave: () => void;
  onPreview: () => void;
  onPublish: () => void;
  aiModeEnabled: boolean;
  onAiModeToggle: () => void;
}

const StudioNavbar = ({
  projectTitle,
  onProjectTitleChange,
  onSave,
  onPreview,
  onPublish,
  aiModeEnabled,
  onAiModeToggle
}: StudioNavbarProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    onSave();
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="h-16 bg-[#0a0b1a]/95 backdrop-blur-xl border-b-2 border-[#00eaff]/20 flex items-center justify-between px-6">
      {/* Left - Project Title */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center shadow-[0_0_20px_rgba(0,234,255,0.4)]">
          <Camera className="w-6 h-6 text-white" />
        </div>
        {isEditing ? (
          <Input
            value={projectTitle}
            onChange={(e) => onProjectTitleChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyPress={(e) => e.key === 'Enter' && setIsEditing(false)}
            className="bg-white/5 border-[#00eaff]/30 text-white font-display text-lg w-64"
            autoFocus
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="font-display text-xl font-bold text-white hover:text-[#00eaff] transition-colors"
          >
            {projectTitle}
          </button>
        )}
      </div>

      {/* Center - Status */}
      <div className="flex items-center gap-3">
        <Badge className="bg-[#00eaff]/10 text-[#00eaff] border border-[#00eaff]/30">
          {isSaving ? "Saving..." : "All changes saved"}
        </Badge>
        
        <button
          onClick={onAiModeToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            aiModeEnabled
              ? "bg-gradient-to-r from-[#00eaff]/20 to-[#a24df6]/20 border border-[#00eaff]/40 text-[#00eaff]"
              : "bg-white/5 text-white/60 hover:bg-white/10"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          AI Mode {aiModeEnabled ? "ON" : "OFF"}
        </button>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        <Button
          onClick={handleSave}
          variant="outline"
          className="border-[#00eaff]/40 text-[#00eaff] hover:bg-[#00eaff]/10"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button
          onClick={onPreview}
          variant="outline"
          className="border-[#a24df6]/40 text-[#a24df6] hover:bg-[#a24df6]/10"
        >
          <Play className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button
          onClick={onPublish}
          className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white shadow-[0_0_20px_rgba(0,234,255,0.4)]"
        >
          <Upload className="w-4 h-4 mr-2" />
          Publish
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/60 hover:text-white hover:bg-white/10"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default StudioNavbar;
