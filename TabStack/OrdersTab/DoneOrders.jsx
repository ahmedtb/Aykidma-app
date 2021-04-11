import React, { useState, useEffect } from 'react';
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
import { createStackNavigator } from '@react-navigation/stack';

import orders from './jsons/orders.json'

function OrderFormModal(props) {
    const [modalVisible, setModalVisible] = props.visible;

    const { date, service_provider_name,
        offer_title, cost,
        location_name, fields, } = props;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <ScrollView style={styles.modalView}>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, flex: 1 }}>تــفــاصــيـــل الطـلــــب</Text>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'black', }}>التاريخ: {date} م</Text>
                        </View>
                    </View>

                    <View style={{ borderWidth: 1, marginBottom: 20 }}>
                        <View style={{}}>
                            <Text style={{ color: 'black', fontSize: 20, }}>مقدم الخدمـــة: {service_provider_name}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
                                <Text style={{ color: 'black', fontSize: 20, }}>الــخـــدمــــــــة : {offer_title}</Text>
                                <Text style={{ color: 'black', fontSize: 20, }}>الــــســـعـــــر : {cost}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: 'black', fontSize: 20, }}>الـمـنـطـقـة : </Text>
                                <Text style={{ color: 'black', fontSize: 20, }}>{location_name}</Text>
                            </View>


                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: 'black', fontSize: 20, }}>نوع الخدمة المراد تنفيذها: </Text>
                                <Text style={{ color: 'black', fontSize: 20, }}>{offer_title}</Text>
                            </View>

                        </View>

                        <Text style={{ fontSize: 21, fontWeight: 'bold', backgroundColor: '#b2a9a7', borderBottomWidth: 1, textAlign: 'center', marginBottom: 10, height: 35 }}>نموذج الطـلــــب</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>


                            {
                                fields.map((field, index) => {
                                    let value = field.value;
                                    let label = field.label;
                                    if (field.type == "location")
                                        value = field.value.latitude + ", " + field.value.longitude;

                                    return (
                                        <View key={index}>

                                            <Text style={{ color: 'black', fontSize: 20, }}>{label}: {value}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10, borderTopWidth: 1 }}>
                            {/* <Text style={{ color: 'black', fontSize: 20, }}>الـمـوقع: 32.8753, 13.3619 GPS</Text>
                            <Text style={{ color: 'black', fontSize: 20, }}>صــورة تـوضـحـيـة : .........</Text> */}
                        </View>


                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>اغلاق</Text>
                        </Pressable>

                        <Pressable
                            style={{ ...styles.button, backgroundColor: '#f4c18b' }}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>الغاء الطلب</Text>
                        </Pressable>
                    </View>

                </ScrollView>
            </View>
        </Modal>
    )

}

const OrderItem = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const { title, location, category, date, cost, image, order } = props;
    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ borderWidth: 1, borderRadius: 4, marginVertical: 7 }}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <View>
                        <Image source={{ uri: image }} style={{ width: 100, height: 100, borderWidth: 2, borderColor: '#777c2e' }} />
                        <Text style={{ textAlign: 'center' }}>{date}</Text>
                    </View>
                    <View style={{ margin: 10, flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }} >{title}</Text>
                        <Text style={{ color: '#98a023' }}>{location}</Text>
                        <Text>{category}</Text>

                    </View>
                    <Text style={{ color: 'red', alignSelf: 'flex-end' }}>{cost}</Text>
                </View>
            </TouchableOpacity>
            <OrderFormModal visible={[modalVisible, setModalVisible]}
                date={order.created_at} service_provider_name={order.service.service_provider.name}
                offer_title={order.service.offer.title} cost={order.meta_data.cost}
                location_name={order.meta_data.location.name} fields={order.fields}
            // order={order}
            />
        </>
    )
}

export default function DoneOrders(props) {

    useEffect(() => {

    }, [props.doneOrders])
    return (
        <ScrollView>
            {
                props.doneOrders.map((order, index) => {
                    if (order.status == "done")
                        return <OrderItem
                            key={index}
                            title={order.service.offer.title}
                            location={order.meta_data.location.name}
                            category={order.service.offer.category}
                            date={order.date}
                            cost={order.cost}
                            image={order.service.offer.meta_data.image}

                            order={order}
                        />
                    else
                        return null
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({



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