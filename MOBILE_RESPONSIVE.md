# CineVerse Mobile Responsive Design Guide

Complete guide to mobile-first responsive design implementation across CineVerse.

## Overview

CineVerse uses a mobile-first approach with Tailwind CSS breakpoints:
- **Mobile**: < 768px (sm)
- **Tablet**: 768px - 1024px (md)
- **Desktop**: > 1024px (lg, xl, 2xl)

## Responsive Components

### ResponsiveContainer
Adaptive padding based on screen size.

```tsx
import { ResponsiveContainer } from '@/components/responsive';

<ResponsiveContainer size="md">
  Content here
</ResponsiveContainer>
```

**Sizes:**
- `sm`: 4px (mobile) → 6px (desktop)
- `md`: 4px (mobile) → 8px (tablet) → 8px (desktop)
- `lg`: 4px (mobile) → 8px (tablet) → 12px (desktop)
- `xl`: 4px (mobile) → 8px (tablet) → 16px (desktop)

### ResponsiveGrid
Responsive grid that adapts column count per screen size.

```tsx
import { ResponsiveGrid } from '@/components/responsive';

<ResponsiveGrid
  columns={{ mobile: 1, tablet: 2, desktop: 4 }}
  gap="md"
>
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</ResponsiveGrid>
```

**Default columns:**
- Mobile: 1
- Tablet: 2
- Desktop: 3

### ResponsiveHeader
Navigation that adapts for mobile with hamburger menu.

```tsx
import { ResponsiveHeader } from '@/components/responsive';

<ResponsiveHeader
  logo={<Logo />}
  navLinks={[
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/explore' },
    { label: 'Create', href: '/create' },
  ]}
  rightContent={<SearchBar />}
/>
```

### MobileMenu
Slide-out menu for mobile navigation.

```tsx
import { MobileMenu } from '@/components/responsive';

<MobileMenu
  items={[
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Create', href: '/create', icon: '✨' },
    { label: 'Explore', href: '/explore', icon: '🗺️' },
  ]}
/>
```

### ResponsiveModal
Modal that becomes a slide-up drawer on mobile.

```tsx
import { ResponsiveModal } from '@/components/responsive';

<ResponsiveModal
  isOpen={isOpen}
  onClose={onClose}
  title="Filters"
>
  <FilterContent />
</ResponsiveModal>
```

## Responsive Design Patterns

### Text Scaling
```tsx
{/* Mobile: 18px, Desktop: 32px */}
<h1 className="text-lg md:text-2xl lg:text-4xl font-bold">
  Title
</h1>
```

### Padding & Margin
```tsx
{/* Mobile: 16px, Tablet: 24px, Desktop: 32px */}
<div className="p-4 md:p-6 lg:p-8">
  Content
</div>
```

### Display Control
```tsx
{/* Hide on mobile, show on desktop */}
<div className="hidden md:block">
  Desktop-only content
</div>

{/* Show on mobile, hide on desktop */}
<div className="md:hidden">
  Mobile-only content
</div>
```

### Flexible Layouts
```tsx
{/* Stack on mobile, row on desktop */}
<div className="flex flex-col md:flex-row gap-4">
  <Sidebar />
  <MainContent />
</div>
```

### Grid Layouts
```tsx
{/* 1 column mobile, 2 desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</div>
```

## Hook: useMobileUtils

Enhanced mobile utilities for responsive logic.

```tsx
import { useMobileUtils } from '@/hooks/use-mobile-utils';

export function Component() {
  const { isMobile, getResponsiveClass, getResponsiveValue } = useMobileUtils();

  return (
    <div className={getResponsiveClass(
      'px-4 py-2',  // mobile
      'px-8 py-4'   // desktop
    )}>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  );
}
```

## Touch-Friendly Design

### Minimum Touch Target Size
All interactive elements should be at least 44×44px on mobile.

```tsx
<Button className="h-12 px-4 md:h-10">
  Click me
</Button>
```

### Spacing for Touch
Increase spacing between touch targets on mobile.

```tsx
<div className="space-y-3 md:space-y-2">
  {items.map(item => <Button key={item.id}>{item.name}</Button>)}
</div>
```

### Swipe-Friendly Interactions
- Avoid small buttons and inputs
- Use larger hit targets (48px minimum recommended)
- Add haptic feedback where possible
- Design for one-handed usage

## Performance on Mobile

### Image Optimization
```tsx
{/* Use srcSet for responsive images */}
<img
  src="/image-mobile.jpg"
  srcSet="/image-mobile.jpg 640w, /image-desktop.jpg 1920w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Responsive image"
/>
```

### Lazy Loading
```tsx
{/* Lazy load images and components */}
<img loading="lazy" src="/image.jpg" alt="Lazy loaded" />
```

### CSS Media Queries
Avoid excessive CSS in mobile views.

```tsx
{/* Hide heavy elements on mobile */}
<AdvancedChart className="hidden md:block" />
```

## Mobile-First CSS

Write styles for mobile first, then add media queries for larger screens.

```css
/* Mobile by default */
.card {
  padding: 1rem;
  font-size: 14px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .card {
    padding: 1.5rem;
    font-size: 16px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .card {
    padding: 2rem;
    font-size: 18px;
  }
}
```

## Tailwind Breakpoints Used

```
sm: 640px   (rarely used, use md instead)
md: 768px   (tablet)
lg: 1024px  (desktop)
xl: 1280px  (large desktop)
2xl: 1536px (extra large desktop)
```

## Testing Mobile Responsiveness

### Browser DevTools
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test at various breakpoints

### Real Device Testing
- Test on actual mobile devices
- Check both portrait and landscape
- Test with different network speeds
- Verify touch interactions

### Common Mobile Issues
- Text too small (< 16px)
- Buttons too small (< 44×44px)
- Unnecessary horizontal scroll
- Unoptimized images
- Poor touch target spacing

## Accessibility on Mobile

### Touch Keyboard
- Set `inputMode` for number inputs
- Avoid `click` events that require pinch

```tsx
<input
  type="text"
  inputMode="numeric"
  placeholder="Enter phone"
/>
```

### Screen Orientation
Handle both portrait and landscape.

```tsx
{/* Different layouts per orientation */}
<div className="flex flex-col md:flex-row">
  <Sidebar />
  <Main />
</div>
```

## Future Mobile Enhancements

- [ ] Add swipe gestures for navigation
- [ ] Implement progressive web app features
- [ ] Add offline support
- [ ] Optimize bundle size for mobile
- [ ] Add mobile app shell
- [ ] Implement smart image loading
- [ ] Add virtual scrolling for large lists

## Common Responsive Patterns

### Hero Section
```tsx
<section className="min-h-[50vh] md:min-h-screen flex items-center">
  <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
      {title}
    </h1>
  </div>
</section>
```

### Card Grid
```tsx
<ResponsiveGrid
  columns={{ mobile: 1, tablet: 2, desktop: 3 }}
  gap="md"
>
  {cards.map(card => <Card key={card.id}>{card.title}</Card>)}
</ResponsiveGrid>
```

### Sidebar Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 md:gap-6">
  <Sidebar />
  <MainContent />
</div>
```

## Summary

CineVerse's mobile-responsive design ensures:
✅ Optimal viewing at all screen sizes
✅ Touch-friendly interactions
✅ Fast loading on mobile networks
✅ Accessible for all users
✅ Consistent experience across devices
