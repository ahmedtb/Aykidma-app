import React, { useState, useEffect, useReducer } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
    Modal
} from 'react-native';

import Second from './formSteps/FormSlide'
import Services from './formSteps/Services'


const reducer = (fields, action) => {
    switch (action.type) {
        case 'change':
            return fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
        case 'change_testingOptions':
            return fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
        case 'change_testingString':
            return fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
        case 'change_testingTextArea':
            return fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
        case 'change_testingLocation':
            return fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
        case 'change_testingImage':
            return fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
    }
    return fields;

}
import offers_fields from '../jsons/offers_fields.json'
import Providers_Services from '../jsons/Providers_Services.json'

function initialFieldsOfOffer(offerId) {
    return offers_fields.find((field) => (field.offer_id == offerId)).fields.concat({
        "label": "اختر مزود للخدمة",
        "name": "testingSPs",
        "type": "SPs",
        "value": null
    })
}

function offerServices(offerId) {
    return Providers_Services.filter((service) => {
        if (service.offer_id == offerId)
            return true
        else
            return false
    })
}

export default function FormScreen({ navigation, route }) {
    const offerId = route.params.offer.id;
    const offerTitle = route.params.offer.title;
    const initial_fields = initialFieldsOfOffer(offerId);
    // console.log(initial_fields)
    const services = offerServices(offerId);

    const [index, setIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const [fields, dispatch] = useReducer(reducer, initial_fields);


    let FormPages = [
        <Second ReducerState={[fields.slice(0, 3), dispatch]} />,
        <Second ReducerState={[fields.slice(3, 5), dispatch]} />,
        <Second ReducerState={[fields.slice(5, 6), dispatch]} />,
        <Services ReducerState={[fields, dispatch]} services={services} />,
    ];

    const [page, setPage] = useState(FormPages[0]);
    const numberOfPages = FormPages.length;

    useEffect(() => {
        if (index < numberOfPages)
            setPage(FormPages[index]);
    }, [index]);

    return (
        <View style={styles.container} >
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', margin: 15 }}>
                    {
                        FormPages.map((page, pageIndex) => (
                            <View
                                key={pageIndex}
                                style={{
                                    width: 40, height: 2, marginHorizontal: 5, borderRadius: 4,
                                    backgroundColor: (index == pageIndex) ? 'yellow' : 'grey'
                                }}
                            />
                        ))
                    }
                </View>
                {/* {page} */}
                {
                    FormPages.map((page, pageIndex) => (
                        <View style={{ height: (index == pageIndex) ? null : 0 }}>
                            {FormPages[pageIndex]}
                        </View>
                    ))
                }
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 0.1, alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                    onPress={() => {
                        if (index > 0)
                            setIndex(index - 1)
                    }}>
                    <Text style={{ color: 'white' }}>السابق</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                    onPress={() => {
                        // less than pages last index
                        if (index < (numberOfPages - 1))
                            setIndex(index + 1)
                        else
                            setModalVisible(true)
                    }}
                >
                    <Text style={{ color: 'white' }}>التالي</Text>
                </TouchableOpacity>
            </View>

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

                            {/* <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <Text style={{ color: 'black', }}>الـمـنـطـقـة : .........</Text>
                                <Text style={{ color: 'black', paddingHorizontal: 10 }}>نـوع الـخـدمـة المــراد تـنـفـيــذهــا : .........</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <Text style={{ color: 'black', }}>الـمـوقع بالـGPS : .........</Text>
                            </View> */}

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

                            {/* <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <Text style={{ color: 'black', }}>صــورة تـوضـحـيـة : .........</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginVertical: 10, borderTopWidth: 1 }}>
                                <Text style={{ color: 'black', }}>نوع الوحدة السكنـيـة : .........</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <Text style={{ color: 'black' }}>الـوقت الـمـفضـل لتنفيذ الخدمة : .........</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <Text style={{ color: 'black', paddingHorizontal: 5 }}>وصــــــف الــــطــــلــب :</Text>
                                <View style={{ borderWidth: 1, flex: 1, height: 40, marginHorizontal: 3 }}>

                                </View>
                            </View> */}
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
                                <Text style={styles.textStyle}>تقديم الطلب</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>


        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

        // alignItems: 'center',
        // justifyContent: 'center',
    },
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
});
