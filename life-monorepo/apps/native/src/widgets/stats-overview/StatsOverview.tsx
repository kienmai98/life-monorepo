import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { formatCurrency } from '@/shared/lib/helpers';

interface StatsOverviewProps {
  income: number;
  expenses: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ income, expenses }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Card style={[styles.card, { borderColor: theme.colors.secondary + '40' }]} mode="outlined">
        <Card.Content style={styles.content}>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>Income</Text>
          <Text variant="titleLarge" style={{ color: theme.colors.secondary, fontWeight: 'bold' }}>
            {formatCurrency(income)}
          </Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, { borderColor: theme.colors.error + '40' }]} mode="outlined">
        <Card.Content style={styles.content}>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>Expenses</Text>
          <Text variant="titleLarge" style={{ color: theme.colors.error, fontWeight: 'bold' }}>
            {formatCurrency(expenses)}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 16, gap: 12 },
  card: { flex: 1 },
  content: { padding: 12, alignItems: 'center' },
});
