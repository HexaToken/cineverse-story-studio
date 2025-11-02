import React from 'react';
import { cn } from '@/lib/utils';

interface CosmoTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body' | 'caption' | 'label' | 'muted';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  children: React.ReactNode;
}

const variantStyles = {
  body: 'text-white/80',
  caption: 'text-white/60 text-sm',
  label: 'text-white/70 font-semibold',
  muted: 'text-white/50',
};

const sizeStyles = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const CosmoText = React.forwardRef<HTMLParagraphElement, CosmoTextProps>(
  ({ className, variant = 'body', size = 'base', children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);

CosmoText.displayName = 'CosmoText';

export { CosmoText };
export type { CosmoTextProps };
