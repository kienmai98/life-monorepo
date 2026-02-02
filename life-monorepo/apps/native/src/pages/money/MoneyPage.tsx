import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTransactions } from '@/features/money';
import { TransactionCard } from '@/widgets/transaction-card';
import { StatsOverview } from '@/widgets/stats-overview';

export const MoneyPage: React.FC = () => {
  const { transactions, getStats } = useTransactions();
  const stats = getStats();

  return (
    <SafeAreaView style={styles.container}>
      <StatsOverview income={stats.totalIncome} expenses={stats.totalExpenses} />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16 },
});
