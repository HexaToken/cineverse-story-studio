import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
  const glitchVariants = {
    initial: {
      textShadow: '0 0 0 transparent'
    },
    animate: {
      textShadow: [
        '0 0 0 transparent',
        '-2px -2px 0 #00eaff, 2px 2px 0 #a24df6',
        '0 0 0 transparent',
        '2px 2px 0 #00eaff, -2px -2px 0 #a24df6',
        '0 0 0 transparent'
      ]
    }
  };

  const letterVariants = {
    initial: { x: 0, opacity: 1 },
    animate: {
      x: [0, -2, 2, -2, 0],
      opacity: [1, 0.8, 1, 0.8, 1],
      transition: {
        duration: 0.3,
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: Infinity,
        repeatDelay: 4
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={glitchVariants}
      initial="initial"
      animate="animate"
      transition={{
        duration: 0.3,
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: Infinity,
        repeatDelay: 4
      }}
    >
      {text.split('').map((char, idx) => (
        <motion.span
          key={idx}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: idx * 0.03,
            duration: 0.3,
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: Infinity,
            repeatDelay: 4
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default GlitchText;
