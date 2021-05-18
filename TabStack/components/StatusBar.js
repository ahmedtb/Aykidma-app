import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { NotificationsContext } from '../../StateManagment/NotificationsProvider'
import { AuthContext } from '../../StateManagment/AuthState'
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
export default function StatusBar(props) {
    const { notification } = React.useContext(NotificationsContext)
    const { user } = React.useContext(AuthContext)

    React.useEffect(() => {
        console.log(notification)
    },[notification])

    return (
        <View style={{
            marginTop: Constants.statusBarHeight, borderWidth: 1, padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <Text>شريط الحالة</Text>
            <AntDesign name="bells" size={24} color="black" />
        </View>
    )
}