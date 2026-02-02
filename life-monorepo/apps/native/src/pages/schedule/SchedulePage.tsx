import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Chip, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { startOfMonth, endOfMonth, format, isSameDay } from 'date-fns';
import { useSchedule } from '@/features/schedule';
import type { CalendarEvent } from '@/entities/event';

export const SchedulePage: React.FC = () => {
  const theme = useTheme();
  const { events, fetchEvents, hasPermission } = useSchedule();
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());
    fetchEvents(start, end);
  }, []);

  const dayEvents = events.filter((e) => isSameDay(new Date(e.startDate), selectedDate));

  if (!hasPermission) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Calendar permission needed</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="titleLarge">{format(selectedDate, 'MMMM yyyy')}</Text>
        <Chip>{dayEvents.length} events</Chip>
      </View>

      <FlatList
        data={dayEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text variant="titleSmall">{item.title}</Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {item.isAllDay ? 'All day' : format(new Date(item.startDate), 'h:mm a')}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  list: { padding: 16 },
  eventItem: { padding: 12, marginBottom: 8, borderRadius: 8, backgroundColor: '#f5f5f5' },
});
