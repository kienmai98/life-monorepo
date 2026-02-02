import { Page, Locator } from '@playwright/test';

export class AddTransactionPage {
  readonly page: Page;
  readonly amountInput: Locator;
  readonly categorySelect: Locator;
  readonly descriptionInput: Locator;
  readonly typeSelect: Locator;
  readonly dateInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly successToast: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amountInput = page.getByTestId('amount-input');
    this.categorySelect = page.getByTestId('category-select');
    this.descriptionInput = page.getByTestId('description-input');
    this.typeSelect = page.getByTestId('type-select');
    this.dateInput = page.getByTestId('date-input');
    this.saveButton = page.getByTestId('save-transaction-button');
    this.cancelButton = page.getByTestId('cancel-button');
    this.successToast = page.getByTestId('success-toast');
    this.errorMessage = page.getByTestId('error-message');
  }

  async goto() {
    await this.page.goto('/transactions/add');
    await this.page.waitForLoadState('networkidle');
  }

  async fillTransaction(data: {
    amount: string;
    category: string;
    description: string;
    type?: string;
    date?: string;
  }) {
    await this.amountInput.fill(data.amount);
    await this.categorySelect.selectOption(data.category);
    await this.descriptionInput.fill(data.description);
    
    if (data.type) {
      await this.typeSelect.selectOption(data.type);
    }
    
    if (data.date) {
      await this.dateInput.fill(data.date);
    }
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }
}
