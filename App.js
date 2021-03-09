import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { I18nManager, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './mainTab';

export default function App() {
  I18nManager.forceRTL(false);
  console.log(I18nManager.isRTL);
  return (
    <NavigationContainer>
      <MainTab />
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
