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
import StatusBar from '../components/StatusBar'

import AuthenticationStack from '../Stacks/AuthenticationStack'
import { fetchUserOrders } from '../../utilityFunctions/apiCalls'
import { logError } from '../../redux/AuthFunctions'
import LoadingIndicator from '../../components/loadingIndicator'
import RefreshScrollView from '../../components/RefreshScrollView'
import useIsMountedRef from '../../components/useIsMountedRef'
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'

function filterOrders(orders, status) {
    return orders.filter((order) => {
        if (order.status === status)
            return true
        else
            return false
    })
}

function OrdersTab(props) {

    const isMountedRef = useIsMountedRef();

    const [isLoading, setIsLoading] = useState(false)

    const [viewOrders, setViewOrders] = useState(1);

    const [newOrders, setNewOrders] = useState([])
    const [resumedOrders, setResumedOrder] = useState([])
    const [doneOrders, setDoneOrders] = useState([])

    async function fetchOrders() {

        try {
            setIsLoading(true)
            const orders = await fetchUserOrders(props.state.token)
            if (isMountedRef.current) {
                setIsLoading(false)
                setNewOrders(filterOrders(orders, 'new'))
                setResumedOrder(filterOrders(orders, 'resumed'))
                setDoneOrders(filterOrders(orders, 'done'))
            }
        } catch (error) {
            logError(error, 'OrdersTab fetchOrders')
        }
    }

    useEffect(() => {
        if (props.state.user)
            fetchOrders()
    }, [props.state.user]);

    if (props.state.user)
        return (
            <View style={{ justifyContent: 'center', borderWidth: 1, flex: 1, paddingHorizontal: 10, marginTop: StatusBar.currentHeight }}>

                <StatusBar title='طلباتي' />

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 50, borderBottomWidth: 0.7, borderColor: 'red' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: (viewOrders == 1) ? '#ff6666' : '#63ff68', padding: 10, borderRadius: 20 }} onPress={() => { setViewOrders(1) }} >
                        <Entypo name="new" size={24} color="black" />
                        <Text >طلبات جديد {newOrders?.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: (viewOrders == 2) ? '#ff6666' : '#63ff68', padding: 10, borderRadius: 20 }} onPress={() => { setViewOrders(2) }} >
                        <FontAwesome name="list-ol" size={24} color="black" />
                        <Text >طلبات مستأنفة {resumedOrders?.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: (viewOrders == 3) ? '#ff6666' : '#63ff68', padding: 10, borderRadius: 20 }} onPress={() => { setViewOrders(3) }} >
                        <Ionicons name="checkmark-done" size={24} color="black" />
                        <Text >طلبات منتهية {doneOrders?.length}</Text>
                    </TouchableOpacity>
                </View>

                <RefreshScrollView refreshFunction={fetchOrders} style={{ flex: 1 }}>
                    <View style={{ height: (viewOrders == 1) ? null : 0 }}>
                        <NewOrders refreshFunction={fetchOrders} newOrders={newOrders} />
                    </View>
                    <View style={{ height: (viewOrders == 2) ? null : 0 }}>
                        <ResumedOrders refreshFunction={fetchOrders} resumedOrders={resumedOrders} />
                    </View>
                    <View style={{ height: (viewOrders == 3) ? null : 0 }}>
                        <DoneOrders refreshFunction={fetchOrders} doneOrders={doneOrders} />
                    </View>
                </RefreshScrollView>
                <LoadingIndicator visibility={isLoading} />

            </View>
        )
    else
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(52, 52, 52, 0.6)',
                }}>
                <View style={{
                    height: '80%',
                    width: '80%',
                    backgroundColor: 'white',
                    padding: 10,
                    marginHorizontal: 40,
                    borderRadius: 10,
                    shadowColor: 'blue',
                    shadowOffset: {
                        width: 10,
                        height: 20,
                    },
                    shadowOpacity: 0.9,
                    shadowRadius: 40,
                }}>
                    <AuthenticationStack />
                </View>
            </View>
        )
}


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setToken } from '../../redux/StateActions';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUser,
        setToken
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTab);
