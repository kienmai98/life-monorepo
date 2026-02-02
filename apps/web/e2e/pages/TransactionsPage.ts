import { Page, Locator } from '@playwright/test';

export class TransactionsPage {
  readonly page: Page;
  readonly transactionList: Locator;
  readonly addTransactionButton: Locator;
  readonly filterCategory: Locator;
  readonly filterType: Locator;
  readonly searchInput: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transactionList = page.getByTestId('transaction-list');
    this.addTransactionButton = page.getByTestId('add-transaction-button');
    this.filterCategory = page.getByTestId('filter-category');
    this.filterType = page.getByTestId('filter-type');
    this.searchInput = page.getByTestId('search-input');
    this.sortSelect = page.getByTestId('sort-select');
  }

  async goto() {
    await this.page.goto('/transactions');
    await this.page.waitForLoadState('networkidle');
  }

  getTransactionByDescription(description: string): Locator {
    return this.page.getByText(description);
  }

  getTransactionByAmount(amount: string): Locator {
    return this.page.getByText(amount);
  }

  async deleteTransaction(description: string) {
    const transaction = this.getTransactionByDescription(description);
    const deleteButton = transaction.locator('..').getByTestId('delete-button');
    await deleteButton.click();
    
    // Confirm deletion if confirmation dialog appears
    const confirmButton = this.page.getByTestId('confirm-delete');
    if (await confirmButton.isVisible().catch(() => false)) {
      await confirmButton.click();
    }
  }

  async filterByCategory(category: string) {
    await this.filterCategory.selectOption(category);
  }

  async filterByType(type: string) {
    await this.filterType.selectOption(type);
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async getTransactionCount(): Promise<number> {
    return await this.page.getByTestId('transaction-item').count();
  }
}
