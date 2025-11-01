import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Film, Music, Mic2, Sparkles, Plus, ZoomIn, ZoomOut } from "lucide-react";

interface TimelineTrack {
  id: string;
  type: 'scene' | 'audio' | 'voice' | 'effects';
  label: string;
  items: TimelineItem[];
  color: string;
}

interface TimelineItem {
  id: string;
  start: number;
  duration: number;
  label: string;
}

const TimelineEditor = () => {
  const [zoom, setZoom] = useState(100);
  const [tracks] = useState<TimelineTrack[]>([
    {
      id: '1',
      type: 'scene',
      label: 'Scene Track',
      color: '#00eaff',
      items: [
        { id: 's1', start: 0, duration: 100, label: 'Opening Scene' },
        { id: 's2', start: 120, duration: 80, label: 'Dialogue' },
        { id: 's3', start: 220, duration: 90, label: 'Action Sequence' }
      ]
    },
    {
      id: '2',
      type: 'audio',
      label: 'Music Track',
      color: '#a24df6',
      items: [
        { id: 'a1', start: 0, duration: 200, label: 'Synthwave Intro' },
        { id: 'a2', start: 200, duration: 150, label: 'Ambient Theme' }
      ]
    },
    {
      id: '3',
      type: 'voice',
      label: 'Voice Track',
      color: '#ff006e',
      items: [
        { id: 'v1', start: 30, duration: 60, label: 'Narrator (Nova)' },
        { id: 'v2', start: 130, duration: 70, label: 'Character (Echo)' }
      ]
    },
    {
      id: '4',
      type: 'effects',
      label: 'Effects Track',
      color: '#00eaff',
      items: [
        { id: 'e1', start: 100, duration: 20, label: 'Fade Transition' }
      ]
    }
  ]);

  const getTrackIcon = (type: string) => {
    switch (type) {
      case 'scene': return Film;
      case 'audio': return Music;
      case 'voice': return Mic2;
      case 'effects': return Sparkles;
      default: return Film;
    }
  };

  return (
    <div className="h-80 bg-[#0a0b1a]/95 backdrop-blur-xl border-t-2 border-[#00eaff]/20">
      {/* Timeline Header */}
      <div className="h-12 border-b border-white/10 flex items-center justify-between px-6">
        <h3 className="font-display text-sm font-bold text-white">Timeline Sequencer</h3>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(Math.max(50, zoom - 25))}
            className="text-white/60 hover:text-[#00eaff] hover:bg-[#00eaff]/10 h-8 w-8"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs text-white/60 w-12 text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(Math.min(200, zoom + 25))}
            className="text-white/60 hover:text-[#00eaff] hover:bg-[#00eaff]/10 h-8 w-8"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Timeline Tracks */}
      <div className="flex-1 overflow-y-auto">
        {tracks.map((track) => {
          const Icon = getTrackIcon(track.type);
          return (
            <div key={track.id} className="border-b border-white/5">
              <div className="flex">
                {/* Track Label */}
                <div className="w-40 border-r border-white/10 p-3 flex items-center gap-2 bg-white/5">
                  <Icon className="w-4 h-4" style={{ color: track.color }} />
                  <span className="text-sm font-medium text-white/80 truncate">{track.label}</span>
                </div>

                {/* Track Content */}
                <div className="flex-1 relative h-16 bg-[#0a0b1a]/30">
                  {/* Time Grid */}
                  <div className="absolute inset-0 flex">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 border-r border-white/5"
                        style={{ opacity: i % 4 === 0 ? 0.3 : 0.1 }}
                      />
                    ))}
                  </div>

                  {/* Timeline Items */}
                  {track.items.map((item) => (
                    <div
                      key={item.id}
                      className="absolute h-12 top-2 rounded-lg border cursor-move hover:brightness-110 transition-all group"
                      style={{
                        left: `${(item.start / 400) * 100}%`,
                        width: `${(item.duration / 400) * 100}%`,
                        backgroundColor: `${track.color}20`,
                        borderColor: `${track.color}60`
                      }}
                    >
                      <div className="px-3 py-1 h-full flex items-center justify-between">
                        <span className="text-xs font-medium text-white/90 truncate">
                          {item.label}
                        </span>
                        {/* Resize Handles */}
                        <div className="w-1 h-full bg-white/20 absolute right-0 top-0 cursor-ew-resize opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Track Button */}
        <button className="w-full p-4 text-white/60 hover:text-[#00eaff] hover:bg-[#00eaff]/5 transition-all flex items-center justify-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          Add Track
        </button>
      </div>

      {/* Playhead */}
      <div className="absolute left-40 top-12 bottom-0 w-0.5 bg-[#00eaff] shadow-[0_0_10px_rgba(0,234,255,0.8)] pointer-events-none" style={{ left: '45%' }}>
        <div className="absolute -top-3 -left-2 w-4 h-4 rotate-45 bg-[#00eaff] shadow-[0_0_10px_rgba(0,234,255,0.8)]" />
      </div>
    </div>
  );
};

export default TimelineEditor;
