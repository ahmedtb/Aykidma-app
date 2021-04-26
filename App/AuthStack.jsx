import React, {useContext, useEffect, useState} from 'react'
import { Text } from 'react-native'

import {AuthContext} from '../StateManagment/AuthState'

function LoginScreen() {
    const {login} = useContext(AuthContext)

    return (
        <Text>please login</Text>
    )
}

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function AuthStack(props) {
    
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
            <Stack.Screen name="LoginScreen" component={LoginScreen}
                options={{ title: 'تسجيل الدخول' }}
            />

        </Stack.Navigator>
    )
}