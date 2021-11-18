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
import { logError } from '../../redux/AuthFunctions';
import AuthenticationStack from '../Stacks/AuthenticationStack'
import LoadingIndicator from '../../components/loadingIndicator'
import RefreshScrollView from '../../components/RefreshScrollView'
import StatusBar from '../components/StatusBar'
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

function OrdersDisplay(props) {
    const isMountedRef = useIsMountedRef()

    const [isLoading, setIsLoading] = useState(true)
    const [viewOrders, setViewOrders] = useState(1);

    const [newOrders, setNewOrders] = useState([])
    const [resumedOrders, setResumedOrder] = useState([])
    const [doneOrders, setDoneOrders] = useState([])

    async function setupServiceProviderOrders() {
        if (isMountedRef.current)
            setIsLoading(true)
        try {
            const orders = await fetchServiceProviderOrders()
            if (isMountedRef.current) {
                setNewOrders(filterOrders(orders, 'new'))
                setResumedOrder(filterOrders(orders, 'resumed'))
                setDoneOrders(filterOrders(orders, 'done'))
            }
        } catch (error) {
            logError(error, 'setupServiceProviderOrders')
        }
        if (isMountedRef.current)
            setIsLoading(false)
    }

    useEffect(() => {
        setupServiceProviderOrders()
    }, []);

    return (

        <View
            style={{ justifyContent: 'center', borderWidth: 1, flex: 1, paddingHorizontal: 10, }}
        >

            <StatusBar title="طلباتي" />

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 50, borderBottomWidth: 1, borderColor: 'grey' }}>
                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: (viewOrders == 1) ? 'red' : '#63ff68', padding: 7, borderRadius: 20 }} onPress={() => { setViewOrders(1) }} >
                    <Entypo name="new" size={24} color="black" />
                    <Text >طلبات جديد {newOrders?.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: (viewOrders == 2) ? 'red' : '#63ff68', padding: 7, borderRadius: 20 }} onPress={() => { setViewOrders(2) }} >
                    <FontAwesome name="list-ol" size={24} color="black" />
                    <Text >طلبات مستأنفة {resumedOrders?.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: (viewOrders == 3) ? 'red' : '#63ff68', padding: 7, borderRadius: 20 }} onPress={() => { setViewOrders(3) }} >
                    <Ionicons name="checkmark-done" size={24} color="black" />
                    <Text >طلبات منتهية {doneOrders?.length}</Text>
                </TouchableOpacity>
            </View>

            <RefreshScrollView refreshFunction={setupServiceProviderOrders} style={{ flex: 1 }}>
                <View style={{ height: (viewOrders == 1) ? null : 0 }}>
                    <NewOrders newOrders={newOrders} refreshFunction={setupServiceProviderOrders} />
                </View>
                <View style={{ height: (viewOrders == 2) ? null : 0 }}>
                    <ResumedOrders resumedOrders={resumedOrders} refreshFunction={setupServiceProviderOrders} />
                </View>
                <View style={{ height: (viewOrders == 3) ? null : 0 }}>
                    <DoneOrders doneOrders={doneOrders} refreshFunction={setupServiceProviderOrders} />
                </View>
            </RefreshScrollView>

            <LoadingIndicator visibility={isLoading} />
        </View>


    );
}

function OrdersTab(props, { navigation }) {
    // const { providerAuth } = useContext(AuthContext)
    if (props.state.provider?.activated)
        return (
            <OrdersDisplay navigation={navigation} />
        )
    else
        return (
            <AuthenticationStack />
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