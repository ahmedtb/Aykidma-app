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
import ListOptions from './ListOptions';

const First = () => {
    const [region, setRegion] = useState(null);
    const [dwellingType, setDwellingType] = useState(null);
    const [period, setPeriod] = useState(null);
    return (
        <View style={{ padding: 25 }}>

            <Text style={{ fontSize: 20 }}>اختر المنطقة</Text>
            <ListOptions setChoice={setRegion} choice={region} list={['سوق الجمعة', 'حي الاندلس', 'ابو سليم']} label='اختر منطقتك' />

            <Text style={{ fontSize: 20 }}>اختر نوع الوحدة السكنية</Text>
            <ListOptions setChoice={setDwellingType} choice={dwellingType} list={['شقة', 'فيلا', 'مبنى', 'اخرى']} label='يرجى اختيار نوع الوحدة' />

            <Text style={{ fontSize: 20 }}>اختار الوقت المفضل للتنفيذ</Text>
            <ListOptions setChoice={setPeriod} choice={period} list={['اليوم', 'غدا', 'خلال اسبوع', 'الاسبوع القادم']} label='اختر الوقت المناسب' />


        </View>
    );
}

const Custom_Form_Fields_JSON = [
    {
        titles: ['first', 'second', 'third', 'fourth', 'fifth'],
        label: 'please choose an option',
        name: 'testingOptions',
        type: 'options'
    },
    {
        label: 'please enter in the text field',
        name: 'testingString',
        type: 'string'
    },
    {
        label: 'please enter text in textarea',
        name: 'testingTextArea',
        type: 'textarea'
    }
]

// consider usinbg Redux 
// https://www.digitalocean.com/community/tutorials/redux-redux-intro
// https://www.digitalocean.com/community/tutorials/react-react-native-redux
const Second = () => {
    const CustomFields = (props) => <View>
        {
            Custom_Form_Fields_JSON.map((item, index) => {
                if (item.type === 'string') {
                    return (
                        <>
                            <Text style={{ fontSize: 12 }}>{item.label}</Text>
                            <TextInput style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />
                        </>
                    )
                } else if (item.type === 'textarea') {
                    return (
                        <>
                            <Text style={{ fontSize: 12 }}>{item.label}</Text>
                            <TextInput multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />
                        </>
                    )
                } else if (item.type === 'options') {
                    return (
                        <>
                            <Text style={{ fontSize: 20 }}>{item.label}</Text>
                            {/* <ListOptions setChoice={setRegion} choice={region} list={item.titles} label='اختر منطقتك' /> */}
                        </>
                    )
                }
                return null;
            })
        }
    </View>
    return (
        <View style={{ padding: 25 }}>
            <TextInput style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />
            <CustomFields />
        </View>
    );
}

import ImagePickerExample from './ImagePickerExample';
const Third = () => {
    return (
        <View style={{ padding: 25, flex: 1 }}>
            <View style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>أوصف مشكلتك وحاجتك بوضوح</Text>
                <Text style={{ fontSize: 12 }}>أضف وصف واضح لمشكلتك، ليتمكن مزود الخدمة من فهمها وتقديم العرض الافضل لك</Text>
                <TextInput multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />
            </View>

            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>أضف صور للمشكلة (اختياري)</Text>
            <ImagePickerExample style={{ marginVertical: 5, borderRadius: 10 }} />
        </View>
    );
}

import Fourth from './formSteps/Fourth';
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
