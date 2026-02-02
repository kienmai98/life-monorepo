/**
 * @module app/styles/theme
 * @description Theme configuration for React Native Paper
 */

import { MD3LightTheme, MD3DarkTheme, type MD3Theme } from 'react-native-paper';

/**
 * Light theme configuration
 * Extends MD3LightTheme with custom colors
 */
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200EE',
    secondary: '#03DAC6',
  },
};

/**
 * Dark theme configuration
 * Extends MD3DarkTheme with custom colors
 */
export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#BB86FC',
    secondary: '#03DAC6',
  },
};

/**
 * Default theme (light)
 * @deprecated Use lightTheme or darkTheme based on user preference
 */
export const theme = lightTheme;
