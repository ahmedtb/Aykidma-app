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
    Pressable
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function OrdersTabStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen name="enrollment" component={OrdersTab}
                options={{ title: 'طلباتي' }}
            />

        </Stack.Navigator>
    );
}

import NewOrders from './NewOrders'
import ResumedOrders from './ResumedOrders'
import ExpiredOrders from './ExpiredOrders'

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
                    <ExpiredOrders />
                </View>
            </View>
        )
}

function OrdersTab(props) {
    const [viewOrders, setViewOrders] = useState(1);


    return (
        <View style={{ justifyContent: 'center', borderWidth: 1, flex: 1, paddingHorizontal: 20 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 50, borderBottomWidth: 1, borderColor: 'grey' }}>
                <TouchableOpacity onPress={() => { setViewOrders(1) }} ><Text style={{ backgroundColor: (viewOrders == 1) ? '#52662b' : '#fff', padding: 10, borderRadius: 20 }}>طلبات جديد</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setViewOrders(2) }} ><Text style={{ backgroundColor: (viewOrders == 2) ? '#52662b' : '#fff', padding: 10, borderRadius: 20 }}>طلبات قيد التنفيذ</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setViewOrders(3) }} ><Text style={{ backgroundColor: (viewOrders == 3) ? '#52662b' : '#fff', padding: 10, borderRadius: 20 }}>طلبات منتهية</Text></TouchableOpacity>
            </View>

            <OrdersList viewOrders={viewOrders} {...props} />
        </View>

    );
}


const styles = StyleSheet.create({
    enrollField: {
        borderWidth: 1, borderColor: 'grey', borderRadius: 5, padding: 10, fontSize: 20
    },

    fieldLable: {
        fontSize: 20,
    },

    container: {
        backgroundColor: '#fff',
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
    },


    // modal styles
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.9)',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#b2a9a7",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})