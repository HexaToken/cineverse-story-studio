import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Heart, Eye } from 'lucide-react';
import { CosmoCard, CosmoCardBody } from './CosmoCard';
import { CosmoBadge } from './CosmoBadge';
import { CosmoButton } from './CosmoButton';
import { cn } from '@/lib/utils';

interface UniverseCardProps {
  id: string | number;
  title: string;
  creator: string;
  thumbnail?: string;
  genre: string;
  views: string;
  rating?: number;
  isFavorite?: boolean;
  onFavorite?: (id: string | number) => void;
  href?: string;
}

const UniverseCard = React.forwardRef<HTMLDivElement, UniverseCardProps>(
  (
    {
      id,
      title,
      creator,
      thumbnail = 'gradient-cyan',
      genre,
      views,
      rating,
      isFavorite = false,
      onFavorite,
      href = `/universe/${id}`,
    },
    ref,
  ) => {
    const thumbnailGradients = {
      'gradient-cyan': 'from-[#00eaff] to-[#00a8cc]',
      'gradient-purple': 'from-[#a24df6] to-[#7e39d4]',
      'gradient-pink': 'from-[#ff006e] to-[#d60054]',
      'gradient-blue': 'from-[#0066ff] to-[#0047b2]',
      'gradient-teal': 'from-[#00d4aa] to-[#00a88a]',
    } as Record<string, string>;

    const gradClass = thumbnailGradients[thumbnail as keyof typeof thumbnailGradients] || thumbnailGradients['gradient-cyan'];

    return (
      <CosmoCard
        ref={ref}
        variant="interactive"
        className="overflow-hidden flex flex-col h-full hover:scale-105 transition-transform"
      >
        {/* Thumbnail */}
        <div
          className={cn(
            'relative h-48 bg-gradient-to-br overflow-hidden group',
            gradClass,
          )}
        >
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Link to={href} className="absolute inset-0 flex items-center justify-center">
            <Play className="w-12 h-12 text-white/80 group-hover:text-white transition-colors" />
          </Link>
        </div>

        {/* Content */}
        <CosmoCardBody className="flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg text-white/90 mb-1 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-white/60 mb-3">{creator}</p>
            <div className="flex gap-2 flex-wrap mb-4">
              <CosmoBadge variant="purple" size="sm">
                {genre}
              </CosmoBadge>
              {rating && (
                <CosmoBadge variant="cyan" size="sm">
                  ★ {rating}
                </CosmoBadge>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-white/60">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{views}</span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                onFavorite?.(id);
              }}
              className="text-white/60 hover:text-[#ff006e] transition-colors"
            >
              <Heart
                className="w-5 h-5"
                fill={isFavorite ? '#ff006e' : 'none'}
                stroke={isFavorite ? '#ff006e' : 'currentColor'}
              />
            </button>
          </div>
        </CosmoCardBody>
      </CosmoCard>
    );
  },
);

UniverseCard.displayName = 'UniverseCard';

export { UniverseCard };
export type { UniverseCardProps };
