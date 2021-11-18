import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Dimensions,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    Button,
    TouchableOpacity
} from 'react-native';
import ImagePicker from '../../../components/ImagePicker'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import ModalWrapper from '../../../components/ModalWrapper';

import { signUpUser } from '../../../utilityFunctions/apiCalls'
import ApiCallHandler from '../../../utilityFunctions/ApiCallHandler'

export default function EnrolmentScreen({ navigation }) {

    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [password, setPassword] = useState('')
    const [image, setimage] = useState('')

    const [dialogBox, setDialogBox] = useState(false)
    async function submit() {
        ApiCallHandler(
            async () => await signUpUser(fullName, phoneNumber, password, image),
            (data) => setDialogBox(true),
            'EnrolmentScreen submit',
            true
        )
    }

    return (
        <ScrollView>

            <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>


                <View style={{ margin: 10 }}>
                    <Text style={styles.fieldLable} >الاسم الثلاثي*:</Text>
                    <TextInput style={styles.enrollField}
                        onChangeText={setFullName}
                    />

                </View>

                <View style={{ margin: 10 }}>
                    <Text style={styles.fieldLable} >الموبايل*:</Text>
                    <TextInput style={styles.enrollField}
                        onChangeText={setPhoneNumber}
                    />
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={styles.fieldLable} >كلمة المرور*:</Text>
                    <TextInput style={styles.enrollField}
                        onChangeText={setPassword}
                    />

                </View>

                <View style={{ margin: 10 }}>
                    <Text style={styles.fieldLable} >صورة (اختياري):</Text>
                    <ImagePicker onChange={base64 => setimage(base64)} />

                </View>


                <TouchableOpacity
                    onPress={submit}
                    style={{ backgroundColor: 'red', flexDirection: 'row', width: '50%', alignSelf: 'center', height: 50, alignItems: 'center', borderRadius: 19 }}>
                    <Text style={{ textAlign: 'center', color: 'white', flex: 1, fontSize: 20 }}>تسجيل</Text>
                </TouchableOpacity>
            </View>

            <ModalWrapper visible={dialogBox}>

                <View style={{}}>
                    <Text style={{ fontSize: 20 }}>
                        تم تقديم تسجيلك بنجاح
                    </Text>
                    <Text>يرجى التاكيد على الحساب من بريدك الالكتروني</Text>

                    <Pressable
                        onPress={() => {
                            setDialogBox(false)
                            navigation.navigate(
                                'Login',
                                { fullName: fullName, phoneNumber: phoneNumber, password: password, image: image }
                            )
                        }}
                        style={{ backgroundColor: 'red', elevation: 3, padding: 7, borderRadius: 6 }}
                    >
                        <Text style={{ textAlign: 'center', color: 'white' }}>موافق</Text>
                    </Pressable>

                </View>

            </ModalWrapper>

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
    }
})