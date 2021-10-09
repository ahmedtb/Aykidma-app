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
import moment from 'moment';
import ResumedOrderFormModal from './components/ResumedOrderFormModal'


export default function ResumedOrders(props) {

    const title = order.service.title
    const location = 'this field should be canceled'
    const category = order.service.category
    const date = order.created_at
    const cost = order.meta_data?.cost
    const image = order.service.image
    const service_provider_name = order.service.service_provider.name
    const fields = order.fields
    const comment = order.comment
    const rating = order.rating
    const id = order.id
    return (
        <ScrollView>
            {
                props.resumedOrders.map((order, index) => {
                    if (order.status == "resumed")
                        return <View key={index}>
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ borderWidth: 1, borderRadius: 4, marginVertical: 7 }}>

                                <View style={{ flexDirection: 'row', margin: 10 }}>
                                    <View>
                                        <Image source={{ uri: 'data:image/png;base64,' + image }} style={{ width: 100, height: 100, borderRadius: 7, }} />
                                        <Text style={{ textAlign: 'center' }}>{moment(date).format('yyyy-MM-DD')}</Text>
                                    </View>
                                    <View style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15 }} >{title}</Text>
                                        <Text>تصنيف الخدمة: {category.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <ResumedOrderFormModal visible={[modalVisible, setModalVisible]}
                                order={order}
                                date={date}
                                service_provider_name={service_provider_name}
                                service_title={title}
                                cost={cost}
                                comment={comment}
                                rating={rating}
                                location_name={location}
                                fields={fields}
                                id={id}
                                refreshFunction={props.refreshFunction}
                            />
                        </View>
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