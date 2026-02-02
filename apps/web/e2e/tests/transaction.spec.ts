import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AddTransactionPage } from '../pages/AddTransactionPage';
import { TransactionsPage } from '../pages/TransactionsPage';

test.describe('Add Transaction Flow', () => {
  let dashboardPage: DashboardPage;
  let addTransactionPage: AddTransactionPage;
  let transactionsPage: TransactionsPage;

  test.beforeEach(async ({ page }) => {
    // Login before each test
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('test@example.com', 'password123');
    
    dashboardPage = new DashboardPage(page);
    addTransactionPage = new AddTransactionPage(page);
    transactionsPage = new TransactionsPage(page);
    
    await expect(dashboardPage.userGreeting).toBeVisible();
  });

  test('user can add a new expense', async () => {
    // Click add expense from dashboard
    await dashboardPage.addExpenseButton.click();
    
    // Should navigate to add transaction page
    await expect(addTransactionPage.page).toHaveURL('/transactions/add');
    
    // Fill transaction details
    await addTransactionPage.amountInput.fill('50.00');
    await addTransactionPage.categorySelect.selectOption('food');
    await addTransactionPage.descriptionInput.fill('Lunch at cafe');
    await addTransactionPage.typeSelect.selectOption('expense');
    
    // Save transaction
    await addTransactionPage.saveButton.click();
    
    // Should show success message
    await expect(addTransactionPage.successToast).toBeVisible();
    
    // Should redirect to transactions list
    await expect(addTransactionPage.page).toHaveURL('/transactions');
    
    // New transaction should be visible
    await expect(transactionsPage.getTransactionByDescription('Lunch at cafe')).toBeVisible();
  });

  test('user can add a new income', async () => {
    await dashboardPage.addExpenseButton.click();
    
    await addTransactionPage.amountInput.fill('5000.00');
    await addTransactionPage.categorySelect.selectOption('income');
    await addTransactionPage.descriptionInput.fill('Monthly salary');
    await addTransactionPage.typeSelect.selectOption('income');
    await addTransactionPage.saveButton.click();
    
    await expect(addTransactionPage.successToast).toBeVisible();
  });

  test('shows validation error for missing amount', async () => {
    await dashboardPage.addExpenseButton.click();
    
    // Try to save without amount
    await addTransactionPage.categorySelect.selectOption('food');
    await addTransactionPage.descriptionInput.fill('Lunch');
    await addTransactionPage.saveButton.click();
    
    await expect(addTransactionPage.errorMessage).toBeVisible();
    await expect(addTransactionPage.errorMessage).toContainText('Amount');
  });

  test('shows validation error for missing category', async () => {
    await dashboardPage.addExpenseButton.click();
    
    await addTransactionPage.amountInput.fill('50.00');
    await addTransactionPage.descriptionInput.fill('Lunch');
    await addTransactionPage.saveButton.click();
    
    await expect(addTransactionPage.errorMessage).toBeVisible();
    await expect(addTransactionPage.errorMessage).toContainText('Category');
  });

  test('shows validation error for negative amount', async () => {
    await dashboardPage.addExpenseButton.click();
    
    await addTransactionPage.amountInput.fill('-50.00');
    await addTransactionPage.categorySelect.selectOption('food');
    await addTransactionPage.descriptionInput.fill('Lunch');
    await addTransactionPage.saveButton.click();
    
    await expect(addTransactionPage.errorMessage).toBeVisible();
  });

  test('user can cancel adding transaction', async () => {
    await dashboardPage.addExpenseButton.click();
    
    await addTransactionPage.amountInput.fill('50.00');
    await addTransactionPage.cancelButton.click();
    
    // Should return to dashboard
    await expect(addTransactionPage.page).toHaveURL('/dashboard');
  });

  test('transaction appears in dashboard summary', async () => {
    const initialBalance = await dashboardPage.getBalance();
    
    await dashboardPage.addExpenseButton.click();
    await addTransactionPage.amountInput.fill('100.00');
    await addTransactionPage.categorySelect.selectOption('food');
    await addTransactionPage.descriptionInput.fill('Dinner');
    await addTransactionPage.typeSelect.selectOption('expense');
    await addTransactionPage.saveButton.click();
    
    // Navigate back to dashboard
    await dashboardPage.goto();
    
    // Balance should be updated
    const newBalance = await dashboardPage.getBalance();
    expect(newBalance).toBeLessThan(initialBalance);
  });
});
