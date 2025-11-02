import React from 'react';
import { cn } from '@/lib/utils';

interface CosmoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 'auto';
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const columnStyles = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const gapStyles = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

const CosmoGrid = React.forwardRef<HTMLDivElement, CosmoGridProps>(
  ({ className, columns = 'auto', gap = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('grid', columnStyles[columns], gapStyles[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CosmoGrid.displayName = 'CosmoGrid';

export { CosmoGrid };
export type { CosmoGridProps };
