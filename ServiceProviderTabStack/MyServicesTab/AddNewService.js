import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';


import ImagePickerComponent from '../../components/ImagePickerComponent'
import CategoryComponent from '../../components/CategoryComponent'
import { createService } from '../../utilityFunctions/apiCalls'
import {logError} from '../../redux/AuthFunctions'
import ArrayOfFieldsCreator from '../../FieldsTypes/ArrayOfFieldsCreator';
import { ArrayOfFieldsClass } from '../../FieldsTypes/ArrayOfFieldsCreator'
import { StringFieldClass, StringFieldRender } from '../../FieldsTypes/StringField'
import { TextAreaFieldClass, TextAreaFieldRender } from '../../FieldsTypes/TextAreaField'
import { ImageFieldClass, ImageFieldRender } from '../../FieldsTypes/ImageField'
import { LocationFieldClass, LocationFieldRender } from '../../FieldsTypes/LocationField'
import { OptionsFieldClass, OptionsFieldRender } from '../../FieldsTypes/OptionsField'
import { AntDesign } from '@expo/vector-icons';

const reducer = (array_of_fields, action) => {

    switch (action.actionType) {
        case 'remove field':
            let filtered = array_of_fields.fields.filter((value, index) => {
                return index != action.index;
            });
            // console.log('arrayoffieldscreator reducer', filtered)
            
            return { class: ArrayOfFieldsClass, fields: filtered }
        case 'add field':
            const fields = [...array_of_fields.fields, action.newField]
            return { class: ArrayOfFieldsClass, fields: fields }
    }
    return array_of_fields;
}

export default function AddNewService(props) {
    const [title, setTitle] = useState(null)

    const [description, setDescription] = React.useState(null)
    const [category_id, selectCategory] = React.useState(null)
    const [image, setImage] = React.useState(null)

    const [array_of_fields, dispatch] = React.useReducer(reducer, { class: ArrayOfFieldsClass, fields: [] });


    React.useEffect(() => {
        console.log('AddNewService useeffect', array_of_fields)
    }, [array_of_fields])

    function addNewField(fieldConfig) {
        dispatch({ actionType: 'add field', newField: fieldConfig })
    }

    function submit() {
        // console.log('addnewscreen submit',image.length)
        createService(title, description, array_of_fields, category_id, image, [])
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                logError(error,'AddNewService submit')
            })
    }


    return (
        <ScrollView>

            <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>

                <View style={{ margin: 10 }}>
                    <Text style={styles.fieldLable} >عنوان الخدمة</Text>
                    <TextInput style={styles.enrollField}
                        onChangeText={setTitle}
                    />
                </View>

                <View>
                    {
                        array_of_fields.fields.map((field, index) => {
                            if (field.class == StringFieldClass) {
                                return <View key={index}>
                                    <TouchableOpacity onPress={() => dispatch({ actionType: 'remove field', index: index })}>
                                        <AntDesign name="closecircleo" size={24} color="black" />
                                    </TouchableOpacity>
                                    <StringFieldRender
                                        field={field}
                                    />
                                </View>
                            } else if (field.class == TextAreaFieldClass) {
                                return <View key={index}>
                                    <TouchableOpacity onPress={() => dispatch({ actionType: 'remove field', index: index })}>
                                        <AntDesign name="closecircleo" size={24} color="black" />
                                    </TouchableOpacity>
                                    <TextAreaFieldRender
                                        key={index}
                                        field={field}
                                    />
                                </View>
                            } else if (field.class == ImageFieldClass) {
                                return <View key={index}>
                                    <TouchableOpacity onPress={() => dispatch({ actionType: 'remove field', index: index })}>
                                        <AntDesign name="closecircleo" size={24} color="black" />
                                    </TouchableOpacity>
                                    <ImageFieldRender
                                        key={index}
                                        field={field}

                                    />
                                </View>
                            } else if (field.class == OptionsFieldClass) {
                                return <View key={index}>
                                    <TouchableOpacity onPress={() => dispatch({ actionType: 'remove field', index: index })}>
                                        <AntDesign name="closecircleo" size={24} color="black" />
                                    </TouchableOpacity>
                                    <OptionsFieldRender
                                        key={index}
                                        field={field}
                                    />
                                </View>
                            } else if (field.class == LocationFieldClass) {
                                return <View key={index}>
                                    <TouchableOpacity onPress={() => dispatch({ actionType: 'remove field', index: index })}>
                                        <AntDesign name="closecircleo" size={24} color="black" />
                                    </TouchableOpacity>
                                    <LocationFieldRender
                                        key={index}
                                        field={field}
                                    />
                                </View>
                            }
                        })
                    }
                    <ArrayOfFieldsCreator addField={addNewField} />

                    <View>
                        <ImagePickerComponent
                            onChange={
                                (imageBase64) => { setImage(imageBase64) }
                            }
                            value={null}
                            style={{ marginVertical: 5, borderRadius: 10, padding: 50 }}
                        />
                        <Text>توضيح عام لخدمتك (اختياري)</Text>
                        <TextInput
                            multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                            onChangeText={(text) => { setDescription(text) }}
                            value={description}
                        />

                    </View>

                    <CategoryComponent selectCategory={selectCategory} />


                    <TouchableOpacity
                        onPress={() => submit()}
                        style={{ backgroundColor: 'red', flexDirection: 'row', width: '50%', alignSelf: 'center', height: 50, alignItems: 'center', borderRadius: 19 }}>
                        <Text style={{ textAlign: 'center', color: 'white', flex: 1, fontSize: 20 }}>طلب تسجيل خدمة</Text>
                    </TouchableOpacity>
                </View>
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

})