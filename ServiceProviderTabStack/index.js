import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import MyServicesTab from './MyServicesTab';
import OrdersTab from './OrdersTab'
import ProfileTab from './ProfileTab'
import MoreTab from './MoreTab'

const Tab = createBottomTabNavigator();

export default function ServiceProviderTabStack() {


    return (
        <Tab.Navigator>
            <Tab.Screen name="MyServicesTab" component={MyServicesTab}
                options={{
                    title: 'خدماتي',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<MaterialIcons name="design-services" size={24} color="black" />);
                    },
                }}
            />

            <Tab.Screen name="OrdersTab" component={OrdersTab}
                options={{
                    title: 'الطلبات',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<AntDesign name="form" size={24} color="black" />);
                    },
                }}
            />

            <Tab.Screen name="ProfileTab" component={ProfileTab}
                options={{
                    title: 'ملف مزود الخدمة',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<MaterialCommunityIcons name="human-child" size={24} color="black" />);

                    },
                }}
            />

            <Tab.Screen name="MoreTab" component={MoreTab}
                options={{
                    title: 'المزيد',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<MaterialIcons name="more-horiz" size={24} color="black" />);
                    },
                }}
            />
        </Tab.Navigator>

    );
}
