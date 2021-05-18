import React from 'react';
import { I18nManager, StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Route from './App/Route'
import axios from 'axios'

// axios.defaults.baseURL = 'http://10.0.3.2:8000';

axios.defaults.baseURL = 'http://10.44.70.23:50';


export default function App() {
  I18nManager.forceRTL(true);
  // console.log('I18nManager.isRTL = ' + I18nManager.isRTL);
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  return (
      <NavigationContainer>
        <Route />
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
