import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#00eaff] to-[#a24df6] z-50 origin-left"
        style={{
          scaleX: scrollProgress / 100,
          boxShadow: '0 0 20px rgba(0,234,255,0.6)'
        }}
      />

      {/* Bottom scroll indicator (appears on mobile) */}
      <div className="fixed bottom-4 right-4 hidden md:flex items-center gap-2 z-40">
        <span className="text-xs text-white/60 font-medium">
          {Math.round(scrollProgress)}%
        </span>
        <div className="w-8 h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00eaff] to-[#a24df6]"
            style={{
              width: `${scrollProgress}%`,
            }}
          />
        </div>
      </div>

      {/* Fixed corner indicator */}
      <motion.div
        className="fixed top-24 right-4 hidden lg:flex flex-col items-center gap-4 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollProgress > 5 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-12 h-12">
          {/* Rotating circle background */}
          <motion.svg
            className="absolute inset-0"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="rgba(0,234,255,0.2)"
              strokeWidth="1"
              strokeDasharray="138 138"
            />
          </motion.svg>

          {/* Progress circle */}
          <svg
            className="absolute inset-0"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="2"
              strokeDasharray={`${138 * (scrollProgress / 100)} 138`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00eaff" />
                <stop offset="100%" stopColor="#a24df6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-[#00eaff]">
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ScrollProgress;
