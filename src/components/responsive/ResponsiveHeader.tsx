import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileMenu } from './MobileMenu';

interface NavLink {
  label: string;
  href: string;
}

interface ResponsiveHeaderProps {
  logo: string | React.ReactNode;
  navLinks: NavLink[];
  rightContent?: React.ReactNode;
  className?: string;
}

export const ResponsiveHeader = ({
  logo,
  navLinks,
  rightContent,
  className,
}: ResponsiveHeaderProps) => {
  const isMobile = useIsMobile();

  const mobileItems = navLinks.map((link) => ({
    label: link.label,
    href: link.href,
  }));

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-white/10 bg-[#0a0b1a]/95 backdrop-blur-xl',
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">{logo}</div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center gap-8 flex-1 ml-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right Content & Mobile Menu */}
        <div className="flex items-center gap-4 ml-auto">
          {rightContent}
          {isMobile && <MobileMenu items={mobileItems} />}
        </div>
      </div>
    </header>
  );
};

export default ResponsiveHeader;
