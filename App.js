import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { I18nManager, StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabStack from './TabStack';
import axios from 'axios'

// set the base URL globally
axios.defaults.baseURL = 'https://private-3e8de-aykidmaapp.apiary-mock.com';

export default function App() {
  I18nManager.forceRTL(true);
  // console.log('I18nManager.isRTL = ' + I18nManager.isRTL);
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  return (
    <NavigationContainer>
      <TabStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
