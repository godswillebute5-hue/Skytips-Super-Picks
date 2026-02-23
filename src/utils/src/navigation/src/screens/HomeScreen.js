import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  Dimensions, RefreshControl 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import { getTodayPredictions } from '../data/predictions';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { colors, isPremium } = useTheme();
  const [predictions, setPredictions] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadPredictions();
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
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

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
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
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    logoText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
    },
    logoAccent: {
      color: colors.primary,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    timeText: {
      color: colors.text,
      marginLeft: 5,
      fontSize: 14,
      fontWeight: '600',
    },
    welcomeCard: {
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
    },
    welcomeTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 8,
    },
    welcomeSubtitle: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.8)',
      lineHeight: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginHorizontal: 20,
      marginBottom: 15,
      marginTop: 10,
    },
    oddsContainer: {
      paddingHorizontal: 15,
    },
    oddsCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.surfaceLight,
    },
    oddsCardPremium: {
      borderColor: colors.gold,
      borderWidth: 2,
    },
    oddsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    oddsLabel: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    oddsLabelText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginLeft: 8,
    },
    oddsBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    oddsBadgeText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    oddsBadgePremium: {
      backgroundColor: colors.gold,
    },
    matchCount: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 15,
    },
    viewButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
    },
    viewButtonPremium: {
      backgroundColor: colors.gold,
    },
    viewButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    statsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      marginTop: 10,
      marginBottom: 30,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 15,
      marginHorizontal: 5,
      alignItems: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.success,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 5,
    },
  });

  if (!predictions) return null;

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
      }
    >
      <LinearGradient
        colors={[colors.surface, colors.background]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Text style={styles.logoText}>
            SkyTips <Text style={styles.logoAccent}>SuperPicks</Text>
          </Text>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={16} color={colors.primary} />
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          </View>
        </View>
        
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={styles.welcomeCard}
        >
          <Text style={styles.welcomeTitle}>Daily Soccer Insights</Text>
          <Text style={styles.welcomeSubtitle}>
            Expert analysis and AI-powered predictions updated daily. 
            {isPremium ? ' You have full premium access!' : ' Start with our free 2 odds or unlock premium picks.'}
          </Text>
        </LinearGradient>
      </LinearGradient>

      <Text style={styles.sectionTitle}>Today's Predictions</Text>

      <View style={styles.oddsContainer}>
        <View style={styles.oddsCard}>
          <View style={styles.oddsHeader}>
            <View style={styles.oddsLabel}>
              <Ionicons name="football" size={24} color={colors.primary} />
              <Text style={styles.oddsLabelText}>2 Odds - FREE</Text>
            </View>
            <View style={styles.oddsBadge}>
              <Text style={styles.oddsBadgeText}>{predictions.totalTwoOdds}</Text>
            </View>
          </View>
          <Text style={styles.matchCount}>{predictions.twoOdds.length} matches analyzed</Text>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => navigation.navigate('Predictions', { type: '2odds' })}
          >
            <Text style={styles.viewButtonText}>View Free Tips</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.oddsCard, styles.oddsCardPremium]}>
          <View style={styles.oddsHeader}>
            <View style={styles.oddsLabel}>
              <Ionicons name="star" size={24} color={colors.gold} />
              <Text style={styles.oddsLabelText}>5 Odds - PREMIUM</Text>
            </View>
            <View style={[styles.oddsBadge, styles.oddsBadgePremium]}>
              <Text style={[styles.oddsBadgeText, { color: '#000' }]}>{predictions.totalFiveOdds}</Text>
            </View>
          </View>
          <Text style={styles.matchCount}>{predictions.fiveOdds.length} matches analyzed</Text>
          <TouchableOpacity 
            style={[styles.viewButton, styles.viewButtonPremium]}
            onPress={() => isPremium ? navigation.navigate('Predictions', { type: '5odds' }) : navigation.navigate('Premium')}
          >
            <Text style={[styles.viewButtonText, { color: '#000' }]}>
              {isPremium ? 'View Premium Tips' : 'Unlock Now'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.oddsCard, styles.oddsCardPremium]}>
          <View style={styles.oddsHeader}>
            <View style={styles.oddsLabel}>
              <Ionicons name="diamond" size={24} color={colors.gold} />
              <Text style={styles.oddsLabelText}>10 Odds - VIP</Text>
            </View>
            <View style={[styles.oddsBadge, styles.oddsBadgePremium]}>
              <Text style={[styles.oddsBadgeText, { color: '#000' }]}>{predictions.totalTenOdds}</Text>
            </View>
          </View>
          <Text style={styles.matchCount}>{predictions.tenOdds.length} matches analyzed</Text>
          <TouchableOpacity 
            style={[styles.viewButton, styles.viewButtonPremium]}
            onPress={() => isPremium ? navigation.navigate('Predictions', { type: '10odds' }) : navigation.navigate('Premium')}
          >
            <Text style={[styles.viewButtonText, { color: '#000' }]}>
              {isPremium ? 'View VIP Tips' : 'Unlock Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>82%</Text>
          <Text style={styles.statLabel}>Win Rate</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>1.5K+</Text>
          <Text style={styles.statLabel}>Daily Users</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>24/7</Text>
          <Text style={styles.statLabel}>Updates</Text>
        </View>
      </View>
    </ScrollView>
  );
}
