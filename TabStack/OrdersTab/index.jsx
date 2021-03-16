import React, { useState } from 'react';
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
import { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function OrdersTabStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen name="enrollment" component={OrdersTab}
                options={{ title: 'طلباتي' }}
            />

        </Stack.Navigator>
    );
}

function OrderModalForm(props) {
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

function OrdersList(props) {
    const [modalVisible, setModalVisible] = useState(false);

    switch (props.viewOrders) {
        case 1:
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
                    <OrderModalForm visible={[modalVisible, setModalVisible]} />
                </ScrollView>
            )
        case 2:
            return (
                <ScrollView>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={{ borderWidth: 1, borderRadius: 4, marginVertical: 7 }}>
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <View>
                                <Image source={require('../../resources/cleanHouse.jpg')} style={{ width: 100, height: 100, borderWidth: 2, borderColor: '#777c2e' }} />
                                <Text style={{ textAlign: 'center' }}>3/3/2021</Text>
                            </View>
                            <View style={{ margin: 10, flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15 }} >نظافة منزلية</Text>
                                <Text style={{ color: '#98a023' }}>وسط البلد</Text>
                                <Text>نظافة</Text>

                            </View>
                            <Text style={{ color: 'red', alignSelf: 'flex-end' }}>300 جنيه</Text>
                        </View>
                    </TouchableOpacity>
                    <OrderModalForm visible={[modalVisible, setModalVisible]} />

                </ScrollView>
            )
        case 3:
            return (
                <ScrollView>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={{ borderWidth: 1, borderRadius: 4, marginVertical: 7 }}>
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <View>
                                <Image source={require('../../resources/cleanHouse.jpg')} style={{ width: 100, height: 100, borderWidth: 2, borderColor: '#777c2e' }} />
                                <Text style={{ textAlign: 'center' }}>3/3/2021</Text>
                            </View>
                            <View style={{ margin: 10, flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15 }} > منزلية كاملة</Text>
                                <Text style={{ color: '#98a023' }}>وسط البلد</Text>
                                <Text>نظافة</Text>

                            </View>
                            <Text style={{ color: 'red', alignSelf: 'flex-end' }}>300 جنيه</Text>
                        </View>
                    </TouchableOpacity>
                    <OrderModalForm visible={[modalVisible, setModalVisible]} />

                </ScrollView>
            )
        default:
            return (null)
    }
}

function OrdersTab(props) {
    const [viewOrders, setViewOrders] = useState(1);


    return (
        <View style={{ justifyContent: 'center', borderWidth: 1, flex: 1, paddingHorizontal: 20 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 50, borderBottomWidth: 1, borderColor: 'grey' }}>
                <TouchableOpacity onPress={() => { setViewOrders(1) }} ><Text style={{ backgroundColor: (viewOrders == 1) ? '#52662b' : '#fff', padding: 10, borderRadius: 20 }}>طلبات جديد</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setViewOrders(2) }} ><Text style={{ backgroundColor: (viewOrders == 2) ? '#52662b' : '#fff', padding: 10, borderRadius: 20 }}>طلبات قيد التنفيذ</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setViewOrders(3) }} ><Text style={{ backgroundColor: (viewOrders == 3) ? '#52662b' : '#fff', padding: 10, borderRadius: 20 }}>طلبات منتهية</Text></TouchableOpacity>
            </View>

            <OrdersList viewOrders={viewOrders} {...props} />
        </View>

    );
}


const styles = StyleSheet.create({
    enrollField: {
        borderWidth: 1, borderColor: 'grey', borderRadius: 5, padding: 10, fontSize: 20
    },

    fieldLable: {
        fontSize: 20,
    },

    container: {
        backgroundColor: '#fff',
    },

    listGroupItem: {
        flexDirection: 'row-reverse',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 2

    },
    container: {
        padding: 5,
    },
    header: {
        fontSize: 18,
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
        backgroundColor: "#dddddd",
        color: 'black',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    card: {
        borderColor: '#756060',
        borderRadius: 15,
        borderWidth: 1,
        marginTop: 5,

    },
    row: {
        flex: 1,
        fontSize: 18,
        color: '#756060',
        textAlign: "center",
    },


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