import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AccessibilityContextType {
  highContrast: boolean;
  reduceMotion: boolean;
  largeText: boolean;
  keyboardNavigation: boolean;
  screenReaderMode: boolean;
  toggleHighContrast: (enabled: boolean) => void;
  toggleReduceMotion: (enabled: boolean) => void;
  toggleLargeText: (enabled: boolean) => void;
  toggleKeyboardNavigation: (enabled: boolean) => void;
  toggleScreenReaderMode: (enabled: boolean) => void;
  setFocus: (element: HTMLElement | null) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(() => {
    try {
      const saved = localStorage.getItem('cineverse_accessibility_high_contrast');
      return saved ? JSON.parse(saved) : false;
    } catch {
      localStorage.removeItem('cineverse_accessibility_high_contrast');
      return false;
    }
  });

  const [reduceMotion, setReduceMotion] = useState(() => {
    // Check system preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    const saved = localStorage.getItem('cineverse_accessibility_reduce_motion');
    return saved ? JSON.parse(saved) : false;
  });

  const [largeText, setLargeText] = useState(() => {
    const saved = localStorage.getItem('cineverse_accessibility_large_text');
    return saved ? JSON.parse(saved) : false;
  });

  const [keyboardNavigation, setKeyboardNavigation] = useState(() => {
    const saved = localStorage.getItem('cineverse_accessibility_keyboard_navigation');
    return saved ? JSON.parse(saved) : false;
  });

  const [screenReaderMode, setScreenReaderMode] = useState(() => {
    const saved = localStorage.getItem('cineverse_accessibility_screen_reader');
    return saved ? JSON.parse(saved) : false;
  });

  // Apply accessibility settings to document
  useEffect(() => {
    const html = document.documentElement;

    if (highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }

    if (reduceMotion) {
      html.classList.add('reduce-motion');
    } else {
      html.classList.remove('reduce-motion');
    }

    if (largeText) {
      html.classList.add('large-text');
    } else {
      html.classList.remove('large-text');
    }

    if (screenReaderMode) {
      html.classList.add('screen-reader-mode');
    } else {
      html.classList.remove('screen-reader-mode');
    }
  }, [highContrast, reduceMotion, largeText, screenReaderMode]);

  const toggleHighContrast = useCallback((enabled: boolean) => {
    setHighContrast(enabled);
    localStorage.setItem('cineverse_accessibility_high_contrast', JSON.stringify(enabled));
  }, []);

  const toggleReduceMotion = useCallback((enabled: boolean) => {
    setReduceMotion(enabled);
    localStorage.setItem('cineverse_accessibility_reduce_motion', JSON.stringify(enabled));
  }, []);

  const toggleLargeText = useCallback((enabled: boolean) => {
    setLargeText(enabled);
    localStorage.setItem('cineverse_accessibility_large_text', JSON.stringify(enabled));
  }, []);

  const toggleKeyboardNavigation = useCallback((enabled: boolean) => {
    setKeyboardNavigation(enabled);
    localStorage.setItem('cineverse_accessibility_keyboard_navigation', JSON.stringify(enabled));
  }, []);

  const toggleScreenReaderMode = useCallback((enabled: boolean) => {
    setScreenReaderMode(enabled);
    localStorage.setItem('cineverse_accessibility_screen_reader', JSON.stringify(enabled));
  }, []);

  const setFocus = useCallback((element: HTMLElement | null) => {
    if (element) {
      element.focus();
      // Announce focus change to screen readers
      if (screenReaderMode) {
        const announcement = element.getAttribute('aria-label') || element.textContent;
        announceToScreenReader(announcement || '');
      }
    }
  }, [screenReaderMode]);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        reduceMotion,
        largeText,
        keyboardNavigation,
        screenReaderMode,
        toggleHighContrast,
        toggleReduceMotion,
        toggleLargeText,
        toggleKeyboardNavigation,
        toggleScreenReaderMode,
        setFocus,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

/**
 * Helper function to announce text to screen readers
 */
export const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);

  setTimeout(() => {
    announcement.remove();
  }, 1000);
};

/**
 * Skip to main content link for keyboard navigation
 */
export const SkipToMainContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:bg-[#00eaff] focus:text-black focus:p-2"
    >
      Skip to main content
    </a>
  );
};
