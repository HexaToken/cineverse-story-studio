# CineVerse Component Library

A comprehensive, reusable component library for CineVerse with consistent cosmic styling, glassmorphism, and accessibility.

## Overview

The component library (`src/components/lib/`) provides a set of base and specialized components that ensure visual consistency across the entire application. All components use:

- **Cosmic Gradient**: `from-[#0a0b1a] to-[#10182e]`
- **CineVerse Colors**: Cyan (`#00eaff`), Purple (`#a24df6`), Pink (`#ff006e`)
- **Glassmorphism**: `backdrop-blur-xl` with semi-transparent backgrounds
- **Typography**: Space Grotesk font family for headings, Inter for body text
- **Animations**: Smooth transitions and Framer Motion support

## Base Components

### CosmoCard
A glassmorphic card component with multiple variants.

```tsx
import { CosmoCard, CosmoCardBody, CosmoCardTitle } from '@/components/lib';

<CosmoCard variant="interactive">
  <CosmoCardBody>
    <CosmoCardTitle>Title</CosmoCardTitle>
    Content here
  </CosmoCardBody>
</CosmoCard>
```

**Props:**
- `variant`: `'default' | 'interactive' | 'glowing' | 'subtle'` (default: 'default')
- `hoverable`: boolean (default: true)
- `children`: React.ReactNode

**Compound Components:**
- `CosmoCardHeader` - Header section
- `CosmoCardBody` - Body/content section
- `CosmoCardTitle` - Title with sizing
- `CosmoCardDescription` - Description text
- `CosmoCardFooter` - Footer section

### CosmoButton
Styled button with cosmic variants.

```tsx
import { CosmoButton } from '@/components/lib';

<CosmoButton cosmicVariant="primary" size="md">
  Click Me
</CosmoButton>
```

**Props:**
- `cosmicVariant`: `'primary' | 'secondary' | 'accent' | 'ghost' | 'glowing' | 'outline'` (default: 'primary')
- `size`: `'sm' | 'md' | 'lg' | 'icon'` (default: 'md')
- All Button props from `@/components/ui/button`

### CosmoHeading
Flexible heading component with styling options.

```tsx
import { CosmoHeading } from '@/components/lib';

<CosmoHeading level="h2" size="lg" gradient>
  Beautiful Heading
</CosmoHeading>
```

**Props:**
- `level`: `'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'` (default: 'h2')
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'` (default: 'md')
- `gradient`: boolean - Apply gradient text effect
- `glow`: boolean - Add glow effect

### CosmoBadge
Styled badge with color variants.

```tsx
import { CosmoBadge } from '@/components/lib';

<CosmoBadge variant="cyan" size="md">
  New
</CosmoBadge>
```

**Props:**
- `variant`: `'cyan' | 'purple' | 'pink' | 'default' | 'success' | 'warning' | 'error'` (default: 'default')
- `size`: `'sm' | 'md' | 'lg'` (default: 'md')

### CosmoText
Typography utility for consistent text styling.

```tsx
import { CosmoText } from '@/components/lib';

<CosmoText variant="body" size="base">
  Regular body text
</CosmoText>
```

**Props:**
- `variant`: `'body' | 'caption' | 'label' | 'muted'` (default: 'body')
- `size`: `'xs' | 'sm' | 'base' | 'lg' | 'xl'` (default: 'base')

### CosmoIconButton
Icon button with cosmic styling.

```tsx
import { CosmoIconButton } from '@/components/lib';
import { Heart } from 'lucide-react';

<CosmoIconButton variant="cyan" size="md">
  <Heart className="w-5 h-5" />
</CosmoIconButton>
```

**Props:**
- `variant`: `'default' | 'cyan' | 'purple' | 'pink' | 'subtle'` (default: 'default')
- `size`: `'sm' | 'md' | 'lg'` (default: 'md')

### CosmoSection
Section wrapper with consistent spacing and styling.

```tsx
import { CosmoSection } from '@/components/lib';

<CosmoSection bordered variant="default">
  <h2>Section Title</h2>
  Content here
</CosmoSection>
```

**Props:**
- `bordered`: boolean - Add border top/bottom
- `variant`: `'default' | 'alt'` (default: 'default')

### CosmoContainer
Max-width container for content.

```tsx
import { CosmoContainer } from '@/components/lib';

<CosmoContainer size="lg">
  Content here
</CosmoContainer>
```

**Props:**
- `size`: `'sm' | 'md' | 'lg' | 'full'` (default: 'lg')

### CosmoGrid
Responsive grid layout.

```tsx
import { CosmoGrid } from '@/components/lib';

<CosmoGrid columns={3} gap="md">
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</CosmoGrid>
```

**Props:**
- `columns`: `1 | 2 | 3 | 4 | 'auto'` (default: 'auto')
- `gap`: `'sm' | 'md' | 'lg'` (default: 'md')

### SectionHeader
Consistent section header with title and subtitle.

```tsx
import { SectionHeader } from '@/components/lib';

<SectionHeader
  title="Trending Now"
  subtitle="Discover what's popular this week"
  align="center"
/>
```

**Props:**
- `title`: string (required)
- `subtitle`: string (optional)
- `align`: `'left' | 'center' | 'right'` (default: 'left')
- `children`: React.ReactNode (optional)

## Specialized Components

### UniverseCard
Card for displaying universe content.

```tsx
import { UniverseCard } from '@/components/lib';

<UniverseCard
  id="1"
  title="Neural Dawn"
  creator="AetherMind"
  thumbnail="gradient-cyan"
  genre="Sci-Fi"
  views="1.2M"
  rating={4.8}
  href="/universe/1"
/>
```

**Props:**
- `id`: string | number (required)
- `title`: string (required)
- `creator`: string (required)
- `thumbnail`: string (optional, default: 'gradient-cyan')
- `genre`: string (required)
- `views`: string (required)
- `rating`: number (optional)
- `isFavorite`: boolean (optional)
- `onFavorite`: (id) => void (optional)
- `href`: string (optional)

### CreatorCard
Card for displaying creator profiles.

```tsx
import { CreatorCard } from '@/components/lib';

<CreatorCard
  id="1"
  name="AetherMind"
  universes={42}
  specialty="Sci-Fi & Cyberpunk"
  followers={15000}
  href="/creator/aethermind"
/>
```

**Props:**
- `id`: string | number (required)
- `name`: string (required)
- `universes`: number (required)
- `specialty`: string (required)
- `followers`: number (optional)
- `isFollowing`: boolean (optional)
- `onFollow`: (id) => void (optional)
- `href`: string (optional)

### StoryCard
Card for displaying stories and episodes.

```tsx
import { StoryCard } from '@/components/lib';

<StoryCard
  id="1"
  title="Episode 1: The Beginning"
  rating={4.9}
  views="2.3M"
  duration="45m"
  isLive={false}
  href="/story/1"
/>
```

**Props:**
- `id`: string | number (required)
- `title`: string (required)
- `rating`: number (optional)
- `views`: string (required)
- `duration`: string (optional, default: '45m')
- `isLive`: boolean (optional)
- `thumbnail`: string (optional, default: 'gradient-cyan')
- `href`: string (optional)

## Usage Examples

### Basic Page Layout

```tsx
import {
  CosmoContainer,
  CosmoSection,
  SectionHeader,
  CosmoGrid,
  UniverseCard,
} from '@/components/lib';

export function MyPage() {
  const universes = [
    { id: 1, title: "Neural Dawn", creator: "AetherMind", ... },
    { id: 2, title: "Echo City", creator: "DreamWeaver", ... },
  ];

  return (
    <CosmoSection>
      <CosmoContainer>
        <SectionHeader
          title="Trending Universes"
          subtitle="Most popular this week"
        />
        <CosmoGrid columns={3}>
          {universes.map(u => (
            <UniverseCard key={u.id} {...u} />
          ))}
        </CosmoGrid>
      </CosmoContainer>
    </CosmoSection>
  );
}
```

### Interactive Card with Actions

```tsx
import {
  CosmoCard,
  CosmoCardBody,
  CosmoCardTitle,
  CosmoButton,
  CosmoBadge,
} from '@/components/lib';

export function InteractiveCard() {
  return (
    <CosmoCard variant="interactive">
      <CosmoCardBody>
        <CosmoCardTitle>Create New Universe</CosmoCardTitle>
        <p className="text-white/60 mb-4">
          Start building your own AI-driven universe today.
        </p>
        <div className="flex gap-2">
          <CosmoBadge variant="purple">AI-Assisted</CosmoBadge>
          <CosmoBadge variant="cyan">Free</CosmoBadge>
        </div>
        <CosmoButton cosmicVariant="primary" className="w-full mt-4">
          Get Started
        </CosmoButton>
      </CosmoCardBody>
    </CosmoCard>
  );
}
```

## Color Palette

- **Cyan**: `#00eaff` - Primary accent
- **Purple**: `#a24df6` - Secondary accent
- **Pink**: `#ff006e` - Tertiary accent
- **Background**: `from-[#0a0b1a] to-[#10182e]` - Main gradient
- **Surface**: `bg-white/5` to `bg-white/10` - Card backgrounds
- **Border**: `border-[color]/20` to `border-[color]/40` - Borders

## Dark Mode

All components are built for dark mode by default. Light mode support can be added through Tailwind's dark mode classes if needed in the future.

## Accessibility

- All components use semantic HTML elements
- Button components support keyboard navigation
- Icons paired with text for clarity
- Sufficient color contrast for WCAG compliance
- ARIA labels where needed (to be enhanced in future updates)

## Future Enhancements

- [ ] Add ARIA labels and keyboard navigation docs
- [ ] Create Storybook for component showcase
- [ ] Add animation variants (slide, fade, bounce, etc.)
- [ ] Extend with more specialized CineVerse components
- [ ] Create CSS modules for component themes
- [ ] Add responsive design presets
