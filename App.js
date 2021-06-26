import React from 'react';
import { I18nManager, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Route from './App/Route'
import axios from 'axios'
import _Environments from './env'

axios.defaults.baseURL = _Environments.BASE_URL


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

