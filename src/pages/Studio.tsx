import { useState } from "react";
import StudioNavbar from "@/components/studio/StudioNavbar";
import StudioToolsSidebar from "@/components/studio/StudioToolsSidebar";
import SceneCanvas from "@/components/studio/SceneCanvas";
import TimelineEditor from "@/components/studio/TimelineEditor";
import AIAssistantSidebar from "@/components/dashboard/AIAssistantSidebar";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

const Studio = () => {
  const [projectTitle, setProjectTitle] = useState("Digital Horizons");
  const [aiModeEnabled, setAiModeEnabled] = useState(true);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const handleSave = () => {
    toast.success("Project saved successfully");
  };

  const handlePreview = () => {
    toast.info("Opening preview...");
  };

  const handlePublish = () => {
    toast.success("Publishing your universe...");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#0a0b1a] via-[#10182e] to-[#0a0b1a] overflow-hidden">
      {/* Top Navbar */}
      <StudioNavbar
        projectTitle={projectTitle}
        onProjectTitleChange={setProjectTitle}
        onSave={handleSave}
        onPreview={handlePreview}
        onPublish={handlePublish}
        aiModeEnabled={aiModeEnabled}
        onAiModeToggle={() => setAiModeEnabled(!aiModeEnabled)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tools */}
        <StudioToolsSidebar />

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <SceneCanvas />
          <TimelineEditor />
        </div>

        {/* Right Sidebar - AI Assistant */}
        <AIAssistantSidebar 
          isOpen={aiAssistantOpen} 
          onClose={() => setAiAssistantOpen(false)} 
        />
      </div>

      {/* Floating AI Trigger */}
      {!aiAssistantOpen && (
        <button
          onClick={() => setAiAssistantOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] shadow-[0_0_40px_rgba(0,234,255,0.6)] hover:shadow-[0_0_50px_rgba(0,234,255,0.8)] transition-all z-40 flex items-center justify-center group animate-pulse"
        >
          <Sparkles className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#a24df6] rounded-full border-2 border-[#0a0b1a] animate-ping" />
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-[#0a0b1a]/95 backdrop-blur-sm border border-[#00eaff]/40 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <p className="text-sm text-white font-medium">Ask CineVerse AI</p>
          </div>
        </button>
      )}

      {/* Floating Shortcuts Toolbar */}
      <div className="fixed top-24 right-8 bg-[#0a0b1a]/95 backdrop-blur-xl border-2 border-[#00eaff]/20 rounded-xl p-3 space-y-2 shadow-[0_0_30px_rgba(0,234,255,0.2)]">
        <div className="text-xs text-white/60 mb-2 px-2">Quick Actions</div>
        <Button
          size="sm"
          variant="ghost"
          className="w-full justify-start text-white/80 hover:text-[#00eaff] hover:bg-[#00eaff]/10"
        >
          <kbd className="mr-2 px-2 py-1 bg-white/10 rounded text-xs">⌘N</kbd>
          New Scene
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="w-full justify-start text-white/80 hover:text-[#00eaff] hover:bg-[#00eaff]/10"
        >
          <kbd className="mr-2 px-2 py-1 bg-white/10 rounded text-xs">⌘R</kbd>
          Render
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="w-full justify-start text-white/80 hover:text-[#00eaff] hover:bg-[#00eaff]/10"
        >
          <kbd className="mr-2 px-2 py-1 bg-white/10 rounded text-xs">⌘S</kbd>
          Save
        </Button>
      </div>
    </div>
  );
};

export default Studio;
