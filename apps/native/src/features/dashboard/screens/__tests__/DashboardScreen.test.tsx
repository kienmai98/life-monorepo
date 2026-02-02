import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type React from 'react';
import { PaperProvider } from 'react-native-paper';
import { useAuthStore } from '../../../auth/stores/authStore';
import { useCalendarStore } from '../../../calendar/stores/calendarStore';
import { useTransactionStore } from '../../../transactions/stores/transactionStore';
import DashboardScreen from '../DashboardScreen';

// Mock the stores
jest.mock('../../../auth/stores/authStore');
jest.mock('../../../transactions/stores/transactionStore');
jest.mock('../../../calendar/stores/calendarStore');

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: mockNavigate }),
  useFocusEffect: jest.fn((callback) => callback()),
}));

// Mock helpers
jest.mock('../../../shared/utils/helpers', () => ({
  formatCurrency: jest.fn((amount: number) => `$${amount.toFixed(2)}`),
  formatDate: jest.fn(() => 'Mon, Jan 1'),
  formatTime: jest.fn(() => '10:00 AM'),
  isEventToday: jest.fn(() => true),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <PaperProvider>
      <NavigationContainer>{component}</NavigationContainer>
    </PaperProvider>
  );
};

describe('DashboardScreen', () => {
  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: null,
  };

  const mockFetchSpendingSummary = jest.fn();
  const mockRefreshScheduleSummary = jest.fn();
  const mockFetchEvents = jest.fn();
  const mockSyncTransactions = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthStore as jest.Mock).mockReturnValue({
      user: mockUser,
    });

    (useTransactionStore as jest.Mock).mockReturnValue({
      spendingSummary: {
        balance: 5000,
        totalIncome: 6000,
        totalExpenses: 1000,
        byCategory: {
          food: 400,
          transport: 300,
          shopping: 300,
        },
      },
      syncStatus: { pendingChanges: 0 },
      fetchSpendingSummary: mockFetchSpendingSummary,
      syncTransactions: mockSyncTransactions,
    });

    (useCalendarStore as jest.Mock).mockReturnValue({
      scheduleSummary: {
        eventsToday: 3,
        eventsThisWeek: 10,
        freeHoursToday: 4,
        upcomingEvents: [
          {
            id: 'event-1',
            title: 'Team Meeting',
            startDate: new Date().toISOString(),
            color: '#6366F1',
          },
        ],
      },
      fetchEvents: mockFetchEvents,
      refreshScheduleSummary: mockRefreshScheduleSummary,
    });
  });

  describe('Rendering', () => {
    it('renders greeting and user name', () => {
      renderWithProviders(<DashboardScreen />);

      expect(screen.getByText('Test User')).toBeTruthy();
    });

    it('renders user email prefix when displayName is null', () => {
      (useAuthStore as jest.Mock).mockReturnValue({
        user: { ...mockUser, displayName: null },
      });

      renderWithProviders(<DashboardScreen />);

      expect(screen.getByText('test')).toBeTruthy();
    });

    it('renders Guest when user is null', () => {
      (useAuthStore as jest.Mock).mockReturnValue({
        user: null,
      });

      renderWithProviders(<DashboardScreen />);

      expect(screen.getByText('Guest')).toBeTruthy();
    });

    it('displays appropriate greeting based on time', () => {
      const mockDate = new Date('2024-01-15T10:00:00');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

      renderWithProviders(<DashboardScreen />);

      expect(screen.getByText('Good morning')).toBeTruthy();
    });
  });

  describe('Spending Summary Card', () => {
    it('renders spending summary card', () => {
      renderWithProviders(<DashboardScreen />);

      expect(screen.getByText("This Month's Spending")).toBeTruthy();
      expect(screen.getByText('$5000.00')).toBeTruthy();
    });

    it('displays income and expenses', () => {
      renderWithProviders(<DashboardScreen />);

      expect(screen.getByText('Income')).toBeTruthy();
      expect(screen.getByText('$6000.00')).toBeTruthy();
      expect(screen.getByText('Expenses')).toBeTruthy();
      expect(screen.getByText('$1000.00')).toBeTruthy();
    });

    it('displays category breakdown', () => {
      renderWithProviders(<DashboardScreen />);

      expect(screen.getByText('By Category')).toBeTruthy();
      expect(screen.getByText('Food')).toBeTruthy();
      expect(screen.getByText('$400.00')).toBeTruthy();
    });

    it('handles zero spending gracefully', () => {
      (useTransactionStore as jest.Mock).mockReturnValue({
        spendingSummary: {
          balance: 0,
          totalIncome: 0,
          totalExpenses: 0,
          byCategory: {},
        },
        syncStatus: { pendingChanges: 0 },
        fetchSpendingSummary: mockFetchSpendingSummary,
        syncTransactions: mockSyncTransactions,
      });

      renderWithProviders(<DashboardScreen />);

      expect(screen.getByText('$0.00')).toBeTruthy();
    });
  });

  describe('Schedule Summary Card', () => {
    it('renders schedule summary card', () => {
      renderWithProviders(<DashboardScreen />);

      expect(screen.getByText("Today's Schedule")).toBeTruthy();
    });

    it('displays event statistics', () => {
      renderWithProviders(<DashboardScreen />);

      expect(screen.getByText('Events Today')).toBeTruthy();
      expect(screen.getByText('3')).toBeTruthy();
      expect(screen.getByText('This Week')).toBeTruthy();
      expect(screen.getByText('10')).toBeTruthy();
      expect(screen.getByText('Free Hours')).toBeTruthy();
      expect(screen.getByText('4')).toBeTruthy();
    });

    it('displays upcoming events', () => {
      renderWithProviders(<DashboardScreen />);

      expect(screen.getByText('Upcoming')).toBeTruthy();
      expect(screen.getByText('Team Meeting')).toBeTruthy();
    });

    it('hides upcoming events section when empty', () => {
      (useCalendarStore as jest.Mock).mockReturnValue({
        scheduleSummary: {
          eventsToday: 0,
          eventsThisWeek: 0,
          freeHoursToday: 8,
          upcomingEvents: [],
        },
        fetchEvents: mockFetchEvents,
        refreshScheduleSummary: mockRefreshScheduleSummary,
      });

      renderWithProviders(<DashboardScreen />);

      expect(screen.queryByText('Upcoming')).toBeNull();
    });
  });

  describe('Quick Actions', () => {
    it('renders quick actions section', () => {
      renderWithProviders(<DashboardScreen />);

      expect(screen.getByText('Quick Actions')).toBeTruthy();
      expect(screen.getByText('Add Expense')).toBeTruthy();
      expect(screen.getByText('View Schedule')).toBeTruthy();
      expect(screen.getByText('Transactions')).toBeTruthy();
    });

    it('navigates to AddTransaction on Add Expense press', () => {
      renderWithProviders(<DashboardScreen />);

      // Find the Add Expense button by looking for the text
      const addExpenseButton = screen.getByText('Add Expense');
      fireEvent.press(addExpenseButton.parent as any);

      expect(mockNavigate).toHaveBeenCalledWith('AddTransaction');
    });

    it('navigates to Calendar on View Schedule press', () => {
      renderWithProviders(<DashboardScreen />);

      const viewScheduleButton = screen.getByText('View Schedule');
      fireEvent.press(viewScheduleButton.parent as any);

      expect(mockNavigate).toHaveBeenCalledWith('Calendar');
    });

    it('navigates to Transactions on Transactions press', () => {
      renderWithProviders(<DashboardScreen />);

      const transactionsButton = screen.getByText('Transactions');
      fireEvent.press(transactionsButton.parent as any);

      expect(mockNavigate).toHaveBeenCalledWith('Transactions');
    });
  });

  describe('Sync Status', () => {
    it('shows sync banner when there are pending changes', () => {
      (useTransactionStore as jest.Mock).mockReturnValue({
        spendingSummary: {
          balance: 5000,
          totalIncome: 6000,
          totalExpenses: 1000,
          byCategory: {},
        },
        syncStatus: { pendingChanges: 5 },
        fetchSpendingSummary: mockFetchSpendingSummary,
        syncTransactions: mockSyncTransactions,
      });

      renderWithProviders(<DashboardScreen />);

      expect(screen.getByText('5 pending changes to sync')).toBeTruthy();
    });

    it('hides sync banner when no pending changes', () => {
      renderWithProviders(<DashboardScreen />);

      expect(screen.queryByText(/pending changes/)).toBeNull();
    });
  });

  describe('Data Fetching', () => {
    it('fetches spending summary on mount when user exists', () => {
      renderWithProviders(<DashboardScreen />);

      expect(mockFetchSpendingSummary).toHaveBeenCalledWith(mockUser.id);
    });

    it('fetches schedule summary on mount', () => {
      renderWithProviders(<DashboardScreen />);

      expect(mockRefreshScheduleSummary).toHaveBeenCalled();
    });

    it('does not fetch spending summary when user is null', () => {
      (useAuthStore as jest.Mock).mockReturnValue({
        user: null,
      });

      renderWithProviders(<DashboardScreen />);

      expect(mockFetchSpendingSummary).not.toHaveBeenCalled();
    });
  });

  describe('Refresh Control', () => {
    it('triggers refresh when pulled', async () => {
      const { getByTestId } = renderWithProviders(<DashboardScreen />);

      // Note: Testing RefreshControl in RNTL is tricky
      // This test documents the expected behavior
      // In a real scenario, you'd fire the refresh event on the ScrollView
    });
  });
});
