import React, { useContext, useState } from 'react'
import {
    Modal,
    View,
    StyleSheet,
    Text,
    Pressable,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import LoadingIndicator from '../../../loadingIndicator'
import { AuthContext } from '../../../../../StateManagment/AuthState'
import { submitOrder } from '../../../../../utilityFunctions/apiCalls'
import ModalWrapper from '../../../ModalWrapper'
import { FontAwesome5, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

function DialogBox(props) {
    const [dialogBox, setDialogBox] = props.visibility
    const navigation = useNavigation();

    return (
        <ModalWrapper visible={dialogBox}>

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

        </ModalWrapper>
    )
}


export default function FormModal(props) {
    const { InspectAPIError } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)
    const [dialogBox, setDialogBox] = useState(false)

    const serviceTitle = props.state.serviceTitle
    const fields = props.state.fields
    const service_id = props.state.service_id

    const [modalVisible, setModalVisible] = props.visibility

    function submit() {

        setLoading(true)
        submitOrder(fields, service_id).then(response => {
            console.log(response)
        }).catch(error => {
            InspectAPIError(error)
        }).finally(() => {
            setLoading(false)
            setModalVisible(false)
            setDialogBox(true)
        })
    }

    const service = props.service
    React.useEffect(() => {
        // console.log(service.service_provider)
    }, [])

    return (
        <View>

            <ModalWrapper visible={modalVisible}>
                <View style={{padding:10}}>
                    <View style={{ marginBottom: 10, borderWidth: 0.4, borderRadius: 7, }}>
                        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 25, flex: 1 }}>تفاصــيـل الطـلــب</Text>

                        <Text style={{ color: 'black', alignSelf: 'flex-end' }}>تاريخ الطلب: {moment().format('yyyy-MM-DD hh:mm')} م</Text>
                    </View>



                    <View style={{  borderWidth:0.5, borderRadius:8, marginBottom:5  }}>
                        <View style={{ borderWidth: 1, borderColor: '#f5f0f0', borderRadius: 7, flex: 1, margin: 7, padding: 4 }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                <FontAwesome5 name="person-booth" size={24} color="red" />
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 2 }}>مقدم الخدمـــة</Text>
                            </View>
                            <Text style={{ color: 'black', fontSize: 20 }}>{service.service_provider.name}</Text>
                        </View>

                        <View style={{ borderWidth: 1, borderColor: '#f5f0f0', borderRadius: 7, flex: 1, margin: 7 }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                <FontAwesome5 name="tools" size={24} color="red" />
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 2 }}>الخدمة</Text>
                            </View>

                            <Text style={{ color: 'black', fontSize: 20, flex: 2 }}>{service.title}</Text>
                        </View>


                        <View style={{ borderWidth: 1, borderColor: '#f5f0f0', borderRadius: 7, margin: 7 }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                <Entypo name="price-tag" size={24} color="red" />
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 2 }}>الــــســـعـــــر</Text>
                            </View>
                            <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', flex: 2 }}>{service.price}</Text>
                        </View>
                    </View>


                    <Text style={{ fontSize: 21, fontWeight: 'bold', color: 'red', borderWidth: 0.4, borderRadius: 7, textAlign: 'center', height: 35 }}>حقول الطلب</Text>

                    <View style={{ marginTop: 5, borderWidth:0.5, borderRadius:8 }}>
                        {
                            fields.map((field, index) => {
                                let value = field.value;
                                let label = field.label;
                                let type = field.type

                                if (field.type == "location") {
                                    value = field.value.latitude + ", " + field.value.longitude;
                                    return (
                                        <View key={index} style={{ ...styles.fieldRow }}>
                                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, }}>
                                                <Entypo name="image" size={24} color="grey" />
                                                <View style={{ marginLeft: 5,flex:1, }}>
                                                    <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', }}>{label}</Text>
                                                    <Text style={{ color: 'grey', fontSize: 10 }}>حقل تحديد موقع</Text>
                                                </View>
                                            </View>
                                            <Text style={{ backgroundColor: '#f5f0f0', color: 'blue', fontSize: 20, textAlign: 'center' }}>{value}</Text>

                                        </View>
                                    )
                                }

                                if (field.type == 'image') {
                                    return (
                                        <View key={index} style={{ ...styles.fieldRow, }}>
                                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, }}>
                                                <Entypo name="image" size={24} color="grey" />
                                                <View style={{ marginLeft: 5,flex:1,}}>
                                                    <Text style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{label}</Text>
                                                    <Text style={{ color: 'grey', fontSize: 10, }}>حقل اختيار صورة</Text>
                                                </View>
                                            </View>
                                            <View style={{ backgroundColor: '#f5f0f0', alignItems: 'center' }}>
                                                <Image source={{ uri: 'data:image/png;base64,' + field.value }} style={{ width: 150, height: 150, borderRadius: 7 }} />
                                            </View>

                                        </View>
                                    )
                                }

                                if (field.type == 'string') {
                                    return (
                                        <View key={index} style={{ ...styles.fieldRow }}>
                                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, }}>
                                                <Entypo name="list" size={24} color="grey" />
                                                <View style={{ marginLeft: 5,flex:1,}}>
                                                    <Text style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{label}</Text>
                                                    <Text style={{ color: 'grey', fontSize: 10, }}>حقل نصي</Text>
                                                </View>
                                            </View>
                                            <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', padding: 10, backgroundColor: '#f5f0f0' }}>{value}</Text>
                                        </View>
                                    )
                                }

                                if (field.type == 'textarea') {
                                    return (
                                        <View key={index} style={{ ...styles.fieldRow }}>
                                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, }}>
                                                <Entypo name="list" size={24} color="grey" />
                                                <View style={{ marginLeft: 5,flex:1,}}>
                                                    <Text style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{label}</Text>
                                                    <Text style={{ color: 'grey', fontSize: 10, }}>حقل منطفة نصية</Text>
                                                </View>
                                            </View>
                                            <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', padding: 15, backgroundColor: '#f5f0f0' }}>{value}</Text>
                                        </View>
                                    )
                                }

                                if (field.type == 'options') {
                                    return (
                                        <View key={index} style={{ ...styles.fieldRow }}>
                                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, }}>
                                                <Entypo name="list" size={24} color="grey" />
                                                <View style={{ marginLeft: 5,flex:1,}}>
                                                    <Text style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{label}</Text>
                                                    <Text style={{ color: 'grey', fontSize: 10, }}>حقل اختيارات</Text>
                                                </View>
                                            </View>
                                            <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', padding: 5, backgroundColor: '#f5f0f0' }}>{value}</Text>
                                        </View>
                                    )
                                }

                                return (
                                    <View key={index} style={{ ...styles.fieldRow }}>
                                        <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, }}>
                                            <Entypo name="list" size={24} color="grey" />
                                            <View style={{ marginLeft: 5,flex:1,}}>
                                                <Text style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{label}</Text>
                                                <Text style={{ color: 'grey', fontSize: 10, }}>حقل</Text>
                                            </View>
                                        </View>
                                        <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', padding: 5, backgroundColor: '#f5f0f0' }}>{value}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>



                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop:5 }}>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>اغلاق</Text>
                        </Pressable>

                        <Pressable
                            style={{ ...styles.button, backgroundColor: 'red' }}
                            onPress={() => {
                                submit()
                            }}
                        >
                            <Text style={styles.textStyle}>تقديم الطلب</Text>
                        </Pressable>
                    </View>
                </View>
            </ModalWrapper>


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
        borderRadius: 15,
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
        marginHorizontal: 8,
        borderWidth: 0.5,
        borderColor: '#d1c5c5',
        borderRadius: 10,
        marginVertical: 5,
    }
});
