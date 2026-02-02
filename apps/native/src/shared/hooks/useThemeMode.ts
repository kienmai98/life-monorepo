import { useCallback, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { storage } from '../utils/storage';

/**
 * Theme mode types
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Active theme type (resolved from system or user preference)
 */
export type ActiveTheme = 'light' | 'dark';

/**
 * Return type for useThemeMode hook
 */
interface UseThemeModeReturn {
  /** Current theme mode setting */
  themeMode: ThemeMode;
  /** Currently active theme (resolved) */
  activeTheme: ActiveTheme;
  /** Whether dark mode is active */
  isDarkMode: boolean;
  /** Set theme mode */
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  /** Toggle between light and dark */
  toggleTheme: () => Promise<void>;
  /** Whether theme is loading from storage */
  isLoading: boolean;
}

const THEME_STORAGE_KEY = 'app-theme-mode';

/**
 * Hook for managing app theme mode with system preference support
 * Persists user preference to storage
 *
 * @example
 * ```tsx
 * function App() {
 *   const { activeTheme, isDarkMode, setThemeMode } = useThemeMode();
 *
 *   const theme = isDarkMode ? darkTheme : lightTheme;
 *
 *   return (
 *     <PaperProvider theme={theme}>
 *       <NavigationContainer theme={theme}>
 *         <AppNavigator />
 *       </NavigationContainer>
 *     </PaperProvider>
 *   );
 * }
 *
 * // In settings screen
 * function SettingsScreen() {
 *   const { themeMode, setThemeMode, toggleTheme } = useThemeMode();
 *
 *   return (
 *     <View>
 *       <Button onPress={() => setThemeMode('dark')}>Dark Mode</Button>
 *       <Button onPress={() => setThemeMode('light')}>Light Mode</Button>
 *       <Button onPress={() => setThemeMode('system')}>System</Button>
 *     </View>
 *   );
 * }
 * ```
 */
export function useThemeMode(): UseThemeModeReturn {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await storage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setThemeModeState(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  // Save theme preference when changed
  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      await storage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, []);

  // Calculate active theme based on preference and system
  const activeTheme: ActiveTheme =
    themeMode === 'system' ? (systemColorScheme ?? 'light') : themeMode;

  const isDarkMode = activeTheme === 'dark';

  // Toggle between light and dark (skips system)
  const toggleTheme = useCallback(async () => {
    const newMode: ThemeMode = isDarkMode ? 'light' : 'dark';
    await setThemeMode(newMode);
  }, [isDarkMode, setThemeMode]);

  return {
    themeMode,
    activeTheme,
    isDarkMode,
    setThemeMode,
    toggleTheme,
    isLoading,
  };
}

export default useThemeMode;
