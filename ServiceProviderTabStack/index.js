import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,

} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import MyServicesTab from './MyServicesTab';
import OrdersTab from './OrdersTab'
import ProfileTab from './ProfileTab'
import MoreTab from './MoreTab'

const Tab = createBottomTabNavigator();

export default function TabStack() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="MyServicesTab" component={MyServicesTab}
                options={{
                    title: 'خدماتي',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <FontAwesome name="home" size={24} color="black" />
                        );
                    },
                }}
            />

            <Tab.Screen name="OrdersTab" component={OrdersTab}
                options={{
                    title: 'طلباتي',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <FontAwesome name="home" size={24} color="black" />
                        );
                    },
                }}
            />

            <Tab.Screen name="ProfileTab" component={ProfileTab}
                options={{
                    title: 'الملف الشخصي',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <FontAwesome name="home" size={24} color="black" />
                        );
                    },
                }}
            />

            <Tab.Screen name="MoreTab" component={MoreTab}
                options={{
                    title: 'المزيد',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <FontAwesome name="home" size={24} color="black" />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}
