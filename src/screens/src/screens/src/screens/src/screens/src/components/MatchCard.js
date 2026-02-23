import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';

export default function MatchCard({ match, onPress }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.surfaceLight,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    league: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    time: {
      fontSize: 12,
      color: colors.primary,
    },
    teams: {
      marginBottom: 12,
    },
    teamRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 2,
    },
    teamText: {
      color: colors.text,
      marginLeft: 8,
      fontSize: 15,
      fontWeight: '600',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.surfaceLight,
    },
    prediction: {
      flex: 1,
    },
    predictionLabel: {
      fontSize: 11,
      color: colors.textSecondary,
    },
    predictionText: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '600',
    },
    odds: {
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    oddsText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.league}>{match.league}</Text>
        <Text style={styles.time}>{match.kickoff}</Text>
      </View>
      
      <View style={styles.teams}>
        <View style={styles.teamRow}>
          <Ionicons name="shield" size={16} color={colors.primary} />
          <Text style={styles.teamText}>{match.homeTeam}</Text>
        </View>
        <View style={styles.teamRow}>
          <Ionicons name="shield" size={16} color={colors.danger} />
          <Text style={styles.teamText}>{match.awayTeam}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.prediction}>
          <Text style={styles.predictionLabel}>Prediction</Text>
          <Text style={styles.predictionText}>{match.prediction}</Text>
        </View>
        <View style={styles.odds}>
          <Text style={styles.oddsText}>{match.odds}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
