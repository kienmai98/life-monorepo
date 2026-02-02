import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, List, Portal, Dialog, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/features/auth';
import { useProfile } from '@/features/profile';

export const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme, syncStatus, syncTransactions } = useProfile();
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <Text variant="headlineSmall">{user?.displayName || 'User'}</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {user?.email}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <List.Section title="Preferences">
          <List.Item
            title="Dark Mode"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => <List.Icon icon={isDarkMode ? 'toggle-switch' : 'toggle-switch-off'} />}
            onPress={toggleTheme}
          />
        </List.Section>

        <Divider style={styles.divider} />

        <Button
          mode="outlined"
          onPress={() => setLogoutDialogVisible(true)}
          textColor={theme.colors.error}
          style={styles.signOutButton}
        >
          Sign Out
        </Button>
      </ScrollView>

      <Portal>
        <Dialog visible={logoutDialogVisible} onDismiss={() => setLogoutDialogVisible(false)}>
          <Dialog.Title>Sign Out?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => setLogoutDialogVisible(false)}>Cancel</Button>
            <Button onPress={logout} textColor={theme.colors.error}>Sign Out</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', padding: 32 },
  divider: { marginHorizontal: 16 },
  signOutButton: { margin: 16 },
});
