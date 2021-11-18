import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    Modal,
    Pressable,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { FontAwesome5, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

import LocationModal from '../../../components/LocationModal'

import { doneResumedOrder } from '../../../utilityFunctions/apiCalls'
import { logError } from '../../../redux/AuthFunctions'
import ArrayOfFieldsFormView from '../../../FieldsTypes/ArrayOfFieldsFormView'

function SubmitModal(props) {


    const vis = props.submitModalVis
    const toggle = props.toggleSubmitModal
    const id = props.id
    // let comment = ''
    const comment = React.useRef();
    const [rating, setRating] = React.useState(0)
    function ratingTab(starNumber) {
        if (starNumber == rating) {
            setRating(0)
        } else {
            setRating(starNumber)
        }
    }

    function submit() {
        doneResumedOrder(id, comment.current, rating)
            .then((data) => {
                console.log(data)
                props.refreshFunction()
            })
            .catch(error => logError(error, 'SubmitModal'))
    }


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={vis}
            onRequestClose={() => { toggle() }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <Text>ما هو تقييمك للخدمة؟</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                        <TouchableOpacity onPress={() => ratingTab(1)}>
                            {
                                (rating >= 1) ?
                                    (<AntDesign name="star" size={24} color="black" />)
                                    :
                                    (<AntDesign name="staro" size={24} color="black" />)
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => ratingTab(2)}>
                            {
                                (rating >= 2) ?
                                    (<AntDesign name="star" size={24} color="black" />)
                                    :
                                    (<AntDesign name="staro" size={24} color="black" />)
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => ratingTab(3)}>
                            {
                                (rating >= 3) ?
                                    (<AntDesign name="star" size={24} color="black" />)
                                    :
                                    (<AntDesign name="staro" size={24} color="black" />)
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => ratingTab(4)}>
                            {
                                (rating >= 4) ?
                                    (<AntDesign name="star" size={24} color="black" />)
                                    :
                                    (<AntDesign name="staro" size={24} color="black" />)
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => ratingTab(5)}>
                            {
                                (rating == 5) ?
                                    (<AntDesign name="star" size={24} color="black" />)
                                    :
                                    (<AntDesign name="staro" size={24} color="black" />)
                            }
                        </TouchableOpacity>
                    </View>

                    <Text>تعليق على الخدمة</Text>
                    <TextInput
                        multiline={true} numberOfLines={4}
                        style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                        onChangeText={(text) => (comment.current = text)}
                    // value={comment.current}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => toggle()}
                        >
                            <Text style={styles.textStyle}>اغلاق</Text>
                        </Pressable>

                        <Pressable
                            style={{ ...styles.button, backgroundColor: '#f4c18b' }}
                            onPress={() => submit()}
                        >
                            <Text style={styles.textStyle}>اكمل الطلب</Text>
                        </Pressable>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

export default function OrderFormModal(props) {

    const [submitModalVis, setSubmitModalVis] = React.useState(false)
    function toggleSubmitModal() {
        setSubmitModalVis(!submitModalVis)
    }

    const [modalVisible, setModalVisible] = props.visible;
    const { order, refreshFunction, } = props;

    const date = order.created_at
    const service_provider_name = order.service.service_provider.name
    const service_title = order.service.title
    const cost = order.meta_data?.cost
    const comment = order.comment
    const rating = order.rating
    const array_of_fields = order.array_of_fields
    const id = order.id


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
                    <View style={{ marginBottom: 10, borderBottomWidth: 0.5 }}>
                        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 25, flex: 1 }}>تفاصــيـل الطـلــب</Text>

                        <Text style={{ color: 'black', alignSelf: 'flex-end' }}>تاريخ الطلب: {moment(date).format('yyyy-MM-DD hh:mm')} م</Text>
                    </View>

                    <View style={{ marginBottom: 20 }}>

                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ borderWidth: 1, borderColor: '#d1c5c5', borderRadius: 7, flex: 1, margin: 7, padding: 4 }}>
                                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                        <FontAwesome5 name="person-booth" size={24} color="red" />
                                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 2 }}>مقدم الخدمـــة</Text>
                                    </View>
                                    <Text style={{ color: 'black', fontSize: 20 }}>{service_provider_name}</Text>
                                </View>

                                <View style={{ borderWidth: 1, borderColor: '#d1c5c5', borderRadius: 7, flex: 1, margin: 7 }}>
                                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                        <FontAwesome5 name="tools" size={24} color="red" />
                                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 2 }}>الخدمة</Text>
                                    </View>

                                    <Text style={{ color: 'black', fontSize: 20, flex: 2 }}>{service_title}</Text>
                                </View>

                            </View>
                            <View style={{ flex: 1 }}>

                                <View style={{ borderWidth: 1, borderColor: '#d1c5c5', borderRadius: 7, flex: 1, margin: 7 }}>
                                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                        <FontAwesome name="comments-o" size={24} color="red" />
                                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 2, flex: 1 }}>تعليقك على الخدمة</Text>
                                    </View>
                                    <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', flex: 2 }}>{comment}</Text>
                                </View>

                                <View style={{ borderWidth: 1, borderColor: '#d1c5c5', borderRadius: 7, flex: 1, margin: 7 }}>

                                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                        <MaterialIcons name="star-rate" size={24} color="red" />
                                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 2 }}>تقييمك للخدمة</Text>
                                    </View>
                                    <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', flex: 2 }}>{rating}</Text>
                                </View>

                                <View style={{ borderWidth: 1, borderColor: '#d1c5c5', borderRadius: 7, flex: 1, margin: 7 }}>
                                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                        <Entypo name="price-tag" size={24} color="red" />
                                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 2 }}>الــــســـعـــــر</Text>
                                    </View>
                                    <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', flex: 2 }}>{cost}</Text>
                                </View>
                            </View>
                        </View>


                        <Text style={{ fontSize: 21, fontWeight: 'bold', backgroundColor: '#b2a9a7', borderBottomWidth: 1, textAlign: 'center', height: 35 }}>تفاصيل حقول المعبئة للطلب</Text>
                        <View style={{ borderWidth: 0.7, borderRadius: 7 }}>
                            <ArrayOfFieldsFormView array_of_fields={array_of_fields} />

                            {/*
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
                                                    <View style={{ marginLeft: 5 }}>
                                                        <Text style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{label}</Text>
                                                        <Text style={{ color: 'grey', fontSize: 10, }}>حقل اختيار صورة</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity style={{ flex: 1, backgroundColor: '#d1c5c5' }} onPress={() => setLocationModalVisibility(true)}>
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
                                            <View key={index} style={{ ...styles.fieldRow, }}>
                                                <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, }}>
                                                    <Entypo name="image" size={24} color="grey" />
                                                    <View style={{ marginLeft: 5 }}>
                                                        <Text style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{label}</Text>
                                                        <Text style={{ color: 'grey', fontSize: 10, }}>حقل اختيار صورة</Text>
                                                    </View>
                                                </View>
                                                <View style={{ backgroundColor: '#d1c5c5', alignItems: 'center' }}>
                                                    <Image source={{ uri: 'data:image/png;base64,' + field.value }} style={{ width: 150, height: 150, borderRadius: 7 }} />
                                                </View>

                                            </View>
                                        )
                                    }

                                    return (
                                        <View key={index} style={{ ...styles.fieldRow }}>
                                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, }}>
                                                <Entypo name="list" size={24} color="grey" />
                                                <View style={{ marginLeft: 5 }}>
                                                    <Text style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{label}</Text>
                                                    <Text style={{ color: 'grey', fontSize: 10, }}>حقل اختيارات</Text>
                                                </View>
                                            </View>
                                            <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', padding: 5, backgroundColor: '#d1c5c5' }}>{value}</Text>
                                        </View>
                                    )
                                })
                            */ }
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
                            onPress={() => toggleSubmitModal()}
                        >
                            <Text style={styles.textStyle}>اعلن استكمال الطلب</Text>
                        </Pressable>
                        <SubmitModal
                            id={id}
                            submitModalVis={submitModalVis}
                            toggleSubmitModal={toggleSubmitModal}
                            refreshFunction={refreshFunction}
                        />
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