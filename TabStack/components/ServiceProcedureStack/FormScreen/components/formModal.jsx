import React, { useContext, useState } from 'react'
import {
    Modal,
    View,
    StyleSheet,
    Text,
    Pressable,
    Image,
    ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import LoadingIndicator from '../../../loadingIndicator'

function DialogBox(props) {
    const [dialogBox, setDialogBox] = props.visibility
    const navigation = useNavigation();

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={dialogBox}
            onRequestClose={() => {
                setDialogBox(!dialogBox);
                navigation.navigate('طلباتي', { newOrderId: 1 })
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{}}>
                        <Text style={{ fontSize: 20 }}>
                            تم تقديم طلبك بنجاح
                        </Text>
                        <Text>سيتم عرض طلبك على مزود الخدمة حتى يقبل به....لدى يرجى الانتظار حتى استجابة مزود الخدمة</Text>

                        <Pressable
                            onPress={() => {
                                setDialogBox(false)
                                navigation.navigate('طلباتي', { newOrderId: 1 })
                            }}
                            style={{ backgroundColor: 'red', elevation: 3, padding: 7, borderRadius: 6 }}
                        >
                            <Text style={{ textAlign: 'center', color: 'white' }}>موافق</Text>
                        </Pressable>

                    </View>

                </View>
            </View>

        </Modal>
    )
}

import { AuthContext } from '../../../../../StateManagment/AuthState'
import {submitOrder} from '../../../../../utilityFunctions/apiCalls'

export default function FormModal(props) {
    const {InspectAPIError } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)
    const [dialogBox, setDialogBox] = useState(false)

    const serviceTitle = props.state.serviceTitle
    const fields = props.state.fields
    const service_id = props.state.service_id

    // console.log('image',fields[4].value.length)
    // console.log('service_id',service_id)

    const [modalVisible, setModalVisible] = props.visibility

    function submit() {

        setLoading(true)
        submitOrder(fields,service_id).then(response => {
            console.log(response)
        }).catch(error => {
            InspectAPIError(error)
        }).finally(() => {
            setLoading(false)
            setModalVisible(false)
            setDialogBox(true)
        })
    }

    return (
        <View>
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
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, flex: 1 }}>نموذج طلب خدمة</Text>

                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: 'black', }}>التاريخ: 3/3/2021 م</Text>
                            </View>
                        </View>

                        <View style={{ borderWidth: 1, marginBottom: 20 }}>
                            <View style={{}}>
                                <Text style={{ color: 'black', }}>مقدم الخدمـــة: {'شركة التضامن'}</Text>
                                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                    <Text style={{ color: 'black', }}>الــخـــدمــــــــة : {serviceTitle}</Text>
                                    <Text style={{ color: 'black', paddingHorizontal: 10 }}>الــــســـعـــــر : .........</Text>
                                </View>
                            </View>

                            <Text style={{ fontSize: 15, fontWeight: 'bold', backgroundColor: '#b2a9a7', borderBottomWidth: 1, textAlign: 'center', marginBottom: 10 }}>تــفــاصــيـــل الطـلــــب</Text>

                            {
                                fields.map((field, index) => {
                                    if (field.type == 'location')
                                        return null

                                    if (field.type == 'image') {
                                        return (
                                            <View key={index}>
                                                <Image source={{ uri: 'data:image/png;base64,' + field.value }} style={{ width: 200, height: 200 }} />
                                            </View>
                                        )
                                    }

                                    return (
                                        <View key={index} style={{ flexDirection: 'row', marginVertical: 10 }}>
                                            <Text style={{ color: 'black', }}>{field.label}: {field.value}</Text>
                                        </View>
                                    )
                                })
                            }

                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <Text style={{ color: 'black', }}>{'مزود الخدمة'}: {service_id}</Text>
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
                                    submit()
                                }}
                            >
                                <Text style={styles.textStyle}>تقديم الطلب</Text>
                            </Pressable>
                        </View>

                    </ScrollView>
                </View>
            </Modal>

            <LoadingIndicator visibility={loading} label='جاري تقديم طلبك' />
            <DialogBox visibility={[dialogBox, setDialogBox]} />
        </View>

    )
}

const styles = StyleSheet.create({

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
        borderRadius: 5,
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
});
