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

const Tab = createBottomTabNavigator();

export default function TabStack() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="MyServices" component={MyServicesTab}
                options={{
                    title: 'خدماتي',
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
