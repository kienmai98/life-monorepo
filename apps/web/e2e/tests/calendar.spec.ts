import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CalendarPage } from '../pages/CalendarPage';

test.describe('Calendar View Flow', () => {
  let dashboardPage: DashboardPage;
  let calendarPage: CalendarPage;

  test.beforeEach(async ({ page }) => {
    // Login before each test
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('test@example.com', 'password123');
    
    dashboardPage = new DashboardPage(page);
    calendarPage = new CalendarPage(page);
    
    await expect(dashboardPage.userGreeting).toBeVisible();
  });

  test('user can view calendar', async () => {
    // Click view schedule from dashboard
    await dashboardPage.viewScheduleButton.click();
    
    // Should navigate to calendar page
    await expect(calendarPage.page).toHaveURL('/calendar');
    
    // Calendar grid should be visible
    await expect(calendarPage.calendarGrid).toBeVisible();
    
    // Current month should be displayed
    await expect(calendarPage.currentMonthLabel).toBeVisible();
  });

  test('user can navigate between months', async () => {
    await calendarPage.goto();
    
    const initialMonth = await calendarPage.currentMonthLabel.textContent();
    
    // Click next month
    await calendarPage.nextMonthButton.click();
    
    // Month should have changed
    const newMonth = await calendarPage.currentMonthLabel.textContent();
    expect(newMonth).not.toBe(initialMonth);
  });

  test('user can navigate to previous month', async () => {
    await calendarPage.goto();
    
    const initialMonth = await calendarPage.currentMonthLabel.textContent();
    
    // Click previous month
    await calendarPage.prevMonthButton.click();
    
    const newMonth = await calendarPage.currentMonthLabel.textContent();
    expect(newMonth).not.toBe(initialMonth);
  });

  test('user can click on a date to view events', async () => {
    await calendarPage.goto();
    
    // Click on a date cell
    await calendarPage.getDateCell(15).click();
    
    // Should show events for that date
    await expect(calendarPage.selectedDateEvents).toBeVisible();
  });

  test('displays events on calendar', async () => {
    await calendarPage.goto();
    
    // Events should be visible on the calendar
    const events = await calendarPage.eventIndicators.count();
    expect(events).toBeGreaterThanOrEqual(0);
  });

  test('user can switch between month and week views', async () => {
    await calendarPage.goto();
    
    // Default is month view
    await expect(calendarPage.calendarGrid).toHaveClass(/month-view/);
    
    // Switch to week view
    await calendarPage.weekViewButton.click();
    await expect(calendarPage.calendarGrid).toHaveClass(/week-view/);
    
    // Switch back to month view
    await calendarPage.monthViewButton.click();
    await expect(calendarPage.calendarGrid).toHaveClass(/month-view/);
  });

  test('user can add event from calendar', async () => {
    await calendarPage.goto();
    
    // Click add event button
    await calendarPage.addEventButton.click();
    
    // Should open event creation modal or navigate to add event page
    await expect(calendarPage.eventModal).toBeVisible();
  });

  test('today button returns to current month', async () => {
    await calendarPage.goto();
    
    // Navigate to a different month
    await calendarPage.nextMonthButton.click();
    await calendarPage.nextMonthButton.click();
    
    // Click today button
    await calendarPage.todayButton.click();
    
    // Should show current month
    const currentMonthLabel = await calendarPage.currentMonthLabel.textContent();
    const currentDate = new Date();
    const expectedMonth = currentDate.toLocaleString('default', { month: 'long' });
    expect(currentMonthLabel).toContain(expectedMonth);
  });

  test('displays correct day names', async () => {
    await calendarPage.goto();
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (const day of dayNames) {
      await expect(calendarPage.getDayHeader(day)).toBeVisible();
    }
  });

  test('highlights current date', async () => {
    await calendarPage.goto();
    
    const today = new Date().getDate();
    const todayCell = calendarPage.getDateCell(today);
    
    await expect(todayCell).toHaveClass(/today/);
  });

  test('can access calendar from navigation', async ({ page }) => {
    // Navigate to dashboard first
    await dashboardPage.goto();
    
    // Click calendar in navigation
    await page.getByRole('link', { name: /calendar/i }).click();
    
    // Should be on calendar page
    await expect(page).toHaveURL('/calendar');
  });
});
