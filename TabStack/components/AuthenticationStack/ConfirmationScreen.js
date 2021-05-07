import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Dimensions,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    Pressable,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { activateUser } from '../../../utilityFunctions/apiCalls'

function MessageModal(props) {
    const [dialogBox, setDialogBox] = props.visibility
    const navigation = useNavigation()
    const message = props.message

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={dialogBox}
            onRequestClose={() => {
                setDialogBox(!dialogBox);
                navigation.navigate('Login', { newOrderId: 1 })
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{}}>

                        <Text>{message}</Text>

                        <Pressable
                            onPress={() => {
                                setDialogBox(false)
                                navigation.navigate('Login')
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

export default function ConfirmationScreen(props, { navigation }) {

    const [activationNumber, setActivationNumber] = useState(null)
    const [dialogBox, setDialogBox] = useState(false)

    console.log(props.route.params.phoneNumber)
    const { phoneNumber, fullName, password } = props.route.params

    return (
        <ScrollView>

            <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>


                <View style={{ margin: 10 }}>
                    <Text style={styles.fieldLable} >ادخل رقم التاكيد المرسل على SMS</Text>
                    <TextInput style={styles.enrollField}
                        onChangeText={setActivationNumber}
                    />

                </View>

                <TouchableOpacity
                    onPress={() =>
                        activateUser(fullName, phoneNumber, password, activationNumber)
                            .then(data => {
                                console.log(data)
                            }).finally(() => {
                                setDialogBox(true)
                            })
                    }
                    style={{ backgroundColor: 'red', flexDirection: 'row', width: '50%', alignSelf: 'center', height: 50, alignItems: 'center', borderRadius: 19 }}>
                    <Text style={{ textAlign: 'center', color: 'white', flex: 1, fontSize: 20 }}>تأكيد رقم الهاتف</Text>

                </TouchableOpacity>
            </View>

            <MessageModal
                visibility={[dialogBox, setDialogBox]}
                message='نم تسجيلك بنجاح'
            />

        </ScrollView>

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
        // flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
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
})
