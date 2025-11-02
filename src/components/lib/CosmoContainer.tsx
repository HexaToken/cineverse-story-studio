import React from 'react';
import { cn } from '@/lib/utils';

interface CosmoContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}

const sizeStyles = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-7xl',
  full: 'w-full',
};

const CosmoContainer = React.forwardRef<HTMLDivElement, CosmoContainerProps>(
  ({ className, size = 'lg', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mx-auto px-6', sizeStyles[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CosmoContainer.displayName = 'CosmoContainer';

export { CosmoContainer };
export type { CosmoContainerProps };
