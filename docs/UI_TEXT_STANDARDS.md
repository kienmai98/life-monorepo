# UI Text Standards for Life App

This document defines the writing standards for all user-facing text in the Life app. Consistency in language creates trust and clarity.

---

## Button Labels

### General Rules

1. **Use ACTION verbs** - Buttons should start with or be an action verb
2. **ALL CAPS for primary actions** - Matches monochrome theme aesthetic
3. **Sentence case for secondary/tertiary** - Create visual hierarchy
4. **Be brief** - 1-2 words maximum
5. **Be specific** - Avoid generic "Submit" or "OK"

### Primary Buttons (ALL CAPS)

| Context | Label | Notes |
|---------|-------|-------|
| Save content | **SAVE** | Generic save |
| Create new | **CREATE** | Generic create |
| Add item | **ADD** | When adding to existing |
| Confirm action | **CONFIRM** | When explicit confirmation needed |
| Continue flow | **CONTINUE** | Multi-step processes |
| Complete action | **DONE** | When finishing |
| Delete permanently | **DELETE** | Destructive action |
| Cancel action | **CANCEL** | Dismiss/cancel |

### Secondary Buttons (Sentence Case)

| Context | Label | Alternative |
|---------|-------|-------------|
| Edit item | Edit | Modify |
| Remove item | Remove | Take out |
| Duplicate | Duplicate | Copy |
| Share content | Share | Send |
| Export data | Export | Download |
| Import data | Import | Upload |
| Settings | Settings | Preferences |
| View details | View details | See details |

### Context-Specific Button Labels

#### Calendar/Schedule

| Action | Primary | Secondary |
|--------|---------|-----------|
| Create event | **CREATE EVENT** | New event |
| Save event | **SAVE** | — |
| Edit event | — | Edit |
| Delete event | **DELETE** | — |
| Add reminder | **ADD REMINDER** | Set reminder |
| Import calendar | **IMPORT** | Import calendar |

#### Tasks

| Action | Primary | Secondary |
|--------|---------|-----------|
| Create task | **ADD TASK** | New task |
| Mark complete | — | Mark done |
| Mark incomplete | — | Mark undone |
| Set due date | — | Set date |
| Add to list | **ADD** | — |

#### Money

| Action | Primary | Secondary |
|--------|---------|-----------|
| Add transaction | **ADD** | New transaction |
| Set budget | **SET BUDGET** | Edit budget |
| Export data | — | Export |
| Add category | **ADD CATEGORY** | New category |

#### Notes

| Action | Primary | Secondary |
|--------|---------|-----------|
| Create note | **NEW NOTE** | Create |
| Save note | **SAVE** | — |
| Add tag | — | Add tag |
| Link to event | — | Link to event |

### Button States

| State | Example | Notes |
|-------|---------|-------|
| Default | **SAVE** | Standard appearance |
| Hover/Active | **SAVE** | Visual feedback only |
| Disabled | **SAVE** | Visually muted |
| Loading | **SAVING...** | Add ellipsis |
| Success | **SAVED** | Brief confirmation |

---

## Error Messages

### Principles

1. **Be friendly** - Not alarming or technical
2. **Be helpful** - Explain what went wrong AND how to fix it
3. **Be blameless** - Never blame the user
4. **Be brief** - One sentence if possible
5. **Offer a solution** - Always include next step

### Error Message Structure

```
[What happened] + [Why] + [What to do]
```

### Common Error Messages

#### Network Errors

| Situation | Message |
|-----------|---------|
| No connection | "No internet connection. Check your settings and try again." |
| Connection timeout | "Couldn't connect. Please try again." |
| Server error | "Something went wrong on our end. Please try again in a moment." |
| Sync failed | "Changes couldn't sync. We'll retry automatically." |

#### Validation Errors

| Situation | Message |
|-----------|---------|
| Empty required field | "Please add a [field name]" |
| Invalid email | "Please enter a valid email address" |
| Invalid date | "Please choose a valid date" |
| Future date required | "Please choose a future date" |
| Amount too large | "Amount must be less than $[limit]" |
| Duplicate name | "You already have a [item] with this name" |

#### Permission Errors

| Situation | Message |
|-----------|---------|
| No calendar access | "Life needs access to your calendar. Enable in Settings." |
| No notification access | "Enable notifications to get reminders." |
| No camera access | "Allow camera access to attach photos." |
| Biometric failed | "Couldn't verify. Try again or use your password." |

#### Data Errors

| Situation | Message |
|-----------|---------|
| Import failed | "Couldn't import. Check the file format and try again." |
| Export failed | "Couldn't export. Make sure you have enough storage." |
| Load failed | "Couldn't load [content]. Pull down to try again." |
| Save failed | "Couldn't save. Changes stored locally, will retry." |

### Error Message Examples

```
❌ Bad: "Error 404: Not Found"
❌ Bad: "Invalid input"
❌ Bad: "You did something wrong"

✅ Good: "Couldn't find that event. It may have been deleted."
✅ Good: "Please enter a date in the future"
✅ Good: "Something went wrong. Try again in a moment."
```

---

## Empty States

### Principles

1. **Be empathetic** - Acknowledge the emptiness
2. **Be guiding** - Show what should be there
3. **Be encouraging** - Motivate the first action
4. **Be contextual** - Different empty states for different contexts

### Empty State Structure

```
[Icon/Illustration]
[Headline - what's empty]
[Description - why it matters]
[Action - what to do]
```

### Empty State Messages

#### Calendar Empty States

| Context | Headline | Description | Action |
|---------|----------|-------------|--------|
| No events today | "No events today" | "Enjoy the free time, or add something to your schedule." | **ADD EVENT** |
| No events this week | "Nothing this week" | "Your week is wide open. Plan something productive." | **CREATE EVENT** |
| No events found | "No events found" | "Try adjusting your search or filters." | Clear filters |
| First use | "Your schedule is empty" | "Start by adding your first event." | **ADD FIRST EVENT** |

#### Tasks Empty States

| Context | Headline | Description | Action |
|---------|----------|-------------|--------|
| No tasks | "No tasks" | "You're all caught up! Add tasks as they come up." | **ADD TASK** |
| All complete | "All done!" | "You completed everything. Great job!" | **ADD TASK** |
| No tasks in list | "This list is empty" | "Add tasks here to organize this project." | **ADD TASK** |
| First use | "Start your first list" | "Lists help you organize tasks by project or area." | **CREATE LIST** |

#### Money Empty States

| Context | Headline | Description | Action |
|---------|----------|-------------|--------|
| No transactions | "No transactions yet" | "Track your first expense to start seeing insights." | **ADD EXPENSE** |
| No income | "No income recorded" | "Add income to see your complete financial picture." | **ADD INCOME** |
| No budget | "No budget set" | "Set a budget to track your spending goals." | **SET BUDGET** |
| First use | "Start tracking your money" | "Know where your money goes in seconds." | **ADD FIRST EXPENSE** |

#### Notes Empty States

| Context | Headline | Description | Action |
|---------|----------|-------------|--------|
| No notes | "No notes yet" | "Capture ideas, lists, and thoughts here." | **NEW NOTE** |
| No notes in tag | "Nothing in this tag" | "Notes with this tag will appear here." | Browse all notes |
| Search no results | "No notes found" | "Try different keywords or check your spelling." | Clear search |
| First use | "Your personal notebook" | "Quickly capture ideas and find them anytime." | **CREATE FIRST NOTE** |

### Empty State Examples

```
[Calendar icon]
No events today
Enjoy the free time, or add something to your schedule.
[ADD EVENT]
```

```
[Checkmark icon]
All done!
You completed everything. Great job!
[ADD TASK]
```

---

## Success Messages

### Principles

1. **Be celebratory but minimal** - Acknowledge success without fanfare
2. **Be brief** - One word or short phrase
3. **Be specific** - What was successful?
4. **Auto-dismiss** - Don't require user action to dismiss

### Success Message Options

| Verbosity | Examples | Use When |
|-----------|----------|----------|
| Minimal | "Saved" "Done" "Added" | Routine actions |
| Standard | "Event saved" "Task added" "Note updated" | Most actions |
| Detailed | "Event saved to your calendar" | Ambiguous contexts |

### Success Messages by Context

| Action | Minimal | Standard | Detailed |
|--------|---------|----------|----------|
| Save event | Saved | Event saved | Event saved to calendar |
| Add task | Added | Task added | Task added to list |
| Complete task | Done | Task complete | Task marked as complete |
| Create note | Created | Note created | New note created |
| Add transaction | Added | Transaction added | Expense recorded |
| Delete item | Deleted | Item deleted | Item permanently deleted |
| Import data | Imported | Import complete | [X] items imported |
| Export data | Exported | Export ready | File ready to download |
| Sync complete | Synced | Changes synced | All changes synced |

### Success Toast Guidelines

- Display for 2-3 seconds
- No close button needed
- Position: bottom center on mobile, top right on desktop
- Use checkmark icon for visual confirmation
- No sound effects (respect user's attention)

---

## Loading States

### Principles

1. **Be brief** - Loading text should be scannable
2. **Be honest** - Don't fake progress
3. **Be contextual** - What is being loaded?
4. **Be reassuring** - Indicate system is working

### Loading Message Patterns

| Pattern | Example | Use For |
|---------|---------|---------|
| Verb + Noun | "Loading events..." | Content loading |
| Verb + ing | "Saving..." | Action in progress |
| Wait message | "Just a moment..." | Unknown duration |
| Progress message | "Syncing 24 items..." | Quantifiable progress |

### Loading Messages by Context

| Context | Loading Message | Skeleton State |
|---------|-----------------|----------------|
| Initial app load | "Starting Life..." | App logo |
| Loading calendar | "Loading your calendar..." | Calendar grid skeleton |
| Loading events | "Loading events..." | List skeleton |
| Loading tasks | "Loading your tasks..." | List skeleton |
| Loading notes | "Loading notes..." | Card skeletons |
| Loading money data | "Crunching numbers..." | Chart skeleton |
| Saving | "Saving..." | Disabled button |
| Syncing | "Syncing changes..." | Progress indicator |
| Importing | "Importing [X] items..." | Progress bar |
| Exporting | "Preparing export..." | Spinner |
| Searching | "Searching..." | List skeleton |

### Loading State Examples

```
[Spinner]
Loading your calendar...
```

```
[Progress bar: 60%]
Syncing 45 of 75 items...
```

```
[Pulsing skeleton]
(Skeleton representation of content)
```

### Loading Best Practices

- Show skeleton screens for content loading (better than spinner)
- Show progress for operations > 2 seconds
- Allow cancellation for long operations (> 5 seconds)
- Never show "Loading..." alone — always specify what's loading

---

## Form Labels

### Principles

1. **Be clear** - Users should know exactly what to enter
2. **Be concise** - Short labels scan faster
3. **Use sentence case** - "Email address" not "Email Address"
4. **Mark required fields** - Use * or (required) consistently
5. **Use placeholder text wisely** - Examples, not repetition

### Standard Form Labels

| Field | Label | Placeholder | Notes |
|-------|-------|-------------|-------|
| Title/Name | Title | "Meeting with Sarah" | Context-dependent |
| Email | Email address | "you@example.com" | Be specific |
| Password | Password | "••••••••" | Don't show in placeholder |
| Date | Date | "Select date" | Or "MM/DD/YYYY" |
| Time | Time | "Select time" | Or "2:00 PM" |
| Description | Description | "Add details..." | Optional helper |
| Amount | Amount | "0.00" | With currency symbol |
| Category | Category | "Select category" | For dropdowns |
| Tags | Tags | "Add tags..." | Comma-separated |
| Notes | Notes | "Add a note..." | Freeform text |

### Required vs Optional Fields

**Option 1: Mark required fields**
```
Title *          [____________]
Description      [____________]  (optional)
```

**Option 2: Mark optional fields**
```
Title            [____________]
Description      [____________]  (optional)
```

**Recommendation:** Option 2 (mark optional) — most fields are typically required, so this reduces visual noise.

### Form Validation Messages

| Situation | Inline Message | Position |
|-----------|----------------|----------|
| Empty required | "Please enter a [label]" | Below field |
| Invalid format | "Please enter a valid [label]" | Below field |
| Too short | "[Label] must be at least [X] characters" | Below field |
| Too long | "[Label] must be less than [X] characters" | Below field |
| Conflict | "This [label] is already taken" | Below field |

### Form Section Headers

Use sentence case for section headers:

```
Event Details
├── Title
├── Date & Time
└── Description

Reminders
├── [Add reminder]
```

---

## Quick Reference: Do's and Don'ts

### Do

✅ Use **ALL CAPS** for primary button labels  
✅ Use sentence case for secondary actions  
✅ Start button labels with action verbs  
✅ Keep button labels to 1-2 words  
✅ Explain errors AND how to fix them  
✅ Use empathetic language for empty states  
✅ Celebrate successes briefly  
✅ Specify what's loading  
✅ Mark optional fields, not required  
✅ Use consistent terminology

### Don't

❌ Use title case for buttons ("Save Event")  
❌ Use "OK" or "Submit" as button labels  
❌ Blame users for errors  
❌ Leave empty states blank  
❌ Show "Loading..." without context  
❌ Use technical jargon  
❌ Mix ALL CAPS and sentence case randomly  
❌ Use exclamation marks excessively  
❌ Show redundant success messages  
❌ Mark every required field with *

---

## Text Patterns Summary

| Element | Case | Max Length | Example |
|---------|------|------------|---------|
| Primary buttons | UPPER | 2 words | **SAVE EVENT** |
| Secondary buttons | Sentence | 3 words | View details |
| Error headlines | Sentence | 5 words | No internet connection |
| Error descriptions | Sentence | 15 words | Check your settings and try again |
| Empty state headlines | Sentence | 5 words | No events today |
| Empty state descriptions | Sentence | 15 words | Enjoy the free time, or add something |
| Success messages | Sentence | 3 words | Event saved |
| Loading messages | Sentence | 5 words | Loading your calendar... |
| Form labels | Sentence | 3 words | Email address |
| Section headers | Sentence | 4 words | Event details |
