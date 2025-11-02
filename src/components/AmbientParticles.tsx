import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface AmbientParticlesProps {
  density?: number;
  speed?: number;
  colors?: string[];
  className?: string;
}

const AmbientParticles = ({
  density = 30,
  speed = 0.5,
  colors = ['#00eaff', '#a24df6', '#ff006e'],
  className = ''
}: AmbientParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < density; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: Math.random() * 300 + 200
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent background
      ctx.fillStyle = 'rgba(10, 11, 26, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += 1;

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Calculate current opacity based on life
        const lifeRatio = particle.life / particle.maxLife;
        const fadeOpacity = lifeRatio < 0.5
          ? particle.opacity * (lifeRatio * 2)
          : particle.opacity * (2 - lifeRatio * 2);

        // Draw particle with glow
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = `${particle.color}${Math.round(fadeOpacity * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Reset particle when it dies
        if (particle.life > particle.maxLife) {
          particlesRef.current[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 0,
            maxLife: Math.random() * 300 + 200
          };
        }
      });

      ctx.shadowColor = 'transparent';
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [density, speed, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none opacity-30 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default AmbientParticles;
