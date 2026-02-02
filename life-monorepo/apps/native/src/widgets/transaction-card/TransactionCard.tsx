import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import type { Transaction } from '@/entities/transaction';
import { formatCurrency, capitalizeFirst, getCategoryColor, getCategoryIcon } from '@/shared/lib/helpers';
import { format } from 'date-fns';

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const theme = useTheme();

  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content style={styles.content}>
        <View style={[styles.icon, { backgroundColor: `${getCategoryColor(transaction.category)}20` }]}>
          <Text>{getCategoryIcon(transaction.category)}</Text>
        </View>
        <View style={styles.info}>
          <Text variant="bodyLarge" numberOfLines={1}>{transaction.description}</Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            {capitalizeFirst(transaction.category)} • {format(new Date(transaction.date), 'MMM d')}
          </Text>
        </View>
        <Text
          variant="titleMedium"
          style={[
            styles.amount,
            { color: transaction.type === 'income' ? theme.colors.secondary : theme.colors.onSurface },
          ]}
        >
          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 8 },
  content: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  icon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  info: { flex: 1 },
  amount: { fontWeight: 'bold' },
});
