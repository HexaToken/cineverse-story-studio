import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Minimize2, 
  Send, 
  Mic, 
  Film, 
  Eye, 
  Mic2, 
  BarChart3, 
  Sparkles,
  Wand2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

type AssistantMode = 'story' | 'visual' | 'voice' | 'insight';

interface AIAssistantSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistantSidebar = ({ isOpen, onClose }: AIAssistantSidebarProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<AssistantMode>('story');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const modes = [
    { id: 'story' as AssistantMode, label: 'Story', icon: Film, color: '#00eaff' },
    { id: 'visual' as AssistantMode, label: 'Visual', icon: Eye, color: '#a24df6' },
    { id: 'voice' as AssistantMode, label: 'Voice', icon: Mic2, color: '#ff006e' },
    { id: 'insight' as AssistantMode, label: 'Insight', icon: BarChart3, color: '#00eaff' }
  ];

  const suggestedPrompts = [
    { text: "Generate a story logline", icon: "✍️", mode: 'story' },
    { text: "Describe my main universe setting", icon: "🪐", mode: 'story' },
    { text: "Cast AI voice actors for my scene", icon: "🎭", mode: 'voice' },
    { text: "Suggest cinematic music themes", icon: "🎶", mode: 'voice' },
    { text: "Explain how to monetize my universe", icon: "💡", mode: 'insight' },
    { text: "Show me analytics for my last release", icon: "🧩", mode: 'insight' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setTimeout(() => {
        setMessages([{
          role: 'assistant',
          content: "Hey creator 👋 — ready to bring your next universe to life? I can help with story ideas, scene generation, voice casting, or analytics insights. What would you like to create today?",
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<AssistantMode, string[]> = {
        story: [
          "Great idea! Let me craft a compelling logline for you...\n\n*'In a city where memories can be stolen, one detective must recover their own past before it's erased forever.'*\n\nWould you like me to develop this into a full synopsis, or explore alternate directions?",
          "I've analyzed successful story structures in your genre. Here's a three-act breakdown that could work well...",
          "Based on your universe's theme, I recommend focusing on character-driven conflict. Let me suggest some compelling character arcs..."
        ],
        visual: [
          "I can help generate visual prompts for your scene. Here's what I suggest:\n\n**Opening Shot**: Aerial view descending through neon-lit cityscape, rain-slicked streets reflecting holographic billboards.\n\n**Mood**: Cyberpunk noir, high contrast\n**Color Palette**: Deep blues, cyan highlights, magenta accents\n\nWant me to create more scene variations?",
          "For this scene, I recommend a cinematic style inspired by Blade Runner meets Ghost in the Shell. Let me generate specific visual prompts for Runway..."
        ],
        voice: [
          "Perfect! For this scene, I recommend:\n\n**Main Character (Ava)**: \n- Voice: Nova by ElevenLabs\n- Tone: Calm, mysterious\n- Emotional range: Contemplative to determined\n\n**Antagonist (Nexus)**:\n- Voice: Echo by ElevenLabs\n- Tone: Deep, commanding\n- Emotional range: Cold to menacing\n\nWant to preview these voices?",
          "I've analyzed the emotional beats in your script. Here are the optimal voice modulation points..."
        ],
        insight: [
          "Based on your analytics:\n\n📈 **Trending Up**: Your Sci-Fi universes get 2.3× more engagement\n👥 **Audience**: 68% prefer female narrators\n🎯 **Best Upload Time**: Thursday 7-9 PM EST\n💰 **Revenue Opportunity**: Enable Premium Views for 30% boost\n\nWant detailed recommendations?",
          "Your last universe 'Digital Horizons' is performing exceptionally well! Here's what's working..."
        ]
      };

      const modeResponses = responses[mode];
      const response = modeResponses[Math.floor(Math.random() * modeResponses.length)];

      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
    }, 2000);
  };

  const handlePromptClick = (prompt: string, promptMode: string) => {
    setMode(promptMode as AssistantMode);
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[450px] z-50 animate-slide-in-right">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b1a]/95 to-[#10182e]/95 backdrop-blur-xl">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00eaff] rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative h-full flex flex-col border-l-2 border-[#00eaff]/30">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,234,255,0.3)] animate-pulse">
              <Sparkles className="w-5 h-5 text-[#00eaff]" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">CineVerse AI Assistant</h2>
              <p className="text-xs text-white/60">Your Creative Copilot</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white/60 hover:text-[#00eaff] hover:bg-[#00eaff]/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mode Toggles */}
        <div className="flex items-center gap-2 p-4 border-b border-white/10 overflow-x-auto">
          {modes.map((m) => {
            const Icon = m.icon;
            const isActive = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap",
                  isActive
                    ? "bg-gradient-to-r from-[#00eaff]/20 to-[#a24df6]/20 border border-[#00eaff]/40 text-[#00eaff] shadow-[0_0_15px_rgba(0,234,255,0.3)]"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="w-4 h-4" style={isActive ? { color: m.color } : {}} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 1 && (
            <div className="mb-6">
              <p className="text-sm text-white/60 mb-4">Quick Actions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePromptClick(prompt.text, prompt.mode)}
                    className="group px-4 py-2 rounded-full bg-white/5 border border-[#00eaff]/20 hover:border-[#a24df6]/40 hover:bg-white/10 transition-all text-sm text-white/80 hover:text-white flex items-center gap-2"
                  >
                    <span>{prompt.icon}</span>
                    <span>{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, idx) => (
            <div
              key={idx}
              className={cn(
                "flex",
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl p-4",
                  message.role === 'user'
                    ? "bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 border border-[#00eaff]/40 text-white"
                    : "bg-white/5 border border-white/10 text-white/90"
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs text-white/40 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl p-4 bg-white/5 border border-[#00eaff]/20">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#00eaff] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[#00eaff] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[#00eaff] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm text-white/60">CineVerse AI is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-[#0a0b1a]/50 backdrop-blur-sm">
          <div className="flex items-end gap-3">
            <div className="flex-1 bg-white/5 border border-[#00eaff]/20 rounded-xl p-3 focus-within:border-[#00eaff]/40 transition-all">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything — from story ideas to analytics…"
                className="bg-transparent border-0 text-white placeholder:text-white/40 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[60px] max-h-[120px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white shadow-[0_0_20px_rgba(0,234,255,0.4)] hover:shadow-[0_0_30px_rgba(0,234,255,0.6)] disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-[#a24df6]/40 text-[#a24df6] hover:bg-[#a24df6]/10"
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-white/40 mt-2 text-center">
            Press <kbd className="px-2 py-1 bg-white/10 rounded text-[#00eaff]">/</kbd> for quick commands
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantSidebar;
