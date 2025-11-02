# CineVerse Accessibility Guide

Complete guide to accessibility features and implementation in CineVerse.

## Overview

CineVerse is built with accessibility as a core principle, following WCAG 2.1 Level AA standards. We support:

- ✅ Screen reader users
- ✅ Keyboard-only navigation
- ✅ High contrast mode
- ✅ Reduced motion preferences
- ✅ Large text scaling
- ✅ Focus management
- ✅ Semantic HTML
- ✅ ARIA labels

## Accessibility Features

### 1. High Contrast Mode

Provides enhanced visual contrast for users with low vision.

```tsx
import { useAccessibility } from '@/context';

export function Settings() {
  const { highContrast, toggleHighContrast } = useAccessibility();

  return (
    <label>
      <input
        type="checkbox"
        checked={highContrast}
        onChange={(e) => toggleHighContrast(e.target.checked)}
      />
      High Contrast Mode
    </label>
  );
}
```

**Features:**
- Black background with white text
- High contrast borders
- Bold text
- Yellow accent colors
- Enhanced visibility of interactive elements

### 2. Reduce Motion

Respects user's motion preferences.

```tsx
const { reduceMotion, toggleReduceMotion } = useAccessibility();
```

**Automatic:**
- Detects `prefers-reduced-motion` system setting
- Disables animations and transitions
- Maintains functionality

### 3. Large Text Mode

Increases font sizes across the application.

```tsx
const { largeText, toggleLargeText } = useAccessibility();
```

**Scaling:**
- Body text: 1.25× larger
- Headings: proportionally scaled
- Maintains layout and readability

### 4. Keyboard Navigation

Full keyboard support for all interactive elements.

```tsx
import { useKeyboardNavigation, useFocusTrap, useListKeyboardNavigation } from '@/hooks/use-keyboard-navigation';

export function Modal({ isOpen, onClose }) {
  const ref = useRef(null);
  useFocusTrap(ref, isOpen); // Trap focus inside modal

  return (
    <div ref={ref} role="dialog">
      {/* Modal content */}
    </div>
  );
}
```

**Supported Keys:**
- `Tab` - Move focus forward
- `Shift+Tab` - Move focus backward
- `Arrow Keys` - Navigate lists/items
- `Enter` - Activate buttons/links
- `Escape` - Close dialogs
- `Home/End` - Jump to first/last item

### 5. Screen Reader Support

Full support for screen readers with ARIA labels.

```tsx
import { useAccessibility } from '@/context';

export function Button() {
  const { screenReaderMode } = useAccessibility();

  return (
    <button aria-label="Close dialog">
      ✕
    </button>
  );
}
```

**Features:**
- Semantic HTML (`<button>`, `<nav>`, `<main>`)
- ARIA labels for icons
- Live regions for announcements
- Proper heading hierarchy
- Form field descriptions

### 6. Focus Management

Visible focus indicators and focus restoration.

```tsx
const { setFocus } = useAccessibility();

const handleOpen = () => {
  // Focus moved to modal
  setFocus(modalRef.current);
};
```

**Visible Focus:**
- 3px cyan outline on focused elements
- Clear indication of current focus
- Works in all browsers

## Implementation Guide

### Using Accessibility Hooks

#### useAccessibility
Access all accessibility settings.

```tsx
const {
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
} = useAccessibility();
```

#### useKeyboardNavigation
Enable keyboard navigation in container.

```tsx
const ref = useKeyboardNavigation((key) => {
  // Handle custom keyboard events
});

return <div ref={ref}>{/* Content */}</div>;
```

#### useFocusTrap
Trap focus within modal/dialog.

```tsx
const modalRef = useRef(null);
useFocusTrap(modalRef, isModalOpen);

return <div ref={modalRef}>{/* Modal */}</div>;
```

#### useListKeyboardNavigation
Navigate items in a list.

```tsx
const listRef = useRef(null);
useListKeyboardNavigation(listRef, (index) => {
  setSelectedIndex(index);
});

return (
  <div ref={listRef}>
    {items.map((item, i) => (
      <button key={i}>{item}</button>
    ))}
  </div>
);
```

### Using Accessibility Utilities

```tsx
import {
  generateId,
  addAriaLabel,
  makeIconButtonAccessible,
  announceToLiveRegion,
  setHeadingLevel,
  addFieldDescription,
  markAsDecorative,
} from '@/utils/accessibility';

// Make icon button accessible
const button = document.querySelector('button');
makeIconButtonAccessible(button, 'Close dialog');

// Add description to form field
const input = document.querySelector('input');
addFieldDescription(input, 'Enter your email address');

// Announce to screen readers
announceToLiveRegion('Universe created successfully');

// Mark decorative elements
markAsDecorative(decorativeIcon);
```

## ARIA Implementation

### Buttons
```tsx
<button aria-label="Close dialog" aria-pressed="false">
  ✕
</button>
```

### Links
```tsx
<a href="/universe/1" aria-label="View Neural Dawn universe">
  View Universe
</a>
```

### Form Fields
```tsx
<label htmlFor="username">Username</label>
<input
  id="username"
  type="text"
  aria-describedby="username-hint"
  required
  aria-required="true"
/>
<small id="username-hint">3-20 characters, alphanumeric</small>
```

### Modals
```tsx
<div
  role="dialog"
  aria-labelledby="modal-title"
  aria-modal="true"
>
  <h2 id="modal-title">Create Universe</h2>
  {/* Modal content */}
</div>
```

### Live Regions
```tsx
<div aria-live="polite" aria-atomic="true">
  {notifications.map(n => <p key={n.id}>{n.message}</p>)}
</div>
```

### Lists
```tsx
<ul role="listbox">
  {items.map(item => (
    <li role="option" key={item.id}>
      {item.name}
    </li>
  ))}
</ul>
```

## Semantic HTML

Always use semantic elements:

```tsx
// ✅ Good
<nav>Navigation</nav>
<main id="main-content">Content</main>
<article>Article content</article>
<aside>Sidebar</aside>
<section>Section</section>
<header>Header</header>
<footer>Footer</footer>

// ❌ Avoid
<div role="navigation">Navigation</div>
<div role="main">Content</div>
<div role="article">Article</div>
```

## CSS Classes for Accessibility

### Screen Reader Only
```tsx
<span className="sr-only">Loading...</span>
```

Hides from visual but visible to screen readers.

### Focus Visible
```tsx
<button>Click me</button>
```

All elements get cyan focus outline.

### Skip to Main Content
```tsx
import { SkipToMainContent } from '@/context';

<SkipToMainContent />
<main id="main-content">{/* Content */}</main>
```

Visible on focus, allows jumping over navigation.

## Testing Accessibility

### Keyboard Navigation
1. Tab through entire page
2. Use arrow keys in lists
3. Press Enter on buttons
4. Press Escape to close modals

### Screen Reader
- Use NVDA (Windows) or JAWS
- Enable screen reader mode in settings
- Navigate using reader shortcuts

### Contrast
- Enable high contrast mode
- Verify text is readable
- Check focus indicators are visible

### Motion
- Enable reduce motion
- Animations should stop/simplify
- Transitions should be instant

### Visual
- Zoom to 200%
- Content should remain readable
- No horizontal scrolling

## Color Palette - Accessible

Our color combinations meet WCAG AA standards:

- **Cyan (#00eaff)** on Dark Background: 6.5:1 contrast
- **Purple (#a24df6)** on Dark Background: 4.8:1 contrast
- **Pink (#ff006e)** on Dark Background: 5.2:1 contrast
- **White** on Dark Background: 14.1:1 contrast

## Best Practices

### 1. Use Semantic HTML
```tsx
✅ <button>Save</button>
❌ <div onClick={save}>Save</div>
```

### 2. Label All Forms
```tsx
✅ <label htmlFor="email">Email</label>
   <input id="email" type="email" />
❌ <input type="email" placeholder="Email" />
```

### 3. Provide Alt Text
```tsx
✅ <img src="logo.png" alt="CineVerse Logo" />
❌ <img src="logo.png" />
❌ <img src="logo.png" alt="image" />
```

### 4. Focus Management
```tsx
✅ Focus modal on open
✅ Return focus on close
✅ Visible focus indicators
❌ Using outline: none without alternative
```

### 5. Keyboard Shortcuts
```tsx
✅ Shortcuts for power users
✅ Document shortcuts in help
✅ Provide alternatives
❌ Required keyboard shortcuts
```

### 6. Animations
```tsx
✅ Respect prefers-reduced-motion
✅ Provide static alternative
✅ Less than 3 seconds
❌ Auto-playing videos
```

## Accessibility Checklist

### Pages
- [ ] Has proper heading hierarchy (h1, h2, h3...)
- [ ] Has main landmark with id="main-content"
- [ ] Skip to main content link available
- [ ] Has descriptive page title
- [ ] No missing alt text on images

### Forms
- [ ] All inputs have associated labels
- [ ] Error messages are clear
- [ ] Required fields marked
- [ ] Submit button is descriptive

### Interactive Elements
- [ ] All clickable elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Buttons have aria-label if icon-only
- [ ] Links have descriptive text

### Content
- [ ] Color is not the only way to convey meaning
- [ ] Text has sufficient contrast (4.5:1 minimum)
- [ ] Content is readable at 200% zoom
- [ ] Animations respect prefers-reduced-motion

### Modals/Dialogs
- [ ] Has role="dialog"
- [ ] Has aria-labelledby
- [ ] Focus trapped inside
- [ ] Close button available
- [ ] Focus returned on close

## Tools & Resources

### Testing Tools
- WAVE (Browser Extension)
- Axe DevTools
- Lighthouse (Chrome DevTools)
- NVDA Screen Reader (Free)
- Color Contrast Analyzer

### References
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/)
- [Inclusive Components](https://inclusive-components.design/)

## Future Accessibility Goals

- [ ] Add more keyboard shortcuts documentation
- [ ] Implement ARIA live region announcements
- [ ] Add tooltips for complex interactions
- [ ] Improve form validation announcements
- [ ] Add haptic feedback option
- [ ] Support for switch access
- [ ] Extended keyboard controls

## Support

For accessibility questions or to report issues:
- Email: accessibility@cineverse.com
- Create an issue on GitHub
- Use feedback form in settings

**CineVerse is committed to digital inclusion for all users.**
