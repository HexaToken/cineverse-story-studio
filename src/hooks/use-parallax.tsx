import { useEffect, useRef, useState } from 'react';

interface ParallaxOptions {
  offset?: number;
  speed?: number;
  direction?: 'up' | 'down';
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const {
    offset = 0,
    speed = 0.5,
    direction = 'up'
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('translateY(0px)');

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const scrollY = window.scrollY;
      const elementOffset = ref.current.getBoundingClientRect().top + scrollY;
      const distance = scrollY - (elementOffset - window.innerHeight);

      if (distance > -window.innerHeight * 2 && distance < window.innerHeight * 2) {
        const parallaxValue = distance * speed;
        const finalValue = direction === 'up' 
          ? parallaxValue + offset 
          : -parallaxValue + offset;

        setTransform(`translateY(${finalValue}px)`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset, speed, direction]);

  return {
    ref,
    style: {
      transform,
      willChange: 'transform',
      transition: 'transform 0.1s ease-out'
    }
  };
};

export const useParallaxElements = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<Array<{
    element: HTMLElement;
    offset: number;
    speed: number;
  }>>([]);

  useEffect(() => {
    if (!ref.current) return;

    // Find all elements with data-parallax attribute
    const parallaxElements = ref.current.querySelectorAll('[data-parallax]');

    const elementData = Array.from(parallaxElements).map((el: Element) => {
      const htmlEl = el as HTMLElement;
      const speed = parseFloat(htmlEl.dataset.parallax || '0.5');
      const offset = htmlEl.getBoundingClientRect().top + window.scrollY;

      return { element: htmlEl, offset, speed };
    });

    setElements(elementData);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      elements.forEach(({ element, offset, speed }) => {
        const distance = (window.scrollY - offset + window.innerHeight) * speed;
        element.style.transform = `translateY(${distance}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elements]);

  return ref;
};
