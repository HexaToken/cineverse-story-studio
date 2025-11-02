import { useAuth, useUniverse } from '@/context';
import { useEffect } from 'react';

/**
 * Hook for fetching and managing creator's universes
 * Automatically loads when user is authenticated
 */
export function useCreatorUniverses() {
  const auth = useAuth();
  const universe = useUniverse();

  useEffect(() => {
    if (auth.user?.isCreator) {
      universe.fetchUniverses(auth.user.id);
    }
  }, [auth.user, universe]);

  return {
    universes: universe.universes,
    currentUniverse: universe.currentUniverse,
    isLoading: universe.isLoading,
    createUniverse: universe.createUniverse,
    updateUniverse: universe.updateUniverse,
    deleteUniverse: universe.deleteUniverse,
    publishUniverse: universe.publishUniverse,
    setCurrentUniverse: universe.setCurrentUniverse,
  };
}
