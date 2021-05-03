import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    Button,
    TouchableOpacity,
    Modal,
    Pressable,
    StatusBar
} from 'react-native';
import { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

import NewOrders from './NewOrders'
import ResumedOrders from './ResumedOrders'
import DoneOrders from './DoneOrders'
import axios from 'axios'

import { AuthContext } from '../../StateManagment/AuthState'
import LoginScreen from '../components/LoginScreen'

function filterOrders(orders, status) {
    return orders.filter((order) => {
        if (order.status === status)
            return true
        else
            return false
    })
}

export default function OrdersTab({ navigation }) {
    const { login, user } = useContext(AuthContext)


    const [viewOrders, setViewOrders] = useState(1);

    const [newOrders, setNewOrders] = useState([])
    const [resumedOrders, setResumedOrder] = useState([])
    const [doneOrders, setDoneOrders] = useState([])

    useEffect(() => {
        async function fetch() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                const orders = (await axios.get('/api/orders', config)).data
                setNewOrders(filterOrders(orders, 'new'))
                setResumedOrder(filterOrders(orders, 'resumed'))
                setDoneOrders(filterOrders(orders, 'done'))
            } catch (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            }

        }
        // fetch()

        const unsubscribe = navigation.addListener('focus', () => {
            fetch()
        });

        return unsubscribe;
    }, [navigation, user]);

    if (user)
        return (
            <View style={{ justifyContent: 'center', borderWidth: 1, flex: 1, paddingHorizontal: 20, marginTop: StatusBar.currentHeight }}>

                <View style={{ alignItems: 'center', borderBottomWidth: 1, marginBottom: 10, padding: 10, backgroundColor: 'red' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>
                        طلبــاتـي
                </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 50, borderBottomWidth: 1, borderColor: 'grey' }}>
                    <TouchableOpacity onPress={() => { setViewOrders(1) }} ><Text style={{ backgroundColor: (viewOrders == 1) ? 'grey' : '#dddddd', padding: 10, borderRadius: 20 }}>طلبات جديد</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { setViewOrders(2) }} ><Text style={{ backgroundColor: (viewOrders == 2) ? 'grey' : '#dddddd', padding: 10, borderRadius: 20 }}>طلبات مستأنفة</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { setViewOrders(3) }} ><Text style={{ backgroundColor: (viewOrders == 3) ? 'grey' : '#dddddd', padding: 10, borderRadius: 20 }}>طلبات منتهية</Text></TouchableOpacity>
                </View>

                {/* <OrdersList viewOrders={viewOrders} {...props} /> */}

                <View style={{ flex: 1 }}>
                    <View style={{ height: (viewOrders == 1) ? null : 0 }}>
                        <NewOrders newOrders={newOrders} />
                    </View>
                    <View style={{ height: (viewOrders == 2) ? null : 0 }}>
                        <ResumedOrders resumedOrders={resumedOrders} />
                    </View>
                    <View style={{ height: (viewOrders == 3) ? null : 0 }}>
                        <DoneOrders doneOrders={doneOrders} />
                    </View>
                </View>

            </View>

        );
    else
        return (
            <LoginScreen />
        )
}


const styles = StyleSheet.create({

})