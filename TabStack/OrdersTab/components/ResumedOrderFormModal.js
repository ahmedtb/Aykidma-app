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

import LocationModal from './LocationModal'

import { AuthContext } from '../../../StateManagment/AuthState'
import { logError, doneResumedOrder } from '../../../utilityFunctions/apiCalls'

export default function OrderFormModal(props) {
    const { login, user } = React.useContext(AuthContext)


    const [modalVisible, setModalVisible] = props.visible;
    const { date, service_provider_name,
        offer_title, cost,
        location_name, fields, id } = props;

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

                                    if (field.type == "location") {
                                        value = field.value.latitude + ", " + field.value.longitude;
                                        return (
                                            <View key={index}>
                                                <TouchableOpacity onPress={() => setLocationModalVisibility(true)}>
                                                    <Text style={{ color: 'blue', fontSize: 20, }}>{label}: {value}</Text>
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
                                            <View key={index}>
                                                <Image source={{ uri: 'data:image/png;base64,' + field.value }} style={{ width: 200, height: 200 }} />
                                            </View>

                                        )
                                    }

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
                            onPress={() => {
                                doneResumedOrder(user.token, id)
                                    .then((data) => console.log(data))
                                    .catch(error => logError(error))
                            }}
                        >
                            <Text style={styles.textStyle}>اكمل الطلب</Text>
                        </Pressable>
                    </View>

                </ScrollView>
            </View>
        </Modal>
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