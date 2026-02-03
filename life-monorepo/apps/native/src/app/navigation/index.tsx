/**
 * @module app/navigation
 * @description Root navigation component
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet } from 'react-native';

// Placeholder screens - replace with actual screens
const HomeScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text} accessibilityRole="header">Home</Text>
  </View>
);

const LoginScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text} accessibilityRole="header">Login</Text>
  </View>
);

// Navigation param list type
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root application navigator
 * Handles navigation between main app screens
 */
export const AppNavigator: React.FC = React.memo(() => {
  // TODO: Add auth state check to conditionally show Login or Home
  const isAuthenticated = false;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
});

AppNavigator.displayName = 'AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
