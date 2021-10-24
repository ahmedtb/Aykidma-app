import React from 'react';
import {
    StyleSheet,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import ServicesScreen from './ServicesScreen'
import ServiceProcedureStack from '../Stacks/ServiceProcedureStack'

const Stack = createStackNavigator();

export default function OffersTab() {
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
                headerShown: false
            }}
        >
            <Stack.Screen name="ServicesScreen" component={ServicesScreen}
                options={{ title: 'كل العروض' }}
            />
            <Stack.Screen name="ServiceProcedureStack" component={ServiceProcedureStack}
                options={{ title: 'العروض' }}
            />

        </Stack.Navigator>
    );
}
