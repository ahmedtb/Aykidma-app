import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import MyServicesTab from './MyServicesTab';
import OrdersTab from './OrdersTab'
import ProfileTab from './ProfileTab'
import MoreTab from './MoreTab'
// import axios from 'axios';

const Tab = createBottomTabNavigator();

export default function ServiceProviderTabStack(props) {

    // those lines to make sure that bearer token of requests is from provider
    // const { providerAuth } = React.useContext(AuthContext)
    // React.useEffect(() => {
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${providerAuth?.token}`;
    // }, [providerAuth])

    return (
        // <Provider store={store}>

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
                        title: 'طلباتي',
                        tabBarIcon: ({ size, focused, color }) => {
                            return (<AntDesign name="form" size={24} color="black" />                            );
                        },
                    }}
                />

                <Tab.Screen name="ProfileTab" component={ProfileTab}
                    options={{
                        title: 'الملف الشخصي',
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
        // </Provider>

    );
}
