import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  CosmoSection,
  CosmoContainer,
  CosmoHeading,
  CosmoGrid,
  UniverseCard,
  CreatorCard,
  CosmoCard,
  CosmoCardBody,
} from '@/components/lib';
import { useSearch } from '@/context';
import { Globe, Users, Hash, SearchX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SearchResults = () => {
  const { query, results, isLoading } = useSearch();

  const resultsByType = {
    universe: results.filter(r => r.type === 'universe'),
    creator: results.filter(r => r.type === 'creator'),
    story: results.filter(r => r.type === 'story'),
    tag: results.filter(r => r.type === 'tag'),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b1a] to-[#10182e]">
      <Header />

      {/* Hero */}
      <CosmoSection>
        <CosmoContainer>
          <div className="space-y-6">
            <div>
              <CosmoHeading size="2xl" level="h1" gradient>
                Search Results
              </CosmoHeading>
              {query && (
                <p className="text-white/60 text-lg mt-2">
                  Results for "<span className="text-[#00eaff] font-semibold">{query}</span>"
                </p>
              )}
            </div>

            {/* Results Summary */}
            {!isLoading && results.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {resultsByType.universe.length > 0 && (
                  <Badge className="bg-[#00eaff]/10 text-[#00eaff] border-[#00eaff]/30">
                    <Globe className="w-3 h-3 mr-1" />
                    {resultsByType.universe.length} Universes
                  </Badge>
                )}
                {resultsByType.creator.length > 0 && (
                  <Badge className="bg-[#a24df6]/10 text-[#a24df6] border-[#a24df6]/30">
                    <Users className="w-3 h-3 mr-1" />
                    {resultsByType.creator.length} Creators
                  </Badge>
                )}
                {resultsByType.tag.length > 0 && (
                  <Badge className="bg-[#ff006e]/10 text-[#ff006e] border-[#ff006e]/30">
                    <Hash className="w-3 h-3 mr-1" />
                    {resultsByType.tag.length} Tags
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CosmoContainer>
      </CosmoSection>

      {/* Results */}
      <CosmoSection>
        <CosmoContainer>
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin mb-4">
                  <Globe className="w-12 h-12 text-[#00eaff]/50" />
                </div>
                <p className="text-white/60">Searching the multiverse...</p>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <SearchX className="w-16 h-16 text-white/20 mx-auto" />
                <h3 className="font-display text-2xl font-bold text-white">No results found</h3>
                <p className="text-white/60">
                  Try searching for universes, creators, or tags using different keywords
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Universes */}
              {resultsByType.universe.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Globe className="w-6 h-6 text-[#00eaff]" />
                    <h2 className="font-display text-2xl font-bold text-white">Universes</h2>
                    <Badge variant="outline" className="text-white/60">
                      {resultsByType.universe.length}
                    </Badge>
                  </div>
                  <CosmoGrid columns={3}>
                    {resultsByType.universe.map(result => (
                      <UniverseCard
                        key={result.id}
                        id={result.id}
                        title={result.title}
                        creator={result.metadata?.creator || 'Unknown'}
                        genre={result.metadata?.genre || 'General'}
                        views={result.metadata?.views || '0'}
                        rating={result.metadata?.rating || 0}
                        href={`/universe/${result.id}`}
                      />
                    ))}
                  </CosmoGrid>
                </div>
              )}

              {/* Creators */}
              {resultsByType.creator.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Users className="w-6 h-6 text-[#a24df6]" />
                    <h2 className="font-display text-2xl font-bold text-white">Creators</h2>
                    <Badge variant="outline" className="text-white/60">
                      {resultsByType.creator.length}
                    </Badge>
                  </div>
                  <CosmoGrid columns={4}>
                    {resultsByType.creator.map((result, idx) => (
                      <CreatorCard
                        key={result.id}
                        id={result.id}
                        name={result.title.replace('@', '')}
                        specialty={result.description || 'Creator'}
                        universes={Math.floor(Math.random() * 50) + 1}
                        href={`/creator/${result.id}`}
                      />
                    ))}
                  </CosmoGrid>
                </div>
              )}

              {/* Tags */}
              {resultsByType.tag.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Hash className="w-6 h-6 text-[#ff006e]" />
                    <h2 className="font-display text-2xl font-bold text-white">Tags</h2>
                    <Badge variant="outline" className="text-white/60">
                      {resultsByType.tag.length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {resultsByType.tag.map(tag => (
                      <Link
                        key={tag.id}
                        to={`/search?tag=${tag.title}`}
                        className="group"
                      >
                        <CosmoCard variant="interactive" className="hover:border-[#ff006e]/50">
                          <CosmoCardBody>
                            <div className="flex items-center gap-3">
                              <Hash className="w-5 h-5 text-[#ff006e]" />
                              <span className="font-semibold text-white text-lg">{tag.title}</span>
                            </div>
                            <p className="text-white/50 text-sm mt-2">
                              Discover content with this tag
                            </p>
                          </CosmoCardBody>
                        </CosmoCard>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CosmoContainer>
      </CosmoSection>

      <Footer />
    </div>
  );
};

export default SearchResults;
