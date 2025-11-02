import { motion } from 'framer-motion';

interface OrbitingElementsProps {
  items?: number;
  radius?: number;
  duration?: number;
  colors?: string[];
  size?: number;
}

const OrbitingElements = ({
  items = 6,
  radius = 150,
  duration = 20,
  colors = ['#00eaff', '#a24df6', '#ff006e'],
  size = 12
}: OrbitingElementsProps) => {
  const elements = Array.from({ length: items }, (_, i) => ({
    id: i,
    angle: (i / items) * Math.PI * 2,
    color: colors[i % colors.length]
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Center dot */}
      <div
        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-[#00eaff] to-[#a24df6]"
        style={{
          boxShadow: '0 0 20px rgba(0,234,255,0.6)'
        }}
      />

      {/* Orbiting elements */}
      {elements.map((element) => {
        const x = Math.cos(element.angle) * radius;
        const y = Math.sin(element.angle) * radius;

        return (
          <motion.div
            key={element.id}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: element.color,
              boxShadow: `0 0 ${size * 2}px ${element.color}`,
              x,
              y
            }}
            animate={{
              x: [x, x],
              y: [y, y]
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear'
            }}
            initial={{
              rotate: element.angle * (180 / Math.PI)
            }}
            whileInView={{
              opacity: [0.3, 1, 0.3]
            }}
          />
        );
      })}

      {/* Orbit line */}
      <svg
        className="absolute w-full h-full pointer-events-none"
        style={{ opacity: 0.2 }}
      >
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="url(#orbitGradient)"
          strokeWidth="1"
          strokeDasharray="5 5"
        />
        <defs>
          <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00eaff" />
            <stop offset="50%" stopColor="#a24df6" />
            <stop offset="100%" stopColor="#ff006e" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default OrbitingElements;
