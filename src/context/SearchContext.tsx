import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Universe } from './UniverseContext';
import { User } from './AuthContext';

export interface SearchResult {
  id: string;
  type: 'universe' | 'creator' | 'story' | 'tag';
  title: string;
  description?: string;
  metadata?: {
    views?: string;
    rating?: number;
    creator?: string;
    genre?: string;
  };
}

export interface SearchFilters {
  type: ('universe' | 'creator' | 'story' | 'tag')[];
  genre?: string;
  minRating?: number;
  sortBy?: 'relevance' | 'views' | 'rating' | 'new';
}

export interface SearchContextType {
  query: string;
  results: SearchResult[];
  filters: SearchFilters;
  isLoading: boolean;
  suggestedQueries: string[];
  popularTags: string[];
  recentSearches: string[];
  
  setQuery: (query: string) => void;
  search: (query: string, filters?: SearchFilters) => Promise<void>;
  updateFilters: (filters: Partial<SearchFilters>) => void;
  addToRecentSearches: (query: string) => void;
  clearRecentSearches: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const mockUniverses: Universe[] = [
  {
    id: 'univ_1',
    title: 'Neural Dawn',
    description: 'A cyberpunk odyssey through digital consciousness',
    creatorId: 'creator_1',
    creatorName: 'AetherMind',
    genre: 'Sci-Fi',
    views: 1200000,
    likes: 45000,
    rating: 4.8,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['cyberpunk', 'ai', 'dystopian'],
  },
  {
    id: 'univ_2',
    title: 'Echo City',
    description: 'A noir mystery set in a rain-soaked metropolis',
    creatorId: 'creator_2',
    creatorName: 'DreamWeaver',
    genre: 'Neo-Noir',
    views: 890000,
    likes: 32000,
    rating: 4.7,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['noir', 'mystery', 'urban'],
  },
  {
    id: 'univ_3',
    title: 'Quantum Hearts',
    description: 'A romance spanning multiple dimensions',
    creatorId: 'creator_3',
    creatorName: 'VoidPoet',
    genre: 'Romance',
    views: 2100000,
    likes: 95000,
    rating: 4.9,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['romance', 'sci-fi', 'emotional'],
  },
];

const mockCreators = [
  { id: 'creator_1', name: 'AetherMind', specialty: 'Sci-Fi & Cyberpunk' },
  { id: 'creator_2', name: 'DreamWeaver', specialty: 'Multiple Genres' },
  { id: 'creator_3', name: 'VoidPoet', specialty: 'Romance & Drama' },
  { id: 'creator_4', name: 'CodeSage', specialty: 'Tech Thrillers' },
  { id: 'creator_5', name: 'StarForge', specialty: 'Fantasy & Adventure' },
];

const mockTags = [
  'cyberpunk', 'ai', 'dystopian', 'noir', 'mystery', 'urban', 'romance', 'sci-fi',
  'fantasy', 'thriller', 'drama', 'adventure', 'horror', 'comedy', 'animated',
];

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQueryState] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filters, setFiltersState] = useState<SearchFilters>({
    type: ['universe', 'creator', 'story'],
    sortBy: 'relevance',
  });

  const suggestedQueries = useMemo(() => {
    if (query.length < 2) return [];
    
    const allTitles = mockUniverses.map(u => u.title);
    const allCreators = mockCreators.map(c => c.name);
    const suggestions = [...allTitles, ...allCreators];
    
    return suggestions
      .filter(s => s.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }, [query]);

  const popularTags = mockTags.slice(0, 10);

  const search = useCallback(
    async (searchQuery: string, searchFilters?: SearchFilters) => {
      setIsLoading(true);
      setQueryState(searchQuery);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const q = searchQuery.toLowerCase();
        const searchResults: SearchResult[] = [];

        // Search universes
        if (searchFilters?.type.includes('universe') || filters.type.includes('universe')) {
          mockUniverses
            .filter(u => {
              const matchesQuery = 
                u.title.toLowerCase().includes(q) ||
                u.description?.toLowerCase().includes(q) ||
                u.tags.some(t => t.toLowerCase().includes(q));
              
              const matchesGenre = !searchFilters?.genre || u.genre === searchFilters.genre;
              const matchesRating = !searchFilters?.minRating || u.rating >= searchFilters.minRating;
              
              return matchesQuery && matchesGenre && matchesRating;
            })
            .forEach(u => {
              searchResults.push({
                id: u.id,
                type: 'universe',
                title: u.title,
                description: u.description,
                metadata: {
                  views: `${(u.views / 1000000).toFixed(1)}M`,
                  rating: u.rating,
                  creator: u.creatorName,
                  genre: u.genre,
                },
              });
            });
        }

        // Search creators
        if (searchFilters?.type.includes('creator') || filters.type.includes('creator')) {
          mockCreators
            .filter(c => c.name.toLowerCase().includes(q) || c.specialty.toLowerCase().includes(q))
            .forEach(c => {
              searchResults.push({
                id: c.id,
                type: 'creator',
                title: c.name,
                description: c.specialty,
              });
            });
        }

        // Search tags
        if (searchFilters?.type.includes('tag') || filters.type.includes('tag')) {
          mockTags
            .filter(t => t.toLowerCase().includes(q))
            .forEach(t => {
              searchResults.push({
                id: `tag_${t}`,
                type: 'tag',
                title: `#${t}`,
              });
            });
        }

        // Sort results
        const sortedResults = [...searchResults].sort((a, b) => {
          if (searchFilters?.sortBy === 'views') {
            const aViews = parseInt(a.metadata?.views || '0');
            const bViews = parseInt(b.metadata?.views || '0');
            return bViews - aViews;
          } else if (searchFilters?.sortBy === 'rating') {
            return (b.metadata?.rating || 0) - (a.metadata?.rating || 0);
          }
          return 0;
        });

        setResults(sortedResults);
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  const setQuery = useCallback((newQuery: string) => {
    setQueryState(newQuery);
    if (newQuery.length > 0) {
      search(newQuery);
    } else {
      setResults([]);
    }
  }, [search]);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFiltersState(updated);
    if (query) {
      search(query, updated);
    }
  }, [query, search, filters]);

  const addToRecentSearches = useCallback((searchQuery: string) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== searchQuery);
      return [searchQuery, ...filtered].slice(0, 10);
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        query,
        results,
        filters,
        isLoading,
        suggestedQueries,
        popularTags,
        recentSearches,
        setQuery,
        search,
        updateFilters,
        addToRecentSearches,
        clearRecentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
