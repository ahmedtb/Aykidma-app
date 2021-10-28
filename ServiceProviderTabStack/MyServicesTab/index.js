import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    Button,
    StatusBar
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import ServicesScreen from './ServicesScreen'
import AddNewService from './AddNewService'
import ViewServiceScreen from './ViewServiceScreen'
import EditServiceScreen from './EditServiceScreen'

import AuthenticationStack from '../Stacks/AuthenticationStack'

function MyServicesTab(props) {
    // const { loginProvider, providerAuth } = React.useContext(AuthContext)



    if (props.state.provider?.activated )
        return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'red',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    },
                    headerShown:false
                }}
            >
                <Stack.Screen name="ServicesScreen" component={ServicesScreen}
                    options={{ title: 'كل خدماتي' }}
                />

                <Stack.Screen name='AddNewService' component={AddNewService}
                    options={{ title: 'طلب اضافة خدمة جديد' }}
                />

                <Stack.Screen name="ViewServiceScreen" component={ViewServiceScreen}
                    options={{ title: 'تفاصيل الخدمة' }}
                />

                <Stack.Screen name="EditServiceScreen" component={EditServiceScreen}
                    options={{ title: 'تعديل الخدمة' }}
                />


            </Stack.Navigator>
        )
    else
        return (
            <AuthenticationStack />
        )
}


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setToken } from '../../redux/StateActions';
const mapStateToProps = ({state}) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUser,
        setToken
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MyServicesTab);