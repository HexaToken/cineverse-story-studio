import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';
import { CosmoCard, CosmoCardBody } from './CosmoCard';
import { CosmoBadge } from './CosmoBadge';
import { CosmoButton } from './CosmoButton';
import { cn } from '@/lib/utils';

interface StoryCardProps {
  id: string | number;
  title: string;
  rating?: number;
  views: string;
  duration?: string;
  isLive?: boolean;
  thumbnail?: string;
  href?: string;
}

const StoryCard = React.forwardRef<HTMLDivElement, StoryCardProps>(
  (
    {
      id,
      title,
      rating,
      views,
      duration = '45m',
      isLive = false,
      thumbnail = 'gradient-cyan',
      href = `/story/${id}`,
    },
    ref,
  ) => {
    const thumbnailGradients = {
      'gradient-cyan': 'from-[#00eaff] to-[#00a8cc]',
      'gradient-purple': 'from-[#a24df6] to-[#7e39d4]',
      'gradient-pink': 'from-[#ff006e] to-[#d60054]',
    } as Record<string, string>;

    const gradClass = thumbnailGradients[thumbnail as keyof typeof thumbnailGradients] || thumbnailGradients['gradient-cyan'];

    return (
      <CosmoCard
        ref={ref}
        variant="default"
        className="overflow-hidden flex flex-col h-full hover:scale-105 transition-transform"
      >
        {/* Thumbnail */}
        <div className={cn('relative h-40 bg-gradient-to-br overflow-hidden group', gradClass)}>
          {isLive && (
            <div className="absolute top-3 left-3 z-10">
              <CosmoBadge variant="error" size="sm">
                LIVE
              </CosmoBadge>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Link to={href} className="absolute inset-0 flex items-center justify-center">
            <Play className="w-10 h-10 text-white/80 group-hover:text-white transition-colors" />
          </Link>
        </div>

        {/* Content */}
        <CosmoCardBody className="flex-1 flex flex-col">
          <h3 className="font-display font-bold text-sm text-white/90 mb-2 line-clamp-2">{title}</h3>

          <div className="flex-1 flex items-end justify-between mb-3">
            <div className="flex gap-2 text-white/60 text-xs">
              {!isLive && (
                <>
                  <span>{views}</span>
                  <span>•</span>
                </>
              )}
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{duration}</span>
              </div>
            </div>
            {rating && <span className="text-[#00eaff] font-semibold text-sm">★ {rating}</span>}
          </div>

          <Link to={href} className="w-full">
            <CosmoButton cosmicVariant="glowing" className="w-full" size="sm">
              Watch
            </CosmoButton>
          </Link>
        </CosmoCardBody>
      </CosmoCard>
    );
  },
);

StoryCard.displayName = 'StoryCard';

export { StoryCard };
export type { StoryCardProps };
