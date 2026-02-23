import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import TabNavigator from './src/navigation/TabNavigator';
import PaymentScreen from './src/screens/PaymentScreen';
import PredictionDetailScreen from './src/screens/PredictionDetailScreen';
import { ThemeProvider } from './src/utils/ThemeContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator 
            screenOptions={{ 
              headerShown: false,
              cardStyle: { backgroundColor: '#0a0a0a' }
            }}
          >
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="PredictionDetail" component={PredictionDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
    }
    
