import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    Button,
    StatusBar
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import ServicesScreen from './ServicesScreen'

const Stack = createStackNavigator();
import { AuthContext } from '../../StateManagment/AuthState'
import AuthenticationStack from '../components/AuthenticationStack'

export default function MyServicesTab() {
    const { loginProvider, providerAuth } = React.useContext(AuthContext)

    if (providerAuth)
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen name="ServicesScreen" component={ServicesScreen}
                options={{ title: 'كل العروض' }}
            />


        </Stack.Navigator>
    )
    else 
    return (
        <AuthenticationStack />
    )
}