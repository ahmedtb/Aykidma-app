
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

import { AuthContext } from '../../StateManagment/AuthState'
import StatusBar from '../components/StatusBar'
import RefreshScrollView from '../components/RefreshScrollView'

export default function ProfileScreen({ navigation }) {

    const { logoutProvider, providerAuth, RefreshProviderData } = useContext(AuthContext)

    async function refreshProviderAuth() {
        await RefreshProviderData()
    }

    return (
        <RefreshScrollView refreshFunction={refreshProviderAuth}>

            <StatusBar title='الملف الشخصي'/>

            <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>

                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 20 }} >الاسم: {providerAuth.provider.name}</Text>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 20 }} >رقم الهاتف: {providerAuth.provider.phone_number}</Text>
                </View>

            </View>



            <TouchableOpacity
                style={{ alignSelf: 'center', backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => {
                    logoutProvider(providerAuth.token)
                }
                }
            >
                <Text style={{ color: 'white' }}>تسجيل الخروج</Text>
            </TouchableOpacity>


        </RefreshScrollView>

    );
}
