import React, { useEffect } from 'react';
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
const Stack = createStackNavigator();
import ServicesScreen from './ServicesScreen'
import AddNewService from './AddNewService'
import ViewServiceScreen from './ViewServiceScreen'
import EditServiceScreen from './EditServiceScreen'

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
                    },
                    headerShown:false
                }}
            >
                <Stack.Screen name="ServicesScreen" component={ServicesScreen}
                    options={{ title: 'كل خدماتي' }}
                />

                <Stack.Screen name='AddNewService' component={AddNewService}
                    options={{ title: 'طلب اضافة خدمة جديد' }}
                />

                <Stack.Screen name="ViewServiceScreen" component={ViewServiceScreen}
                    options={{ title: 'تفاصيل الخدمة' }}
                />

                <Stack.Screen name="EditServiceScreen" component={EditServiceScreen}
                    options={{ title: 'تعديل الخدمة' }}
                />


            </Stack.Navigator>
        )
    else
        return (
            <AuthenticationStack />
        )
}