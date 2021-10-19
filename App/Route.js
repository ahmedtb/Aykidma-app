import React from 'react';
import NotificationsProvider from './NotificationsProvider'

import { Provider } from 'react-redux';
import store from '../redux/store';

import ServiceProviderTabStack from '../ServiceProviderTabStack'
import TabStack from '../TabStack';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


export default function Route() {

    return (
        <Provider store={store}>
            <NotificationsProvider />
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
        </Provider>
    )
}