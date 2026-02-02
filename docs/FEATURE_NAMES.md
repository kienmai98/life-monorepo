# Feature Names for Life App

This document defines the standardized names for all features across the Life app ecosystem. Consistent naming reduces user confusion and creates a cohesive experience.

---

## Major Feature Naming Analysis

### 1. Calendar Feature

#### Option Analysis

| Name | Pros | Cons | Recommendation |
|------|------|------|----------------|
| **Schedule** | Active, implies planning; distinguishes from generic "Calendar" | Less immediately recognizable | ⭐ PRIMARY |
| **Planner** | Action-oriented; popular ASO keyword | Could imply task-only | Alternative |
| **Calendar** | Universal recognition; strong search keyword | Generic; doesn't differentiate | Keep as subtitle |
| **Agenda** | Implies daily focus; professional feel | Less common; may confuse | Not recommended |

#### Decision: SCHEDULE (Primary), Calendar (Subtitle/Secondary)

**Usage:**
- **Tab bar:** Schedule
- **Screen title:** Schedule (with "Calendar" in subtitle if needed)
- **Navigation:** Go to Schedule
- **ASO:** Include "Calendar" in keywords
- **User-facing copy:** "Add to your Schedule" or "View in Calendar"

#### Related Terms

| Element | Name | Notes |
|---------|------|-------|
| Individual entry | Event | Consistent with calendar conventions |
| All-day entry | All-day event | Standard terminology |
| Recurring entry | Recurring event | Standard terminology |
| Reminder notification | Reminder | Separate from event |
| Calendar views | Day / Week / Month / Year | Standard view names |
| Import source | Calendar import | When importing from other apps |

---

### 2. Transactions Feature

#### Option Analysis

| Name | Pros | Cons | Recommendation |
|------|------|------|----------------|
| **Money** | Simple, approachable, covers all aspects | Slightly informal; may seem limited | ⭐ PRIMARY |
| **Expenses** | Clear purpose; strong ASO keyword | Doesn't include income | Keep for expense-specific |
| **Finance** | Professional; covers income + expenses | Can feel corporate/intimidating | Alternative for pro tier |
| **Wallet** | Friendly; implies personal | May imply payment functionality | Not recommended |
| **Budget** | Goal-oriented; specific use case | Too narrow for full feature | Use within Money |

#### Decision: MONEY (Primary), with Expenses/Budget as sub-features

**Usage:**
- **Tab bar:** Money
- **Screen title:** Money
- **Navigation:** Go to Money
- **Sub-sections:** Expenses, Income, Budget
- **User-facing copy:** "Track in Money" or "Add to Expenses"

#### Related Terms

| Element | Name | Notes |
|---------|------|-------|
| Individual entry | Transaction | Generic, covers income/expense |
| Spending entry | Expense | Specific to money out |
| Earning entry | Income | Specific to money in |
| Transfer entry | Transfer | Between accounts |
| Category grouping | Category | For organizing transactions |
| Spending limit | Budget | Goal-oriented feature |
| Visual summary | Insights | Charts and analytics |
| Monthly view | Monthly summary | High-level overview |

---

### 3. Dashboard Feature

#### Option Analysis

| Name | Pros | Cons | Recommendation |
|------|------|------|----------------|
| **Home** | Universal recognition; welcoming | Generic; doesn't imply function | ⭐ PRIMARY |
| **Overview** | Descriptive; implies summary | Slightly formal; less inviting | Alternative |
| **Today** | Time-focused; implies daily use | May confuse with calendar | Not recommended |
| **Dashboard** | Feature-rich implication | Corporate feel; not friendly | Avoid |
| **My Life** | Personal; brand-aligned | Slightly cheesy; long | Alternative for marketing |

#### Decision: HOME (Primary), with Overview as alternative context

**Usage:**
- **Tab bar:** Home (with home icon)
- **Screen title:** Home or Today (context-dependent)
- **Navigation:** Go to Home / Back to Home
- **User-facing copy:** "Your Home screen" or "Home overview"

#### Home Screen Elements

| Element | Name | Notes |
|---------|------|-------|
| Today's schedule | Today's Schedule | Or "Up Next" |
| Pending tasks | To Do | Or "Your Tasks" |
| Recent transactions | Recent Activity | Money summary |
| Quick stats | Overview | Or "At a Glance" |
| Quick actions | Quick Add | Fast entry buttons |

---

## Complete Feature Reference

### Navigation Structure

```
Home (Tab)
├── Today's Schedule
├── To Do
├── Recent Activity
└── Quick Add

Schedule (Tab)
├── Day View
├── Week View
├── Month View
├── Year View
├── Events
└── Reminders

Tasks (Tab)
├── All Tasks
├── Lists
├── Today
├── Upcoming
└── Completed

Notes (Tab)
├── All Notes
├── Tags
├── Favorites
└── Recent

Money (Tab)
├── Overview
├── Transactions
├── Expenses
├── Income
├── Budget
└── Insights

Settings (Screen)
├── Account
├── Preferences
├── Notifications
├── Data & Privacy
├── Import & Export
└── About
```

### Feature Names by Context

#### Tab Bar Labels (Maximum 5 characters ideal)

| Tab | Label | Icon | Rationale |
|-----|-------|------|-----------|
| Home | Home | house | Universal recognition |
| Schedule | Schedule | calendar | Differentiates from generic "Calendar" app |
| Tasks | Tasks | checkmark-circle | Clear purpose |
| Notes | Notes | document-text | Standard terminology |
| Money | Money | wallet | Friendly, approachable |
| Settings | Settings | gear | Standard terminology |

*Alternative: Shorten "Schedule" to "Plan" if space constrained (4 chars)*

#### Screen Titles

| Screen | Primary Title | Subtitle (if needed) |
|--------|---------------|---------------------|
| Main calendar | Schedule | Your calendar |
| Event detail | Event Details | [Event title] |
| Task list | Tasks | [List name] |
| Task detail | Task | [Task title] |
| Note editor | Note | [Note title or "New Note"] |
| Money overview | Money | Financial overview |
| Transaction list | Transactions | [Category or date range] |
| Settings | Settings | — |

#### Action Labels

| Action | Primary Label | Alternative |
|--------|---------------|-------------|
| Create event | Add Event | New Event |
| Edit event | Edit | Modify Event |
| Delete event | Delete | Remove Event |
| Complete task | Mark Done | Complete |
| Create task | Add Task | New Task |
| Create note | New Note | Add Note |
| Save note | Save | Done |
| Add transaction | Add | New Transaction |
| View details | View | Details |
| Go back | Back | ← |

---

## Cross-Platform Consistency

### Platform-Specific Adaptations

| Feature | iOS | Android | Web | Watch |
|---------|-----|---------|-----|-------|
| Calendar | Schedule | Schedule | Schedule | Schedule |
| Tab bar labels | Shortest possible | Short | Full names | N/A |
| Navigation | Native iOS patterns | Material Design | Hybrid | Simplified |

### Naming Consistency Rules

1. **Same feature = Same name** across all platforms
2. **Adapt for space constraints** but keep meaning:
   - "Schedule" can become "Plan" on small screens
   - "Transactions" can become "History" if needed
3. **Maintain hierarchy:**
   - Primary name used in tab bar and navigation
   - Secondary names used in descriptions and help text

---

## Feature Naming for ASO

### Search Keywords Mapping

| Internal Name | ASO Keywords to Target |
|---------------|----------------------|
| Schedule | calendar, planner, schedule, agenda |
| Tasks | tasks, todo, to-do, reminders, checklist |
| Notes | notes, notebook, journal, memo |
| Money | money, expenses, budget, finance, spending, tracker |
| Home | dashboard, overview, today, organizer |

### App Store Feature Descriptions

```
SCHEDULE / CALENDAR
Plan your days with an intuitive calendar. Create events, 
set reminders, and view your schedule your way.

TASKS
Capture tasks as fast as you think of them. Organize with 
lists, set priorities, and never miss a deadline.

NOTES
Jot down ideas instantly. Organize with tags, search 
everything, and keep your thoughts accessible.

MONEY
Track spending in seconds. See where your money goes, 
set budgets, and achieve your financial goals.
```

---

## Feature Hierarchy

### Primary Features (Tabs)

1. **Home** - Overview and quick access
2. **Schedule** - Calendar and events
3. **Tasks** - To-dos and lists
4. **Notes** - Notes and ideas
5. **Money** - Transactions and budget

### Secondary Features (Within tabs)

| Primary | Secondary | Tertiary |
|---------|-----------|----------|
| Schedule | Events | Recurring, Reminders |
| Schedule | Views | Day, Week, Month, Year |
| Tasks | Lists | — |
| Tasks | Views | Today, Upcoming, Completed |
| Money | Transactions | Expenses, Income, Transfers |
| Money | Budget | Categories, Goals |
| Money | Insights | Charts, Trends |
| Notes | Organization | Tags, Favorites |
| Notes | Views | All, Recent, Tagged |

---

## Migration Guide

### If Renaming from Previous Names

| Old Name | New Name | Migration Strategy |
|----------|----------|-------------------|
| Calendar | Schedule | Keep "Calendar" in description; update UI gradually |
| Transactions | Money | Update all UI labels; "Transactions" becomes sub-feature |
| Dashboard | Home | Direct replacement; same functionality |
| To-Do | Tasks | Direct replacement; clearer scope |

### User Communication

When renaming features:

1. **In-app announcement:** "We've updated our navigation names to make Life easier to use"
2. **Contextual tooltips:** First use after update — "Calendar is now Schedule"
3. **Search terms:** Keep old names searchable within app for 1-2 versions
4. **Documentation:** Update all help articles and FAQs

---

## Quick Reference: Feature Names

| Feature | Primary | Alternative | ASO Keywords |
|---------|---------|-------------|--------------|
| Calendar/Planning | **Schedule** | Planner, Agenda | calendar, planner, schedule |
| Task Management | **Tasks** | To Do, Lists | tasks, todo, checklist |
| Note Taking | **Notes** | Notebook | notes, journal, memo |
| Financial Tracking | **Money** | Expenses, Finance | money, expenses, budget |
| Overview Screen | **Home** | Overview, Today | organizer, dashboard |
| App Settings | **Settings** | Preferences | — |
| User Account | **Account** | Profile | — |
| Data Management | **Import/Export** | Backup | — |

---

## File/Component Naming for Features

```
src/
├── features/
│   ├── home/
│   │   ├── HomeScreen.tsx
│   │   ├── TodayWidget.tsx
│   │   └── QuickActions.tsx
│   ├── schedule/
│   │   ├── ScheduleScreen.tsx
│   │   ├── EventCard.tsx
│   │   ├── DayView.tsx
│   │   └── MonthView.tsx
│   ├── tasks/
│   │   ├── TasksScreen.tsx
│   │   ├── TaskItem.tsx
│   │   └── TaskList.tsx
│   ├── notes/
│   │   ├── NotesScreen.tsx
│   │   ├── NoteEditor.tsx
│   │   └── NoteCard.tsx
│   └── money/
│       ├── MoneyScreen.tsx
│       ├── TransactionList.tsx
│       ├── BudgetView.tsx
│       └── InsightsChart.tsx
```

**Note:** File names use the feature name (PascalCase for components) as defined in this guide.
