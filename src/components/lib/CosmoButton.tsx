import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CosmoButtonProps extends ButtonProps {
  cosmicVariant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'glowing' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const cosmoVariants = {
  primary:
    'bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white hover:shadow-glow-cyan transition-all duration-300',
  secondary: 'bg-white/10 text-white border-[#00eaff]/30 hover:bg-white/15 border',
  accent: 'bg-[#ff006e]/20 text-[#ff006e] border-[#ff006e]/40 hover:bg-[#ff006e]/30 border',
  ghost: 'text-white/80 hover:text-white hover:bg-white/5',
  glowing: 'bg-white/5 border-[#00eaff]/20 text-white hover:border-[#00eaff]/60 shadow-glow-cyan border',
  outline: 'border-2 border-[#a24df6]/50 text-white hover:bg-[#a24df6]/10',
};

const CosmoButton = React.forwardRef<HTMLButtonElement, CosmoButtonProps>(
  ({ cosmicVariant = 'primary', className, size = 'md', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          'font-display font-semibold rounded-lg transition-all duration-300',
          cosmoVariants[cosmicVariant],
          className,
        )}
        size={size}
        variant="ghost"
        {...props}
      />
    );
  },
);

CosmoButton.displayName = 'CosmoButton';

export { CosmoButton };
export type { CosmoButtonProps };
