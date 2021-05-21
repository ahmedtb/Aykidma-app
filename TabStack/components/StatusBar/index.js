import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { NotificationsContext } from '../../../StateManagment/NotificationsProvider'
import { AuthContext } from '../../../StateManagment/AuthState'
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import ListOptions from './ListOptions'

export default function StatusBar(props) {
    const { notification } = React.useContext(NotificationsContext)
    const { user } = React.useContext(AuthContext)
    // const [notification, s]
    const list = ['1','2']

    React.useEffect(() => {
        console.log(notification)
    }, [notification])

    return (
        <View style={{
            marginTop: Constants.statusBarHeight, borderWidth: 1, padding: 15, margin: 10,
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Text style={{ fontSize: 15 }}>{user.user.name}</Text>
            <AntDesign name="bells" size={30} color="black" />
            <ListOptions
                onChange={
                    (option) => {
                        // dispatch({ type: 'change', payload: { name: field.name, value: option } })
                    }
                }
                choice={'1'}
                list={list} label='اختر' />
        </View>
    )
}