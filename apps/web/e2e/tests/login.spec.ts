import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Login Flow', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('user can login with valid credentials', async ({ page }) => {
    await loginPage.login('test@example.com', 'password123');

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');

    // Dashboard should show user greeting
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.userGreeting).toBeVisible();
  });

  test('shows error for invalid credentials', async () => {
    await loginPage.login('wrong@example.com', 'wrongpassword');

    // Should stay on login page
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Invalid');
  });

  test('shows validation error for empty email', async () => {
    await loginPage.passwordInput.fill('password123');
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Please fill in all fields');
  });

  test('shows validation error for empty password', async () => {
    await loginPage.emailInput.fill('test@example.com');
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Please fill in all fields');
  });

  test('shows validation error for invalid email format', async () => {
    await loginPage.login('not-an-email', 'password123');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('valid email');
  });

  test('navigates to register page', async ({ page }) => {
    await loginPage.registerLink.click();
    await expect(page).toHaveURL('/register');
  });

  test('toggles password visibility', async () => {
    await loginPage.passwordInput.fill('password123');

    // Password should be hidden by default
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');

    // Click toggle button
    await loginPage.passwordToggle.click();

    // Password should be visible
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');
  });

  test('persists login session', async ({ page, context }) => {
    await loginPage.login('test@example.com', 'password123');

    // Verify logged in
    await expect(page).toHaveURL('/dashboard');

    // Open new page in same context (shares storage state)
    const newPage = await context.newPage();
    await newPage.goto('/dashboard');

    // Should still be logged in
    const dashboardPage = new DashboardPage(newPage);
    await expect(dashboardPage.userGreeting).toBeVisible();
  });
});
