import React, { useEffect, useState } from 'react'
import {
    Modal,
    View,
    StyleSheet,
    Text,
    Pressable
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import LoadingIndicator from '../../../components/loadingIndicator'
import axios from 'axios';

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
                            style={{backgroundColor:'red', elevation:3, padding:7, borderRadius:6}}
                        >
                            <Text style={{textAlign:'center', color:'white'}}>موافق</Text>
                        </Pressable>

                    </View>

                </View>
            </View>

        </Modal>
    )
}

export default function FormModal(props) {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false)
    const [dialogBox, setDialogBox] = useState(false)

    const offerTitle = props.offerTitle
    const fields = props.fields;

    const [modalVisible, setModalVisible] = props.visibility
    function submitOrder() {
        setLoading(true)
        axios.post('/api/orders', { fields: fields, service_id: 1, user_id:1 }).then(response => {
            console.log(response.data)
        }).catch(error => {

        }).finally(() => {
            setLoading(false)
            setModalVisible(false)
            // navigation.navigate('طلباتي', {newOrderId: 1})
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
                    <View style={styles.modalView}>
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
                                    <Text style={{ color: 'black', }}>الــخـــدمــــــــة : {offerTitle}</Text>
                                    <Text style={{ color: 'black', paddingHorizontal: 10 }}>الــــســـعـــــر : .........</Text>
                                </View>
                            </View>

                            <Text style={{ fontSize: 15, fontWeight: 'bold', backgroundColor: '#b2a9a7', borderBottomWidth: 1, textAlign: 'center', marginBottom: 10 }}>تــفــاصــيـــل الطـلــــب</Text>

                            {
                                fields.map((field, index) => {
                                    if (field.type != 'location')
                                        return (
                                            <View key={index} style={{ flexDirection: 'row', marginVertical: 10 }}>
                                                <Text style={{ color: 'black', }}>{field.label}: {field.value}</Text>
                                            </View>
                                        )
                                })
                            }

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
                                    submitOrder()
                                }}
                            >
                                <Text style={styles.textStyle}>تقديم الطلب</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>

            <LoadingIndicator visibility={loading} label='جاري تقديم طلبك' />
            <DialogBox visibility={[dialogBox, setDialogBox] } />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
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
