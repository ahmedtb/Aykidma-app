import React from 'react';
import {
    StyleSheet
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import LoginScreen from './LoginScreen'
import ProviderEnrolmentScreen from './ProviderEnrolmentScreen'
// import ConfirmationScreen from './ConfirmationScreen'
import { fetchProvider, tryLoginUserFromStore } from '../../../redux/AuthFunctions'

function AuthenticationStack(props) {

    React.useEffect(() => {
        if (!props.state.user)
            tryLoginUserFromStore()
    }, [])

    React.useEffect(() => {
        if (props.state.user && !props.state.provider)
            fetchProvider(props.state.token)
        // console.log(props.state.provider)
    }, [props.state.user])


    if (props.state.user && !props.state.provider?.activated)
        return (
            <ProviderEnrolmentScreen />
        )
    else if(!props.state.user)
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
                    headerShown: false
                }}
            >

                <Stack.Screen name="Login" component={LoginScreen}
                    options={{ title: 'صفحة تسجيل الدخول' }}
                />

                {/* <Stack.Screen name="enrollment" component={ProviderEnrolmentScreen}
                    options={{ title: 'التسجيل' }}
                />

                <Stack.Screen name="تأكيد رقم الهاتف" component={ConfirmationScreen}
                    options={{ title: 'تأكيد رقم الهاتف' }}
                /> */}

            </Stack.Navigator>
        );
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setToken } from '../../../redux/StateActions';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUser,
        setToken
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationStack);



const styles = StyleSheet.create({
    enrollField: {
        borderWidth: 1, borderColor: 'grey', borderRadius: 5, padding: 10, fontSize: 20
    },

    fieldLable: {
        fontSize: 20,
    },

    container: {
        // flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    listGroupItem: {
        flexDirection: 'row-reverse',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 2

    },
    container: {
        padding: 5,
    },
    header: {
        fontSize: 18,
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
        backgroundColor: "#dddddd",
        color: 'black',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    card: {
        borderColor: '#756060',
        borderRadius: 15,
        borderWidth: 1,
        marginTop: 5,

    },
    row: {
        flex: 1,
        fontSize: 18,
        color: '#756060',
        textAlign: "center",
    }
})