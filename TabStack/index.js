import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto, FontAwesome, Octicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import MainTab from './MainTab';
import OrdersTab from './OrdersTab';
import MoreTab from './moreTab';
import ServicesTab from './ServicesTab';
import ProfileTab from './ProfileTab'

const Tab = createBottomTabNavigator();

export default function TabStack(props) {


    return (
        <Tab.Navigator>
            <Tab.Screen name="الرئيسية" component={MainTab}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<FontAwesome name="home" size={24} color="black" />);
                    }
                }}
            />
            <Tab.Screen name="طلباتي" component={OrdersTab}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<Octicons name="list-ordered" size={24} color="black" />);
                    }
                }}
            />
            <Tab.Screen name="كل العروض" component={ServicesTab}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<Fontisto name="shopping-sale" size={24} color="black" />);
                    }
                }}
            />

            <Tab.Screen name="الملف الشخصي" component={ProfileTab}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<MaterialCommunityIcons name="human-child" size={24} color="black" />);
                    }
                }}
            />
            <Tab.Screen name="المزيد" component={MoreTab}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<MaterialIcons name="more-horiz" size={24} color="black" />);
                    }
                }}
            />
        </Tab.Navigator>
    );
}
