import React, {useState} from 'react';
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
    Button
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect } from 'react';
import moment from 'moment';

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

export default function OrdersScreen() {
    const [pendingRequests, setPending] = useState(null);
    const [viewDetails, setViewDetails] = useState(null);
    const toggleFunction = (index) => {
        setViewDetails(index != viewDetails ? index : null);
    };
    useEffect(()=>{
        setPending(requests);
    },[]);

    return (
        <ScrollView style={styles.container}>

            {/* <View >

                <View style={{ borderWidth: 1 }}>
                    <Text style={{ fontSize: 20, padding: 10, margin: 10 }}>قائمة طلباتك</Text>
                </View>

                <View style={{ borderWidth: 1 }}>
                    <Text style={{ fontSize: 20, padding: 10, margin: 10 }}>قائمة طلباتك</Text>
                </View>

            </View> */}


            <View style={styles.card}>
                <Text style={styles.header}>طلبات معلقة</Text>

                <View style={{
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderColor: '#c9bfbf',

                }}>
                    <Text style={{ flex: 3, fontSize: 18, fontWeight: "bold", color: '#6b5555', textAlign: "center", paddingVertical: 10 }}>تاريخ الطلب</Text>
                    <Text style={{ flex: 4, fontSize: 18, fontWeight: "bold", color: '#6b5555', textAlign: 'right', paddingVertical: 10, marginRight: 20 }}>نوع الطلب</Text>
                    <Text style={{ flex: 3, fontSize: 18, fontWeight: "bold", color: '#6b5555', textAlign: "center", paddingVertical: 10 }}>الحالة</Text>
                    <Text style={{ flex: 3 }}></Text>
                    <Text style={{ flex: 3 }}></Text>
                </View>
                <FlatList
                    data={pendingRequests}
                    renderItem={({ item, index }) => (
                        <View>
                            <View style={{
                                flexDirection: 'row-reverse',
                                alignItems: 'center',
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                marginVertical: 2,
                                borderColor: '#c9bfbf',
                                backgroundColor: '#eae8e8',
                                paddingVertical: 5
                            }}>
                                <View style={{ flexDirection: 'column', flex: 3 }}>
                                    <Text style={{ textAlign: "center",fontSize: 14, color: '#6b5555', }}>{moment(item.created_at).format("YYYY")}</Text>
                                    <Text style={{ textAlign: "center",fontSize: 14, color: '#6b5555', }}>{moment(item.created_at).format("DD")}</Text>
                                    <Text style={{ textAlign: "center",fontSize: 14, color: '#6b5555', }}>{moment(item.created_at).format("MMMM")}</Text>
                                </View>

                                <Text style={{ flex: 3, fontSize: 14, color: '#6b5555', }}>{LocaleRequestType(item.type)}</Text>
                                <Text style={{ flex: 2, fontSize: 14,textAlign:'center', color: '#6b5555', }}>{LocaleStatus(item.status)}</Text>
                                <View style={{ flex: 2,margin:5 }} ><Button title="تفاصيل" onPress={() => toggleFunction(index)} /></View>
                                <View style={{ flex: 2,margin:5 }} ><Button style={{  }} title="حدف" color="red" onPress={() => deleteAction(item.id, index)} /></View>
                            </View>
                            {viewDetails === index ? (
                                <View style={styles.card}>
                                    {
                                        <>
                                            <Text style={styles.cardItem}>{item['body']}</Text>
                                            <Text style={styles.cardItem}>من {item['from']}</Text>
                                            <Text style={styles.cardItem}>إلى {item['to']}</Text>
                                        </>
                                    }
                                </View>
                            ) : null}
                        </View>
                    )
                    }
                    keyExtractor={item => item.id + ""}
                />

            </View>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
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