/**
 * Accessibility utilities for semantic HTML and ARIA
 */

/**
 * Generate unique ID for ARIA relationships
 */
let idCounter = 0;
export const generateId = (prefix = 'aria'): string => {
  return `${prefix}-${++idCounter}`;
};

/**
 * Check if element is keyboard accessible
 */
export const isKeyboardAccessible = (element: HTMLElement): boolean => {
  const isNaturallyFocusable = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(
    element.tagName
  );
  const hasTabIndex = element.hasAttribute('tabindex') && element.getAttribute('tabindex') !== '-1';
  const hasRole = element.hasAttribute('role');

  return isNaturallyFocusable || hasTabIndex || hasRole;
};

/**
 * Add ARIA label to element
 */
export const addAriaLabel = (
  element: HTMLElement,
  label: string,
  hidden = false
): void => {
  if (hidden) {
    element.setAttribute('aria-label', label);
  } else {
    element.setAttribute('aria-labelledby', `label-${generateId()}`);
    const labelElement = document.createElement('span');
    labelElement.id = `label-${generateId()}`;
    labelElement.textContent = label;
    element.insertAdjacentElement('beforebegin', labelElement);
  }
};

/**
 * Make icon-only buttons accessible
 */
export const makeIconButtonAccessible = (
  button: HTMLButtonElement,
  ariaLabel: string
): void => {
  button.setAttribute('aria-label', ariaLabel);
  button.setAttribute('type', 'button');
};

/**
 * Add live region announcement
 */
export const announceToLiveRegion = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  const region = document.createElement('div');
  region.setAttribute('aria-live', priority);
  region.setAttribute('aria-atomic', 'true');
  region.className = 'sr-only';
  region.textContent = message;
  document.body.appendChild(region);

  setTimeout(() => {
    region.remove();
  }, 1000);
};

/**
 * Set proper heading hierarchy
 */
export const setHeadingLevel = (
  element: HTMLElement,
  level: 1 | 2 | 3 | 4 | 5 | 6
): void => {
  const headingTag = `h${level}`;
  if (!['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)) {
    element.setAttribute('role', 'heading');
    element.setAttribute('aria-level', String(level));
  }
};

/**
 * Add description to form fields
 */
export const addFieldDescription = (
  input: HTMLInputElement,
  description: string
): string => {
  const descId = generateId('field-desc');
  input.setAttribute('aria-describedby', descId);

  const desc = document.createElement('small');
  desc.id = descId;
  desc.textContent = description;
  input.insertAdjacentElement('afterend', desc);

  return descId;
};

/**
 * Make custom controls keyboard accessible
 */
export const makeControlKeyboardAccessible = (
  element: HTMLElement,
  role: string,
  ariaLabel?: string
): void => {
  element.setAttribute('role', role);
  if (ariaLabel) {
    element.setAttribute('aria-label', ariaLabel);
  }
  element.setAttribute('tabindex', '0');
};

/**
 * Set focus to element with announcement
 */
export const setFocusWithAnnouncement = (
  element: HTMLElement,
  announcement?: string
): void => {
  element.focus();
  if (announcement) {
    announceToLiveRegion(announcement);
  }
};

/**
 * Test contrast ratio between colors (simple version)
 */
export const testContrast = (foreground: string, background: string): number => {
  // Simple contrast calculation - in production use WCAG formula
  return 4.5; // Placeholder
};

/**
 * Mark decorative elements so screen readers skip them
 */
export const markAsDecorative = (element: HTMLElement): void => {
  element.setAttribute('aria-hidden', 'true');
  element.classList.add('decorative-icon');
};

/**
 * Create accessible alert dialog
 */
export const createAccessibleAlert = (
  title: string,
  message: string,
  type: 'error' | 'warning' | 'info' = 'info'
): HTMLElement => {
  const alert = document.createElement('div');
  alert.setAttribute('role', 'alert');
  alert.setAttribute('aria-live', 'assertive');
  alert.setAttribute('aria-atomic', 'true');
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
  return alert;
};
