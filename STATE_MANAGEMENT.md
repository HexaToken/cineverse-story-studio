# CineVerse State Management System

Complete guide to the Context API-based state management system for CineVerse.

## Overview

CineVerse uses **React Context API with custom hooks** for state management. This provides:

- ✅ Lightweight, no external dependencies (except React)
- ✅ Easy to understand and maintain
- ✅ Scalable to Redux if needed
- ✅ Persistent state with localStorage
- ✅ TypeScript support with full type safety

## Architecture

```
AppProvider (wraps entire app)
├── AuthProvider
│   └── useAuth()
├── UniverseProvider
│   └── useUniverse()
├── AnalyticsProvider
│   └── useAnalytics()
└── FavoritesProvider
    └── useFavorites()
```

## Contexts

### 1. AuthContext - User Authentication

**Location:** `src/context/AuthContext.tsx`

Manages user authentication, profile, and session.

```tsx
import { useAuth } from '@/context';

export function MyComponent() {
  const { user, isAuthenticated, isLoading, login, logout, signup, updateProfile } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <>
      {isAuthenticated ? (
        <div>
          Welcome, {user?.displayName}!
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => login('email@example.com', 'password')}>Login</button>
          <button onClick={() => signup('email@example.com', 'password', 'username')}>Sign Up</button>
        </div>
      )}
    </>
  );
}
```

**Available Methods:**
- `login(email: string, password: string)` - Authenticate user
- `logout()` - Clear user session
- `signup(email: string, password: string, username: string)` - Create new account
- `updateProfile(data: Partial<User>)` - Update user profile
- `setUser(user: User | null)` - Manually set user

**State:**
```typescript
interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  isCreator: boolean;
  createdAt: string;
}
```

### 2. UniverseContext - Universe Management

**Location:** `src/context/UniverseContext.tsx`

Manages universe creation, editing, and publishing.

```tsx
import { useUniverse } from '@/context';

export function UniversesPage() {
  const {
    universes,
    currentUniverse,
    isLoading,
    createUniverse,
    updateUniverse,
    deleteUniverse,
    publishUniverse,
    setCurrentUniverse,
    fetchUniverses,
  } = useUniverse();

  const handleCreateUniverse = async () => {
    const newUniverse = await createUniverse({
      title: 'My Universe',
      description: 'A great universe',
      creatorId: 'user_123',
      creatorName: 'John Doe',
      genre: 'Sci-Fi',
      status: 'draft',
      tags: ['sci-fi', 'adventure'],
    });
  };

  return (
    <div>
      {universes.map(u => (
        <div key={u.id}>
          <h3>{u.title}</h3>
          <button onClick={() => updateUniverse(u.id, { title: 'New Title' })}>Edit</button>
          <button onClick={() => publishUniverse(u.id)}>Publish</button>
          <button onClick={() => deleteUniverse(u.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

**Available Methods:**
- `createUniverse(data)` - Create new universe
- `updateUniverse(id, data)` - Update universe
- `deleteUniverse(id)` - Delete universe
- `setCurrentUniverse(universe)` - Set active universe
- `fetchUniverses(creatorId?)` - Load universes
- `publishUniverse(id)` - Publish a universe

**State:**
```typescript
interface Universe {
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
```

### 3. AnalyticsContext - Creator Analytics

**Location:** `src/context/AnalyticsContext.tsx`

Manages analytics, metrics, and statistics.

```tsx
import { useAnalytics } from '@/context';

export function AnalyticsDashboard() {
  const { metrics, dailyStats, isLoading, fetchMetrics, fetchDailyStats, trackEvent } = useAnalytics();

  const handleTrackEvent = (event: string) => {
    trackEvent('user_action', { action: event, timestamp: Date.now() });
  };

  return (
    <div>
      {metrics && (
        <div>
          <p>Total Views: {metrics.totalViews}</p>
          <p>Engagement Rate: {metrics.engagementRate}%</p>
          <p>Revenue: ${metrics.revenueTotal}</p>
        </div>
      )}
      <button onClick={() => handleTrackEvent('view_analytics')}>Track</button>
    </div>
  );
}
```

**Available Methods:**
- `fetchMetrics(userId)` - Load user metrics
- `fetchDailyStats(userId, days?)` - Load daily statistics
- `trackEvent(event, data?)` - Track custom events

**State:**
```typescript
interface AnalyticsMetrics {
  totalViews: number;
  totalLikes: number;
  totalFollowers: number;
  averageRating: number;
  engagementRate: number;
  revenueLast30Days: number;
  revenueTotal: number;
}

interface DailyStats {
  date: string;
  views: number;
  likes: number;
  followers: number;
  revenue: number;
}
```

### 4. FavoritesContext - User Favorites

**Location:** `src/context/FavoritesContext.tsx`

Manages user favorite universes and watchlist.

```tsx
import { useFavorites } from '@/context';

export function UniverseCard({ universeId, title, creator }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(universeId);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(universeId);
    } else {
      addFavorite({ universeId, title, creatorName: creator });
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <button onClick={handleToggleFavorite}>
        {favorite ? '❤️' : '🤍'} Favorite
      </button>
    </div>
  );
}
```

**Available Methods:**
- `addFavorite(favorite)` - Add to favorites
- `removeFavorite(universeId)` - Remove from favorites
- `isFavorite(universeId)` - Check if favorited
- `clearFavorites()` - Clear all favorites
- `fetchFavorites(userId)` - Load user favorites

**State:**
```typescript
interface Favorite {
  universeId: string;
  title: string;
  creatorName: string;
  addedAt: string;
}
```

## Custom Hooks

### useUserData

Combines auth and analytics data with auto-loading.

```tsx
import { useUserData } from '@/hooks/use-user-data';

export function Profile() {
  const { user, isAuthenticated, isLoading, metrics, dailyStats } = useUserData();

  return (
    <div>
      {user && <h1>{user.displayName}</h1>}
      {metrics && <p>Revenue: ${metrics.revenueTotal}</p>}
    </div>
  );
}
```

**Returns:**
- `user: User | null` - Current user
- `isAuthenticated: boolean` - Auth status
- `isLoading: boolean` - Loading state
- `metrics: AnalyticsMetrics | null` - User analytics
- `dailyStats: DailyStats[]` - Daily statistics

### useCreatorUniverses

Automatically loads creator's universes when authenticated.

```tsx
import { useCreatorUniverses } from '@/hooks/use-creator-universes';

export function CreatorDashboard() {
  const {
    universes,
    currentUniverse,
    isLoading,
    createUniverse,
    updateUniverse,
    deleteUniverse,
    publishUniverse,
    setCurrentUniverse,
  } = useCreatorUniverses();

  return (
    <div>
      {universes.map(u => (
        <div key={u.id}>{u.title}</div>
      ))}
    </div>
  );
}
```

**Returns:**
- All `useUniverse()` methods
- Auto-fetches universes on auth

## Usage Patterns

### 1. Authentication Flow

```tsx
import { useAuth } from '@/context';

export function LoginForm() {
  const { login, isLoading, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login('user@example.com', 'password');
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### 2. Protected Routes

```tsx
import { useAuth } from '@/context';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
}
```

### 3. Analytics Tracking

```tsx
import { useAnalytics } from '@/context';

export function UniverseCard({ id, title, creator }) {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    trackEvent('universe_view', { universeId: id, title });
  };

  return <div onClick={handleClick}>{title}</div>;
}
```

### 4. Local Persistent State

Favorites are automatically saved to localStorage and restored on app load.

```tsx
import { useFavorites } from '@/context';

export function SaveFavorite({ universeId, title }) {
  const { addFavorite } = useFavorites();

  const handleSave = () => {
    addFavorite({ universeId, title, creatorName: 'Creator' });
    // Automatically persisted to localStorage
  };

  return <button onClick={handleSave}>Save</button>;
}
```

## Best Practices

### 1. Keep Contexts Focused

Each context should handle one domain:
- Auth → User authentication only
- Universe → Universe CRUD operations
- Analytics → Statistics and metrics
- Favorites → User favorites only

### 2. Use Custom Hooks

Don't use contexts directly; always create custom hooks:

```tsx
// ✅ Good
const { user } = useAuth();

// ❌ Avoid
const context = useContext(AuthContext);
```

### 3. Error Handling

Add try-catch in async operations:

```tsx
try {
  await createUniverse(data);
} catch (error) {
  console.error('Failed to create universe:', error);
  showError('Creation failed');
}
```

### 4. Type Safety

Always use TypeScript types from contexts:

```tsx
import { Universe, User, AnalyticsMetrics } from '@/context';

const universe: Universe = { /* ... */ };
const user: User = { /* ... */ };
const metrics: AnalyticsMetrics = { /* ... */ };
```

### 5. Performance

Contexts are not optimized for frequent updates. For rapid state changes, consider:
- Using useReducer instead of useState
- Splitting contexts by update frequency
- Memoizing components with React.memo

## Migrating to Redux (Future)

If needed, migration is straightforward:

1. Create Redux slices matching current contexts
2. Replace `useAuth()` with `useSelector(selectAuth)`
3. Replace `updateProfile()` with `dispatch(updateProfile())`
4. Update App.tsx to use Redux Provider

## File Structure

```
src/
├── context/
│   ├── AuthContext.tsx
│   ├── UniverseContext.tsx
│   ├── AnalyticsContext.tsx
│   ├── FavoritesContext.tsx
│   ├── AppProvider.tsx
│   └── index.ts
├── hooks/
│   ├── use-user-data.ts
│   ├── use-creator-universes.ts
│   └── ... other hooks
└── pages/
    └── ... pages using contexts
```

## Testing

```tsx
import { render, screen } from '@testing-library/react';
import { AppProvider } from '@/context';

// Wrap component with AppProvider in tests
render(
  <AppProvider>
    <MyComponent />
  </AppProvider>
);
```

## Troubleshooting

### Context error: "must be used within a Provider"

Make sure `AppProvider` wraps your component in `App.tsx`:

```tsx
<QueryClientProvider>
  <AppProvider>
    <BrowserRouter>
      {/* Your routes */}
    </BrowserRouter>
  </AppProvider>
</QueryClientProvider>
```

### State not persisting

Favorites auto-persist to localStorage. For other contexts, add persistence manually:

```tsx
useEffect(() => {
  localStorage.setItem('universes', JSON.stringify(universes));
}, [universes]);
```

### Performance issues with context

Split large contexts into smaller ones or use `useMemo`:

```tsx
const memoizedValue = useMemo(() => ({
  user,
  isAuthenticated,
}), [user, isAuthenticated]);
```

## API Integration

Replace mock API calls with real endpoints:

```tsx
// In AuthContext.tsx, replace:
// await new Promise(resolve => setTimeout(resolve, 500));

// With:
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
});
const data = await response.json();
```

## Summary

This state management system provides:
- ✅ Centralized state management
- ✅ Type-safe with TypeScript
- ✅ Easy to understand and use
- ✅ Persistent state with localStorage
- ✅ Scalable architecture
- ✅ Easy integration with API calls

For questions or contributions, refer to the component library and design system documentation.
