import React from 'react';
import { cn } from '@/lib/utils';

interface CosmoSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  bordered?: boolean;
  variant?: 'default' | 'alt';
}

const CosmoSection = React.forwardRef<HTMLDivElement, CosmoSectionProps>(
  ({ className, bordered = false, variant = 'default', children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'relative py-12 md:py-20 overflow-hidden',
          variant === 'alt' && 'bg-white/[0.02] backdrop-blur-sm',
          bordered && 'border-t border-b border-[#00eaff]/10',
          className,
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-6">{children}</div>
      </section>
    );
  },
);

CosmoSection.displayName = 'CosmoSection';

export { CosmoSection };
