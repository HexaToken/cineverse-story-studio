import React from 'react';
import { cn } from '@/lib/utils';

interface CosmoHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  gradient?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const sizeStyles = {
  xs: 'text-sm font-semibold',
  sm: 'text-lg font-semibold',
  md: 'text-2xl font-bold',
  lg: 'text-3xl md:text-4xl font-bold',
  xl: 'text-4xl md:text-5xl font-bold',
  '2xl': 'text-5xl md:text-6xl font-bold',
};

const CosmoHeading = React.forwardRef<HTMLHeadingElement, CosmoHeadingProps>(
  (
    {
      level = 'h2',
      size = 'md',
      gradient = false,
      glow = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const HeadingTag = level;

    return React.createElement(
      HeadingTag,
      {
        ref,
        className: cn(
          'font-display text-white/90 transition-colors duration-300',
          sizeStyles[size],
          gradient &&
            'bg-gradient-to-r from-[#00eaff] via-[#a24df6] to-[#ff006e] bg-clip-text text-transparent',
          glow && 'drop-shadow-[0_0_20px_rgba(0,234,255,0.5)]',
          className,
        ),
        ...props
      },
      children
    );
  },
);

CosmoHeading.displayName = 'CosmoHeading';

export { CosmoHeading };
export type { CosmoHeadingProps };
