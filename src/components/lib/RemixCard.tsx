import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Copy } from 'lucide-react';
import { CosmoCard, CosmoCardBody } from './CosmoCard';
import { CosmoBadge } from './CosmoBadge';
import { CosmoButton } from './CosmoButton';

interface RemixCardProps {
  id: string;
  title: string;
  creatorName: string;
  parentCreatorName: string;
  remixType: 'scene' | 'character' | 'story' | 'visual' | 'audio' | 'full';
  views: number;
  likes: number;
  changesSummary: string;
  creditsGiven: boolean;
}

const remixTypeLabels = {
  scene: 'Scene Remix',
  character: 'Character Study',
  story: 'Story Remix',
  visual: 'Visual Effects',
  audio: 'Audio Remix',
  full: 'Full Remake',
};

const RemixCard = React.forwardRef<HTMLDivElement, RemixCardProps>(
  (
    {
      id,
      title,
      creatorName,
      parentCreatorName,
      remixType,
      views,
      likes,
      changesSummary,
      creditsGiven,
    },
    ref,
  ) => {
    return (
      <CosmoCard
        ref={ref}
        variant="interactive"
        className="overflow-hidden flex flex-col h-full hover:scale-105 transition-transform"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-[#a24df6]/10 to-[#00eaff]/10">
          <CosmoBadge variant="purple" size="sm">
            {remixTypeLabels[remixType]}
          </CosmoBadge>
          {creditsGiven && (
            <CosmoBadge variant="cyan" size="sm" className="ml-2">
              Credits Given
            </CosmoBadge>
          )}
        </div>

        {/* Content */}
        <CosmoCardBody className="flex-1 flex flex-col">
          <h3 className="font-display font-bold text-lg text-white/90 mb-2 line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-white/60 mb-3">
            by <span className="text-[#00eaff] font-semibold">@{creatorName}</span>
          </p>

          <p className="text-sm text-white/50 border-l-2 border-[#a24df6]/30 pl-3 mb-4">
            {changesSummary}
          </p>

          <p className="text-xs text-white/40 mb-4">
            Remix of <span className="text-[#a24df6]">@{parentCreatorName}'s</span> universe
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
            <div className="flex items-center gap-3 text-white/60 text-sm">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-[#00eaff]" />
                <span>{(views / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-[#ff006e]" />
                <span>{(likes / 1000).toFixed(1)}K</span>
              </div>
            </div>
            <CosmoButton cosmicVariant="glowing" size="sm">
              <Copy className="w-4 h-4 mr-1" />
              Remix It
            </CosmoButton>
          </div>
        </CosmoCardBody>
      </CosmoCard>
    );
  },
);

RemixCard.displayName = 'RemixCard';

export { RemixCard };
export type { RemixCardProps };
