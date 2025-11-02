import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Responsive grid that adapts columns for mobile, tablet, and desktop
 */
export const ResponsiveGrid = React.forwardRef<HTMLDivElement, ResponsiveGridProps>(
  (
    {
      className,
      columns = { mobile: 1, tablet: 2, desktop: 3 },
      gap = 'md',
      children,
      ...props
    },
    ref,
  ) => {
    const gapClasses = {
      sm: 'gap-3 md:gap-4',
      md: 'gap-4 md:gap-6',
      lg: 'gap-6 md:gap-8',
    };

    const columnClasses = cn(
      'grid',
      // Mobile
      `grid-cols-${columns.mobile || 1}`,
      // Tablet
      `md:grid-cols-${columns.tablet || 2}`,
      // Desktop
      `lg:grid-cols-${columns.desktop || 3}`,
      gapClasses[gap],
    );

    return (
      <div
        ref={ref}
        className={cn(columnClasses, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ResponsiveGrid.displayName = 'ResponsiveGrid';
