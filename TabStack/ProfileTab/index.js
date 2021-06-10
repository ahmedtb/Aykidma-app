import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    Button,
    TouchableOpacity
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import ProfileScreen from './ProfileScreen'
import EditProfileScreen from './EditProfileScreen'
import { AuthContext } from '../../StateManagment/AuthState'

import AuthenticationStack from '../components/AuthenticationStack'

export default function ProfileTabStack() {

    const { login, user } = useContext(AuthContext)

    if (user)
        return (
            <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />

        </Stack.Navigator>
        )
    else
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(52, 52, 52, 0.6)',
                }}>
                <View style={{
                    height: '80%',
                    width: '80%',
                    backgroundColor: 'white',
                    padding: 10,
                    marginHorizontal: 40,
                    borderRadius: 10,
                    shadowColor: 'blue',
                    shadowOffset: {
                        width: 10,
                        height: 20,
                    },
                    shadowOpacity: 0.9,
                    shadowRadius: 40,
                }}>
                    <AuthenticationStack />
                </View>
            </View>
        );
}
