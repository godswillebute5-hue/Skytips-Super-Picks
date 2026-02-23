import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  
  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('premiumStatus');
      if (status === 'true') {
        setIsPremium(true);
      }
    } catch (error) {
      console.error('Error checking premium status:', error);
    }
  };

  const unlockPremium = async () => {
    try {
      await AsyncStorage.setItem('premiumStatus', 'true');
      setIsPremium(true);
    } catch (error) {
      console.error('Error saving premium status:', error);
    }
  };

  const colors = {
    primary: '#00d4ff',
    secondary: '#0099cc',
    accent: '#ff6b35',
    gold: '#ffd700',
    background: '#0a0a0a',
    surface: '#1a1a2e',
    surfaceLight: '#252545',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    success: '#00ff88',
    danger: '#ff4757',
    warning: '#ffa502'
  };

  return (
    <ThemeContext.Provider value={{ colors, isPremium, unlockPremium }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
    
