import React from 'react';
import { I18nManager, StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabStack from './TabStack';
import { AppProvider } from './Context'

export default function App() {
  I18nManager.forceRTL(true);
  // console.log('I18nManager.isRTL = ' + I18nManager.isRTL);
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  return (
    <AppProvider> 
      <NavigationContainer>
        <TabStack />
      </NavigationContainer>
    </AppProvider>
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
