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
    TouchableOpacity
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


import { signUpUser } from '../../../utilityFunctions/apiCalls'
export default function EnrolmentScreen({ navigation }) {

    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [password, setPassword] = useState('')

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

                <TouchableOpacity
                    onPress={() => signUpUser(fullName, phoneNumber, password)
                        .then(data => {
                            console.log(data)
                            navigation.navigate(
                                'تأكيد رقم الهاتف',
                                { fullName: fullName, phoneNumber: phoneNumber, password: password }
                            )
                        })}
                    style={{ backgroundColor: 'red', flexDirection: 'row', width: '50%', alignSelf: 'center', height: 50, alignItems: 'center', borderRadius: 19 }}>
                    <Text style={{ textAlign: 'center', color: 'white', flex: 1, fontSize: 20 }}>تسجيل</Text>
                </TouchableOpacity>
            </View>

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