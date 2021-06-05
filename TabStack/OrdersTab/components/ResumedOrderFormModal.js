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

import LocationModal from './LocationModal'

import { AuthContext } from '../../../StateManagment/AuthState'
import { doneResumedOrder } from '../../../utilityFunctions/apiCalls'

function SubmitModal(props) {

    const { InspectAPIError } = React.useContext(AuthContext)

    const vis = props.submitModalVis
    const toggle = props.toggleSubmitModal
    const id = props.id
    // let comment = ''
    const comment = React.useRef();
    const [rating, setRating] = React.useState(0)
    function ratingTab(starNumber){
        if(starNumber == rating){
            setRating(0)
        } else {
            setRating(starNumber)
        }
    }

    function submit() {
        doneResumedOrder(id, comment.current, rating)
            .then((data) => console.log(data))
            .catch(error => InspectAPIError(error))
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

                    <Text>what is your rate of the service</Text>

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

                    <Text>Please write a comment</Text>
                    <TextInput
                        multiline={true} numberOfLines={4}
                        style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                        onChangeText={(text) => (comment.current = text)}
                    // value={comment.current}
                    />

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
        </Modal>
    )
}

export default function OrderFormModal(props) {
    const { InspectAPIError } = React.useContext(AuthContext)

    const [submitModalVis, setSubmitModalVis] = React.useState(false)
    function toggleSubmitModal() {
        setSubmitModalVis(!submitModalVis)
    }

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
                            onPress={() => toggleSubmitModal()}
                        >
                            <Text style={styles.textStyle}>اعلن استكمال الطلب</Text>
                        </Pressable>
                        <SubmitModal id={id} submitModalVis={submitModalVis} toggleSubmitModal={toggleSubmitModal} />
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