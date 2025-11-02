import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, subtitle, children, align = 'left', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mb-12 space-y-2',
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          className,
        )}
        {...props}
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00eaff] via-[#a24df6] to-[#ff006e] bg-clip-text text-transparent">
          {title}
        </h2>
        {subtitle && <p className="text-white/60 text-lg md:text-xl max-w-2xl">{subtitle}</p>}
        {children}
      </div>
    );
  },
);

SectionHeader.displayName = 'SectionHeader';

export { SectionHeader };
