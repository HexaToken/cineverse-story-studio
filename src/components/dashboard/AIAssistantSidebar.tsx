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

type CreationPhase = 'concept' | 'scriptwriting' | 'visual' | 'audio' | 'review' | 'publishing';

interface AIAssistantSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhase?: CreationPhase;
  universeTitle?: string;
}

const AIAssistantSidebar = ({ isOpen, onClose, currentPhase = 'concept', universeTitle = "Untitled Universe" }: AIAssistantSidebarProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<AssistantMode>('story');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Phase-specific tips and guidance
  const phaseGuidance: Record<CreationPhase, { tips: string[]; recommendedModes: AssistantMode[] }> = {
    concept: {
      tips: [
        "Start with a core concept or logline",
        "Define your universe's core rules and setting",
        "Consider your target audience and genre"
      ],
      recommendedModes: ['story', 'insight']
    },
    scriptwriting: {
      tips: [
        "Develop your main character arc",
        "Structure your three-act narrative",
        "Write compelling dialogue exchanges"
      ],
      recommendedModes: ['story', 'voice']
    },
    visual: {
      tips: [
        "Define the visual style and color palette",
        "Create detailed scene composition prompts",
        "Specify lighting, mood, and atmosphere"
      ],
      recommendedModes: ['visual', 'story']
    },
    audio: {
      tips: [
        "Cast voice actors for each character",
        "Select music themes and emotional beats",
        "Plan sound effects and ambience"
      ],
      recommendedModes: ['voice', 'insight']
    },
    review: {
      tips: [
        "Review pacing and narrative flow",
        "Check consistency in visuals and audio",
        "Gather feedback from test audience"
      ],
      recommendedModes: ['insight', 'story']
    },
    publishing: {
      tips: [
        "Create compelling metadata and tags",
        "Plan promotional strategy",
        "Set monetization and privacy settings"
      ],
      recommendedModes: ['insight', 'story']
    }
  };

  const modes = [
    { id: 'story' as AssistantMode, label: 'Story', icon: Film, color: '#00eaff' },
    { id: 'visual' as AssistantMode, label: 'Visual', icon: Eye, color: '#a24df6' },
    { id: 'voice' as AssistantMode, label: 'Voice', icon: Mic2, color: '#ff006e' },
    { id: 'insight' as AssistantMode, label: 'Insight', icon: BarChart3, color: '#00eaff' }
  ];

  // Context-aware prompts based on creation phase
  const phasePrompts: Record<CreationPhase, typeof suggestedPrompts> = {
    concept: [
      { text: "Generate a compelling story logline", icon: "✍️", mode: 'story' },
      { text: "Define the core setting and rules", icon: "🪐", mode: 'story' },
      { text: "Who is my target audience?", icon: "👥", mode: 'insight' },
      { text: "What genres would this fit?", icon: "🎬", mode: 'story' }
    ],
    scriptwriting: [
      { text: "Develop the main character arc", icon: "🎭", mode: 'story' },
      { text: "Write a three-act story structure", icon: "📖", mode: 'story' },
      { text: "Cast AI voice actors for my characters", icon: "🎤", mode: 'voice' },
      { text: "Refine dialogue for this scene", icon: "💬", mode: 'story' }
    ],
    visual: [
      { text: "Create visual prompts for this scene", icon: "🎨", mode: 'visual' },
      { text: "Define color palette and mood", icon: "🌈", mode: 'visual' },
      { text: "Suggest cinematic camera movements", icon: "📹", mode: 'visual' },
      { text: "Generate detailed scene compositions", icon: "🖼️", mode: 'visual' }
    ],
    audio: [
      { text: "Suggest voice actors and tones", icon: "🎭", mode: 'voice' },
      { text: "Generate music themes for emotional beats", icon: "🎶", mode: 'voice' },
      { text: "Plan sound design and effects", icon: "🔊", mode: 'voice' },
      { text: "Optimize audio levels and mixing", icon: "🎚️", mode: 'voice' }
    ],
    review: [
      { text: "Check narrative pacing and flow", icon: "⏱️", mode: 'story' },
      { text: "Verify visual consistency", icon: "✅", mode: 'visual' },
      { text: "Analyze engagement potential", icon: "📊", mode: 'insight' },
      { text: "Suggest improvements based on feedback", icon: "💡", mode: 'insight' }
    ],
    publishing: [
      { text: "Create compelling title and description", icon: "📝", mode: 'story' },
      { text: "Generate tags and metadata", icon: "🏷️", mode: 'story' },
      { text: "Plan monetization strategy", icon: "💰", mode: 'insight' },
      { text: "Create promotional campaign", icon: "📢", mode: 'insight' }
    ]
  };

  const suggestedPrompts = phasePrompts[currentPhase];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getWelcomeMessage = () => {
    const phaseMessages: Record<CreationPhase, string> = {
      concept: `Great! Let's build "${universeTitle}" from the ground up 🌌 I can help you develop the core concept, define your universe's rules, and shape your vision. What's your starting point?`,
      scriptwriting: `Now for the fun part — bringing "${universeTitle}" to life through story 📖 I'll help with character development, dialogue, and narrative structure. Ready to write?`,
      visual: `Time to visualize "${universeTitle}" 🎨 I can generate detailed visual prompts, define your aesthetic, and suggest cinematography. What scene shall we create?`,
      audio: `Let's add voice and music to "${universeTitle}" 🎵 I'll help with voice casting, music themes, and sound design. Who are your characters?`,
      review: `Almost there! Let's polish "${universeTitle}" to perfection ✨ I can help verify consistency, analyze pacing, and gather insights. What needs refining?`,
      publishing: `Ready to launch "${universeTitle}" to the world 🚀 I'll help with metadata, promotion, and monetization strategy. What's your next move?`
    };

    return phaseMessages[currentPhase];
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setTimeout(() => {
        setMessages([{
          role: 'assistant',
          content: getWelcomeMessage(),
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen, currentPhase, universeTitle]);

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

    // Simulate AI response - context-aware based on phase and mode
    setTimeout(() => {
      const contextAwareResponses: Record<CreationPhase, Record<AssistantMode, string[]>> = {
        concept: {
          story: [
            `Great premise for "${universeTitle}"! Here's a compelling logline:\n\n*'In a world where [core conflict], one [protagonist] must [main goal] before [stakes].'*\n\nLet's develop the world-building details next. What's the primary setting or era?`,
            `I see strong potential here. Let me suggest a comparable narrative structure:\n\n1. **Setup**: Introduce the world and protagonist's ordinary life\n2. **Inciting Incident**: A revelation that changes everything\n3. **Rising Action**: Escalating challenges with high stakes\n\nWhich story beats resonate with your vision?`
          ],
          visual: [
            `For the visual language of "${universeTitle}", I recommend:\n\n**Aesthetic**: Cyberpunk meets Art Deco\n**Color Palette**: Deep purples, neon cyan, gold accents\n**Mood**: Dystopian yet hopeful\n\nShould we explore different visual styles?`
          ],
          voice: [
            `Let's define the audio identity of "${universeTitle}":\n\n**Narration Style**: First-person internal monologue\n**Music Genre**: Synthwave with orchestral elements\n**Tone**: Contemplative, mysterious\n\nHow does this align with your vision?`
          ],
          insight: [
            `Market analysis for your concept:\n\n📊 **Genre Popularity**: Cyberpunk content gets 2.8× engagement\n👥 **Audience Size**: 18-35 year-olds, tech-savvy\n💡 **Opportunity**: Underserved in interactive format\n🎯 **Recommendation**: Emphasize choice mechanics\n\nRdy to refine the targeting?`
          ]
        },
        scriptwriting: {
          story: [
            `Let's develop the main character arc for "${universeTitle}":\n\n**Start**: [Initial belief/weakness]\n**Catalyst**: [The event that changes them]\n**Climax**: [Moment of truth]\n**Resolution**: [New belief/strength]\n\nWho is your protagonist at their core?`,
            `For the three-act structure:\n\n**Act 1**: Establish world & character (20-30%)\n**Act 2**: Rising conflict & complications (40-60%)\n**Act 3**: Climax & resolution (20-30%)\n\nHow many scenes are you planning?`
          ],
          voice: [
            `Perfect for voice casting in "${universeTitle}":\n\nAnalyzing emotional dialogue beats:\n- 40% contemplative/introspective\n- 35% action-driven/urgent\n- 25% emotional/vulnerable\n\nRecommended voice types & ElevenLabs presets await!`
          ],
          visual: [
            `Scene composition suggestions based on your script:\n\n**Dialogue Scenes**: Close-up intimacy with depth of field\n**Action Beats**: Wide shots emphasizing scale\n**Transitions**: Visual motifs connecting scenes\n\nWhich scene should we detail first?`
          ],
          insight: [
            `Story strength analysis for "${universeTitle}":\n\n✅ **Strong**: Character motivation clarity\n⚠️ **Needs Work**: Second act pacing (flat section at 55%)\n💡 **Suggestion**: Add subplot convergence point\n\nWant specific rewrite suggestions?`
          ]
        },
        visual: {
          story: [
            `Narrative visual language for "${universeTitle}":\n\n**Opening**: Wide establishing shot, crane down\n**Key Moments**: Extreme close-ups for emotion\n**Transitions**: Thematic visual motifs\n\nShall we storyboard the key scenes?`
          ],
          visual: [
            `Detailed visual generation for "${universeTitle}" scenes:\n\n**Scene 1 - Setting**: \nA sprawling neon cityscape at dusk, rain-slicked streets reflecting holographic advertisements, flying vehicles creating light trails\n\n**Color Reference**: Blade Runner 2049 meets Cyberpunk aesthetics\n**Key Lighting**: Cold rim lights, warm practical lights\n\nReady to generate prompts for Runway/Midjourney?`,
            `Let's refine the visual palette for "${universeTitle}":\n\n**Primary**: #00eaff (Neon cyan)\n**Secondary**: #a24df6 (Violet)\n**Tertiary**: Deep blacks and rich purples\n\nHow does this hierarchy feel?`
          ],
          voice: [
            `Visual timing for voice-over in "${universeTitle}":\n\n**Narration Pacing**: Slower during contemplative visuals\n**Dialogue Sync**: Match emotional peaks with visual crescendos\n**Silence**: Strategic pauses emphasize impact\n\nWant timing suggestions?`
          ],
          insight: [
            `Visual market research for "${universeTitle}":\n\n📈 **Trending Visual Styles**: Cyberpunk (↑45%), Minimalist (↑32%)\n🎬 **Cinematography**: Dynamic motion performs 3.2x better\n🎨 **Color Theory**: Neon + pastels gets 2.8x engagement\n\nOptimizing your visuals accordingly...`
          ]
        },
        audio: {
          story: [
            `Character voice requirements for "${universeTitle}":\n\nAnalyzing dialogue intensity and emotional range to match voice characteristics...`
          ],
          visual: [],
          voice: [
            `Perfect voice casting for "${universeTitle}":\n\n**Protagonist (Lead)**:\n- Voice: Nova AI (ElevenLabs) - warm, authoritative\n- Range: E3-E5, conversational pace\n- Accent: American neutral with slight regional flavor\n\n**Ready to preview?**`,
            `Music theme development for "${universeTitle}":\n\n**Act 1 Theme**: 120 BPM, minor key, mysterious\n**Action Theme**: 140 BPM, driving rhythm, epic\n**Resolution Theme**: Slower, major key, hopeful\n\nLet's license AI music generation via Stable Audio...`
          ],
          insight: [
            `Audio performance analytics for "${universeTitle}":\n\n🎧 **Voice Engagement**: Female narrators +2.3x retention\n🎵 **Music Impact**: Thematic scoring +1.8x emotional response\n📊 **Timing**: Intro music 30-60 seconds optimal\n\nOptimizing audio strategy...`
          ]
        },
        review: {
          story: [
            `Pacing analysis for "${universeTitle}":\n\n✅ Act 1: Great hook (3 min) \n⚠️ Act 2: Slight drag at 12:30 mark\n✅ Act 3: Strong climax\n\n💡 Suggestion: Tighten middle section by 45 seconds`
          ],
          visual: [
            `Visual consistency check for "${universeTitle}":\n\n✅ Color grading: Consistent throughout\n✅ Camera language: Clear scene hierarchy\n⚠️ Lighting continuity: Minor issue at transition 5\n\nAll fixable with color pass!`
          ],
          voice: [],
          insight: [
            `Holistic review of "${universeTitle}":\n\n📊 **Overall Quality**: 8.7/10\n✅ **Strengths**: Compelling story, cohesive visuals\n⚠️ **Improvements**: Tighten pacing, enhance emotional beats\n🎯 **Predicted Performance**: Top 5% in genre\n\nReady to publish?`
          ]
        },
        publishing: {
          story: [
            `Compelling description for "${universeTitle}":\n\nHook: "In a world where [stakes], one [hero] must [quest]."\n\nExpanded: [2-3 sentences of intrigue]\n\nCall to action: "Enter the universe. Experience the story."\n\nGood angle?`
          ],
          visual: [],
          voice: [],
          insight: [
            `Monetization strategy for "${universeTitle}":\n\n💰 **Recommended Model**: Premium + Ad Revenue\n🎯 **Price Point**: $4.99 for 48-hour access\n📈 **Projected Revenue**: $500-2K first month\n📅 **Launch Timing**: Friday 7 PM EST for weekend reach\n\nReady to configure settings?`
          ]
        }
      };

      const phaseResponses = contextAwareResponses[currentPhase];
      const modeResponses = phaseResponses[mode] || phaseResponses.story;
      const response = modeResponses.length > 0
        ? modeResponses[Math.floor(Math.random() * modeResponses.length)]
        : `I'm ready to help with "${universeTitle}" in this phase. What would you like to focus on?`;

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
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00eaff]/20 to-[#a24df6]/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,234,255,0.3)] animate-pulse flex-shrink-0">
              <Sparkles className="w-5 h-5 text-[#00eaff]" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-lg font-bold text-white truncate">CineVerse AI</h2>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="inline-block px-2 py-0.5 rounded-full bg-[#a24df6]/20 text-[#a24df6] capitalize truncate">
                  {currentPhase}
                </span>
                <span className="truncate">{universeTitle}</span>
              </div>
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
