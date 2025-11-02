import React, { createContext, useContext, useState, useCallback } from 'react';

export interface RemixVersion {
  id: string;
  universeId: string;
  parentUniverseId: string;
  parentCreatorId: string;
  parentCreatorName: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  remixType: 'scene' | 'character' | 'story' | 'visual' | 'audio' | 'full';
  changesSummary: string;
  createdAt: string;
  status: 'draft' | 'published';
  views: number;
  likes: number;
  creditsGiven: boolean;
}

export interface RemixContextType {
  remixes: RemixVersion[];
  currentRemix: RemixVersion | null;
  isLoading: boolean;
  createRemix: (parentUniverseId: string, data: Omit<RemixVersion, 'id' | 'createdAt' | 'views' | 'likes'>) => Promise<RemixVersion>;
  updateRemix: (id: string, data: Partial<RemixVersion>) => Promise<void>;
  publishRemix: (id: string) => Promise<void>;
  deleteRemix: (id: string) => Promise<void>;
  fetchRemixes: (universeId: string) => Promise<void>;
  setCurrentRemix: (remix: RemixVersion | null) => void;
}

const RemixContext = createContext<RemixContextType | undefined>(undefined);

export const RemixProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [remixes, setRemixes] = useState<RemixVersion[]>([]);
  const [currentRemix, setCurrentRemix] = useState<RemixVersion | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createRemix = useCallback(
    async (
      parentUniverseId: string,
      data: Omit<RemixVersion, 'id' | 'createdAt' | 'views' | 'likes'>
    ): Promise<RemixVersion> => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));

        const newRemix: RemixVersion = {
          ...data,
          id: `remix_${Date.now()}`,
          parentUniverseId,
          views: 0,
          likes: 0,
          createdAt: new Date().toISOString(),
        };

        setRemixes(prev => [newRemix, ...prev]);
        return newRemix;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateRemix = useCallback(async (id: string, data: Partial<RemixVersion>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setRemixes(prev =>
        prev.map(r =>
          r.id === id ? { ...r, ...data } : r
        )
      );

      if (currentRemix?.id === id) {
        setCurrentRemix({ ...currentRemix, ...data });
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentRemix]);

  const publishRemix = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setRemixes(prev =>
        prev.map(r =>
          r.id === id ? { ...r, status: 'published' as const } : r
        )
      );

      if (currentRemix?.id === id) {
        setCurrentRemix({ ...currentRemix, status: 'published' });
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentRemix]);

  const deleteRemix = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setRemixes(prev => prev.filter(r => r.id !== id));
      if (currentRemix?.id === id) {
        setCurrentRemix(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentRemix]);

  const fetchRemixes = useCallback(async (universeId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockRemixes: RemixVersion[] = [
        {
          id: 'remix_1',
          universeId: 'remix_u_1',
          parentUniverseId: universeId,
          parentCreatorId: 'creator_1',
          parentCreatorName: 'AetherMind',
          title: 'Neural Dawn - Extended Cut',
          description: 'Fan remix with extended narrative and new visual effects',
          creatorId: 'creator_2',
          creatorName: 'DreamWeaver',
          remixType: 'story',
          changesSummary: 'Added 3 new scenes, enhanced visual effects, new soundtrack',
          status: 'published',
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          views: 125000,
          likes: 8500,
          creditsGiven: true,
        },
        {
          id: 'remix_2',
          universeId: 'remix_u_2',
          parentUniverseId: universeId,
          parentCreatorId: 'creator_1',
          parentCreatorName: 'AetherMind',
          title: 'Neural Dawn - Character Study',
          description: 'Deep dive into character development and psychology',
          creatorId: 'creator_3',
          creatorName: 'VoidPoet',
          remixType: 'character',
          changesSummary: 'Focused character analysis, new dialogue, internal monologues',
          status: 'published',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          views: 89000,
          likes: 6200,
          creditsGiven: true,
        },
      ];

      setRemixes(mockRemixes);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <RemixContext.Provider
      value={{
        remixes,
        currentRemix,
        isLoading,
        createRemix,
        updateRemix,
        publishRemix,
        deleteRemix,
        fetchRemixes,
        setCurrentRemix,
      }}
    >
      {children}
    </RemixContext.Provider>
  );
};

export const useRemix = () => {
  const context = useContext(RemixContext);
  if (context === undefined) {
    throw new Error('useRemix must be used within a RemixProvider');
  }
  return context;
};
