import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    Pressable,
    TouchableOpacity,
    Modal
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import RegionList from './regionList';

const First = () => {
    const [region, setRegion] = useState(null);
    return (
        <View style={{ padding: 25 }}>
            <Text>اختر المنطقة</Text>
            <RegionList setRegion={setRegion} />

            <Text>اختر نوع الخدمة المطلوبة تنفيذها</Text>
            <TextInput style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />
            <Text>اختر نوع الوحدة السكنية</Text>
            <TextInput style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />
        </View>
    );
}

const Second = () => {

    return (
        <View style={{ padding: 25 }}>
            <Text>أوصف مشكلتك وحاجتك بوضوح</Text>
            <Text>أضف وصف واضح لمشكلتك، ليتمكن مزود الخدمة من فهمها وتقديم العرض الافضل لك</Text>
            <TextInput multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />
            <Text>اختار الوقت المفضل للتنفيذ</Text>
            <TextInput style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />

        </View>
    );
}

import ImagePickerExample from '../ImagePickerExample';
const Third = () => {

    return (
        <View style={{ padding: 25 }}>
            <Text>أضف صور للمشكلة (اختياري)</Text>
            <ImagePickerExample style={{ marginVertical: 20 }} />
            {/* <Text>third</Text>
            <Text>third</Text> */}

        </View>
    );
}

import Fourth from './formSteps/fourth';
import Fifth from './formSteps/Fifth';


export default function FormScreen({ navigation }) {
    const [index, setIndex] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [page, setPage] = useState(<First />);


    useEffect(() => {
        if (index == 1) {
            setPage(<First />);
        } else if (index == 2) {
            setPage(<Second />);
        } else if (index == 3) {
            setPage(<Third />);
        } else if (index == 4) {
            setPage(<Fourth />);
        } else if (index == 5) {
            setPage(<Fifth navigation={navigation} />);
        }
    }, [index]);

    return (
        <View style={styles.container} >
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', margin: 15 }}>
                    <View style={{ width: 40, height: 2, marginHorizontal: 5, borderRadius: 4, backgroundColor: (index == 1) ? 'yellow' : 'grey' }} />
                    <View style={{ width: 40, height: 2, marginHorizontal: 5, borderRadius: 4, backgroundColor: (index == 2) ? 'yellow' : 'grey' }} />
                    <View style={{ width: 40, height: 2, marginHorizontal: 5, borderRadius: 4, backgroundColor: (index == 3) ? 'yellow' : 'grey' }} />
                    <View style={{ width: 40, height: 2, marginHorizontal: 5, borderRadius: 4, backgroundColor: (index == 4) ? 'yellow' : 'grey' }} />
                    <View style={{ width: 40, height: 2, marginHorizontal: 5, borderRadius: 4, backgroundColor: (index == 5) ? 'yellow' : 'grey' }} />
                </View>
                {page}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 0.1, alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => { if (index > 1) setIndex(index - 1) }}>
                    <Text style={{ color: 'white' }}>السابق</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                    onPress={() => {
                        if (index < 5)
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
                                <Text style={{ color: 'black', }}>مقدم الخدمـــة: .........</Text>
                                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                    <Text style={{ color: 'black', }}>الــخـــدمــــــــة : .........</Text>
                                    <Text style={{ color: 'black', paddingHorizontal: 10 }}>الــــســـعـــــر : .........</Text>
                                </View>
                            </View>

                            <Text style={{ fontSize: 15, fontWeight: 'bold', backgroundColor: '#b2a9a7', borderBottomWidth: 1, textAlign: 'center', marginBottom: 10 }}>تــفــاصــيـــل الطـلــــب</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <Text style={{ color: 'black', }}>الـمـنـطـقـة : .........</Text>
                                <Text style={{ color: 'black', paddingHorizontal: 10 }}>نـوع الـخـدمـة المــراد تـنـفـيــذهــا : .........</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <Text style={{ color: 'black', }}>الـمـوقع بالـGPS : .........</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
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
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>إرسال</Text>
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
