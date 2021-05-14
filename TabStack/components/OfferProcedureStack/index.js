import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    ScrollView
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import OfferDetailsScreen from './OfferDetailsScreen';
import FormScreen from './FormScreen';
import ServiceScreen from './ServiceScreen'

const Stack = createStackNavigator();


export default function OfferProcedureStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            <Stack.Screen name="OfferDetailsScreen" component={OfferDetailsScreen}
                options={{ title: 'تفاصيل العرض' }}
            />

            <Stack.Screen name="FormScreen" component={FormScreen}
                options={{ title: 'املأ الطلب' }}
            />

            <Stack.Screen name="ServiceScreen" component={ServiceScreen}
                options={{ title: 'مزود خدمة' }}
            />

        </Stack.Navigator>
    );
}
