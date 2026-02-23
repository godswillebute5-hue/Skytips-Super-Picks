import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useTheme } from '../utils/ThemeContext';
import { getLast14DaysHistory } from '../data/predictions';

export default function HistoryScreen() {
  const { colors } = useTheme();
  const [history, setHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const data = getLast14DaysHistory();
    setHistory(data);
    if (data.length > 0) setSelectedDate(data[0]);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 50,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    headerSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    dateList: {
      paddingHorizontal: 15,
      marginBottom: 20,
    },
    dateItem: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginRight: 10,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.surfaceLight,
    },
    dateItemActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    dateText: {
      color: colors.textSecondary,
      fontWeight: '600',
    },
    dateTextActive: {
      color: '#fff',
    },
    summaryCard: {
      backgroundColor: colors.surface,
      marginHorizontal: 20,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    summaryItem: {
      alignItems: 'center',
    },
    summaryValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    summaryLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    resultBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    resultWin: {
      backgroundColor: colors.success,
    },
    resultLoss: {
      backgroundColor: colors.danger,
    },
    resultText: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginHorizontal: 20,
      marginBottom: 15,
    },
    matchesContainer: {
      paddingHorizontal: 15,
      paddingBottom: 30,
    },
    matchCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    matchInfo: {
      flex: 1,
    },
    matchTeams: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 4,
    },
    matchPrediction: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    matchOdds: {
      backgroundColor: colors.surfaceLight,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      marginRight: 10,
    },
    matchOddsText: {
      color: colors.primary,
      fontWeight: 'bold',
    },
    matchResult: {
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    resultIconWin: {
      backgroundColor: colors.success,
    },
    resultIconLoss: {
      backgroundColor: colors.danger,
    },
  });

  if (!selectedDate) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        <Text style={styles.headerSubtitle}>Track our prediction performance</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.dateList}
      >
        {history.map((item, index) => (
          <TouchableOpacity
            key={item.date}
            style={[styles.dateItem, selectedDate.date === item.date && styles.dateItemActive]}
            onPress={() => setSelectedDate(item)}
          >
            <Text style={[styles.dateText, selectedDate.date === item.date && styles.dateTextActive]}>
              {index === 0 ? 'Today' : format(new Date(item.date), 'MMM dd')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <View style={[styles.resultBadge, selectedDate.result === 'win' ? styles.resultWin : styles.resultLoss]}>
            <Text style={styles.resultText}>{selectedDate.result.toUpperCase()}</Text>
          </View>
          <Text style={[styles.summaryLabel, { marginTop: 8 }]}>Result</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: selectedDate.result === 'win' ? colors.success : colors.danger }]}>
            {selectedDate.profit}
          </Text>
          <Text style={styles.summaryLabel}>Profit/Loss</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{selectedDate.twoOdds.length}</Text>
          <Text style={styles.summaryLabel}>Matches</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Match Details</Text>

      <ScrollView style={styles.matchesContainer}>
        {selectedDate.twoOdds.map((match) => (
          <View key={match.id} style={styles.matchCard}>
            <View style={styles.matchInfo}>
              <Text style={styles.matchTeams}>{match.homeTeam} vs {match.awayTeam}</Text>
              <Text style={styles.matchPrediction}>{match.prediction}</Text>
            </View>
            <View style={styles.matchOdds}>
              <Text style={styles.matchOddsText}>{match.odds}</Text>
            </View>
            <View style={[styles.matchResult, match.result === 'win' ? styles.resultIconWin : styles.resultIconLoss]}>
              <Ionicons 
                name={match.result === 'win' ? 'checkmark' : 'close'} 
                size={16} 
                color="#000" 
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
