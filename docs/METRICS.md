# Life App - Metrics & Analytics

## Overview

This document defines the key metrics, targets, and analytics infrastructure for Life. Effective measurement is critical for understanding user behavior, optimizing conversion, and driving growth.

---

## KPIs to Track

### Growth Metrics

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GROWTH METRICS                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ACQUISITION METRICS                                                         │
│  ────────────────────                                                        │
│  Metric                    │ Formula              │ Target       │ Source   │
│  ─────────────────────────────────────────────────────────────────────────   │
│  App Store Impressions     │ Native               │ 500K/mo Y1   │ ASC      │
│  Product Page Views        │ Native               │ 100K/mo Y1   │ ASC      │
│  Downloads                 │ Native               │ 50K Y1       │ ASC      │
│  Download Conversion Rate  │ Downloads/Views      │ 10%          │ ASC      │
│  Cost Per Install (CPI)    │ Spend/Downloads      │ <$3          │ MMP      │
│  Organic % of Downloads    │ Organic/Total        │ >60%         │ ASC      │
│                                                                              │
│  VIRALITY METRICS                                                            │
│  ────────────────────                                                        │
│  Referral Rate             │ Referrers/Users      │ 15%          │ Custom   │
│  Viral Coefficient (K)     │ New from invites     │ >0.3         │ Custom   │
│  Net Promoter Score (NPS)  │ Survey               │ >40          │ Survey   │
│  App Store Rating          │ Native               │ >4.5         │ ASC      │
│  Review Conversion Rate    │ Reviews/Downloads    │ >5%          │ ASC      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Engagement Metrics

| Metric | Formula | Target | Frequency |
|--------|---------|--------|-----------|
| **DAU** | Daily Active Users | Growth 10% MoM | Daily |
| **MAU** | Monthly Active Users | Growth 15% MoM | Monthly |
| **DAU/MAU Ratio** | DAU/MAU | >20% (finance avg) | Daily |
| **Avg Session Duration** | Total time/Sessions | >3 minutes | Per session |
| **Sessions per User/Week** | Sessions/Users/7 days | >4 | Weekly |
| **Screen Views per Session** | Views/Sessions | >8 | Per session |

### Feature Engagement Metrics

| Feature | Metric | Target |
|---------|--------|--------|
| **Calendar** | Events viewed per session | >5 |
| **Expenses** | Transactions added per week | >15 |
| **Linking** | % of expenses linked to events | >40% |
| **Bank Sync** | Connected accounts per user | >2 |
| **Budgeting** | Budgets created per user | >1 |
| **AI Insights** | Insights viewed per week | >3 |
| **Widgets** | Widget interactions per day | >2 |
| **Watch** | Watch adds per week | >5 |

### Retention Metrics

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RETENTION TARGETS                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  COHORT RETENTION (Day N)                                                    │
│  ─────────────────────────                                                   │
│  Day     │ Industry Avg │ Life Target Y1 │ Life Target Y2 │ Life Target Y3  │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Day 1   │    25%       │      35%       │      45%       │      50%        │
│  Day 7   │    12%       │      18%       │      25%       │      30%        │
│  Day 14  │     9%       │      14%       │      20%       │      25%        │
│  Day 30  │     6%       │      10%       │      15%       │      20%        │
│  Day 90  │     3%       │       6%       │      10%       │      15%        │
│  Day 365 │     1%       │       3%       │       5%       │       8%        │
│                                                                              │
│  RETENTION SEGMENTS                                                          │
│  ────────────────────                                                        │
│  Free User Retention (D30)         │ 8%                            │        │
│  Premium User Retention (D30)      │ 25%                           │        │
│  Trial User Retention (D30)        │ 40%                           │        │
│                                                                              │
│  CHURN METRICS                                                               │
│  ────────────────                                                            │
│  Monthly Churn Rate                │ <8% (Y1) → <5% (Y2)          │        │
│  Annual Churn Rate                 │ <40% (Y1) → <30% (Y2)         │        │
│  Reactivation Rate (30d)           │ >10%                          │        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Revenue Metrics

| Metric | Formula | Target Y1 | Target Y2 | Target Y3 |
|--------|---------|-----------|-----------|-----------|
| **MRR** | Monthly Recurring Revenue | $2,500 | $20,000 | $125,000 |
| **ARR** | Annual Recurring Revenue | $30,000 | $240,000 | $1,500,000 |
| **ARPU** | Average Revenue Per User | $35/year | $40/year | $45/year |
| **ARPPU** | AR Per Paying User | $45/year | $50/year | $55/year |
| **Premium Conversion Rate** | Premium/Users | 2% | 4% | 5% |
| **Trial-to-Paid Conversion** | Paid/Trial | 25% | 35% | 45% |
| **Upgrade Rate** | Monthly upgrades | 3% | 4% | 5% |
| **Annual Plan Mix** | Annual/Total | 30% | 45% | 50% |
| **LTV** | Lifetime Value | $50 | $75 | $100 |
| **CAC** | Customer Acquisition Cost | <$5 | <$10 | <$15 |
| **LTV:CAC Ratio** | LTV/CAC | >10:1 | >7:1 | >6:1 |
| **Payback Period** | Months to recover CAC | <1 | <3 | <6 |

### Product Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Crash-Free Rate** | >99.5% | Firebase Crashlytics |
| **ANR Rate** (Android) | <0.5% | Play Console |
| **Avg Launch Time** | <2 seconds | Firebase Perf |
| **API Response Time** | <500ms p95 | Monitoring |
| **Support Tickets/User** | <0.1/month | Zendesk |

---

## Retention Targets

### Cohort Retention Curves

```
Retention %
    │
100 ┤●
    │ ╲
 80 ┤  ╲
    │   ╲    ━━━ Target Y1
 60 ┤    ╲  ╱
    │     ╲╱  ━━━ Target Y2
 40 ┤      ╲  ━━━ Target Y3
    │       ╲    ━━━ Industry Avg
 20 ┤        ╲
    │         ╲
  0 ┼────┬────┬────┬────┬────┬────┬────┬────┬────
    D1   D7   D14  D30  D60  D90  D180 D365
              
              Time
```

### Retention by User Segment

| Segment | D1 Target | D30 Target | D90 Target |
|---------|-----------|------------|------------|
| Free users (no transaction) | 20% | 5% | 2% |
| Free users (active tracker) | 40% | 12% | 6% |
| Trial users | 50% | 25% | 15% |
| Premium monthly | 60% | 35% | 25% |
| Premium annual | 70% | 50% | 40% |

### Retention Improvement Tactics

| Tactic | Target Metric | Expected Impact |
|--------|--------------|-----------------|
| Improved onboarding | D1 retention | +5% |
| Push notification optimization | D7 retention | +3% |
| Weekly summary emails | D30 retention | +2% |
| Habit streaks | D90 retention | +2% |
| Personalized insights | All retention | +3% |

---

## Conversion Goals

### Funnel Analysis

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONVERSION FUNNEL                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  AWARENESS                                                                   │
│  ─────────                                                                   │
│  App Store Impressions → Product Page Views                                  │
│         500K    →        100K    (20% CTR)                                   │
│                                                                              │
│  ACQUISITION                                                                 │
│  ────────────                                                                │
│  Product Page Views → Downloads                                              │
│         100K    →        10K     (10% conversion)                            │
│                                                                              │
│  ACTIVATION                                                                  │
│  ────────────                                                                │
│  Downloads → Sign Ups → First Transaction                                    │
│    10K    →   8K    →   4K      (40% activation)                             │
│                                                                              │
│  ENGAGEMENT                                                                  │
│  ────────────                                                                │
│  First Transaction → Week 1 Active → Week 4 Active                           │
│      4K     →      2K      →     800    (20% engaged)                        │
│                                                                              │
│  MONETIZATION                                                                │
│  ────────────                                                                │
│  Engaged Users → Trial Started → Trial Converted                             │
│      800    →      400     →     120    (30% trial conversion)               │
│                                                                              │
│  OVERALL CONVERSION: 10K downloads → 120 premium = 1.2%                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Conversion Rate Targets

| Stage | Current | Target Y1 | Target Y2 | Target Y3 |
|-------|---------|-----------|-----------|-----------|
| Download → Sign Up | 70% | 80% | 85% | 90% |
| Sign Up → First Transaction | 40% | 50% | 55% | 60% |
| Active User → Trial | 20% | 30% | 35% | 40% |
| Trial → Premium | 25% | 35% | 45% | 50% |
| Monthly → Annual | 30% | 40% | 50% | 55% |

### A/B Test Priority

| Test | Hypothesis | Primary Metric |
|------|------------|----------------|
| Onboarding flow | Shorter onboarding increases activation | D1 retention |
| Paywall timing | Earlier paywall increases trial starts | Trial rate |
| Pricing display | Annual discount emphasis increases annual mix | Annual % |
| Feature teasing | Locked features increase upgrades | Upgrade rate |
| Notification copy | Personalized notifications increase engagement | DAU/MAU |

---

## Analytics Setup Guide

### Tool Stack

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ANALYTICS TOOL STACK                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PRODUCT ANALYTICS                                                           │
│  ────────────────────                                                        │
│  Primary: Mixpanel or Amplitude                                              │
│  • Event tracking                                                            │
│  • Funnel analysis                                                           │
│  • Cohort analysis                                                           │
│  • User segmentation                                                         │
│                                                                              │
│  SUBSCRIPTION ANALYTICS                                                      │
│  ────────────────────────                                                    │
│  Tool: RevenueCat                                                            │
│  • Subscription events                                                       │
│  • Revenue metrics                                                           │
│  • Trial conversion                                                          │
│  • Churn analysis                                                            │
│  • MRR/ARR tracking                                                          │
│                                                                              │
│  APP STORE ANALYTICS                                                         │
│  ────────────────────────                                                    │
│  Tool: App Store Connect + App Annie/Sensor Tower                            │
│  • Downloads and impressions                                                 │
│  • Conversion rates                                                          │
│  • Reviews and ratings                                                       │
│  • ASO performance                                                           │
│                                                                              │
│  CRASH & PERFORMANCE                                                         │
│  ─────────────────────────                                                   │
│  Tool: Firebase Crashlytics + Performance Monitoring                         │
│  • Crash reports                                                             │
│  • ANR tracking                                                              │
│  • Performance metrics                                                       │
│  • Network monitoring                                                        │
│                                                                              │
│  SUPPORT ANALYTICS                                                           │
│  ────────────────────                                                        │
│  Tool: Zendesk or Intercom                                                   │
│  • Support ticket volume                                                     │
│  • Response times                                                            │
│  • Common issues                                                             │
│  • CSAT scores                                                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Event Tracking Schema

#### User Events

| Event Name | Properties | Trigger |
|------------|------------|---------|
| `user_signed_up` | method, source | Account creation |
| `user_logged_in` | method | Successful login |
| `user_onboarding_started` | step | First app open |
| `user_onboarding_completed` | duration, steps | Onboarding finish |
| `user_upgraded` | from_tier, to_tier, price | Subscription purchase |
| `user_downgraded` | from_tier, to_tier | Subscription change |
| `user_churned` | reason, days_active | Cancellation |

#### Engagement Events

| Event Name | Properties | Trigger |
|------------|------------|---------|
| `session_started` | source | App foreground |
| `session_ended` | duration, screens | App background |
| `screen_viewed` | screen_name, duration | Screen appearance |
| `feature_used` | feature_name | Feature interaction |

#### Calendar Events

| Event Name | Properties | Trigger |
|------------|------------|---------|
| `calendar_connected` | provider | Successful connection |
| `calendar_synced` | events_count | Sync completion |
| `event_viewed` | event_id, source | Event detail open |
| `event_created` | has_expense | Manual event creation |

#### Expense Events

| Event Name | Properties | Trigger |
|------------|------------|---------|
| `expense_added` | amount, category, method, linked | Transaction saved |
| `expense_edited` | changed_fields | Transaction update |
| `expense_deleted` | amount, age | Transaction removal |
| `expense_linked` | event_id | Link to calendar |
| `expense_categorized` | category, auto | Categorization |

#### Bank Sync Events

| Event Name | Properties | Trigger |
|------------|------------|---------|
| `bank_connected` | institution | Successful link |
| `bank_synced` | accounts_count, transactions_count | Sync completion |
| `bank_disconnected` | reason | Removal |
| `transaction_imported` | amount, merchant | Auto-import |

#### Premium Events

| Event Name | Properties | Trigger |
|------------|------------|---------|
| `paywall_shown` | trigger, features | Paywall display |
| `paywall_dismissed` | reason | Close without purchase |
| `trial_started` | source, plan | Trial activation |
| `trial_ended` | converted | Trial expiration |
| `subscription_purchased` | plan, price, source | Successful purchase |
| `subscription_cancelled` | reason, tenure | Cancellation |

### User Properties

```javascript
// User-level properties to set
{
  // Identity
  user_id: "uuid",
  email: "user@example.com",
  
  // Subscription
  subscription_tier: "free" | "trial" | "premium_monthly" | "premium_annual",
  subscription_start_date: "2026-02-01",
  trial_start_date: "2026-02-01",
  
  // Usage
  first_seen: "2026-02-01",
  last_seen: "2026-02-15",
  total_sessions: 25,
  total_transactions: 45,
  
  // Features
  has_bank_connected: true,
  bank_count: 2,
  calendar_connected: true,
  
  // Segmentation
  acquisition_source: "organic_search",
  acquisition_campaign: null,
  referrer: null
}
```

### Dashboard Setup

#### Executive Dashboard

| Widget | Metric | Visualization |
|--------|--------|---------------|
| Revenue | MRR, ARR | Line chart (trend) |
| Growth | Downloads, Signups | Bar chart (daily) |
| Conversion | Funnel rates | Funnel chart |
| Retention | D1, D7, D30 | Line chart (cohorts) |
| Health | Crash rate, Rating | Scorecards |

#### Product Dashboard

| Widget | Metric | Visualization |
|--------|--------|---------------|
| Engagement | DAU, MAU, DAU/MAU | Line chart |
| Feature Usage | Feature adoption | Bar chart |
| Session Quality | Duration, Screens | Histogram |
| User Flow | Screen navigation | Sankey diagram |
| Cohorts | Retention curves | Line chart |

#### Growth Dashboard

| Widget | Metric | Visualization |
|--------|--------|---------------|
| Acquisition | Sources, Campaigns | Pie chart |
| CAC | By channel | Bar chart |
| Payback | Time to recover CAC | Line chart |
| LTV | Segments | Box plot |
| Virality | K-factor, Referrals | Scorecards |

---

## Reporting Cadence

### Daily Reports

| Report | Audience | Key Metrics |
|--------|----------|-------------|
| Daily Metrics | Product team | DAU, Downloads, Crashes |
| Revenue Snapshot | Leadership | MRR, New subs, Churn |

### Weekly Reports

| Report | Audience | Key Metrics |
|--------|----------|-------------|
| Growth Report | Marketing | Acquisition, CAC, LTV |
| Product Health | Product | Retention, Engagement, Quality |
| Executive Summary | Leadership | All KPIs, trends, issues |

### Monthly Reports

| Report | Audience | Content |
|--------|----------|---------|
| Board Report | Investors | Full metrics, roadmap, financials |
| Deep Dive | Product team | Feature analysis, user feedback |
| Marketing Review | Marketing | Channel performance, experiments |

### Quarterly Reviews

| Review | Focus |
|--------|-------|
| OKR Review | Progress against objectives |
| Strategic Planning | Adjust roadmap and priorities |
| Competitive Analysis | Market position, threats |
| Technical Review | Architecture, debt, scale |

---

## Alerting

### Critical Alerts (Immediate)

| Condition | Action |
|-----------|--------|
| Crash rate > 2% | Page on-call engineer |
| Revenue drops > 20% | Notify leadership |
| App Store rating drops < 4.0 | Urgent review response |
| API error rate > 5% | Page backend team |

### Warning Alerts (Within 24h)

| Condition | Action |
|-----------|--------|
| DAU drops > 15% | Investigate cause |
| Conversion rate drops > 20% | Analyze funnel |
| Support tickets spike > 50% | Review common issues |
| Churn rate increases > 30% | Analyze cancellations |

---

## Data Privacy

### Analytics Privacy Principles

1. **No PII in analytics** - Use anonymized IDs only
2. **Opt-in for detailed tracking** - Respect user preferences
3. **Data retention limits** - Delete old data per policy
4. **Secure storage** - Encrypt analytics data
5. **Audit access** - Log who accesses analytics

### GDPR Compliance

- Users can request data export
- Users can request data deletion
- Consent captured for analytics
- Data processing agreement with vendors

---

*Document Version: 1.0*  
*Last Updated: February 2026*  
*Next Review: Monthly metric review*
