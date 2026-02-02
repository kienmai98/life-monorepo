import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginForm, useAuth } from '@/features/auth';

export const LoginPage: React.FC = () => {
  const theme = useTheme();
  const { login, isLoading, error } = useAuth();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.primary }]}>Life</Text>
        <LoginForm onSubmit={login} isLoading={isLoading} error={error} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontWeight: 'bold', textAlign: 'center', marginBottom: 32 },
});
