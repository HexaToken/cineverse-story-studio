import React from 'react';
import { cn } from '@/lib/utils';

interface CosmoIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'cyan' | 'purple' | 'pink' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantStyles = {
  default: 'text-white/70 hover:text-white hover:bg-white/10',
  cyan: 'text-[#00eaff] hover:bg-[#00eaff]/10',
  purple: 'text-[#a24df6] hover:bg-[#a24df6]/10',
  pink: 'text-[#ff006e] hover:text-[#ff006e]/80 hover:bg-[#ff006e]/10',
  subtle: 'text-white/50 hover:text-white/70 hover:bg-white/5',
};

const sizeStyles = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const CosmoIconButton = React.forwardRef<HTMLButtonElement, CosmoIconButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg transition-all duration-300',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

CosmoIconButton.displayName = 'CosmoIconButton';

export { CosmoIconButton };
export type { CosmoIconButtonProps };
