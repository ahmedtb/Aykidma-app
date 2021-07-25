import React, { useState, useContext } from 'react';
import {
    StyleSheet,

} from 'react-native';

import { AuthContext } from '../../StateManagment/AuthState'


import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import ProfileScreen from './ProfileScreen'
import EditProfileScreen from './EditProfileScreen'

import AuthenticationStack from '../components/AuthenticationStack'

export default function ProfileTabStack() {

    const { loginProvider, providerAuth } = useContext(AuthContext)

    if (providerAuth)
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="ProviderProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="ProviderEditProfileScreen" component={EditProfileScreen} />

            </Stack.Navigator>
        )
    else
        return (
            <AuthenticationStack />
        );
}



const styles = StyleSheet.create({
    enrollField: {
        borderWidth: 1, borderColor: 'grey', borderRadius: 5, padding: 10, fontSize: 20
    },

    fieldLable: {
        fontSize: 20,
    },

    container: {
        // flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    listGroupItem: {
        flexDirection: 'row-reverse',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 2

    },
    container: {
        padding: 5,
    },
    header: {
        fontSize: 18,
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
        backgroundColor: "#dddddd",
        color: 'black',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    card: {
        borderColor: '#756060',
        borderRadius: 15,
        borderWidth: 1,
        marginTop: 5,

    },
    row: {
        flex: 1,
        fontSize: 18,
        color: '#756060',
        textAlign: "center",
    }
})