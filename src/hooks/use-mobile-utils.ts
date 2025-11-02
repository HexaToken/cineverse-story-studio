import { useCallback } from 'react';
import { useIsMobile } from './use-mobile';

/**
 * Extended mobile utilities for responsive design
 * Complements use-mobile with additional helpers
 */
export function useMobileUtils() {
  const isMobile = useIsMobile();

  const getResponsiveClass = useCallback((mobile: string, desktop: string) => {
    return isMobile ? mobile : desktop;
  }, [isMobile]);

  const getResponsiveValue = useCallback(<T,>(mobile: T, desktop: T): T => {
    return isMobile ? mobile : desktop;
  }, [isMobile]);

  const getResponsiveColumns = useCallback((gridConfig: { mobile: number; tablet?: number; desktop: number }) => {
    if (isMobile) return gridConfig.mobile;
    if (gridConfig.tablet && window.innerWidth < 1024) return gridConfig.tablet;
    return gridConfig.desktop;
  }, [isMobile]);

  return {
    isMobile,
    getResponsiveClass,
    getResponsiveValue,
    getResponsiveColumns,
  };
}
