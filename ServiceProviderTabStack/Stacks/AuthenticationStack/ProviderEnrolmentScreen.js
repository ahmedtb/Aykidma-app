import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { enrollProvider } from '../../../utilityFunctions/apiCalls'
import { logError } from '../../../redux/AuthFunctions'
import ImagePicker from '../../../components/ImagePicker'
import Constants from 'expo-constants';

export default function ProviderEnrolmentScreen(props) {

    const [fullName, setFullName] = useState('')
    const [coverage, setcoverage] = useState([])
    const [image, setimage] = useState(null)

    return (
        <ScrollView>

            <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>


                <View style={{ margin: 10 }}>
                    <Text style={styles.fieldLable} >اسم مزود الخدمة:</Text>
                    <TextInput style={styles.enrollField}
                        onChangeText={setFullName}
                    />
                </View>
                {/* <View style={{}}>
                    <Picker
                        style={{}}
                        selectedValue={selectedType}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedType(itemValue)
                        }>
                        <Picker.Item label={'اختر مدينة'} value={'dummey'} />
                        <Picker.Item label={'tripoli'} value={'tripoli'} />
                        <Picker.Item label={'bengazi'} value={'bengazi'} />
                        <Picker.Item label={'misrate'} value={'misrate'} />
                        
                    </Picker>
                </View> */}
                <View>
                    <ImagePicker onChange={base64 => setimage(base64)} />
                </View>

                <TouchableOpacity
                    onPress={() =>
                        enrollProvider(fullName, coverage, image)
                            .then(data => {
                                console.log('ProviderEnrolmentScreen', data)
                            }).catch(error => {
                                logError(error, 'ProviderEnrolmentScreen')
                            })
                    }
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
        marginTop: Constants.statusBarHeight,
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