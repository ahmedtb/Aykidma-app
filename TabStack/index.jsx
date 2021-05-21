import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import MainTab from './MainTab';
import OrdersTab from './OrdersTab';
import MoreTab from './moreTab';
import OffersTab from './OffersTab';
import ProfileTab from './ProfileTab'

const Tab = createBottomTabNavigator();

export default function TabStack() {
    return (
            <Tab.Navigator>
                <Tab.Screen name="الرئيسية" component={MainTab}
                    options={{
                        tabBarIcon: ({ size, focused, color }) => {
                            return (
                                <FontAwesome name="home" size={24} color="black" />
                            );
                        },
                    }}
                />
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

                <Tab.Screen name="الملف الشخصي" component={ProfileTab} />
                <Tab.Screen name="المزيد" component={MoreTab} />
            </Tab.Navigator>
    );
}
