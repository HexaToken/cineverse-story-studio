import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface MobileMenuProps {
  items: MenuItem[];
  className?: string;
}

export const MobileMenu = ({ items, className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('md:hidden', className)}>
      {/* Menu Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="icon"
        className="text-white/70 hover:text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Slide-out Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-[#0a0b1a]/95 backdrop-blur-xl z-40 overflow-y-auto">
          <nav className="space-y-1 p-4">
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {item.icon && <span className="text-lg">{item.icon}</span>}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
