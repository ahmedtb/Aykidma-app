import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../StateManagment/AuthState'
import MainTab from './MainTab';
import OrdersTab from './OrdersTab';
import MoreTab from './moreTab';
import ServicesTab from './ServicesTab';
import ProfileTab from './ProfileTab'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import stateReducer from './StateReducer';
import axios from 'axios';
const store = createStore(stateReducer);

const Tab = createBottomTabNavigator();

export default function TabStack(props) {

    // those lines to make sure that bearer token of requests is from user
    const { user } = React.useContext(AuthContext)
    React.useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user?.token}`;
    }, [user])

    return (
        <Provider store={store}>
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
                <Tab.Screen name="كل العروض" component={ServicesTab}
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
        </Provider>
    );
}
