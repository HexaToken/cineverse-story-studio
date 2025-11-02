import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Responsive container that adjusts padding based on screen size
 */
export const ResponsiveContainer = React.forwardRef<
  HTMLDivElement,
  ResponsiveContainerProps
>(({ className, size = 'md', children, ...props }, ref) => {
  const sizeClasses = {
    sm: 'px-4 md:px-6 py-4 md:py-6',
    md: 'px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12',
    lg: 'px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16',
    xl: 'px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20',
  };

  return (
    <div
      ref={ref}
      className={cn('w-full max-w-7xl mx-auto', sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  );
});

ResponsiveContainer.displayName = 'ResponsiveContainer';
