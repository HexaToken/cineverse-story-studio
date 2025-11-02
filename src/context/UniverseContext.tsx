import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Universe {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  genre: string;
  thumbnail?: string;
  views: number;
  likes: number;
  rating: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface UniverseContextType {
  universes: Universe[];
  currentUniverse: Universe | null;
  isLoading: boolean;
  createUniverse: (data: Omit<Universe, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Universe>;
  updateUniverse: (id: string, data: Partial<Universe>) => Promise<void>;
  deleteUniverse: (id: string) => Promise<void>;
  setCurrentUniverse: (universe: Universe | null) => void;
  fetchUniverses: (creatorId?: string) => Promise<void>;
  publishUniverse: (id: string) => Promise<void>;
}

const UniverseContext = createContext<UniverseContextType | undefined>(undefined);

export const UniverseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [universes, setUniverses] = useState<Universe[]>([]);
  const [currentUniverse, setCurrentUniverse] = useState<Universe | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createUniverse = useCallback(
    async (data: Omit<Universe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Universe> => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const newUniverse: Universe = {
          ...data,
          id: `universe_${Date.now()}`,
          views: 0,
          likes: 0,
          rating: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setUniverses(prev => [newUniverse, ...prev]);
        return newUniverse;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateUniverse = useCallback(async (id: string, data: Partial<Universe>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setUniverses(prev =>
        prev.map(u =>
          u.id === id
            ? { ...u, ...data, updatedAt: new Date().toISOString() }
            : u
        )
      );

      if (currentUniverse?.id === id) {
        setCurrentUniverse({
          ...currentUniverse,
          ...data,
          updatedAt: new Date().toISOString(),
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentUniverse]);

  const deleteUniverse = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setUniverses(prev => prev.filter(u => u.id !== id));
      if (currentUniverse?.id === id) {
        setCurrentUniverse(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentUniverse]);

  const fetchUniverses = useCallback(async (creatorId?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockUniverses: Universe[] = [
        {
          id: 'univ_1',
          title: 'Neural Dawn',
          description: 'A cyberpunk odyssey through digital consciousness',
          creatorId: creatorId || 'creator_1',
          creatorName: 'AetherMind',
          genre: 'Sci-Fi',
          views: 1200000,
          likes: 45000,
          rating: 4.8,
          status: 'published',
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          tags: ['cyberpunk', 'ai', 'dystopian'],
        },
        {
          id: 'univ_2',
          title: 'Echo City',
          description: 'A noir mystery set in a rain-soaked metropolis',
          creatorId: creatorId || 'creator_2',
          creatorName: 'DreamWeaver',
          genre: 'Neo-Noir',
          views: 890000,
          likes: 32000,
          rating: 4.7,
          status: 'published',
          createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          tags: ['noir', 'mystery', 'urban'],
        },
      ];

      if (creatorId) {
        setUniverses(mockUniverses.filter(u => u.creatorId === creatorId));
      } else {
        setUniverses(mockUniverses);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const publishUniverse = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setUniverses(prev =>
        prev.map(u =>
          u.id === id
            ? { ...u, status: 'published' as const, updatedAt: new Date().toISOString() }
            : u
        )
      );

      if (currentUniverse?.id === id) {
        setCurrentUniverse({
          ...currentUniverse,
          status: 'published',
          updatedAt: new Date().toISOString(),
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentUniverse]);

  return (
    <UniverseContext.Provider
      value={{
        universes,
        currentUniverse,
        isLoading,
        createUniverse,
        updateUniverse,
        deleteUniverse,
        setCurrentUniverse,
        fetchUniverses,
        publishUniverse,
      }}
    >
      {children}
    </UniverseContext.Provider>
  );
};

export const useUniverse = () => {
  const context = useContext(UniverseContext);
  if (context === undefined) {
    throw new Error('useUniverse must be used within a UniverseProvider');
  }
  return context;
};
