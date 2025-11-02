// Auth Context
export { AuthProvider, useAuth } from './AuthContext';
export type { User, AuthContextType } from './AuthContext';

// Universe Context
export { UniverseProvider, useUniverse } from './UniverseContext';
export type { Universe, UniverseContextType } from './UniverseContext';

// Analytics Context
export { AnalyticsProvider, useAnalytics } from './AnalyticsContext';
export type { AnalyticsMetrics, DailyStats, AnalyticsContextType } from './AnalyticsContext';

// Favorites Context
export { FavoritesProvider, useFavorites } from './FavoritesContext';
export type { Favorite, FavoritesContextType } from './FavoritesContext';

// Remix Context
export { RemixProvider, useRemix } from './RemixContext';
export type { RemixVersion, RemixContextType } from './RemixContext';

// Collaboration Context
export { CollaborationProvider, useCollaboration } from './CollaborationContext';
export type { Collaborator, CollaborationProject, Comment, CollaborationContextType, PermissionLevel } from './CollaborationContext';

// Search Context
export { SearchProvider, useSearch } from './SearchContext';
export type { SearchResult, SearchFilters, SearchContextType } from './SearchContext';

// Notification Context
export { NotificationProvider, useNotification } from './NotificationContext';
export type { Notification, NotificationType, NotificationContextType } from './NotificationContext';

// Atlas Companion Context
export { AtlasCompanionProvider, useAtlasCompanion } from './AtlasCompanionContext';
export type { Recommendation, AtlasCompanionContextType } from './AtlasCompanionContext';

// App Provider
export { AppProvider } from './AppProvider';
