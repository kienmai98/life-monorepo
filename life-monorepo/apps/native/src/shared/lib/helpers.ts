export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

export const capitalizeFirst = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    food: '', transport: '', shopping: '', entertainment: '',
    utilities: '', health: '⚕️', travel: '✈️', education: '',
    income: '', investment: '', other: '',
  };
  return icons[category.toLowerCase()] || '';
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    food: '#FF6B6B', transport: '#4ECDC4', shopping: '#45B7D1',
    entertainment: '#96CEB4', utilities: '#FFEAA7', health: '#DDA0DD',
    travel: '#98D8C8', education: '#F7DC6F', income: '#2ECC71',
    investment: '#9B59B6', other: '#BDC3C7',
  };
  return colors[category.toLowerCase()] || '#BDC3C7';
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
