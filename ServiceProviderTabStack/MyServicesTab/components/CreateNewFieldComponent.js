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
import { AntDesign } from '@expo/vector-icons';


const fieldsTypes = {
    string: 'حقل نص عادي', textarea: 'مساحة نصية', options: 'قائمة اختيار', location: 'تحديد موقع المستخدم',
    image: 'حقل صورة'
}

function OptionsCreator(props) {
    // const fieldConfig = props.fieldConfig
    const setFieldConfig = props.setFieldConfig
    const [label, setLabel] = React.useState(null)
    const [title, setTitle] = React.useState(null)
    const [titles, setTitles] = React.useState([])

    function addTitle(title) {
        if (!title)
            return
        setFieldConfig({
            label: label, type: 'options', titles: [...titles, title], value: null
        })
        setTitles([...titles, title])
    }
    function addLabel(label) {
        setFieldConfig({
            label: label, type: 'options', titles: titles, value: null
        })
        setLabel(label)
    }

    return (
        <View>

            <Text>اكتب النص الذي يصف مساحة النص هذه للزبون</Text>
            <TextInput style={{ fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderRadius: 7 }}
                onChangeText={(text) => {
                    addLabel(text)
                }}
            />


            {
                titles?.map((addedTitle, index) => (
                    <View key={index} >
                        <Text>{addedTitle}</Text>
                    </View>
                ))
            }

            <TextInput style={{ fontSize: 12, borderWidth: 1 }}
                onChangeText={setTitle}
            />
            <TouchableOpacity onPress={() => {
                addTitle(title)
            }}>
                <Text style={{ fontSize: 20, backgroundColor: 'grey' }}>add title</Text>
            </TouchableOpacity>
        </View>
    )
}

export default function CreateNewFieldComponent(props) {
    const addNewField = props.addNewField
    const [selectedType, setSelectedType] = useState();
    const [fieldConfig, setFieldConfig] = useState({});

    return (


        <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{}}>نوع الحقل</Text>

                <Picker
                    style={{ flex: 1 }}
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
                } else if (selectedType == 'options') {
                    return (
                        <View >

                            <OptionsCreator setFieldConfig={setFieldConfig} fieldConfig={fieldConfig} />
                        </View>
                    )
                } else if (selectedType == 'location') {
                    return (
                        <View>
                            <Text>اكتب النص الذي يصف مساحة النص هذه للزبون</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                onChangeText={(text) => {
                                    setFieldConfig({
                                        label: text, type: 'location', value: null
                                    })
                                }}
                            />
                            <Image source={require('../../../resources/MapIcon.png')} style={{ width: 100, height: 100 }} />

                        </View>
                    )
                } else if (selectedType == 'image') {
                    return (
                        <View>
                            <Text>اكتب النص الذي يصف مساحة النص هذه للزبون</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                onChangeText={(text) => {
                                    setFieldConfig({
                                        label: text, type: 'image', value: null
                                    })
                                }}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1 }} >
                                <AntDesign name="camerao" size={75} color="black" />
                            </View>
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