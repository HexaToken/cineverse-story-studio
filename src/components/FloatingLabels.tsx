import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingLabelsProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
}

const FloatingLabels = ({
  children,
  delay = 0,
  duration = 3,
  distance = 10
}: FloatingLabelsProps) => {
  const floatVariants = {
    initial: {
      y: 0,
      opacity: 0.5
    },
    animate: {
      y: [-distance, distance, -distance],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      variants={floatVariants}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
};

export default FloatingLabels;
