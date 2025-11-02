import React from 'react';
import { cn } from '@/lib/utils';

interface CosmoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'glowing' | 'subtle';
  hoverable?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  default: 'bg-white/5 border-[#00eaff]/20 hover:border-[#00eaff]/40',
  interactive: 'bg-white/8 border-[#a24df6]/30 hover:bg-white/10 hover:border-[#a24df6]/60',
  glowing: 'bg-white/5 border-[#00eaff]/20 shadow-glow-cyan hover:shadow-lg',
  subtle: 'bg-white/[0.03] border-white/10 hover:border-white/20',
};

const CosmoCard = React.forwardRef<HTMLDivElement, CosmoCardProps>(
  ({ className, variant = 'default', hoverable = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl backdrop-blur-xl border transition-all duration-300',
          variantStyles[variant],
          hoverable && 'cursor-pointer',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CosmoCard.displayName = 'CosmoCard';

interface CosmoCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CosmoCardHeader = React.forwardRef<HTMLDivElement, CosmoCardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
);

CosmoCardHeader.displayName = 'CosmoCardHeader';

interface CosmoCardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const CosmoCardBody = React.forwardRef<HTMLDivElement, CosmoCardBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 pb-6', className)} {...props} />
  ),
);

CosmoCardBody.displayName = 'CosmoCardBody';

interface CosmoCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: 'sm' | 'md' | 'lg';
}

const CosmoCardTitle = React.forwardRef<HTMLHeadingElement, CosmoCardTitleProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeStyles = {
      sm: 'text-lg font-semibold',
      md: 'text-xl font-bold',
      lg: 'text-2xl font-bold',
    };

    return (
      <h3
        ref={ref}
        className={cn('text-white/90 font-display', sizeStyles[size], className)}
        {...props}
      />
    );
  },
);

CosmoCardTitle.displayName = 'CosmoCardTitle';

interface CosmoCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CosmoCardDescription = React.forwardRef<
  HTMLParagraphElement,
  CosmoCardDescriptionProps
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-white/60', className)} {...props} />
));

CosmoCardDescription.displayName = 'CosmoCardDescription';

interface CosmoCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CosmoCardFooter = React.forwardRef<HTMLDivElement, CosmoCardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-between px-6 pb-6 pt-0', className)} {...props} />
  ),
);

CosmoCardFooter.displayName = 'CosmoCardFooter';

export {
  CosmoCard,
  CosmoCardHeader,
  CosmoCardBody,
  CosmoCardTitle,
  CosmoCardDescription,
  CosmoCardFooter,
};
