import React from 'react';
import { I18nManager, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Route from './App/Route'
import axios from 'axios'

// axios.defaults.baseURL = 'http://10.0.3.2:8000';
axios.defaults.baseURL = 'http://192.168.0.184:50'
// axios.defaults.baseURL = 'http://10.44.70.23:50';


export default function App() {

  React.useEffect(() => {
    if (!I18nManager.isRTL)
      I18nManager.forceRTL(true);
  }, [])
  // console.log('I18nManager.isRTL = ' + I18nManager.isRTL);
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}

