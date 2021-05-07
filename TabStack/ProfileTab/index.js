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
import { AuthContext } from '../../StateManagment/AuthState'

import AuthenticationStack from '../components/AuthenticationStack'

export default function ProfileTabStack() {

    const { login, user } = useContext(AuthContext)

    if (user)
        return (
            <ProfileScreen />
        )
    else
        return (
            <AuthenticationStack />
            // <Stack.Navigator
            //     screenOptions={{
            //         headerStyle: {
            //             backgroundColor: 'red',
            //         },
            //         headerTintColor: '#fff',
            //         headerTitleStyle: {
            //             fontWeight: 'bold'
            //         }
            //     }}
            // >
            //     <Stack.Screen name="enrollment" component={EnrolmentScreen}
            //         options={{ title: 'التسجيل' }}
            //     />

            //     <Stack.Screen name="تأكيد رقم الهاتف" component={ConfirmationScreen}
            //         options={{ title: 'تأكيد رقم الهاتف' }}
            //     />

            // </Stack.Navigator>
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