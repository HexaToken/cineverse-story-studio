import React from 'react';
import { AuthProvider } from './AuthContext';
import { UniverseProvider } from './UniverseContext';
import { AnalyticsProvider } from './AnalyticsContext';
import { FavoritesProvider } from './FavoritesContext';

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * AppProvider wraps all context providers for the application.
 * Order matters: Auth should be at the top since other contexts may depend on user info.
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <UniverseProvider>
        <AnalyticsProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </AnalyticsProvider>
      </UniverseProvider>
    </AuthProvider>
  );
};
