import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ParallaxHeroProps {
  title: string;
  subtitle?: string;
  backgroundGradient?: string;
  children?: React.ReactNode;
}

const ParallaxHero = ({
  title,
  subtitle,
  backgroundGradient = "from-[#0a0b1a] to-[#10182e]",
  children
}: ParallaxHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }

      // Show/hide scroll indicator based on scroll position
      if (window.scrollY > 100) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative h-screen w-full bg-gradient-to-b ${backgroundGradient} overflow-hidden flex items-center justify-center`}
    >
      {/* Parallax Background Elements */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: scrollY * 0.5,
        }}
      >
        {/* Top gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0b1a]/40" />
        
        {/* Animated background particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00eaff] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
            animate={{
              y: scrollY * (0.2 + (i % 3) * 0.1),
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              opacity: {
                duration: 3 + (i % 2),
                repeat: Infinity,
              },
            }}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{
          y: scrollY * 0.3,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Title with text reveal effect */}
        <motion.h1
          className="font-display text-6xl md:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="bg-gradient-to-r from-[#00eaff] via-white to-[#a24df6] bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Custom Children */}
        {children && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Floating Scroll Indicator */}
      {!isScrolling && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-white/60 font-medium">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-[#00eaff]/40 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-[#00eaff] rounded-full mt-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0b1a] to-transparent pointer-events-none" />
    </div>
  );
};

export default ParallaxHero;
