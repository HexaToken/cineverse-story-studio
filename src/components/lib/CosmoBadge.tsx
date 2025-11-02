import React from 'react';
import { cn } from '@/lib/utils';

interface CosmoBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'purple' | 'pink' | 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantStyles = {
  cyan: 'bg-[#00eaff]/20 text-[#00eaff] border-[#00eaff]/30',
  purple: 'bg-[#a24df6]/20 text-[#a24df6] border-[#a24df6]/30',
  pink: 'bg-[#ff006e]/20 text-[#ff006e] border-[#ff006e]/30',
  default: 'bg-white/10 text-white/80 border-white/20',
  success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  warning: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  error: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const sizeStyles = {
  sm: 'px-2.5 py-0.5 text-xs font-semibold',
  md: 'px-3 py-1 text-sm font-semibold',
  lg: 'px-4 py-1.5 text-base font-semibold',
};

const CosmoBadge = React.forwardRef<HTMLSpanElement, CosmoBadgeProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border backdrop-blur-sm',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

CosmoBadge.displayName = 'CosmoBadge';

export { CosmoBadge };
export type { CosmoBadgeProps };
