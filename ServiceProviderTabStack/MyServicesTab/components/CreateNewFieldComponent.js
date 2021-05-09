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
    TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const fieldsTypes = {
    string: 'حقل نص عادي', textarea: 'مساحة نصية', options: 'قائمة اختيار'
}

export default function CreateNewFieldComponent(props) {
    const addNewField = props.addNewField
    const [selectedType, setSelectedType] = useState();
    const [fieldConfig, setFieldConfig] = useState({});

    return (


        <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>

            <View style={{ flexDirection: 'row', alignItems:'center' }}>
                <Text style={{}}>نوع الحقل</Text>

                <Picker
                    style={{flex:1}}
                    selectedValue={selectedType}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedType(itemValue)
                    }>
                    <Picker.Item label={'اختر نوع الحقل'} value={'dummey'} />
                    {
                        Object.keys(fieldsTypes).map(function (key, index) {
                            return <Picker.Item key={index} label={fieldsTypes[key]} value={key} />
                        })
                    }
                </Picker>
            </View>

            {(() => {
                if (selectedType == 'string') {
                    return (
                        <View>
                            <Text>اكتب النص الذي يصف هذا الحقل للزبون</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                onChangeText={(text) => {
                                    setFieldConfig({
                                        label: text, type: 'string', value: null
                                    })
                                }}
                            />
                        </View>
                    )
                } else if (selectedType == 'textarea') {
                    return (
                        <View>
                            <Text>اكتب النص الذي يصف مساحة النص هذه للزبون</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                onChangeText={(text) => {
                                    setFieldConfig({
                                        label: text, type: 'textarea', value: null
                                    })
                                }}
                            />
                        </View>
                    )
                }
            })()}

            <TouchableOpacity onPress={() => addNewField(fieldConfig)} >
                <Text>اضف الحقل</Text>
            </TouchableOpacity>

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

})