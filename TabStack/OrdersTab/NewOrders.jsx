import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    Button,
    TouchableOpacity,
    Modal,
    Pressable
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';


function OrderFormModal(props) {
    const [modalVisible, setModalVisible] = props.visible;

    return (
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
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, flex: 1 }}>نموذج الطلب</Text>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'black', }}>التاريخ: 3/3/2021 م</Text>
                        </View>
                    </View>

                    <View style={{ borderWidth: 1, marginBottom: 20 }}>
                        <View style={{}}>
                            <Text style={{ color: 'black', fontSize: 20, }}>مقدم الخدمـــة: شركة التضامـن</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
                                <Text style={{ color: 'black', fontSize: 20, }}>الــخـــدمــــــــة : تنظيف</Text>
                                <Text style={{ color: 'black', fontSize: 20, }}>الــــســـعـــــر : 100 دينار</Text>
                            </View>
                        </View>

                        <Text style={{ fontSize: 21, fontWeight: 'bold', backgroundColor: '#b2a9a7', borderBottomWidth: 1, textAlign: 'center', marginBottom: 10, height: 35 }}>تــفــاصــيـــل الطـلــــب</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: 'black', fontSize: 20, }}>الـمـنـطـقـة : </Text>
                                <Text style={{ color: 'black', fontSize: 20, }}>حي السلام - طرابلس</Text>
                            </View>


                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: 'black', fontSize: 20, }}>نوع الخدمة المراد تنفيذها: </Text>
                                <Text style={{ color: 'black', fontSize: 20, }}>تنظيف مكتبي</Text>
                            </View>

                            <Text style={{ color: 'black', fontSize: 20, }}>نوع الوحدة السكنـيـة : شقة</Text>


                            <Text style={{ color: 'black', fontSize: 20, paddingHorizontal: 5 }}>وصف خاص للطلب :</Text>
                            <View style={{ borderWidth: 1, width: '50%', height: 50, marginHorizontal: 3 }}>
                            </View>

                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: 'black', fontSize: 20, }}>الـوقت الـمـفضـل لتنفيذ الخدمة: </Text>
                                <Text style={{ color: 'black', fontSize: 20, }}>اليوم - 10 مساءً</Text>
                            </View>


                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10, borderTopWidth: 1 }}>
                            <Text style={{ color: 'black', fontSize: 20, }}>الـمـوقع: 32.8753, 13.3619 GPS</Text>
                            <Text style={{ color: 'black', fontSize: 20, }}>صــورة تـوضـحـيـة : .........</Text>
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
    )

}

export default function NewOrders(props) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
    <ScrollView>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ borderWidth: 1, borderRadius: 4, marginVertical: 7 }}>
            <View style={{ flexDirection: 'row', margin: 10 }}>
                <View>
                    <Image source={require('../../resources/cleanHouse.jpg')} style={{ width: 100, height: 100, borderWidth: 2, borderColor: '#777c2e' }} />
                    <Text style={{ textAlign: 'center' }}>3/3/2021</Text>
                </View>
                <View style={{ margin: 10, flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }} >نظافة منزلية كاملة</Text>
                    <Text style={{ color: '#98a023' }}>وسط البلد</Text>
                    <Text>نظافة</Text>

                </View>
                <Text style={{ color: 'red', alignSelf: 'flex-end' }}>300 جنيه</Text>
            </View>
        </TouchableOpacity>
        <OrderFormModal visible={[modalVisible, setModalVisible]} />
    </ScrollView>
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