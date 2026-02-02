import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly userGreeting: Locator;
  readonly balanceDisplay: Locator;
  readonly addExpenseButton: Locator;
  readonly viewScheduleButton: Locator;
  readonly transactionsButton: Locator;
  readonly spendingSummaryCard: Locator;
  readonly scheduleSummaryCard: Locator;
  readonly syncBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userGreeting = page.getByTestId('user-greeting');
    this.balanceDisplay = page.getByTestId('balance-display');
    this.addExpenseButton = page.getByRole('button', { name: /add expense/i });
    this.viewScheduleButton = page.getByRole('button', { name: /view schedule/i });
    this.transactionsButton = page.getByRole('button', { name: /transactions/i });
    this.spendingSummaryCard = page.getByTestId('spending-summary-card');
    this.scheduleSummaryCard = page.getByTestId('schedule-summary-card');
    this.syncBanner = page.getByTestId('sync-banner');
  }

  async goto() {
    await this.page.goto('/dashboard');
    await this.page.waitForLoadState('networkidle');
  }

  async getBalance(): Promise<number> {
    const balanceText = await this.balanceDisplay.textContent();
    if (!balanceText) return 0;
    // Parse currency string like "$5,000.00" to number
    return parseFloat(balanceText.replace(/[^0-9.-]/g, ''));
  }

  async getTotalIncome(): Promise<number> {
    const incomeText = await this.page.getByTestId('total-income').textContent();
    if (!incomeText) return 0;
    return parseFloat(incomeText.replace(/[^0-9.-]/g, ''));
  }

  async getTotalExpenses(): Promise<number> {
    const expensesText = await this.page.getByTestId('total-expenses').textContent();
    if (!expensesText) return 0;
    return parseFloat(expensesText.replace(/[^0-9.-]/g, ''));
  }
}
