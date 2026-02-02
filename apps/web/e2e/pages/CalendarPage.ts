import { Page, Locator } from '@playwright/test';

export class CalendarPage {
  readonly page: Page;
  readonly calendarGrid: Locator;
  readonly currentMonthLabel: Locator;
  readonly nextMonthButton: Locator;
  readonly prevMonthButton: Locator;
  readonly todayButton: Locator;
  readonly addEventButton: Locator;
  readonly eventModal: Locator;
  readonly monthViewButton: Locator;
  readonly weekViewButton: Locator;
  readonly selectedDateEvents: Locator;
  readonly eventIndicators: Locator;

  constructor(page: Page) {
    this.page = page;
    this.calendarGrid = page.getByTestId('calendar-grid');
    this.currentMonthLabel = page.getByTestId('current-month');
    this.nextMonthButton = page.getByTestId('next-month-button');
    this.prevMonthButton = page.getByTestId('prev-month-button');
    this.todayButton = page.getByTestId('today-button');
    this.addEventButton = page.getByTestId('add-event-button');
    this.eventModal = page.getByTestId('event-modal');
    this.monthViewButton = page.getByRole('button', { name: /month/i });
    this.weekViewButton = page.getByRole('button', { name: /week/i });
    this.selectedDateEvents = page.getByTestId('selected-date-events');
    this.eventIndicators = page.getByTestId('event-indicator');
  }

  async goto() {
    await this.page.goto('/calendar');
    await this.page.waitForLoadState('networkidle');
  }

  getDateCell(day: number): Locator {
    return this.page.getByTestId(`date-cell-${day}`);
  }

  getDayHeader(day: string): Locator {
    return this.page.getByText(day, { exact: true });
  }

  async navigateToMonth(month: number, year: number) {
    const targetDate = new Date(year, month - 1, 1);
    let currentMonth = new Date();
    
    while (
      currentMonth.getMonth() !== targetDate.getMonth() ||
      currentMonth.getFullYear() !== targetDate.getFullYear()
    ) {
      if (targetDate > currentMonth) {
        await this.nextMonthButton.click();
        currentMonth.setMonth(currentMonth.getMonth() + 1);
      } else {
        await this.prevMonthButton.click();
        currentMonth.setMonth(currentMonth.getMonth() - 1);
      }
    }
  }

  async clickDate(day: number) {
    await this.getDateCell(day).click();
  }

  async getEventsForDate(day: number): Promise<Locator[]> {
    const cell = this.getDateCell(day);
    return await cell.locator('[data-testid="event-indicator"]').all();
  }
}
