import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface Favorite {
  universeId: string;
  title: string;
  creatorName: string;
  addedAt: string;
}

export interface FavoritesContextType {
  favorites: Favorite[];
  isLoading: boolean;
  addFavorite: (favorite: Omit<Favorite, 'addedAt'>) => void;
  removeFavorite: (universeId: string) => void;
  isFavorite: (universeId: string) => boolean;
  clearFavorites: () => void;
  fetchFavorites: (userId: string) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('cineverse_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
  }, []);

  const addFavorite = useCallback((favorite: Omit<Favorite, 'addedAt'>) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.universeId === favorite.universeId);
      if (exists) return prev;

      const newFavorites = [
        ...prev,
        { ...favorite, addedAt: new Date().toISOString() },
      ];
      localStorage.setItem('cineverse_favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((universeId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(f => f.universeId !== universeId);
      localStorage.setItem('cineverse_favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((universeId: string) => {
    return favorites.some(f => f.universeId === universeId);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.removeItem('cineverse_favorites');
  }, []);

  const fetchFavorites = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      // In production, fetch from API based on userId
      // For now, load from localStorage (already done in useEffect)
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
        fetchFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
