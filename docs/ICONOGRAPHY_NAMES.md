# Iconography Names for Life App

This document defines the icon naming conventions, icon set specifications, and usage guidelines for the Life app.

---

## Icon Naming Convention

### General Rules

1. **Use kebab-case** for file names
2. **Be descriptive** - Name should indicate what the icon represents
3. **Include variant suffixes** for size/style variations
4. **Group by category** using prefixes when applicable
5. **Avoid generic names** like `icon-1`, `new-icon`

### Naming Structure

```
[category]-[name]-[variant]-[size].svg
```

| Segment | Description | Examples |
|---------|-------------|----------|
| `category` | Feature area or type | `navigation`, `action`, `feature`, `status` |
| `name` | What the icon represents | `home`, `calendar`, `plus`, `check` |
| `variant` | Style variation | `outline`, `filled`, `bold` |
| `size` | Pixel dimensions | `16`, `24`, `32` |

### Examples

```
✅ Good:
navigation-home-filled-24.svg
action-plus-outline-24.svg
feature-calendar-outline-24.svg
status-check-circle-filled-16.svg

❌ Bad:
home.svg                    (missing category, size)
icon-1.svg                  (not descriptive)
new-calendar.svg            ("new" is temporary)
Calendar.svg                (use kebab-case)
```

---

## Icon Categories

### 1. Navigation Icons (Tab Bar)

Used in the bottom tab bar for primary navigation.

| Icon Name | Purpose | Active Style | Inactive Style |
|-----------|---------|--------------|----------------|
| `navigation-home` | Home tab | Filled | Outline |
| `navigation-schedule` | Schedule/Calendar tab | Filled | Outline |
| `navigation-tasks` | Tasks tab | Filled | Outline |
| `navigation-notes` | Notes tab | Filled | Outline |
| `navigation-money` | Money tab | Filled | Outline |
| `navigation-settings` | Settings (screen) | Filled | — |

**Tab Bar Specifications:**
- Size: 24x24px
- Stroke width: 1.5px (outline), 2px (filled)
- Active: `interactive-default` color
- Inactive: `text-tertiary` color

### 2. Action Icons

Common actions used throughout the app.

| Icon Name | Purpose | Size Options |
|-----------|---------|--------------|
| `action-plus` | Add/Create | 16, 20, 24 |
| `action-edit` | Edit/Modify | 16, 20, 24 |
| `action-delete` | Delete/Remove | 16, 20, 24 |
| `action-save` | Save | 20, 24 |
| `action-close` | Close/Dismiss | 16, 20, 24 |
| `action-back` | Navigate back | 20, 24 |
| `action-forward` | Navigate forward | 20, 24 |
| `action-search` | Search | 20, 24 |
| `action-filter` | Filter | 20, 24 |
| `action-sort` | Sort | 20, 24 |
| `action-more` | More options | 20, 24 |
| `action-share` | Share | 20, 24 |
| `action-export` | Export | 20, 24 |
| `action-import` | Import | 20, 24 |

### 3. Feature Icons

Icons representing specific features or content types.

#### Schedule Icons

| Icon Name | Purpose |
|-----------|---------|
| `feature-calendar` | Calendar/Schedule |
| `feature-event` | Event |
| `feature-event-recurring` | Recurring event |
| `feature-reminder` | Reminder notification |
| `feature-clock` | Time/Duration |
| `feature-alarm` | Alarm |
| `feature-timer` | Timer |
| `feature-timezone` | Time zone |

#### Task Icons

| Icon Name | Purpose |
|-----------|---------|
| `feature-task` | Task/To-do |
| `feature-task-list` | Task list |
| `feature-check` | Complete/Check |
| `feature-check-circle` | Completed status |
| `feature-checkbox` | Checkbox unchecked |
| `feature-checkbox-checked` | Checkbox checked |
| `feature-priority-high` | High priority |
| `feature-priority-medium` | Medium priority |
| `feature-priority-low` | Low priority |
| `feature-flag` | Flag/Mark |
| `feature-tag` | Tag |

#### Note Icons

| Icon Name | Purpose |
|-----------|---------|
| `feature-note` | Note/Document |
| `feature-note-text` | Text note |
| `feature-list` | List/Bullet list |
| `feature-list-numbered` | Numbered list |
| `feature-attachment` | Attachment |
| `feature-image` | Image |
| `feature-link` | Link |
| `feature-bookmark` | Bookmark/Favorite |

#### Money Icons

| Icon Name | Purpose |
|-----------|---------|
| `feature-wallet` | Money/Wallet |
| `feature-transaction` | Transaction |
| `feature-expense` | Expense/Spending |
| `feature-income` | Income/Earning |
| `feature-transfer` | Transfer |
| `feature-budget` | Budget |
| `feature-chart` | Chart/Analytics |
| `feature-chart-bar` | Bar chart |
| `feature-chart-line` | Line chart |
| `feature-chart-pie` | Pie chart |
| `feature-receipt` | Receipt |
| `feature-bill` | Bill |
| `feature-cash` | Cash |
| `feature-card` | Credit/Debit card |
| `feature-bank` | Bank/Account |
| `feature-currency` | Currency |
| `feature-calculator` | Calculator |

### 4. Status Icons

Icons indicating status, state, or feedback.

| Icon Name | Purpose | Color Usage |
|-----------|---------|-------------|
| `status-check` | Success/Complete | `interactive-default` |
| `status-check-circle` | Success (with circle) | `interactive-default` |
| `status-info` | Information | `text-secondary` |
| `status-info-circle` | Info (with circle) | `text-secondary` |
| `status-warning` | Warning | `text-primary` |
| `status-warning-triangle` | Warning (with triangle) | `text-primary` |
| `status-error` | Error | `text-primary` |
| `status-error-circle` | Error (with circle) | `text-primary` |
| `status-help` | Help/Question | `text-secondary` |
| `status-help-circle` | Help (with circle) | `text-secondary` |
| `status-loading` | Loading/Spinner | `text-secondary` |
| `status-sync` | Sync status | `text-secondary` |
| `status-syncing` | Syncing (animated) | `text-secondary` |
| `status-cloud` | Cloud status | `text-secondary` |
| `status-cloud-offline` | Offline | `text-muted` |
| `status-lock` | Locked/Private | `text-secondary` |
| `status-unlock` | Unlocked | `text-secondary` |

### 5. Navigation Chevron Icons

Directional indicators.

| Icon Name | Purpose |
|-----------|---------|
| `chevron-up` | Expand/Collapse up |
| `chevron-down` | Expand/Collapse down |
| `chevron-left` | Navigate left |
| `chevron-right` | Navigate right |
| `chevron-double-left` | Fast backward |
| `chevron-double-right` | Fast forward |
| `arrow-up` | Up/Upload |
| `arrow-down` | Down/Download |
| `arrow-left` | Back |
| `arrow-right` | Forward |
| `arrow-up-right` | External link |

### 6. Social/Communication Icons

| Icon Name | Purpose |
|-----------|---------|
| `social-share` | Share |
| `social-share-ios` | iOS share sheet |
| `social-email` | Email |
| `social-message` | Message |
| `social-link` | Copy link |

---

## Tab Bar Icon Labels

### Primary Tab Labels (iOS/Android)

| Tab | Label | Icon Name | Accessibility Label |
|-----|-------|-----------|---------------------|
| Home | Home | `navigation-home` | "Home" |
| Schedule | Schedule | `navigation-schedule` | "Schedule" |
| Tasks | Tasks | `navigation-tasks` | "Tasks" |
| Notes | Notes | `navigation-notes` | "Notes" |
| Money | Money | `navigation-money` | "Money" |

### Tab Bar Specifications

```typescript
interface TabBarIcon {
  name: string;
  label: string;
  activeIcon: string;    // filled variant
  inactiveIcon: string;  // outline variant
  accessibilityLabel: string;
  badge?: 'number' | 'dot' | 'none';
}

const tabBarConfig: TabBarIcon[] = [
  {
    name: 'home',
    label: 'Home',
    activeIcon: 'navigation-home-filled-24',
    inactiveIcon: 'navigation-home-outline-24',
    accessibilityLabel: 'Home',
  },
  {
    name: 'schedule',
    label: 'Schedule',
    activeIcon: 'navigation-schedule-filled-24',
    inactiveIcon: 'navigation-schedule-outline-24',
    accessibilityLabel: 'Schedule',
  },
  {
    name: 'tasks',
    label: 'Tasks',
    activeIcon: 'navigation-tasks-filled-24',
    inactiveIcon: 'navigation-tasks-outline-24',
    accessibilityLabel: 'Tasks',
    badge: 'number',
  },
  {
    name: 'notes',
    label: 'Notes',
    activeIcon: 'navigation-notes-filled-24',
    inactiveIcon: 'navigation-notes-outline-24',
    accessibilityLabel: 'Notes',
  },
  {
    name: 'money',
    label: 'Money',
    activeIcon: 'navigation-money-filled-24',
    inactiveIcon: 'navigation-money-outline-24',
    accessibilityLabel: 'Money',
  },
];
```

---

## Icon Size Standards

### Standard Sizes

| Size | Usage | Stroke Width |
|------|-------|--------------|
| 16px | Inline text, compact UI | 1.5px |
| 20px | Buttons, list items | 1.5px |
| 24px | Tab bar, navigation | 1.5px |
| 32px | Feature highlights, empty states | 2px |
| 48px | Large empty states, illustrations | 2px |
| 64px | Hero illustrations | 2.5px |

### Size Guidelines

```
16px  → Inline with text, small buttons, tags
20px  → Standard button icons, list item actions
24px  → Tab bars, navigation headers, primary actions
32px  → Empty states, feature highlights
48px+ → Onboarding, illustrations, hero sections
```

---

## Icon Design Specifications

### Visual Style

- **Stroke-based** (outline icons) for most cases
- **Filled variants** for active states and emphasis
- **Rounded caps** and **rounded joins** for friendly feel
- **1.5px stroke** for standard sizes
- **2px stroke** for larger sizes (32px+)
- **Consistent corner radius** (2px for small elements)

### Grid System

- **24x24px** base grid for standard icons
- **2px padding** on all sides (20x20px live area)
- **Pixel-aligned** for crisp rendering
- **Centered** within the grid

### Monochrome Application

| Context | Color Token | Notes |
|---------|-------------|-------|
| Active/Primary | `interactive-default` | Black in light mode |
| Inactive | `text-tertiary` | Gray-500 |
| Disabled | `text-muted` | Gray-400 |
| On dark background | `text-inverse` | White |
| Secondary action | `text-secondary` | Gray-600 |

---

## Icon Library Structure

### File Organization

```
assets/
├── icons/
│   ├── navigation/
│   │   ├── navigation-home-outline-24.svg
│   │   ├── navigation-home-filled-24.svg
│   │   ├── navigation-schedule-outline-24.svg
│   │   ├── navigation-schedule-filled-24.svg
│   │   ├── navigation-tasks-outline-24.svg
│   │   ├── navigation-tasks-filled-24.svg
│   │   ├── navigation-notes-outline-24.svg
│   │   ├── navigation-notes-filled-24.svg
│   │   ├── navigation-money-outline-24.svg
│   │   └── navigation-money-filled-24.svg
│   ├── action/
│   │   ├── action-plus-*.svg
│   │   ├── action-edit-*.svg
│   │   ├── action-delete-*.svg
│   │   └── ...
│   ├── feature/
│   │   ├── feature-calendar-*.svg
│   │   ├── feature-task-*.svg
│   │   ├── feature-note-*.svg
│   │   ├── feature-wallet-*.svg
│   │   └── ...
│   ├── status/
│   │   ├── status-check-*.svg
│   │   ├── status-info-*.svg
│   │   ├── status-warning-*.svg
│   │   └── ...
│   └── index.ts  # Icon registry
```

### Icon Registry (TypeScript)

```typescript
// assets/icons/index.ts

export const icons = {
  // Navigation
  'navigation-home-outline': require('./navigation/navigation-home-outline-24.svg'),
  'navigation-home-filled': require('./navigation/navigation-home-filled-24.svg'),
  'navigation-schedule-outline': require('./navigation/navigation-schedule-outline-24.svg'),
  'navigation-schedule-filled': require('./navigation/navigation-schedule-filled-24.svg'),
  'navigation-tasks-outline': require('./navigation/navigation-tasks-outline-24.svg'),
  'navigation-tasks-filled': require('./navigation/navigation-tasks-filled-24.svg'),
  'navigation-notes-outline': require('./navigation/navigation-notes-outline-24.svg'),
  'navigation-notes-filled': require('./navigation/navigation-notes-filled-24.svg'),
  'navigation-money-outline': require('./navigation/navigation-money-outline-24.svg'),
  'navigation-money-filled': require('./navigation/navigation-money-filled-24.svg'),
  
  // Actions
  'action-plus': require('./action/action-plus-24.svg'),
  'action-edit': require('./action/action-edit-24.svg'),
  'action-delete': require('./action/action-delete-24.svg'),
  // ... etc
} as const;

export type IconName = keyof typeof icons;
```

---

## Icon Component Usage

### React Component

```typescript
// components/ui/Icon.tsx

import React from 'react';
import { icons } from '@/assets/icons';

type IconVariant = 'outline' | 'filled';
type IconSize = 16 | 20 | 24 | 32 | 48 | 64;

interface IconProps {
  name: string;
  variant?: IconVariant;
  size?: IconSize;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  variant = 'outline',
  size = 24,
  color,
  className,
}) => {
  const iconName = `${name}-${variant}-${size}`;
  // Render SVG based on iconName
  return (
    <svg 
      width={size} 
      height={size} 
      className={className}
      style={{ color }}
    >
      {/* SVG content */}
    </svg>
  );
};

// Usage
<Icon name="navigation-home" variant="filled" size={24} />
<Icon name="action-plus" size={20} />
<Icon name="feature-calendar" size={32} />
```

### React Native Component

```typescript
// components/ui/Icon.native.tsx

import React from 'react';
import { SvgProps } from 'react-native-svg';
import NavigationHomeOutline from '@/assets/icons/navigation/navigation-home-outline-24.svg';
// ... other imports

const iconMap = {
  'navigation-home-outline': NavigationHomeOutline,
  'navigation-home-filled': NavigationHomeFilled,
  // ... etc
};

interface IconProps extends SvgProps {
  name: keyof typeof iconMap;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  ...props
}) => {
  const IconComponent = iconMap[name];
  
  return (
    <IconComponent 
      width={size} 
      height={size} 
      color={color}
      {...props} 
    />
  );
};
```

---

## Tab Bar Implementation Example

```typescript
// navigation/TabBar.tsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@/components/ui/Icon';

interface TabBarProps {
  state: NavigationState;
  descriptors: SceneDescriptorMap;
  navigation: NavigationHelpers;
}

const tabs = [
  { name: 'home', label: 'Home', icon: 'navigation-home' },
  { name: 'schedule', label: 'Schedule', icon: 'navigation-schedule' },
  { name: 'tasks', label: 'Tasks', icon: 'navigation-tasks' },
  { name: 'notes', label: 'Notes', icon: 'navigation-notes' },
  { name: 'money', label: 'Money', icon: 'navigation-money' },
];

export const TabBar: React.FC<TabBarProps> = ({ state, navigation }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = state.index === index;
        const variant = isActive ? 'filled' : 'outline';
        
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => navigation.navigate(tab.name)}
            style={styles.tab}
            accessibilityLabel={tab.label}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Icon
              name={tab.icon}
              variant={variant}
              size={24}
              color={isActive ? 'var(--color-interactive-default)' : 'var(--color-text-tertiary)'}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
```

---

## Accessibility Guidelines

### Required Practices

1. **Always provide accessibility labels**
   ```tsx
   <Icon name="action-delete" accessibilityLabel="Delete item" />
   ```

2. **Hide decorative icons from screen readers**
   ```tsx
   <Icon name="status-check" decorative />
   ```

3. **Combine with text when possible**
   ```tsx
   <Button icon="action-plus">Add Task</Button>
   ```

4. **Ensure sufficient touch targets**
   - Minimum 44x44px touch area
   - Even for smaller icons

### Accessibility Props

```typescript
interface IconAccessibilityProps {
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'image' | 'button';
  accessibilityState?: {
    selected?: boolean;
    disabled?: boolean;
  };
  decorative?: boolean;  // hides from screen readers
}
```

---

## Quick Reference

| Icon Set | Prefix | Count | Sizes |
|----------|--------|-------|-------|
| Navigation | `navigation-` | 5+ | 24px |
| Actions | `action-` | 15+ | 16, 20, 24px |
| Features | `feature-` | 30+ | 16, 20, 24, 32px |
| Status | `status-` | 12+ | 16, 20, 24px |
| Chevron | `chevron-` | 6+ | 16, 20, 24px |
| Social | `social-` | 5+ | 20, 24px |

### Tab Bar Icons Summary

| Tab | Outline | Filled | Label |
|-----|---------|--------|-------|
| Home | `navigation-home-outline-24` | `navigation-home-filled-24` | Home |
| Schedule | `navigation-schedule-outline-24` | `navigation-schedule-filled-24` | Schedule |
| Tasks | `navigation-tasks-outline-24` | `navigation-tasks-filled-24` | Tasks |
| Notes | `navigation-notes-outline-24` | `navigation-notes-filled-24` | Notes |
| Money | `navigation-money-outline-24` | `navigation-money-filled-24` | Money |
