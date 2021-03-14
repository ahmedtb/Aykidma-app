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
    TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect } from 'react';
import moment from 'moment';
import { createStackNavigator } from '@react-navigation/stack';


import { LocaleStatus, LocaleRequestType } from '../utilityFunctions/symbolesLocale';


const requests = [{
    "id": 60465,
    "user_id": 935,
    "type": "sleepBonus",
    "from": "2021-03-02 00:00:00",
    "to": "2021-03-02 00:00:00",
    "body": "test the api",
    "status": "pending",
    "created_at": "2021-03-04T11:28:16.000000Z",
    "updated_at": "2021-03-04T11:28:16.000000Z",
    "sub_type": null,
    "direct_supervisor": "pending"
},
{
    "id": 60464,
    "user_id": 935,
    "type": "over_time",
    "from": "2021-03-01 07:15:30",
    "to": "2021-03-01 07:15:30",
    "body": " ",
    "status": "pending",
    "created_at": "2021-03-02T09:44:10.000000Z",
    "updated_at": "2021-03-02T09:44:10.000000Z",
    "sub_type": null,
    "direct_supervisor": "pending"
},
{
    "id": 60463,
    "user_id": 935,
    "type": "over_time",
    "from": "2021-03-01 07:15:30",
    "to": "2021-03-01 07:15:30",
    "body": "testing",
    "status": "pending",
    "created_at": "2021-03-02T09:42:19.000000Z",
    "updated_at": "2021-03-02T09:42:19.000000Z",
    "sub_type": null,
    "direct_supervisor": "pending"
},
{
    "id": 60462,
    "user_id": 935,
    "type": "night_watch",
    "from": "2021-03-01 00:15:30",
    "to": "2021-03-01 00:15:30",
    "body": " ",
    "status": "pending",
    "created_at": "2021-03-01T15:21:48.000000Z",
    "updated_at": "2021-03-01T15:21:48.000000Z",
    "sub_type": null,
    "direct_supervisor": "pending"
},
{
    "id": 60461,
    "user_id": 935,
    "type": "leave_during_work",
    "from": "2021-03-01 07:15:30",
    "to": "2021-03-01 07:15:30",
    "body": "test",
    "status": "pending",
    "created_at": "2021-03-01T15:10:54.000000Z",
    "updated_at": "2021-03-01T15:10:54.000000Z",
    "sub_type": null,
    "direct_supervisor": "pending"
},
{
    "id": 60459,
    "user_id": 935,
    "type": "shift_change",
    "from": "2021-03-02 16:00:00",
    "to": "2021-03-02 00:00:00",
    "body": " ",
    "status": "pending",
    "created_at": "2021-03-01T15:02:38.000000Z",
    "updated_at": "2021-03-01T15:02:38.000000Z",
    "sub_type": null,
    "direct_supervisor": "pending"
},
{
    "id": 60458,
    "user_id": 935,
    "type": "absence",
    "from": "2021-01-02 00:00:00",
    "to": "2021-01-02 00:00:00",
    "body": "testing the api call",
    "status": "pending",
    "created_at": "2021-03-01T08:23:56.000000Z",
    "updated_at": "2021-03-01T08:23:56.000000Z",
    "sub_type": null,
    "direct_supervisor": "pending"
},]

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

function OrdersTab() {

    return (
        <View style={{ justifyContent: 'center', borderWidth: 1, flex: 1, paddingHorizontal: 20 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 50, borderBottomWidth: 1, borderColor: 'grey' }}>
                <TouchableOpacity><Text style={{ backgroundColor: '#52662b', padding: 10, borderRadius: 20 }}>طلبات جديد</Text></TouchableOpacity>
                <TouchableOpacity><Text style={{ padding: 10, borderRadius: 20 }}>تحت الضمان</Text></TouchableOpacity>
                <TouchableOpacity><Text style={{ padding: 10, borderRadius: 20 }}>طلبات منتهية</Text></TouchableOpacity>
            </View>

            <ScrollView>

                <TouchableOpacity onPress={() => navigation.navigate('OfferDetailsScreen')} style={{ borderWidth: 1, borderRadius:4, marginVertical:7 }}>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <View>
                            <Image source={require('../resources/cleanHouse.jpg')} style={{ width: 100, height: 100, borderWidth:2, borderColor:'#777c2e' }} />
                            <Text style={{textAlign:'center'}}>3/3/2021</Text>
                        </View>
                        <View style={{ margin: 10,flex:1 }}>
                            <Text style={{fontWeight:'bold', fontSize:15}} >نظافة منزلية كاملة</Text>
                            <Text style={{color:'#98a023'}}>وسط البلد</Text>
                            <Text>نظافة</Text>
                            
                        </View>
                        <Text style={{ color: 'red',alignSelf:'flex-end' }}>300 جنيه</Text>
                    </View>
                </TouchableOpacity>


            </ScrollView>
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