# Monochrome Design System
## Eye-Friendly Color Palette for Mobile Apps

> **Philosophy:** Like premium paper and fountain pen ink — warm, calm, and readable. Not harsh computer screen glare.

---

## 1. Color Palette Specification

### Light Theme: "Warm Paper"

| Token | Hex | Usage |
|-------|-----|-------|
| **background** | `#FAFAF9` | Main app background — warm off-white, reduces eye strain vs pure white |
| **surface** | `#FFFFFF` | Cards, sheets, elevated surfaces — pure white for pop |
| **surface-elevated** | `#F5F5F4` | Subtly elevated elements, input fields |
| **text-primary** | `#1C1917` | Primary text — "ink black", soft but strong |
| **text-secondary** | `#78716C` | Secondary text, placeholders — stone gray |
| **text-tertiary** | `#A8A29E` | Disabled text, hints — warm light gray |
| **border** | `#E7E5E4` | Dividers, borders — barely there but visible |
| **border-strong** | `#D6D3D1` | Active borders, focus states |
| **accent** | `#292524` | Buttons, interactive elements — soft black |
| **accent-pressed** | `#1C1917` | Pressed states — ink black |

### Dark Theme: "Deep Ink"

| Token | Hex | Usage |
|-------|-----|-------|
| **background** | `#0C0A09` | Main dark background — deep charcoal, not pure black |
| **surface** | `#1C1917` | Cards, sheets — soft black |
| **surface-elevated** | `#292524` | Elevated cards, modals — lighter black |
| **text-primary** | `#FAFAF9` | Primary text — warm white |
| **text-secondary** | `#A8A29E` | Secondary text — soft gray |
| **text-tertiary** | `#78716C` | Disabled text — muted gray |
| **border** | `#292524` | Subtle borders in dark mode |
| **border-strong** | `#44403C` | Visible borders, dividers |
| **accent** | `#E7E5E4` | Buttons — light gray (inverted from light) |
| **accent-pressed** | `#FAFAF9` | Pressed buttons — warm white |

### Extended Gray Scale

For sophisticated hierarchies, use these graduated tones:

```
Light Theme Grays:
  50:  #FAFAF9  (background)
  100: #F5F5F4  (surface-elevated)
  200: #E7E5E4  (border)
  300: #D6D3D1  (border-strong)
  400: #A8A29E  (text-tertiary)
  500: #78716C  (text-secondary)
  600: #57534E  (icon muted)
  700: #44403C  (icon default)
  800: #292524  (accent)
  900: #1C1917  (text-primary)
  950: #0C0A09  (background dark)

Dark Theme Grays (same tokens, different values):
  50:  #FAFAF9  (text-primary)
  100: #F5F5F5  (surface light)
  200: #E7E5E4  (accent)
  300: #D6D3D1  (accent-hover)
  400: #A8A29E  (text-secondary)
  500: #78716C  (text-tertiary)
  600: #57534E  (icon muted)
  700: #44403C  (border-strong)
  800: #292524  (surface-elevated)
  900: #1C1917  (surface)
  950: #0C0A09  (background)
```

---

## 2. Contrast Ratios & Accessibility

### WCAG 2.1 AA/AAA Compliance

All text combinations meet **WCAG AA** (4.5:1 for normal text, 3:1 for large text). Primary text aims for **AAA** (7:1) where possible.

#### Light Theme Ratios

| Combination | Ratio | Rating | Notes |
|-------------|-------|--------|-------|
| `#1C1917` on `#FAFAF9` | **15.8:1** | ✅ AAA | Excellent readability |
| `#1C1917` on `#FFFFFF` | **17.4:1** | ✅ AAA | Maximum contrast |
| `#78716C` on `#FAFAF9` | **4.7:1** | ✅ AA | Secondary text threshold |
| `#78716C` on `#FFFFFF` | **5.2:1** | ✅ AA | Better on pure white |
| `#A8A29E` on `#FAFAF9` | **2.4:1** | ⚠️ Fail | Use only for disabled |
| `#292524` on `#FAFAF9` | **13.2:1** | ✅ AAA | Button text |
| `#FFFFFF` on `#292524` | **13.2:1** | ✅ AAA | Inverted buttons |

#### Dark Theme Ratios

| Combination | Ratio | Rating | Notes |
|-------------|-------|--------|-------|
| `#FAFAF9` on `#0C0A09` | **19.1:1** | ✅ AAA | Excellent readability |
| `#FAFAF9` on `#1C1917` | **17.4:1** | ✅ AAA | Card text |
| `#A8A29E` on `#0C0A09` | **7.9:1** | ✅ AAA | Secondary text (excellent!) |
| `#A8A29E` on `#1C1917` | **7.2:1** | ✅ AAA | Card secondary text |
| `#78716C` on `#0C0A09` | **4.7:1** | ✅ AA | Tertiary text threshold |
| `#E7E5E4` on `#292524` | **7.8:1** | ✅ AAA | Accent button text |

### Why These Ratios Matter

- **15-20:1** (Primary text): Maximum comfort for extended reading
- **7-10:1** (Secondary text): Clear hierarchy without competition
- **4.5:1+** (Minimum): WCAG AA compliance — never go lower for readable text
- **Avoid pure #000/#FFF**: 21:1 contrast is too harsh for prolonged use

---

## 3. Usage Guidelines

### When to Use Which Gray

```
Hierarchy Example — Task List Item:

┌─────────────────────────────────────────┐
│ ○  Complete design system               │  ← text-primary (#1C1917)
│    Due today · High priority            │  ← text-secondary (#78716C)
│    ─────────────────────────────────    │  ← border (#E7E5E4)
└─────────────────────────────────────────┘
     ↑
   background (#FAFAF9)

Components:
- Checkbox border: border-strong (#D6D3D1)
- Checkbox fill: accent (#292524) when checked
- Priority dot: accent (#292524)
```

### Interactive States

#### Buttons (Light Theme)

| State | Background | Text | Border | Notes |
|-------|------------|------|--------|-------|
| **Default** | `#292524` | `#FAFAF9` | none | Soft black, warm white text |
| **Hover** | `#44403C` | `#FAFAF9` | none | Slightly lighter |
| **Pressed** | `#1C1917` | `#FFFFFF` | none | Ink black |
| **Disabled** | `#E7E5E4` | `#A8A29E` | none | Muted, no border |
| **Secondary** | transparent | `#292524` | `#D6D3D1` | Ghost button |

#### Buttons (Dark Theme)

| State | Background | Text | Border | Notes |
|-------|------------|------|--------|-------|
| **Default** | `#E7E5E4` | `#292524` | none | Light on dark |
| **Hover** | `#FAFAF9` | `#1C1917` | none | Bright white |
| **Pressed** | `#FFFFFF` | `#0C0A09` | none | Maximum contrast |
| **Disabled** | `#292524` | `#78716C` | none | Muted |
| **Secondary** | transparent | `#E7E5E4` | `#44403C` | Ghost button |

#### Input Fields

| State | Background | Border | Text |
|-------|------------|--------|------|
| **Default** | `#FFFFFF` | `#E7E5E4` | `#1C1917` |
| **Focus** | `#FFFFFF` | `#78716C` | `#1C1917` |
| **Error** | `#FFFFFF` | `#DC2626` | `#1C1917` |
| **Disabled** | `#F5F5F4` | `#E7E5E4` | `#A8A29E` |

### Cards & Containers

```
Card Elevation Hierarchy:

Level 0 (Base):     background (#FAFAF9)
Level 1 (Card):     surface (#FFFFFF) + border (#E7E5E4)
Level 2 (Sheet):    surface (#FFFFFF) + shadow
Level 3 (Modal):    surface-elevated (#F5F5F4) + stronger shadow
```

### Typography Color Mapping

```
Heading 1:     text-primary    (H1, titles)
Heading 2:     text-primary    (H2, section headers)
Heading 3:     text-secondary  (H3, subsections)
Body:          text-primary    (paragraphs)
Body Small:    text-secondary  (captions, metadata)
Caption:       text-tertiary   (timestamps, hints)
Label:         text-secondary  (form labels)
Placeholder:   text-tertiary   (empty states)
```

---

## 4. Implementation Notes

### CSS Variables (Web)

```css
:root {
  /* Light theme (default) */
  --color-background: #FAFAF9;
  --color-surface: #FFFFFF;
  --color-surface-elevated: #F5F5F4;
  
  --color-text-primary: #1C1917;
  --color-text-secondary: #78716C;
  --color-text-tertiary: #A8A29E;
  
  --color-border: #E7E5E4;
  --color-border-strong: #D6D3D1;
  
  --color-accent: #292524;
  --color-accent-pressed: #1C1917;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0C0A09;
    --color-surface: #1C1917;
    --color-surface-elevated: #292524;
    
    --color-text-primary: #FAFAF9;
    --color-text-secondary: #A8A29E;
    --color-text-tertiary: #78716C;
    
    --color-border: #292524;
    --color-border-strong: #44403C;
    
    --color-accent: #E7E5E4;
    --color-accent-pressed: #FAFAF9;
  }
}

/* Semantic tokens */
.btn-primary {
  background: var(--color-accent);
  color: var(--color-background);
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}
```

### React Native StyleSheet

```typescript
// theme.ts
export const colors = {
  light: {
    background: '#FAFAF9',
    surface: '#FFFFFF',
    surfaceElevated: '#F5F5F4',
    textPrimary: '#1C1917',
    textSecondary: '#78716C',
    textTertiary: '#A8A29E',
    border: '#E7E5E4',
    borderStrong: '#D6D3D1',
    accent: '#292524',
    accentPressed: '#1C1917',
  },
  dark: {
    background: '#0C0A09',
    surface: '#1C1917',
    surfaceElevated: '#292524',
    textPrimary: '#FAFAF9',
    textSecondary: '#A8A29E',
    textTertiary: '#78716C',
    border: '#292524',
    borderStrong: '#44403C',
    accent: '#E7E5E4',
    accentPressed: '#FAFAF9',
  },
};

// Theme provider
import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext(colors.light);

export const ThemeProvider: React.FC = ({ children }) => {
  const scheme = useColorScheme();
  const theme = colors[scheme === 'dark' ? 'dark' : 'light'];
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Usage in component
import { View, Text, StyleSheet } from 'react-native';

export const TaskItem = () => {
  const theme = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <Text style={{ color: theme.textPrimary }}>Task title</Text>
      <Text style={{ color: theme.textSecondary }}>Due today</Text>
    </View>
  );
};
```

### Theme Switching Logic

```typescript
// Theme switching with system preference override
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
}

class ThemeManager {
  private STORAGE_KEY = '@app_theme';
  
  async getTheme(): Promise<ThemeMode> {
    const stored = await AsyncStorage.getItem(this.STORAGE_KEY);
    return (stored as ThemeMode) || 'system';
  }
  
  async setTheme(mode: ThemeMode): Promise<void> {
    await AsyncStorage.setItem(this.STORAGE_KEY, mode);
  }
  
  resolveTheme(mode: ThemeMode, systemDark: boolean): boolean {
    if (mode === 'system') return systemDark;
    return mode === 'dark';
  }
}

// iOS Appearance API
import { NativeModules } from 'react-native';
const { AppearanceManager } = NativeModules;

// Listen for system changes
import { Appearance } from 'react-native';

Appearance.addChangeListener(({ colorScheme }) => {
  // Update app theme if set to 'system'
});
```

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme
        paper: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        },
        // Semantic aliases
        background: '#FAFAF9',
        'background-dark': '#0C0A09',
        surface: '#FFFFFF',
        'surface-dark': '#1C1917',
      },
    },
  },
};
```

---

## 5. Visual Examples

### Before vs After

#### BEFORE: Harsh Pure Black/White

```
┌─────────────────────────────────────┐
│                                     │  ← Pure #FFFFFF (harsh, glaring)
│  ☰  My Tasks              ⚙️  👤   │
│                                     │
│ ─────────────────────────────────── │  ← Pure #000000 border (too strong)
│                                     │
│ ☑️  Finish project report           │  ← Pure #000000 text (high strain)
│     Due: Today                      │  ← Pure #808080 (cold, lifeless)
│ ─────────────────────────────────── │
│ ☐   Review design mockups           │
│     Due: Tomorrow                   │
│ ─────────────────────────────────── │
│ ☐   Team standup at 10am            │
│     Due: In 2 hours                 │
│                                     │
│  [       + New Task       ]         │  ← Pure #000 button (heavy)
│                                     │
└─────────────────────────────────────┘
```

**Problems:**
- Pure white background causes eye fatigue
- Pure black text is too harsh for extended reading
- Gray feels cold and clinical
- No warmth or personality
- High contrast = high strain

#### AFTER: Warm, Eye-Friendly Palette

```
┌─────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← #FAFAF9 (warm paper tone)
│  ☰  My Tasks              ⚙️  👤   │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ─────────────────────────────────── │  ← #E7E5E4 (subtle border)
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ☑️  Finish project report           │  ← #1C1917 (soft ink, readable)
│     Due: Today                      │  ← #78716C (warm stone gray)
│ ─────────────────────────────────── │
│ ☐   Review design mockups           │
│     Due: Tomorrow                   │
│ ─────────────────────────────────── │
│ ☐   Team standup at 10am            │
│     Due: In 2 hours                 │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                                     │
│  [       + New Task       ]         │  ← #292524 (soft black, elegant)
│                                     │
└─────────────────────────────────────┘
```

**Improvements:**
- Warm off-white (#FAFAF9) reduces eye strain
- Soft ink black (#1C1917) maintains readability without harshness
- Stone gray (#78716C) feels organic and warm
- Subtle borders create hierarchy without shouting
- Premium, paper-like feel

### Dark Mode Comparison

#### Harsh Pure Black Dark Mode

```
┌─────────────────────────────────────┐
│                                     │  ← Pure #000000 (disorienting void)
│  ☰  My Tasks              ⚪  👤   │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ ☑️  Finish project report           │  ← Pure #FFFFFF (blinding on OLED)
│     Due: Today                      │
│ ─────────────────────────────────── │
│ ☐   Review design mockups           │
│                                     │
└─────────────────────────────────────┘
```

#### Comfortable Deep Charcoal

```
┌─────────────────────────────────────┐
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │  ← #0C0A09 (deep charcoal)
│  ☰  My Tasks              ⚙️  👤   │
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │
│                                     │
│ ┌─────────────────────────────────┐ │  ← #1C1917 card surface
│ │ ☑️  Finish project report       │ │  ← #FAFAF9 (warm white text)
│ │     Due: Today                  │ │  ← #A8A29E (soft gray)
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ☐   Review design mockups       │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### Component Examples

#### Task Card (Light)

```
┌──────────────────────────────────────────┐
│                                          │  background: #FFFFFF
│  ☐  Design system documentation          │  title: #1C1917
│      📄 Documentation · 👤 You           │  meta: #78716C
│      🏷️ High Priority                    │  tag: #292524 bg
│                                          │
│  ─────────────────────────────────────   │  border: #E7E5E4
│  ☐  Review PR #234                       │
│      🔧 Engineering · 👥 Team            │
│      🏷️ Medium Priority                   │
│                                          │
└──────────────────────────────────────────┘
          ↑
    app background: #FAFAF9
```

#### Input Field States

```
Default:    ┌────────────────────┐   border: #E7E5E4
            │ Task title...      │   text: #A8A29E (placeholder)
            └────────────────────┘

Focused:    ┌────────────────────┐   border: #78716C
            │ Task title         │   text: #1C1917
            └────────────────────┘

Error:      ┌────────────────────┐   border: #DC2626 (red)
            │ Task title         │   text: #1C1917
            └────────────────────┘
            ⚠️ Title is required     error text: #DC2626

Disabled:   ┌────────────────────┐   bg: #F5F5F4
            │ Cannot edit...     │   text: #A8A29E
            └────────────────────┘   border: #E7E5E4
```

#### Button Variants

```
Primary:      ┌──────────────┐
              │  Save Task   │    bg: #292524, text: #FAFAF9
              └──────────────┘

Secondary:    ┌──────────────┐
              │  Cancel      │    bg: transparent, border: #D6D3D1, text: #292524
              └──────────────┘

Disabled:     ┌──────────────┐
              │  Saving...   │    bg: #E7E5E4, text: #A8A29E
              └──────────────┘

Destructive:  ┌──────────────┐
              │  Delete      │    bg: #DC2626, text: #FFFFFF
              └──────────────┘
```

---

## 6. Platform-Specific Notes

### iOS

- Follow [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/color)
- System gray colors map closely to our palette:
  - `systemGray6` ≈ `#F2F2F7` (our `#F5F5F4`)
  - `systemGray` ≈ `#8E8E93` (our `#78716C`)
  - `label` ≈ `#000000` (use our `#1C1917` instead)

- Use `UIScreen.main.traitCollection.userInterfaceStyle` for theme detection
- Support `UIUserInterfaceStyle` in Info.plist for default appearance

### Android

- Follow [Material Design 3](https://m3.material.io/styles/color/overview)
- Our palette aligns with M3 "Neutral" tonal palette
- Use `res/values-night/colors.xml` for dark theme
- Support `android:forceDarkAllowed` for WebView content

### OLED Considerations

- **True black (#000000)**: Saves battery on OLED but causes smearing and eye strain
- **Our approach (#0C0A09)**: Nearly as efficient, much more comfortable
- Avoid pure black for scrolling content (smearing artifacts)
- Use `#0C0A09` for background, `#1C1917` for surfaces

---

## 7. Psychology of Monochrome

### Why This Palette Works

1. **Warmth**: Slight red/yellow undertones feel organic (paper, ink)
2. **Reduced Blue Light**: Less harsh than cool grays, better for sleep
3. **Familiarity**: Mimics high-quality print materials
4. **Professionalism**: Monochrome signals focus and clarity
5. **Timelessness**: Won't look dated like trendy colors

### Color Psychology

| Color | Association | Use Case |
|-------|-------------|----------|
| `#FAFAF9` (warm white) | Clean, calm, open | Backgrounds, spacious feel |
| `#1C1917` (ink black) | Authoritative, clear | Primary text, emphasis |
| `#78716C` (stone) | Neutral, supportive | Secondary info, less important |
| `#292524` (charcoal) | Strong, actionable | Buttons, interactive |

---

## 8. Reference Apps Analysis

### Bear (Notes)
- **Background**: Warm cream (#F5F5F0)
- **Text**: Soft black (#2C2C2E)
- **Highlight**: Warm yellow undertones
- **Why it works**: Feels like writing on premium paper

### Things 3
- **Background**: Cool gray-white (#FFFFFF with subtle tint)
- **Text**: Near-black (#1D1D1F)
- **Accents**: System blue for actions
- **Why it works**: Clean, organized, Swiss design influence

### Linear
- **Background**: Deep charcoal (#0F0F0F)
- **Surface**: Elevated grays (#1A1A1A, #262626)
- **Text**: Pure white (#FFFFFF) — *slightly harsher than our recommendation*
- **Why it works**: High-end, developer-focused aesthetic

### Notion
- **Background**: Paper white (#FFFFFF)
- **Sidebar**: Light gray (#F7F6F3)
- **Text**: Ink black (#37352F)
- **Why it works**: Document-like, familiar writing experience

### Apple Notes
- **Background**: System adaptive
- **Text**: `UIColor.label` (adaptive)
- **Why it works**: Native feel, automatic accessibility

---

## 9. Migration Guide

### From Pure Black/White

```
#000000 → #1C1917 (text)
#FFFFFF → #FAFAF9 (background)
#000000 → #292524 (accents)
#808080 → #78716C (secondary text)
```

### Checklist

- [ ] Replace all `#000000` text with `#1C1917`
- [ ] Replace all `#FFFFFF` backgrounds with `#FAFAF9`
- [ ] Add border colors (`#E7E5E4`) to all cards/containers
- [ ] Update disabled states to use `#A8A29E`
- [ ] Test both themes at 50% brightness (realistic usage)
- [ ] Verify WCAG ratios with [contrast checker](https://webaim.org/resources/contrastchecker/)

---

## 10. Quick Reference Card

```
┌─────────────────────────────────────────┐
│        MONOCROME PALETTE CHEAT SHEET    │
├─────────────────────────────────────────┤
│  LIGHT THEME                            │
│  ┌────────┬─────────────────────────┐   │
│  │ #FAFAF9│ Background              │   │
│  │ #FFFFFF│ Surface / Cards         │   │
│  │ #1C1917│ Text Primary            │   │
│  │ #78716C│ Text Secondary          │   │
│  │ #A8A29E│ Text Tertiary/Disabled  │   │
│  │ #E7E5E4│ Borders                 │   │
│  │ #292524│ Accent / Buttons        │   │
│  └────────┴─────────────────────────┘   │
│                                         │
│  DARK THEME                             │
│  ┌────────┬─────────────────────────┐   │
│  │ #0C0A09│ Background              │   │
│  │ #1C1917│ Surface / Cards         │   │
│  │ #FAFAF9│ Text Primary            │   │
│  │ #A8A29E│ Text Secondary          │   │
│  │ #78716C│ Text Tertiary/Disabled  │   │
│  │ #292524│ Borders                 │   │
│  │ #E7E5E4│ Accent / Buttons        │   │
│  └────────┴─────────────────────────┘   │
│                                         │
│  GOLDEN RULE: Never pure #000 or #FFF   │
└─────────────────────────────────────────┘
```

---

*Last updated: 2024*
*Designed for eye comfort and timeless aesthetics*
