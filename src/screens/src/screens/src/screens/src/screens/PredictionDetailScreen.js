import React from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';

export default function PredictionDetailScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { match } = route.params || {};

  if (!match) return null;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 50,
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      marginRight: 15,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    matchCard: {
      margin: 20,
      borderRadius: 20,
      padding: 25,
      alignItems: 'center',
    },
    leagueBadge: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 15,
      marginBottom: 20,
    },
    leagueText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
    },
    teamsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
    },
    teamBox: {
      alignItems: 'center',
      flex: 1,
    },
    teamIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'rgba(255,255,255,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    teamName: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    vsBox: {
      paddingHorizontal: 20,
    },
    vsText: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: 18,
      fontWeight: 'bold',
    },
    kickoffText: {
      color: '#fff',
      fontSize: 16,
      marginBottom: 20,
    },
    predictionBox: {
      backgroundColor: 'rgba(255,255,255,0.15)',
      borderRadius: 12,
      padding: 15,
      width: '100%',
      alignItems: 'center',
    },
    predictionLabel: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: 12,
      marginBottom: 5,
    },
    predictionValue: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    statsContainer: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 15,
    },
    statCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    statLabel: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    statValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    analysisCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
    },
    analysisText: {
      color: colors.textSecondary,
      fontSize: 14,
      lineHeight: 20,
    },
    oddsHighlight: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      alignSelf: 'center',
      marginTop: 10,
    },
    oddsText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 24,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Match Analysis</Text>
      </View>

      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.matchCard}
      >
        <View style={styles.leagueBadge}>
          <Text style={styles.leagueText}>{match.league}</Text>
        </View>

        <View style={styles.teamsContainer}>
          <View style={styles.teamBox}>
            <View style={styles.teamIcon}>
              <Ionicons name="shield" size={30} color="#fff" />
            </View>
            <Text style={styles.teamName}>{match.homeTeam}</Text>
          </View>

          <View style={styles.vsBox}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          <View style={styles.teamBox}>
            <View style={styles.teamIcon}>
              <Ionicons name="shield" size={30} color="#fff" />
            </View>
            <Text style={styles.teamName}>{match.awayTeam}</Text>
          </View>
        </View>

        <Text style={styles.kickoffText}>Kickoff: {match.kickoff}</Text>

        <View style={styles.predictionBox}>
          <Text style={styles.predictionLabel}>AI Prediction</Text>
          <Text style={styles.predictionValue}>{match.prediction}</Text>
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Match Statistics</Text>
        
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Confidence Level</Text>
          <Text style={[styles.statValue, { color: colors.success }]}>{match.confidence}%</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Odds Value</Text>
          <Text style={[styles.statValue, { color: colors.primary }]}>{match.odds}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Prediction Type</Text>
          <Text style={styles.statValue}>{match.prediction}</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Analysis</Text>
        
        <View style={styles.analysisCard}>
          <Text style={styles.analysisText}>
            Our AI algorithm has analyzed head-to-head statistics, recent form, 
            player injuries, and tactical matchups. Based on {match.confidence}% confidence, 
            we predict {match.prediction} in this fixture.
          </Text>
          <View style={styles.oddsHighlight}>
            <Text style={styles.oddsText}>Odds: {match.odds}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
