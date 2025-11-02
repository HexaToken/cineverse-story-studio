import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Modal that shows as a slide-up drawer on mobile, overlay on desktop
 */
export const ResponsiveModal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ResponsiveModalProps) => {
  const isMobile = useIsMobile();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div
        className={cn(
          'fixed bg-[#0a0b1a] border-t border-white/10 md:border rounded-t-2xl md:rounded-lg',
          isMobile ? 'inset-x-0 bottom-0 max-h-[90vh]' : 'inset-0 m-4 md:m-auto md:h-auto md:w-full md:max-w-2xl',
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {title && <h2 className="font-display text-xl font-bold text-white">{title}</h2>}
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(100vh-120px)] md:max-h-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveModal;
