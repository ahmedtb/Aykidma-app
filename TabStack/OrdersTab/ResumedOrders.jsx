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

import OrderFormModal from './components/OrderFormModal'


const OrderItem = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const { title, location, category, date, cost, image, service_provider_name, fields } = props;

    return (
        <View >
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ borderWidth: 1, borderRadius: 4, marginVertical: 7, elevation: 3 }}>
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
                date={date} service_provider_name={service_provider_name}
                offer_title={title} cost={cost}
                location_name={location} fields={fields}
            />
        </View>
    )
}

export default function ResumedOrders(props) {



    useEffect(() => {

    }, [props.resumedOrders])


    return (
        <ScrollView>
            {
                props.resumedOrders.map((order, index) => {
                    if (order.status == "resumed")
                        return <OrderItem
                            key={index}
                            title={order.service.offer.title}
                            location={(order.meta_data) ? order.meta_data.location.name : null}
                            category={order.service.offer.category}
                            date={order.created_at}
                            cost={(order.meta_data) ? order.meta_data.cost : null}
                            image={(order.service.offer.meta_data) ? order.service.offer.meta_data.image : null}
                            service_provider_name={order.service.service_provider.name}
                            fields={order.fields}

                        // animate={true}
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