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
import { Fontisto } from '@expo/vector-icons';

import MainTab from './MainTab';
import OrdersTab from './OrdersTab';
import MoreTab from './moreTab';
import OffersTab from './OffersTab';
import EnrolmentTab from './EnrolmentTab';

const Tab = createBottomTabNavigator();

export default function TabStack() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="الرئيسية" component={MainTab} />
            <Tab.Screen name="طلباتي" component={OrdersTab} />
            <Tab.Screen name="كل العروض" component={OffersTab}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Fontisto name="shopping-sale" size={24} color="black" />
                        );
                    },
                }}
            />

            <Tab.Screen name="التسجيل" component={EnrolmentTab} />
            <Tab.Screen name="المزيد" component={MoreTab} />
        </Tab.Navigator>
    );
}
