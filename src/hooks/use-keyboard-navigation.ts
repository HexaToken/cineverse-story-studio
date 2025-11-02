import { useEffect, useRef } from 'react';

/**
 * Hook for managing keyboard navigation in components
 * Supports arrow keys, enter, escape, and tab navigation
 */
export function useKeyboardNavigation(onKeyDown?: (key: string) => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;

      // Call custom handler if provided
      if (onKeyDown) {
        onKeyDown(key);
      }

      // Arrow key navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        e.preventDefault();
        navigateFocusable(ref.current, key);
      }

      // Escape to blur
      if (key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        activeElement?.blur();
      }

      // Enter to activate
      if (key === 'Enter') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement instanceof HTMLButtonElement) {
          activeElement.click();
        }
      }
    };

    ref.current.addEventListener('keydown', handleKeyDown);
    return () => {
      ref.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyDown]);

  return ref;
}

/**
 * Navigate focus between focusable elements
 */
function navigateFocusable(container: HTMLDivElement, direction: string) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;

  const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as HTMLElement);
  let nextIndex = currentIndex;

  switch (direction) {
    case 'ArrowRight':
    case 'ArrowDown':
      nextIndex = (currentIndex + 1) % focusableElements.length;
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
      break;
  }

  focusableElements[nextIndex]?.focus();
}

/**
 * Hook for managing focus trap (useful for modals)
 */
export function useFocusTrap(containerRef: React.RefObject<HTMLDivElement>, isActive = true) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, isActive]);
}

/**
 * Hook for managing tab key behavior in lists
 */
export function useListKeyboardNavigation(
  containerRef: React.RefObject<HTMLDivElement>,
  onSelect?: (index: number) => void
) {
  useEffect(() => {
    if (!containerRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const items = container.querySelectorAll('[role="listitem"], li, button') as NodeListOf<HTMLElement>;
      const currentIndex = Array.from(items).indexOf(document.activeElement as HTMLElement);

      let nextIndex = currentIndex;

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          nextIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          nextIndex = (currentIndex + 1) % items.length;
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = items.length - 1;
          break;
        default:
          return;
      }

      items[nextIndex]?.focus();
      onSelect?.(nextIndex);
    };

    containerRef.current.addEventListener('keydown', handleKeyDown);
    return () => {
      containerRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, onSelect]);
}
