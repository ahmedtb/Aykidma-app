import React from 'react';
import {
    Text
} from 'react-native'
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
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'green',
                inactiveTintColor: 'white',
                style: {
                    borderTopColor: '#66666666',
                    borderTopWidth:1,
                    backgroundColor: 'red',
                    elevation: 3,
                    height: 70,
                }
            }}
        >
            <Tab.Screen name="الرئيسية" component={MainTab}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<FontAwesome name="home" size={30} color={color} />);
                    },
                    tabBarLabel: ({ focused, color }) => {
                        return (<Text style={{ color: color }}>الرئيسية</Text>);
                    },
                }}
            />
            <Tab.Screen name="طلباتي" component={OrdersTab}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<Octicons name="list-ordered" size={30} color={color} />);
                    },
                    tabBarLabel: ({ focused, color }) => {
                        return (<Text style={{ color: color }}>طلباتي</Text>);
                    },
                }}
            />
            <Tab.Screen name="كل العروض" component={ServicesTab}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<Fontisto name="shopping-sale" size={30} color={color} />);
                    },
                    tabBarLabel: ({ focused, color }) => {
                        return (<Text style={{ color: color }}>كل العروض</Text>);
                    },
                }}
            />

            <Tab.Screen name="الملف الشخصي" component={ProfileTab}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<MaterialCommunityIcons name="human-child" size={30} color={color} />);
                    },
                    tabBarLabel: ({ focused, color }) => {
                        return (<Text style={{ color: color }}>الملف الشخصي</Text>);
                    },
                }}
            />
            <Tab.Screen name="المزيد" component={MoreTab}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (<MaterialIcons name="more-horiz" size={30} color={color} />);
                    },
                    tabBarLabel: ({ focused, color }) => {
                        return (<Text style={{ color: color }}>المزيد</Text>);
                    },
                }}
            />
        </Tab.Navigator>
    );
}
