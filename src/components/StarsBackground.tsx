import { useEffect, useRef } from 'react';

interface StarsBackgroundProps {
  count?: number;
  className?: string;
  speed?: number;
}

const StarsBackground = ({ count = 100, className = '', speed = 0.5 }: StarsBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars with position and twinkle
    interface Star {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }

    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: (Math.random() * speed + 0.5) * 0.02,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }

    let animationFrame = 0;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(10, 11, 26, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update stars
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;

        // Calculate twinkle using sine wave
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        const finalOpacity = star.opacity * twinkle;

        // Draw star with glow
        ctx.fillStyle = `rgba(0, 234, 255, ${finalOpacity})`;
        ctx.shadowColor = '#00eaff';
        ctx.shadowBlur = star.radius * 2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowColor = 'transparent';
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [count, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none -z-10 ${className}`}
    />
  );
};

export default StarsBackground;
