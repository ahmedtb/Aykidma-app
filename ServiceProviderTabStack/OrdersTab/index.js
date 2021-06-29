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
    Pressable
} from 'react-native';

import NewOrders from './NewOrders'
import ResumedOrders from './ResumedOrders'
import DoneOrders from './DoneOrders'
import { fetchServiceProviderOrders } from '../../utilityFunctions/apiCalls'
import { AuthContext } from '../../StateManagment/AuthState'
import LoginScreen from '../components/AuthenticationStack/LoginScreen'
import LoadingIndicator from '../components/loadingIndicator'
import RefreshScrollView from '../components/RefreshScrollView'
import StatusBar from '../components/StatusBar'
import useIsMountedRef from '../../utilityFunctions/useIsMountedRef'

function filterOrders(orders, status) {
    return orders.filter((order) => {
        if (order.status === status)
            return true
        else
            return false
    })
}

function OrdersDisplay(props) {
    const isMountedRef = useIsMountedRef()

    const { InspectAPIError } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const [viewOrders, setViewOrders] = useState(1);

    const [newOrders, setNewOrders] = useState([])
    const [resumedOrders, setResumedOrder] = useState([])
    const [doneOrders, setDoneOrders] = useState([])

    async function setupServiceProviderOrders() {
        setIsLoading(true)
        try {
            const orders = await fetchServiceProviderOrders()
            if (isMountedRef.current) {
                setNewOrders(filterOrders(orders, 'new'))
                setResumedOrder(filterOrders(orders, 'resumed'))
                setDoneOrders(filterOrders(orders, 'done'))
            }
        } catch (error) {
            InspectAPIError(error)
        }
        setIsLoading(false)
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
            style={{ justifyContent: 'center', borderWidth: 1, flex: 1, paddingHorizontal: 20,}}
        >

            <StatusBar title="طلباتي"/>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 50, borderBottomWidth: 1, borderColor: 'grey' }}>
                <TouchableOpacity onPress={() => { setViewOrders(1) }} ><Text style={{ backgroundColor: (viewOrders == 1) ? 'grey' : '#dddddd', padding: 10, borderRadius: 20 }}>طلبات جديد {newOrders?.length}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setViewOrders(2) }} ><Text style={{ backgroundColor: (viewOrders == 2) ? 'grey' : '#dddddd', padding: 10, borderRadius: 20 }}>طلبات مستأنفة {resumedOrders?.length}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setViewOrders(3) }} ><Text style={{ backgroundColor: (viewOrders == 3) ? 'grey' : '#dddddd', padding: 10, borderRadius: 20 }}>طلبات منتهية {doneOrders?.length}</Text></TouchableOpacity>
            </View>

            <RefreshScrollView refreshFunction={setupServiceProviderOrders} style={{ flex: 1 }}>
                <View style={{ height: (viewOrders == 1) ? null : 0 }}>
                    <NewOrders newOrders={newOrders} />
                </View>
                <View style={{ height: (viewOrders == 2) ? null : 0 }}>
                    <ResumedOrders resumedOrders={resumedOrders} />
                </View>
                <View style={{ height: (viewOrders == 3) ? null : 0 }}>
                    <DoneOrders doneOrders={doneOrders} />
                </View>
            </RefreshScrollView>

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