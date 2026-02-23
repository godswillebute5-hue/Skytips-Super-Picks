import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  RefreshControl 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import { getTodayPredictions } from '../data/predictions';

export default function PredictionsScreen({ route, navigation }) {
  const { colors, isPremium } = useTheme();
  const [predictions, setPredictions] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(route.params?.type || '2odds');

  useEffect(() => {
    loadPredictions();
  }, []);

  const loadPredictions = () => {
    const today = getTodayPredictions();
    setPredictions(today);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadPredictions();
      setRefreshing(false);
    }, 1000);
  };

  const getActivePredictions = () => {
    if (!predictions) return [];
    switch(activeTab) {
      case '2odds': return predictions.twoOdds;
      case '5odds': return predictions.fiveOdds;
      case '10odds': return predictions.tenOdds;
      default: return predictions.twoOdds;
    }
  };

  const getTotalOdds = () => {
    if (!predictions) return '0.00';
    switch(activeTab) {
      case '2odds': return predictions.totalTwoOdds;
      case '5odds': return predictions.totalFiveOdds;
      case '10odds': return predictions.totalTenOdds;
      default: return predictions.totalTwoOdds;
    }
  };

  const isLocked = (tab) => {
    return (tab === '5odds' || tab === '10odds') && !isPremium;
  };

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
    tabContainer: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      marginBottom: 20,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 12,
      marginHorizontal: 5,
      backgroundColor: colors.surface,
    },
    tabActive: {
      backgroundColor: colors.primary,
    },
    tabText: {
      color: colors.textSecondary,
      fontWeight: '600',
    },
    tabTextActive: {
      color: '#fff',
    },
    totalCard: {
      marginHorizontal: 20,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      alignItems: 'center',
    },
    totalLabel: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.8)',
      marginBottom: 5,
    },
    totalValue: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#fff',
    },
    matchesContainer: {
      paddingHorizontal: 15,
      paddingBottom: 30,
    },
    matchCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.surfaceLight,
    },
    matchHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    leagueBadge: {
      backgroundColor: colors.surfaceLight,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
    },
    leagueText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    kickoffText: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: '600',
    },
    teamsContainer: {
      marginBottom: 12,
    },
    teamRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    teamText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 10,
      fontWeight: '600',
    },
    vsText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginLeft: 34,
      marginVertical: 4,
    },
    predictionBox: {
      backgroundColor: colors.surfaceLight,
      borderRadius: 12,
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    predictionLeft: {
      flex: 1,
    },
    predictionLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    predictionValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    oddsBox: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    oddsText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    confidenceBadge: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: colors.success,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    confidenceText: {
      color: '#000',
      fontSize: 10,
      fontWeight: 'bold',
    },
    lockedCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 40,
      marginHorizontal: 20,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.gold,
      borderStyle: 'dashed',
    },
    lockedIcon: {
      marginBottom: 15,
    },
    lockedTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.gold,
      marginBottom: 10,
    },
    lockedText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 20,
    },
    unlockButton: {
      backgroundColor: colors.gold,
      paddingHorizontal: 30,
      paddingVertical: 12,
      borderRadius: 12,
    },
    unlockButtonText: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  if (!predictions) return null;

  const activePredictions = getActivePredictions();
  const locked = isLocked(activeTab);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Picks</Text>
        <Text style={styles.headerSubtitle}>Expert analyzed predictions for maximum returns</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === '2odds' && styles.tabActive]}
          onPress={() => setActiveTab('2odds')}
        >
          <Text style={[styles.tabText, activeTab === '2odds' && styles.tabTextActive]}>2 Odds</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === '5odds' && styles.tabActive]}
          onPress={() => setActiveTab('5odds')}
        >
          <Text style={[styles.tabText, activeTab === '5odds' && styles.tabTextActive]}>5 Odds</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === '10odds' && styles.tabActive]}
          onPress={() => setActiveTab('10odds')}
        >
          <Text style={[styles.tabText, activeTab === '10odds' && styles.tabTextActive]}>10 Odds</Text>
        </TouchableOpacity>
      </View>

      {locked ? (
        <View style={styles.lockedCard}>
          <Ionicons name="lock-closed" size={50} color={colors.gold} style={styles.lockedIcon} />
          <Text style={styles.lockedTitle}>Premium Content</Text>
          <Text style={styles.lockedText}>
            Upgrade to premium to access {activeTab === '5odds' ? '5' : '10'} odds predictions with higher returns
          </Text>
          <TouchableOpacity 
            style={styles.unlockButton}
            onPress={() => navigation.navigate('Premium')}
          >
            <Text style={styles.unlockButtonText}>Unlock Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.totalCard}
          >
            <Text style={styles.totalLabel}>Total Accumulated Odds</Text>
            <Text style={styles.totalValue}>{getTotalOdds()}</Text>
          </LinearGradient>

          <View style={styles.matchesContainer}>
            {activePredictions.map((match, index) => (
              <View key={match.id} style={styles.matchCard}>
                <View style={styles.matchHeader}>
                  <View style={styles.leagueBadge}>
                    <Text style={styles.leagueText}>{match.league}</Text>
                  </View>
                  <Text style={styles.kickoffText}>{match.kickoff}</Text>
                </View>
                
                <View style={styles.teamsContainer}>
                  <View style={styles.teamRow}>
                    <Ionicons name="shield" size={20} color={colors.primary} />
                    <Text style={styles.teamText}>{match.homeTeam}</Text>
                  </View>
                  <Text style={styles.vsText}>VS</Text>
                  <View style={styles.teamRow}>
                    <Ionicons name="shield" size={20} color={colors.danger} />
                    <Text style={styles.teamText}>{match.awayTeam}</Text>
                  </View>
                </View>

                <View style={styles.predictionBox}>
                  <View style={styles.predictionLeft}>
                    <Text style={styles.predictionLabel}>AI Prediction</Text>
                    <Text style={styles.predictionValue}>{match.prediction}</Text>
                  </View>
                  <View style={styles.oddsBox}>
                    <Text style={styles.oddsText}>{match.odds}</Text>
                  </View>
                </View>

                <View style={styles.confidenceBadge}>
                  <Text style={styles.confidenceText}>{match.confidence}%</Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}
