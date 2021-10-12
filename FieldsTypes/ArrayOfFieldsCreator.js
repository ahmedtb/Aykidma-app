import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { Picker } from '@react-native-picker/picker';

import { StringFieldClass, StringFieldCreator } from './StringField'
import { TextAreaFieldClass, TextAreaFieldCreator } from './TextAreaField'
import { ImageFieldClass, ImageFieldCreator } from './ImageField'
import { LocationFieldClass, LocationFieldCreator } from './LocationField'
import { OptionsFieldClass, OptionsFieldCreator } from './OptionsField'

export const ArrayOfFieldsClass = 'App\\FieldsTypes\\ArrayOfFields'

const fieldsTypes = {
    [StringFieldClass]: 'حقل نص عادي',
    [TextAreaFieldClass]: 'مساحة نصية',
    [OptionsFieldClass]: 'قائمة اختيار',
    [LocationFieldClass]: 'تحديد موقع المستخدم',
    [ImageFieldClass]: 'حقل صورة'
}

const reducer = (array_of_fields, action) => {

    switch (action.actionType) {
        case 'remove field':
            return array_of_fields
        case 'add field':
            return array_of_fields
    }
    return array_of_fields;
}


export default function ArrayOfFieldsCreator(props) {
    const setarray_of_fields = props.setarray_of_fields
    const [array_of_fields, dispatch] = React.useReducer(reducer, { class: ArrayOfFieldsClass, fields: [] });

    const [selectedType, setSelectedType] = useState();
    const [newfield, setnewfield] = useState({});


    return (
        <View>

            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>نوع الحقل</Text>
                <View style={{ flex: 1, borderWidth: 0.5, margin: 3, borderRadius: 8 }}>
                    <Picker
                        style={{}}
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
            </View>

            {
                (() => {
                    if (selectedType == StringFieldClass) {
                        return (
                            <StringFieldCreator set={(field) => setnewfield(field)} />
                        )
                    } else if (selectedType == TextAreaFieldClass) {
                        return (
                            <TextAreaFieldCreator set={(field) => setnewfield(field)} />
                        )
                    } else if (selectedType == OptionsFieldClass) {
                        return (
                            <OptionsFieldCreator set={(field) => setnewfield(field)} />
                        )
                    } else if (selectedType == LocationFieldClass) {
                        return (
                            <LocationFieldCreator set={(field) => setnewfield(field)} />
                        )
                    } else if (selectedType == ImageFieldClass) {
                        return (
                            <ImageFieldCreator set={(field) => setnewfield(field)} />
                        )
                    }
                })()
            }

            <TouchableOpacity
                onPress={() => {
                    dispatch('add field', { field: newfield })
                    setnewfield({})
                }}
                style={{ alignSelf: 'flex-end', backgroundColor: 'red', width: '20%', padding: 10, marginVertical: 5, justifyContent: 'center', borderRadius: 19 }}
            >
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 10 }}>اضف الحقل</Text>
            </TouchableOpacity>
        </View>
    )

}