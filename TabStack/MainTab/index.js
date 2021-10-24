import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FrontScreen from './FrontScreen';
import ServicesScreen from './ServicesScreen';
import ServiceProcedureStack from '../Stacks/ServiceProcedureStack'

const Stack = createStackNavigator();


export default function MainTab() {
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
            <Stack.Screen name="FrontScreen" component={FrontScreen}
                options={{ title: '' }}

            />
            <Stack.Screen name="ServicesScreen" component={ServicesScreen}
                options={{ title: 'العروض' }}
            />

            <Stack.Screen name="ServiceProcedureStack" component={ServiceProcedureStack}
                options={{ title: 'العروض' }}
            />

        </Stack.Navigator>
    );
}