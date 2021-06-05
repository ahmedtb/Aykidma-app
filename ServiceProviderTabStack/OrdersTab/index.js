import React, { useState, useContext, useEffect } from 'react';
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

import NewOrders from './NewOrders'
import ResumedOrders from './ResumedOrders'
import DoneOrders from './DoneOrders'
import { fetchServiceProviderOrders } from '../../utilityFunctions/apiCalls'
import { AuthContext } from '../../StateManagment/AuthState'
import LoginScreen from '../components/AuthenticationStack/LoginScreen'
import LoadingIndicator from '../components/loadingIndicator'

function filterOrders(orders, status) {
    return orders.filter((order) => {
        if (order.status === status)
            return true
        else
            return false
    })
}

function OrdersDisplay(props) {
    const { InspectAPIError } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const [viewOrders, setViewOrders] = useState(1);

    const [newOrders, setNewOrders] = useState([])
    const [resumedOrders, setResumedOrder] = useState([])
    const [doneOrders, setDoneOrders] = useState([])

    async function setupServiceProviderOrders() {
        try {
            setIsLoading(true)
            const orders = await fetchServiceProviderOrders()
            setIsLoading(false)

            setNewOrders(filterOrders(orders, 'new'))
            setResumedOrder(filterOrders(orders, 'resumed'))
            setDoneOrders(filterOrders(orders, 'done'))
        } catch (error) {
            InspectAPIError(error)
        }
    }

    useEffect(() => {
        setupServiceProviderOrders()

        // const unsubscribe = props.navigation.addListener('focus', () => {
        //     setupServiceProviderOrders()
        // });

        // return unsubscribe;
    }, []);

    return (

        <View
            style={{ justifyContent: 'center', borderWidth: 1, flex: 1, paddingHorizontal: 20, marginTop: StatusBar.currentHeight }}
        >

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

            <LoadingIndicator visibility={isLoading} />
        </View>


    );
}

export default function OrdersTab({ navigation }) {
    const { providerAuth } = useContext(AuthContext)
    if (providerAuth)
        return (
            <OrdersDisplay navigation={navigation} />
        )
    else
        return (
            <LoginScreen />
        )
}


const styles = StyleSheet.create({

})