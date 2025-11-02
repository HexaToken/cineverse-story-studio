import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
}

const PageTransition = ({ 
  children, 
  direction = "left" 
}: PageTransitionProps) => {
  const getVariants = () => {
    const baseVariants = {
      initial: {
        opacity: 0,
        transition: { duration: 0.3 }
      },
      enter: {
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
      },
      exit: {
        opacity: 0,
        transition: { duration: 0.3, ease: "easeIn" }
      }
    };

    const directionVariants: Record<string, any> = {
      left: {
        initial: { x: 100, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 }
      },
      right: {
        initial: { x: -100, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 }
      },
      up: {
        initial: { y: 100, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 }
      },
      down: {
        initial: { y: -100, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        exit: { y: 100, opacity: 0 }
      }
    };

    return {
      ...baseVariants,
      ...directionVariants[direction]
    };
  };

  const variants = getVariants();

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
