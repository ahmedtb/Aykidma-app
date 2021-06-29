import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    Modal,
    Pressable,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';
import LocationModal from './LocationModal'

export default function OrderFormModal(props) {
    const [modalVisible, setModalVisible] = props.visible;
    const { date, service_provider_name,
        service_title, cost,
        fields, } = props;

    const [locationModalVisibility, setLocationModalVisibility] = useState(false)
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <ScrollView >
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, flex: 1 }}>تــفــاصــيـــل الطـلــب</Text>

                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: 'black', }}>التاريخ: {moment(date).format('yyyy-MM-DD hh::mm')} م</Text>
                            </View>
                        </View>

                        <View style={{ borderWidth: 1, marginBottom: 20 }}>
                            <View >

                                <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                                    <Text style={{ color: 'black', fontSize: 20, }}>مقدم الخدمـــة:</Text>
                                    <Text style={{ color: 'black', fontSize: 20, flex: 1 }}>{service_provider_name}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                                    <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center' }}>الخدمة :</Text>
                                    <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', flex: 2 }}>{service_title}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 3 }}>
                                    <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center' }}>الــــســـعـــــر :</Text>
                                    <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', flex: 2 }}>{cost}</Text>
                                </View>

                            </View>

                            <Text style={{ fontSize: 21, fontWeight: 'bold', backgroundColor: '#b2a9a7', borderBottomWidth: 1, textAlign: 'center', marginBottom: 10, height: 35 }}>حقول الطـلــــب</Text>
                            <View style={{ marginVertical: 2 }}>
                                {
                                    fields.map((field, index) => {
                                        let value = field.value;
                                        let label = field.label;

                                        if (field.type == "location") {
                                            value = field.value.latitude + ", " + field.value.longitude;
                                            return (
                                                <View key={index} style={{ ...styles.fieldRow, backgroundColor: (index % 2) ? 'white' : '#d8d0cd' }}>
                                                    <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', fontWeight: 'bold' }}>{label}:</Text>
                                                    <TouchableOpacity style={{ flex: 1, }} onPress={() => setLocationModalVisibility(true)}>
                                                        <Text style={{ color: 'blue', fontSize: 20, textAlign: 'center' }}>{value}</Text>
                                                    </TouchableOpacity>
                                                    <LocationModal
                                                        visible={[locationModalVisibility, setLocationModalVisibility]}
                                                        latitude={field.value.latitude} longitude={field.value.longitude}
                                                    />
                                                </View>
                                            )
                                        }

                                        if (field.type == 'image') {
                                            return (
                                                <View key={index} style={{ backgroundColor: (index % 2) ? 'white' : '#d8d0cd', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 21, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, height: 35 }}>{field.label}</Text>
                                                    <Image source={{ uri: 'data:image/png;base64,' + field.value }} style={{ width: 200, height: 200, borderRadius: 7 }} />
                                                </View>
                                            )
                                        }

                                        return (
                                            <View key={index} style={{ ...styles.fieldRow, backgroundColor: (index % 2) ? 'white' : '#d8d0cd' }}>
                                                <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', fontWeight: 'bold' }}>{label}:</Text>
                                                <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center' }}>{value}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>


                        </View>
                    </ScrollView>
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
                </View>

            </View>
        </Modal>
    )

}


const styles = StyleSheet.create({
    // modal styles
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.9)',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
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
    fieldRow: {
        padding: 10, flexDirection: 'row',
    }
})