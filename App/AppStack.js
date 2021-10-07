import React, { useContext } from 'react';

import ServiceProviderTabStack from '../ServiceProviderTabStack'
import TabStack from '../TabStack';
// import {UserAppStateProvider} from '../StateManagment/UserAppStateProvider'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export const StacksEnum = {
    TabStack: 1,
    ServiceProviderTabStack: 2
}

export default function AppStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="ServiceProviderTabStack" component={ServiceProviderTabStack}
                options={{ title: 'مزود خدمات' }}
            />
            <Stack.Screen name="TabStack" component={TabStack}
                options={{ title: 'المستخدم' }}
            />
        </Stack.Navigator>
    )
}
