# Color Naming for Life App (Monochrome Palette)

This document defines the complete monochrome color system for the Life app, including palette names, semantic color roles, and usage guidelines.

---

## Philosophy

The Life app uses a **strict monochrome palette** — black, white, and grays only. This creates:

- **Visual calm** — No competing colors demanding attention
- **Timelessness** — Won't feel dated as color trends change
- **Accessibility** — High contrast by default
- **Focus** — Content and hierarchy drive the design, not decoration

---

## Base Palette

### Pure Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `black` | `#000000` | 0, 0, 0 | Primary text, key actions, borders |
| `white` | `#FFFFFF` | 255, 255, 255 | Backgrounds, inverted text |

### Gray Scale

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `gray-50` | `#FAFAFA` | 250, 250, 250 | Subtle backgrounds |
| `gray-100` | `#F5F5F5` | 245, 245, 245 | Light backgrounds, hover states |
| `gray-200` | `#E5E5E5` | 229, 229, 229 | Borders, dividers |
| `gray-300` | `#D4D4D4` | 212, 212, 212 | Disabled states |
| `gray-400` | `#A3A3A3` | 163, 163, 163 | Placeholder text |
| `gray-500` | `#737373` | 115, 115, 115 | Secondary text, icons |
| `gray-600` | `#525252` | 82, 82, 82 | Emphasized secondary text |
| `gray-700` | `#404040` | 64, 64, 64 | Strong secondary text |
| `gray-800` | `#262626` | 38, 38, 38 | Near-black text |
| `gray-900` | `#171717` | 23, 23, 23 | Headings, primary emphasis |

### CSS Variables

```css
:root {
  /* Pure colors */
  --color-black: #000000;
  --color-white: #ffffff;
  
  /* Gray scale */
  --color-gray-50: #fafafa;
  --color-gray-100: #f5f5f5;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #d4d4d4;
  --color-gray-400: #a3a3a3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;
}
```

---

## Semantic Color Names

Semantic colors describe **purpose**, not appearance. This allows for theme consistency and easier maintenance.

### Text Colors

| Semantic Token | Light Mode | Dark Mode | Usage |
|----------------|------------|-----------|-------|
| `text-primary` | `black` | `white` | Body text, labels |
| `text-secondary` | `gray-600` | `gray-400` | Secondary text, descriptions |
| `text-tertiary` | `gray-500` | `gray-500` | Tertiary info, metadata |
| `text-muted` | `gray-400` | `gray-600` | Placeholder text, hints |
| `text-inverse` | `white` | `black` | Text on dark backgrounds |

```css
:root {
  --color-text-primary: var(--color-black);
  --color-text-secondary: var(--color-gray-600);
  --color-text-tertiary: var(--color-gray-500);
  --color-text-muted: var(--color-gray-400);
  --color-text-inverse: var(--color-white);
}

[data-theme="dark"] {
  --color-text-primary: var(--color-white);
  --color-text-secondary: var(--color-gray-400);
  --color-text-tertiary: var(--color-gray-500);
  --color-text-muted: var(--color-gray-600);
  --color-text-inverse: var(--color-black);
}
```

### Background Colors

| Semantic Token | Light Mode | Dark Mode | Usage |
|----------------|------------|-----------|-------|
| `bg-primary` | `white` | `black` | Main app background |
| `bg-secondary` | `gray-50` | `gray-900` | Card backgrounds, sections |
| `bg-tertiary` | `gray-100` | `gray-800` | Hover states, elevated surfaces |
| `bg-elevated` | `white` | `gray-800` | Modals, popovers, menus |
| `bg-inverse` | `black` | `white` | Inverted sections, CTAs |

```css
:root {
  --color-bg-primary: var(--color-white);
  --color-bg-secondary: var(--color-gray-50);
  --color-bg-tertiary: var(--color-gray-100);
  --color-bg-elevated: var(--color-white);
  --color-bg-inverse: var(--color-black);
}

[data-theme="dark"] {
  --color-bg-primary: var(--color-black);
  --color-bg-secondary: var(--color-gray-900);
  --color-bg-tertiary: var(--color-gray-800);
  --color-bg-elevated: var(--color-gray-800);
  --color-bg-inverse: var(--color-white);
}
```

### Border Colors

| Semantic Token | Light Mode | Dark Mode | Usage |
|----------------|------------|-----------|-------|
| `border-default` | `gray-200` | `gray-700` | Standard borders |
| `border-strong` | `gray-300` | `gray-600` | Emphasized borders |
| `border-subtle` | `gray-100` | `gray-800` | Subtle dividers |
| `border-inverse` | `gray-700` | `gray-300` | Borders on dark backgrounds |

```css
:root {
  --color-border-default: var(--color-gray-200);
  --color-border-strong: var(--color-gray-300);
  --color-border-subtle: var(--color-gray-100);
  --color-border-inverse: var(--color-gray-700);
}

[data-theme="dark"] {
  --color-border-default: var(--color-gray-700);
  --color-border-strong: var(--color-gray-600);
  --color-border-subtle: var(--color-gray-800);
  --color-border-inverse: var(--color-gray-300);
}
```

### Interactive Colors

| Semantic Token | Light Mode | Dark Mode | Usage |
|----------------|------------|-----------|-------|
| `interactive-default` | `black` | `white` | Buttons, links |
| `interactive-hover` | `gray-800` | `gray-200` | Hover states |
| `interactive-active` | `gray-700` | `gray-300` | Active/pressed states |
| `interactive-disabled` | `gray-300` | `gray-700` | Disabled elements |
| `interactive-subtle` | `gray-100` | `gray-800` | Subtle button backgrounds |

```css
:root {
  --color-interactive-default: var(--color-black);
  --color-interactive-hover: var(--color-gray-800);
  --color-interactive-active: var(--color-gray-700);
  --color-interactive-disabled: var(--color-gray-300);
  --color-interactive-subtle: var(--color-gray-100);
}

[data-theme="dark"] {
  --color-interactive-default: var(--color-white);
  --color-interactive-hover: var(--color-gray-200);
  --color-interactive-active: var(--color-gray-300);
  --color-interactive-disabled: var(--color-gray-700);
  --color-interactive-subtle: var(--color-gray-800);
}
```

### State Colors (Using Opacity)

For states, use opacity on semantic colors rather than adding new grays:

| State | Implementation |
|-------|----------------|
| Hover | `opacity: 0.8` on interactive |
| Active | `opacity: 0.6` on interactive |
| Disabled | `opacity: 0.4` on text |
| Focus ring | `box-shadow: 0 0 0 2px rgba(0,0,0,0.2)` |
| Selected | Background `gray-100` or inverse text |

---

## Component-Specific Colors

### Buttons

| Button Type | Background | Text | Border |
|-------------|------------|------|--------|
| Primary | `interactive-default` | `text-inverse` | none |
| Secondary | `bg-secondary` | `text-primary` | `border-default` |
| Ghost | transparent | `text-primary` | none |
| Destructive | `white` | `text-primary` | `border-strong` |

### Cards

| Element | Color Token |
|---------|-------------|
| Background | `bg-secondary` or `bg-primary` |
| Border | `border-default` |
| Shadow | `0 1px 3px rgba(0,0,0,0.1)` |
| Hover shadow | `0 4px 12px rgba(0,0,0,0.15)` |

### Inputs

| Element | Color Token |
|---------|-------------|
| Background | `bg-primary` |
| Border | `border-default` |
| Border focus | `interactive-default` |
| Placeholder | `text-muted` |
| Text | `text-primary` |
| Disabled bg | `bg-tertiary` |

### Navigation

| Element | Color Token |
|---------|-------------|
| Background | `bg-primary` |
| Border | `border-subtle` |
| Active item | `interactive-default` |
| Inactive item | `text-secondary` |

---

## Feature-Specific Color Usage

### Schedule/Calendar

| Element | Color Token | Notes |
|---------|-------------|-------|
| Current day highlight | `bg-tertiary` | Subtle background |
| Selected day | `interactive-default` bg, `text-inverse` | High contrast |
| Event dot | `interactive-default` | Black/white dot |
| Past events | `text-tertiary` | Muted text |
| Future events | `text-primary` | Standard text |
| Weekend days | `bg-secondary` | Slight difference |
| Grid lines | `border-subtle` | Minimal contrast |

### Money

| Element | Color Token | Notes |
|---------|-------------|-------|
| Income indicator | `text-primary` | Black/white (no green) |
| Expense indicator | `text-primary` | Same color (context matters) |
| Positive balance | `text-primary` | Bold weight |
| Negative balance | `text-primary` | Use minus sign, not color |
| Budget progress track | `border-default` | Background track |
| Budget progress fill | `interactive-default` | Fill bar |
| Chart grid | `border-subtle` | Subtle |
| Chart lines | `text-secondary` | Medium gray |

### Tasks

| Element | Color Token | Notes |
|---------|-------------|-------|
| Completed task | `text-tertiary` | Muted + strikethrough |
| Priority indicator | Weight/position, not color | Bold for high priority |
| Due today | `text-primary` | Normal |
| Overdue | `text-primary` | Use icon, not color |
| Checkbox checked | `interactive-default` fill | Black/white |
| Checkbox unchecked | `border-strong` | Visible border |

### Notes

| Element | Color Token | Notes |
|---------|-------------|-------|
| Editor background | `bg-primary` | Clean canvas |
| Toolbar background | `bg-secondary` | Subtle separation |
| Tag background | `bg-tertiary` | Slight emphasis |
| Link color | `text-primary` with underline | Don't use blue |
| Code block bg | `bg-secondary` | Slight contrast |
| Blockquote border | `border-strong` | Left border |

---

## Opacity Scale

For subtle variations without adding new colors:

| Opacity | Hex Equivalent | Usage |
|---------|----------------|-------|
| 100% | — | Full color |
| 80% | `CC` suffix | Hover states |
| 60% | `99` suffix | Disabled, placeholders |
| 40% | `66` suffix | Very subtle |
| 20% | `33` suffix | Dividers, shadows |
| 10% | `1A` suffix | Very subtle backgrounds |
| 5% | `0D` suffix | Almost invisible |

```css
/* Example usage */
--color-shadow: rgba(0, 0, 0, 0.1);
--color-overlay: rgba(0, 0, 0, 0.5);
--color-backdrop: rgba(255, 255, 255, 0.8);
```

---

## Theme Implementation

### Tailwind CSS Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      gray: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
      },
    },
    extend: {
      colors: {
        // Semantic tokens
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          elevated: 'var(--color-bg-elevated)',
          inverse: 'var(--color-bg-inverse)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
          strong: 'var(--color-border-strong)',
          subtle: 'var(--color-border-subtle)',
          inverse: 'var(--color-border-inverse)',
        },
      },
    },
  },
};
```

### React Native Implementation

```typescript
// theme/colors.ts
export const palette = {
  black: '#000000',
  white: '#ffffff',
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
} as const;

export const lightTheme = {
  text: {
    primary: palette.black,
    secondary: palette.gray[600],
    tertiary: palette.gray[500],
    muted: palette.gray[400],
    inverse: palette.white,
  },
  background: {
    primary: palette.white,
    secondary: palette.gray[50],
    tertiary: palette.gray[100],
    elevated: palette.white,
    inverse: palette.black,
  },
  border: {
    default: palette.gray[200],
    strong: palette.gray[300],
    subtle: palette.gray[100],
    inverse: palette.gray[700],
  },
} as const;

export const darkTheme = {
  text: {
    primary: palette.white,
    secondary: palette.gray[400],
    tertiary: palette.gray[500],
    muted: palette.gray[600],
    inverse: palette.black,
  },
  background: {
    primary: palette.black,
    secondary: palette.gray[900],
    tertiary: palette.gray[800],
    elevated: palette.gray[800],
    inverse: palette.white,
  },
  border: {
    default: palette.gray[700],
    strong: palette.gray[600],
    subtle: palette.gray[800],
    inverse: palette.gray[300],
  },
} as const;
```

---

## Accessibility Guidelines

### Contrast Requirements

| Element | Minimum Ratio | Recommended |
|---------|--------------|-------------|
| Normal text | 4.5:1 | 7:1 |
| Large text (18px+) | 3:1 | 4.5:1 |
| UI components | 3:1 | 4.5:1 |
| Decorative | No requirement | — |

### Contrast Pairs (Light Mode)

| Text | Background | Ratio | Pass |
|------|------------|-------|------|
| Black | White | 21:1 | ✅ AAA |
| Gray-900 | White | 19:1 | ✅ AAA |
| Gray-600 | White | 6.7:1 | ✅ AA |
| Gray-500 | White | 4.6:1 | ✅ AA |
| Gray-400 | White | 2.8:1 | ❌ Fail |
| White | Black | 21:1 | ✅ AAA |
| White | Gray-900 | 19:1 | ✅ AAA |

### Contrast Pairs (Dark Mode)

| Text | Background | Ratio | Pass |
|------|------------|-------|------|
| White | Black | 21:1 | ✅ AAA |
| Gray-200 | Black | 11:1 | ✅ AAA |
| Gray-400 | Black | 6.7:1 | ✅ AA |
| Gray-500 | Black | 4.6:1 | ✅ AA |
| Gray-600 | Black | 3.0:1 | ✅ Large text only |

---

## Quick Reference

```css
/* Most common patterns */
/* Text */
color: var(--color-text-primary);
color: var(--color-text-secondary);

/* Backgrounds */
background-color: var(--color-bg-primary);
background-color: var(--color-bg-secondary);

/* Borders */
border-color: var(--color-border-default);
border-color: var(--color-border-subtle);

/* Interactive */
background-color: var(--color-interactive-default);
color: var(--color-text-inverse);

/* Hover */
opacity: 0.8;

/* Disabled */
opacity: 0.4;
```
