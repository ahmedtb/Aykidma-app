import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,

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




export default function ArrayOfFieldsCreator(props) {
    
    const addField = props.addField
    const [selectedType, setSelectedType] = React.useState();
    const [field, setfield] = React.useState({});



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
                            <StringFieldCreator set={(field) => setfield(field)} />
                        )
                    } else if (selectedType == TextAreaFieldClass) {
                        return (
                            <TextAreaFieldCreator set={(field) => setfield(field)} />
                        )
                    } else if (selectedType == OptionsFieldClass) {
                        return (
                            <OptionsFieldCreator set={(field) => setfield(field)} />
                        )
                    } else if (selectedType == LocationFieldClass) {
                        return (
                            <LocationFieldCreator set={(field) => setfield(field)} />
                        )
                    } else if (selectedType == ImageFieldClass) {
                        return (
                            <ImageFieldCreator set={(field) => setfield(field)} />
                        )
                    }
                })()
            }

            <TouchableOpacity
                onPress={() => {
                    // dispatch({ actionType: 'add field', field: field })
                    addField(field)
                    setfield({})
                    setSelectedType(null)
                }}
                style={{ alignSelf: 'flex-end', backgroundColor: 'red', width: '20%', padding: 10, marginVertical: 5, justifyContent: 'center', borderRadius: 19 }}
            >
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 10 }}>اضف الحقل</Text>
            </TouchableOpacity>
        </View>
    )

}