import React, { useState } from 'react';
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
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

import NewOrders from './NewOrders'
import ResumedOrders from './ResumedOrders'
import DoneOrders from './DoneOrders'

function OrdersList(props) {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: (props.viewOrders == 1) ? null : 0 }}>
                    <NewOrders />
                </View>
                <View style={{ height: (props.viewOrders == 2) ? null : 0 }}>
                    <ResumedOrders />
                </View>
                <View style={{ height: (props.viewOrders == 3) ? null : 0 }}>
                    <DoneOrders />
                </View>
            </View>
        )
}

export default function OrdersTab(props) {
    const [viewOrders, setViewOrders] = useState(1);


    return (
        <View style={{ justifyContent: 'center', borderWidth: 1, flex: 1, paddingHorizontal: 20, marginTop: StatusBar.currentHeight  }}>

            <View style={{alignItems:'center', borderBottomWidth: 1, marginBottom: 10, padding: 10, backgroundColor:'red'}}>
                <Text style={{fontSize: 25, fontWeight: 'bold', color:'white'}}>
                    طلبــاتـي
                </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 50, borderBottomWidth: 1, borderColor: 'grey' }}>
                <TouchableOpacity onPress={() => { setViewOrders(1) }} ><Text style={{ backgroundColor: (viewOrders == 1) ? 'grey' : '#dddddd', padding: 10, borderRadius: 20 }}>طلبات جديد</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setViewOrders(2) }} ><Text style={{ backgroundColor: (viewOrders == 2) ? 'grey' : '#dddddd', padding: 10, borderRadius: 20 }}>طلبات مستأنفة</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setViewOrders(3) }} ><Text style={{ backgroundColor: (viewOrders == 3) ? 'grey' : '#dddddd', padding: 10, borderRadius: 20 }}>طلبات منتهية</Text></TouchableOpacity>
            </View>

            <OrdersList viewOrders={viewOrders} {...props} />
        </View>

    );
}


const styles = StyleSheet.create({
    
})