import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useTheme } from '../utils/ThemeContext';

export default function PaymentScreen({ navigation }) {
  const { colors, unlockPremium } = useTheme();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [copied, setCopied] = useState(false);

  const BANK_DETAILS = {
    bankName: 'Opay',
    accountNumber: '8143040567',
    accountName: 'NzubechiGodswill Ebute'
  };

  const paymentMethods = [
    { 
      id: 'bank', 
      name: 'Bank Transfer', 
      icon: 'card',
      description: 'Transfer to our Opay account',
      details: BANK_DETAILS
    },
    { 
      id: 'ussd', 
      name: 'USSD Code', 
      icon: 'phone-portrait',
      description: 'Dial code to pay instantly',
      code: `*955*2*${BANK_DETAILS.accountNumber}*5000#`
    },
    { 
      id: 'whatsapp', 
      name: 'WhatsApp Support', 
      icon: 'logo-whatsapp',
      description: 'Send proof of payment',
      action: 'chat'
    }
  ];

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    Alert.alert(
      'Confirm Payment',
      'Have you completed the payment of ₦5,000?',
      [
        { text: 'Not Yet', style: 'cancel' },
        { 
          text: 'Yes, Completed', 
          onPress: () => {
            unlockPremium();
            Alert.alert(
              'Success!',
              'Your premium access has been activated. Enjoy!',
              [{ text: 'OK', onPress: () => navigation.navigate('Main') }]
            );
          }
        }
      ]
    );
  };

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
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    amountCard: {
      backgroundColor: colors.surface,
      margin: 20,
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.gold,
    },
    amountLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 5,
    },
    amountValue: {
      fontSize: 36,
      fontWeight: 'bold',
      color: colors.gold,
    },
    methodsContainer: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 15,
    },
    methodCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.surfaceLight,
      flexDirection: 'row',
      alignItems: 'center',
    },
    methodCardActive: {
      borderColor: colors.gold,
      backgroundColor: 'rgba(255, 215, 0, 0.05)',
    },
    methodIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.surfaceLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    methodInfo: {
      flex: 1,
    },
    methodName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    methodDesc: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    detailsContainer: {
      backgroundColor: colors.surface,
      margin: 20,
      marginTop: 0,
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.gold,
    },
    detailRow: {
      marginBottom: 15,
    },
    detailLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 5,
    },
    detailValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    copyButton: {
      position: 'absolute',
      right: 0,
      top: 20,
      backgroundColor: colors.surfaceLight,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    copyText: {
      color: colors.primary,
      fontSize: 12,
      marginLeft: 5,
      fontWeight: '600',
    },
    ussdButton: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 10,
    },
    ussdButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    confirmButton: {
      backgroundColor: colors.gold,
      margin: 20,
      padding: 18,
      borderRadius: 12,
      alignItems: 'center',
    },
    confirmButtonText: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 18,
    },
    instructionText: {
      fontSize: 13,
      color: colors.textSecondary,
      marginHorizontal: 20,
      marginBottom: 20,
      textAlign: 'center',
      lineHeight: 18,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Payment</Text>
      </View>

      <View style={styles.amountCard}>
        <Text style={styles.amountLabel}>Amount to Pay</Text>
        <Text style={styles.amountValue}>₦5,000.00</Text>
      </View>

      <View style={styles.methodsContainer}>
        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[styles.methodCard, selectedMethod === method.id && styles.methodCardActive]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <View style={styles.methodIcon}>
              <Ionicons name={method.icon} size={24} color={colors.primary} />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodName}>{method.name}</Text>
              <Text style={styles.methodDesc}>{method.description}</Text>
            </View>
            <Ionicons 
              name={selectedMethod === method.id ? 'radio-button-on' : 'radio-button-off'} 
              size={24} 
              color={selectedMethod === method.id ? colors.gold : colors.textSecondary} 
            />
          </TouchableOpacity>
        ))}
      </View>

      {selectedMethod === 'bank' && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank Name</Text>
            <Text style={styles.detailValue}>{BANK_DETAILS.bankName}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Number</Text>
            <Text style={styles.detailValue}>{BANK_DETAILS.accountNumber}</Text>
            <TouchableOpacity 
              style={styles.copyButton}
              onPress={() => copyToClipboard(BANK_DETAILS.accountNumber)}
            >
              <Ionicons name={copied ? 'checkmark' : 'copy'} size={14} color={colors.primary} />
              <Text style={styles.copyText}>{copied ? 'Copied!' : 'Copy'}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Name</Text>
            <Text style={styles.detailValue}>{BANK_DETAILS.accountName}</Text>
          </View>
        </View>
      )}

      {selectedMethod === 'ussd' && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Dial this code on your phone</Text>
          <Text style={[styles.detailValue, { marginTop: 10, marginBottom: 15 }]}>
            {paymentMethods.find(m => m.id === 'ussd').code}
          </Text>
          <TouchableOpacity 
            style={styles.ussdButton}
            onPress={() => copyToClipboard(paymentMethods.find(m => m.id === 'ussd').code)}
          >
            <Text style={styles.ussdButtonText}>
              {copied ? 'Code Copied!' : 'Copy USSD Code'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedMethod === 'whatsapp' && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Send payment proof to</Text>
          <Text style={[styles.detailValue, { marginTop: 10 }]}>
            +234 814 304 0567
          </Text>
          <Text style={[styles.instructionText, { marginTop: 10 }]}>
            Include your name and screenshot of payment
          </Text>
        </View>
      )}

      {selectedMethod && (
        <>
          <Text style={styles.instructionText}>
            After completing payment, click the button below to activate your premium access
          </Text>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={handleConfirmPayment}
          >
            <Text style={styles.confirmButtonText}>I've Completed Payment</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
