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
import { FontAwesome5 } from '@expo/vector-icons';

import MainTab from './MainTab';
import OrdersTab from './OrdersTab';
import MoreTab from './moreTab';


const Tab = createBottomTabNavigator();

export default function TabStack() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="الرئيسية" component={MainTab} />
            <Tab.Screen name="الطلبات" component={OrdersTab} />
            <Tab.Screen name="المساعدة" component={OrdersTab} />

            <Tab.Screen name="المزيد" component={MoreTab} />

        </Tab.Navigator>
    );
}
