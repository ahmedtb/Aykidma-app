import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ServiceDetailsScreen from './ServiceDetailsScreen';
import FormScreen from './FormScreen';
import ServiceProviderScreen from "./ServiceProviderScreen";

const Stack = createStackNavigator();


export default function ServiceProcedureStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            <Stack.Screen name="ServiceDetailsScreen" component={ServiceDetailsScreen}
                options={{ title: 'تفاصيل العرض' }}
            />

            <Stack.Screen name="FormScreen" component={FormScreen}
                options={{ title: 'املأ الطلب' }}
            />

            <Stack.Screen name="ServiceProviderScreen" component={ServiceProviderScreen}
                options={{ title: 'مزود خدمة' }}
            />
        </Stack.Navigator>
    );
}
