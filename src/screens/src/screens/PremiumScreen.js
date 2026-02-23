import React from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';

export default function PremiumScreen({ navigation }) {
  const { colors, isPremium } = useTheme();

  const features = [
    { icon: 'star', text: 'Access to 5 Odds daily predictions' },
    { icon: 'diamond', text: 'Access to 10 Odds VIP predictions' },
    { icon: 'analytics', text: 'In-depth match analysis & stats' },
    { icon: 'notifications', text: 'Instant notifications for new tips' },
    { icon: 'time', text: 'Early access to predictions (24h before)' },
    { icon: 'trophy', text: 'Higher accuracy premium algorithm' },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 50,
      alignItems: 'center',
    },
    crownIcon: {
      marginBottom: 15,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.gold,
      marginBottom: 10,
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    featuresContainer: {
      padding: 20,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      marginBottom: 10,
    },
    featureIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    featureText: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
    },
    pricingContainer: {
      padding: 20,
    },
    priceCard: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 25,
      borderWidth: 2,
      borderColor: colors.gold,
      alignItems: 'center',
    },
    priceLabel: {
      fontSize: 16,
      color: colors.gold,
      fontWeight: '600',
      marginBottom: 10,
    },
    priceValue: {
      fontSize: 48,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    pricePeriod: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 20,
    },
    priceFeatures: {
      alignSelf: 'stretch',
      marginBottom: 20,
    },
    priceFeature: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    priceFeatureText: {
      color: colors.textSecondary,
      marginLeft: 10,
      fontSize: 14,
    },
    subscribeButton: {
      backgroundColor: colors.gold,
      paddingHorizontal: 40,
      paddingVertical: 15,
      borderRadius: 12,
      width: '100%',
      alignItems: 'center',
    },
    subscribedButton: {
      backgroundColor: colors.success,
    },
    subscribeButtonText: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 18,
    },
    guaranteeText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 15,
      textAlign: 'center',
    },
    paymentMethods: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
      gap: 15,
    },
    paymentIcon: {
      width: 50,
      height: 30,
      backgroundColor: colors.surface,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    paymentText: {
      color: colors.textSecondary,
      fontSize: 10,
      fontWeight: 'bold',
    },
  });

  if (isPremium) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={[styles.crownIcon, { backgroundColor: colors.success, padding: 20, borderRadius: 50 }]}>
            <Ionicons name="checkmark" size={50} color="#fff" />
          </View>
          <Text style={styles.headerTitle}>Premium Active!</Text>
          <Text style={styles.headerSubtitle}>
            You have full access to all premium features and predictions.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon} size={20} color={colors.gold} />
              </View>
              <Text style={styles.featureText}>{feature.text}</Text>
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[colors.surface, colors.background]}
        style={styles.header}
      >
        <View style={styles.crownIcon}>
          <Ionicons name="diamond" size={60} color={colors.gold} />
        </View>
        <Text style={styles.headerTitle}>Go Premium</Text>
        <Text style={styles.headerSubtitle}>
          Unlock higher odds and exclusive predictions
        </Text>
      </LinearGradient>

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name={feature.icon} size={20} color={colors.gold} />
            </View>
            <Text style={styles.featureText}>{feature.text}</Text>
            <Ionicons name="lock-closed" size={20} color={colors.textSecondary} />
          </View>
        ))}
      </View>

      <View style={styles.pricingContainer}>
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>LIFETIME ACCESS</Text>
          <Text style={styles.priceValue}>₦5,000</Text>
          <Text style={styles.pricePeriod}>One-time payment</Text>
          
          <View style={styles.priceFeatures}>
            <View style={styles.priceFeature}>
              <Ionicons name="checkmark" size={16} color={colors.gold} />
              <Text style={styles.priceFeatureText}>5 Odds Daily Access</Text>
            </View>
            <View style={styles.priceFeature}>
              <Ionicons name="checkmark" size={16} color={colors.gold} />
              <Text style={styles.priceFeatureText}>10 Odds VIP Access</Text>
            </View>
            <View style={styles.priceFeature}>
              <Ionicons name="checkmark" size={16} color={colors.gold} />
              <Text style={styles.priceFeatureText}>All Future Updates</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.subscribeButton}
            onPress={() => navigation.navigate('Payment')}
          >
            <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
          </TouchableOpacity>

          <Text style={styles.guaranteeText}>
            Secure payment • Instant activation • 24/7 Support
          </Text>

          <View style={styles.paymentMethods}>
            <View style={styles.paymentIcon}>
              <Text style={styles.paymentText}>OPAY</Text>
            </View>
            <View style={styles.paymentIcon}>
              <Text style={styles.paymentText}>BANK</Text>
            </View>
            <View style={styles.paymentIcon}>
              <Text style={styles.paymentText}>USSD</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
