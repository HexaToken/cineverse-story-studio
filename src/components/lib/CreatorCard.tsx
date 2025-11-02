import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Zap } from 'lucide-react';
import { CosmoCard, CosmoCardBody } from './CosmoCard';
import { CosmoBadge } from './CosmoBadge';
import { CosmoButton } from './CosmoButton';
import { cn } from '@/lib/utils';

interface CreatorCardProps {
  id: string | number;
  name: string;
  universes: number;
  specialty: string;
  followers?: number;
  isFollowing?: boolean;
  onFollow?: (id: string | number) => void;
  href?: string;
}

const CreatorCard = React.forwardRef<HTMLDivElement, CreatorCardProps>(
  (
    {
      id,
      name,
      universes,
      specialty,
      followers = 0,
      isFollowing = false,
      onFollow,
      href = `/creator/${id}`,
    },
    ref,
  ) => {
    const colors = ['from-[#00eaff]', 'from-[#a24df6]', 'from-[#ff006e]'];
    const selectedColor = colors[id as number % colors.length];

    return (
      <CosmoCard
        ref={ref}
        variant="default"
        className="overflow-hidden flex flex-col h-full hover:scale-105 transition-transform"
      >
        {/* Avatar Background */}
        <div
          className={cn(
            'h-32 bg-gradient-to-br to-black/20 relative',
            selectedColor,
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-[#00eaff]/40 flex items-center justify-center">
              <span className="text-2xl font-bold text-white/80">{name.charAt(0)}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <CosmoCardBody className="flex-1 flex flex-col -mt-4">
          <div className="text-center mb-4">
            <h3 className="font-display font-bold text-xl text-white/90 mb-1">{name}</h3>
            <p className="text-sm text-white/60">{specialty}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="text-center">
              <div className="text-lg font-bold text-[#00eaff]">{universes}</div>
              <div className="text-xs text-white/60">Universes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#a24df6]">{followers.toLocaleString()}</div>
              <div className="text-xs text-white/60">Followers</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link to={href} className="flex-1">
              <CosmoButton cosmicVariant="secondary" className="w-full" size="sm">
                View Profile
              </CosmoButton>
            </Link>
            <CosmoButton
              cosmicVariant={isFollowing ? 'glowing' : 'accent'}
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.preventDefault();
                onFollow?.(id);
              }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </CosmoButton>
          </div>
        </CosmoCardBody>
      </CosmoCard>
    );
  },
);

CreatorCard.displayName = 'CreatorCard';

export { CreatorCard };
export type { CreatorCardProps };
