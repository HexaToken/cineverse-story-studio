import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '@/context/SearchContext';
import {
  Search,
  X,
  Clock,
  Zap,
  Globe,
  Users,
  Hash,
  Filter,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const GlobalSearch = () => {
  const {
    query,
    results,
    suggestedQueries,
    popularTags,
    recentSearches,
    isLoading,
    setQuery,
    search,
    updateFilters,
    addToRecentSearches,
    clearRecentSearches,
  } = useSearch();

  const [isOpen, setIsOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    addToRecentSearches(searchQuery);
  };

  const handleTagClick = (tag: string) => {
    handleSearch(tag);
  };

  const resultsByType = {
    universe: results.filter(r => r.type === 'universe'),
    creator: results.filter(r => r.type === 'creator'),
    story: results.filter(r => r.type === 'story'),
    tag: results.filter(r => r.type === 'tag'),
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
        <input
          type="text"
          placeholder="Search universes, creators, stories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-11 pr-12 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#00eaff]/40 focus:ring-1 focus:ring-[#00eaff]/20"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#0a0b1a]/95 backdrop-blur-xl border border-[#00eaff]/20 rounded-lg shadow-2xl overflow-hidden">
          {/* Filter Panel */}
          {showFilters && (
            <div className="border-b border-white/10 p-4 space-y-3">
              <div>
                <label className="text-white/70 text-xs font-semibold block mb-2">
                  Content Type
                </label>
                <div className="flex gap-2 flex-wrap">
                  {(['universe', 'creator', 'story', 'tag'] as const).map(type => (
                    <Badge
                      key={type}
                      className="cursor-pointer"
                      variant="outline"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-white/70 text-xs font-semibold block mb-2">
                  Sort By
                </label>
                <select className="w-full bg-white/5 border border-white/10 rounded text-white text-sm px-2 py-1">
                  <option>Relevance</option>
                  <option>Most Views</option>
                  <option>Highest Rated</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          )}

          {/* Search Results or Suggestions */}
          <div className="max-h-96 overflow-y-auto">
            {query ? (
              // Results view
              isLoading ? (
                <div className="p-4 text-center text-white/60">
                  <Zap className="w-6 h-6 mx-auto mb-2 animate-spin" />
                  Searching...
                </div>
              ) : results.length === 0 ? (
                <div className="p-4 text-center text-white/60">
                  <Globe className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p>No results found for "{query}"</p>
                  <p className="text-xs mt-2">Try different keywords</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {/* Universes */}
                  {resultsByType.universe.length > 0 && (
                    <div>
                      <div className="px-4 py-2 text-xs font-semibold text-[#00eaff] uppercase tracking-wider bg-white/5">
                        <Globe className="w-3 h-3 inline mr-2" />
                        Universes
                      </div>
                      {resultsByType.universe.slice(0, 3).map(result => (
                        <Link
                          key={result.id}
                          to={`/universe/${result.id}`}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 hover:bg-white/5 transition-colors group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-white font-medium text-sm">{result.title}</p>
                              <p className="text-white/50 text-xs line-clamp-1">
                                {result.description}
                              </p>
                              <div className="flex gap-2 mt-1">
                                {result.metadata?.creator && (
                                  <span className="text-[#a24df6] text-xs">@{result.metadata.creator}</span>
                                )}
                                {result.metadata?.genre && (
                                  <span className="text-white/40 text-xs">{result.metadata.genre}</span>
                                )}
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </Link>
                      ))}
                      {resultsByType.universe.length > 3 && (
                        <Link
                          to={`/discover?search=${query}`}
                          className="px-4 py-2 text-xs text-[#00eaff] hover:bg-white/5 block"
                        >
                          View all {resultsByType.universe.length} universes →
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Creators */}
                  {resultsByType.creator.length > 0 && (
                    <div className="border-t border-white/10">
                      <div className="px-4 py-2 text-xs font-semibold text-[#a24df6] uppercase tracking-wider bg-white/5">
                        <Users className="w-3 h-3 inline mr-2" />
                        Creators
                      </div>
                      {resultsByType.creator.slice(0, 3).map(result => (
                        <Link
                          key={result.id}
                          to={`/creator/${result.id}`}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 hover:bg-white/5 transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-medium text-sm">@{result.title}</p>
                              <p className="text-white/50 text-xs">{result.description}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  {resultsByType.tag.length > 0 && (
                    <div className="border-t border-white/10">
                      <div className="px-4 py-2 text-xs font-semibold text-[#ff006e] uppercase tracking-wider bg-white/5">
                        <Hash className="w-3 h-3 inline mr-2" />
                        Tags
                      </div>
                      <div className="px-4 py-2 flex gap-2 flex-wrap">
                        {resultsByType.tag.slice(0, 5).map(result => (
                          <Badge
                            key={result.id}
                            onClick={() => handleSearch(result.title)}
                            className="cursor-pointer hover:bg-[#ff006e]/20"
                            variant="outline"
                          >
                            {result.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            ) : (
              // Suggestions view
              <div className="space-y-1 p-4">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white/70 text-xs font-semibold">Recent</p>
                      <button
                        onClick={clearRecentSearches}
                        className="text-white/50 hover:text-white text-xs"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map(recent => (
                        <button
                          key={recent}
                          onClick={() => handleSearch(recent)}
                          className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/5 rounded flex items-center gap-2 text-sm"
                        >
                          <Clock className="w-3 h-3 text-white/40" />
                          {recent}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Tags */}
                {recentSearches.length === 0 && (
                  <div>
                    <p className="text-white/70 text-xs font-semibold mb-2">Popular Tags</p>
                    <div className="flex gap-2 flex-wrap">
                      {popularTags.slice(0, 8).map(tag => (
                        <Badge
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          className="cursor-pointer hover:bg-[#00eaff]/20"
                          variant="outline"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Queries */}
                {suggestedQueries.length > 0 && (
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-white/70 text-xs font-semibold mb-2">Suggestions</p>
                    <div className="space-y-1">
                      {suggestedQueries.map(suggestion => (
                        <button
                          key={suggestion}
                          onClick={() => handleSearch(suggestion)}
                          className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/5 rounded flex items-center gap-2 text-sm"
                        >
                          <Zap className="w-3 h-3 text-[#00eaff]" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
