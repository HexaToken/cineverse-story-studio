import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Send, Volume2, VolumeX, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type AtlasMode = 'companion' | 'narrator' | 'mentor';
type EmotionalState = 'informative' | 'introspective' | 'celebratory' | 'alert';

const emotionalColors = {
  informative: 'from-cyan-400 to-cyan-600',
  introspective: 'from-purple-400 to-purple-600',
  celebratory: 'from-amber-400 to-amber-600',
  alert: 'from-red-400 to-red-600',
};

export function AtlasCompanion() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [mode, setMode] = useState<AtlasMode>('companion');
  const [emotionalState, setEmotionalState] = useState<EmotionalState>('informative');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [orbPosition, setOrbPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Context-aware greetings based on route
  const getContextualGreeting = (path: string) => {
    if (path.includes('/explore')) {
      return "You're approaching the Cyber Noir Galaxy — home to 3,400 universes inspired by AI detectives.";
    } else if (path.includes('/universe')) {
      return "This scene has a strong emotional arc — want me to show similar universes?";
    } else if (path.includes('/create') || path.includes('/studio')) {
      return "Your voice track in Scene 3 peaks too early — shall I balance it?";
    } else if (path.includes('/feed')) {
      return "Your post on Ethereal Engines is trending — reply with a short AI teaser?";
    } else {
      return "Welcome to CineVerse. How can I guide your journey today?";
    }
  };

  // Quick prompt suggestions based on context
  const getQuickPrompts = (path: string) => {
    if (path.includes('/explore')) {
      return [
        "Show me trending universes",
        "Guide me to romantic sci-fi",
        "Find similar creators",
      ];
    } else if (path.includes('/create') || path.includes('/studio')) {
      return [
        "Analyze my creator stats",
        "Generate a tagline for my story",
        "Optimize my scene timing",
      ];
    }
    return [
      "Show me trending universes",
      "Guide me to romantic sci-fi",
      "Analyze my creator stats",
    ];
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getContextualGreeting(location.pathname),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setEmotionalState('informative');
    }, 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // TODO: Implement actual voice recognition
  };

  // Dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isExpanded) {
      setIsDragging(true);
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setOrbPosition({
          x: e.clientX - window.innerWidth + 100,
          y: e.clientY - window.innerHeight + 100,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      {/* Floating Orb Avatar */}
      <motion.div
        ref={orbRef}
        className={cn(
          "fixed z-50 cursor-pointer select-none",
          isExpanded ? "bottom-8 right-[420px]" : "bottom-8 right-8"
        )}
        style={{
          transform: !isExpanded ? `translate(${orbPosition.x}px, ${orbPosition.y}px)` : undefined,
        }}
        onMouseDown={handleMouseDown}
        onClick={() => !isDragging && setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* Main Orb */}
          <motion.div
            className={cn(
              "w-20 h-20 rounded-full bg-gradient-to-br",
              emotionalColors[emotionalState],
              "shadow-2xl backdrop-blur-sm"
            )}
            animate={{
              boxShadow: [
                `0 0 20px 10px rgba(0, 234, 255, 0.3)`,
                `0 0 40px 20px rgba(162, 77, 246, 0.4)`,
                `0 0 20px 10px rgba(0, 234, 255, 0.3)`,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Particle Rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-cyan-400/20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7,
              }}
            />
          ))}

          {/* Speaking Indicator */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
      </motion.div>

      {/* Expandable Chat Sidebar */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 h-screen w-[400px] z-40 bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full bg-gradient-to-br",
                    emotionalColors[emotionalState]
                  )} />
                  <div>
                    <h3 className="font-semibold text-lg">Atlas</h3>
                    <p className="text-xs text-muted-foreground">Your CineVerse Guide</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  >
                    {isVoiceEnabled ? (
                      <Volume2 className="w-4 h-4" />
                    ) : (
                      <VolumeX className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Mode Selector */}
              <div className="flex gap-2">
                {(['companion', 'narrator', 'mentor'] as AtlasMode[]).map((m) => (
                  <Button
                    key={m}
                    variant={mode === m ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMode(m)}
                    className="text-xs capitalize"
                  >
                    {m}
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[calc(100vh-280px)]">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground mt-12">
                  <p className="mb-4">Ask Atlas anything about CineVerse</p>
                  <div className="space-y-2">
                    {getQuickPrompts(location.pathname).map((prompt) => (
                      <Button
                        key={prompt}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickPrompt(prompt)}
                        className="w-full text-left justify-start text-xs"
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-3",
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && (
                      <div className={cn(
                        "w-8 h-8 rounded-full bg-gradient-to-br flex-shrink-0",
                        emotionalColors[emotionalState]
                      )} />
                    )}
                    <div
                      className={cn(
                        "px-4 py-3 rounded-2xl max-w-[75%]",
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Quick Prompts */}
            {messages.length > 0 && (
              <div className="px-6 pb-3 flex gap-2 flex-wrap">
                {getQuickPrompts(location.pathname).map((prompt) => (
                  <Button
                    key={prompt}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-xs"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-6 border-t border-border/50">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleVoiceToggle}
                  className={cn(
                    isListening && "bg-red-500/20 border-red-500"
                  )}
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Ask Atlas anything…"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(inputValue);
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
