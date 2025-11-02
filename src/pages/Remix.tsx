import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Copy, Plus, Filter, TrendingUp, Heart, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  CosmoSection,
  CosmoContainer,
  CosmoHeading,
  CosmoGrid,
  CosmoButton,
  CosmoCard,
  CosmoCardBody,
  CosmoCardTitle,
  RemixCard,
  SectionHeader,
  CosmoBadge,
} from '@/components/lib';
import { useRemix, useUniverse } from '@/context';

const Remix = () => {
  const { universeId } = useParams<{ universeId: string }>();
  const { fetchRemixes, remixes, isLoading } = useRemix();
  const { universes } = useUniverse();

  useEffect(() => {
    if (universeId) {
      fetchRemixes(universeId);
    }
  }, [universeId, fetchRemixes]);

  const currentUniverse = universes.find(u => u.id === universeId);

  const remixTypes = [
    { id: 'all', label: 'All Remixes', count: remixes.length },
    { id: 'story', label: 'Story Remixes', count: remixes.filter(r => r.remixType === 'story').length },
    { id: 'character', label: 'Character Studies', count: remixes.filter(r => r.remixType === 'character').length },
    { id: 'visual', label: 'Visual Effects', count: remixes.filter(r => r.remixType === 'visual').length },
    { id: 'audio', label: 'Audio Remixes', count: remixes.filter(r => r.remixType === 'audio').length },
    { id: 'full', label: 'Full Remakes', count: remixes.filter(r => r.remixType === 'full').length },
  ];

  const [selectedType, setSelectedType] = useState('all');

  const filteredRemixes = selectedType === 'all'
    ? remixes
    : remixes.filter(r => r.remixType === selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b1a] to-[#10182e]">
      <Header />

      {/* Hero Banner */}
      <CosmoSection className="border-b border-white/10">
        <CosmoContainer>
          <div className="space-y-6">
            <div>
              <CosmoHeading size="2xl" level="h1" gradient>
                {currentUniverse?.title} - Remix Universe
              </CosmoHeading>
              <p className="text-white/60 text-lg mt-2">
                Explore creative remixes and interpretations of this universe
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-[#00eaff] mb-1">
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">Total Remixes</span>
                </div>
                <p className="font-display text-3xl font-bold text-white">{remixes.length}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-[#a24df6] mb-1">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Total Views</span>
                </div>
                <p className="font-display text-3xl font-bold text-white">
                  {(remixes.reduce((sum, r) => sum + r.views, 0) / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-[#ff006e] mb-1">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Total Likes</span>
                </div>
                <p className="font-display text-3xl font-bold text-white">
                  {(remixes.reduce((sum, r) => sum + r.likes, 0) / 1000).toFixed(0)}K
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <CosmoButton cosmicVariant="primary" size="lg">
              <Copy className="w-5 h-5 mr-2" />
              Create Your Remix
            </CosmoButton>
          </div>
        </CosmoContainer>
      </CosmoSection>

      {/* Main Content */}
      <CosmoSection>
        <CosmoContainer>
          <div className="space-y-8">
            {/* Filter Tabs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-white">Browse Remixes</h2>
                <CosmoButton cosmicVariant="secondary" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </CosmoButton>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {remixTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap font-semibold transition-all ${
                      selectedType === type.id
                        ? 'bg-gradient-to-r from-[#00eaff] to-[#a24df6] text-white'
                        : 'bg-white/5 text-white/70 hover:text-white border border-white/10 hover:border-[#00eaff]/30'
                    }`}
                  >
                    {type.label}
                    <span className="ml-2 text-sm opacity-70">({type.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Remixes Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-white/60">Loading remixes...</p>
              </div>
            ) : filteredRemixes.length === 0 ? (
              <CosmoCard variant="subtle" className="text-center py-12">
                <CosmoCardBody>
                  <Copy className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60 mb-4">No remixes found for this type</p>
                  <CosmoButton cosmicVariant="primary">
                    <Copy className="w-4 h-4 mr-2" />
                    Be the First to Remix
                  </CosmoButton>
                </CosmoCardBody>
              </CosmoCard>
            ) : (
              <CosmoGrid columns={3}>
                {filteredRemixes.map(remix => (
                  <RemixCard
                    key={remix.id}
                    id={remix.id}
                    title={remix.title}
                    creatorName={remix.creatorName}
                    parentCreatorName={remix.parentCreatorName}
                    remixType={remix.remixType}
                    views={remix.views}
                    likes={remix.likes}
                    changesSummary={remix.changesSummary}
                    creditsGiven={remix.creditsGiven}
                  />
                ))}
              </CosmoGrid>
            )}

            {/* Info Card */}
            <CosmoCard variant="interactive">
              <CosmoCardBody className="space-y-4">
                <CosmoCardTitle size="sm">About Remixing</CosmoCardTitle>
                <p className="text-white/70 text-sm leading-relaxed">
                  Remixing is a core feature of CineVerse that allows creators to build upon existing universes
                  while giving proper credit to original creators. When you remix, you're creating your own
                  interpretation while maintaining a link to the source material.
                </p>
                <div className="space-y-2 mt-4">
                  <p className="text-white/60 text-sm font-semibold">Popular Remix Types:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <CosmoBadge variant="cyan" size="sm">Story</CosmoBadge>
                      <span className="text-white/50 text-sm">New narrative</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CosmoBadge variant="purple" size="sm">Character</CosmoBadge>
                      <span className="text-white/50 text-sm">Character focus</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CosmoBadge variant="pink" size="sm">Visual</CosmoBadge>
                      <span className="text-white/50 text-sm">New effects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CosmoBadge variant="cyan" size="sm">Audio</CosmoBadge>
                      <span className="text-white/50 text-sm">New soundtrack</span>
                    </div>
                  </div>
                </div>
              </CosmoCardBody>
            </CosmoCard>
          </div>
        </CosmoContainer>
      </CosmoSection>

      <Footer />
    </div>
  );
};

export default Remix;
