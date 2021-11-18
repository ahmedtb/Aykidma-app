import React from 'react'
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image
} from 'react-native'

import { Entypo, AntDesign } from '@expo/vector-icons';
import ImagePicker from '../components/ImagePicker'

export const ImageFieldClass = 'App\\FieldsTypes\\ImageField'

export function ImageFieldInput(props) {

    const field = props.field
    const dispatch = props.dispatch
    return <View>
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
        <ImagePicker
            onChange={
                (image) => {
                    dispatch(image)
                }
            }
            value={field.value}
            style={{ marginVertical: 5, borderRadius: 10, padding: 50 }}
        />
    </View>
}
export function ImageFieldRender(props) {
    const field = props.field

    return <View style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1 }}>
        <View style={{ margin: 8 }}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>{field.label}</Text>
        </View>
        <AntDesign name="camerao" size={75} color="black" />
    </View>
}

export function ImageFieldFormView(props) {
    const field = props.field

    // const value = field.value.latitude + ", " + field.value.longitude;
    return (
        <View style={{
            marginHorizontal: 8,
            borderWidth: 0.5,
            borderColor: '#d1c5c5',
            borderRadius: 10,
            marginVertical: 5,
        }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, }}>
                <Entypo name="image" size={24} color="grey" />
                <View style={{ marginLeft: 5, flex: 1, }}>
                    <Text style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{field.label}</Text>
                    <Text style={{ color: 'grey', fontSize: 10, }}>حقل اختيار صورة</Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#f5f0f0', alignItems: 'center' }}>
                <Image source={{ uri: 'data:image/png;base64,' + field.value }} style={{ width: 150, height: 150, borderRadius: 7 }} />
            </View>

        </View>
    )
}

export function ImageFieldCreator(props) {
    const set = props.set

    return <View style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1 }}>
        <Text>اكتب النص الذي يصف حقل تحديد الموقع للزبون</Text>
        <TextInput
            style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
            onChangeText={(text) => {
                set({
                    label: text,
                    class: ImageFieldClass,
                    value: null
                })
            }}
        />
        <AntDesign name="camerao" size={75} color="black" />
    </View>
}

export function ImageFieldEditor(props) {
    const field = props.field
    const dispatch = props.dispatch
    const [label, setlabel] = React.useState(field.label)
    const [value, setvalue] = React.useState(field.value)

    return <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>حقل اختار صورة</Text>
        </View>

        <TextInput style={{ fontSize: 12, borderWidth: 1, borderColor: '#dec9c8', borderRadius: 10 }}
            onChangeText={(text) => {
                setlabel(text)
                dispatch({
                    class: ImageFieldClass, label: text, value: value
                })
            }}
            value={field.label}
        />
        <ImagePicker
            onChange={
                (image) => {
                    setvalue(image)
                    dispatch({ class: ImageFieldClass, label: label, value: image })
                }
            }
            value={value}
            style={{ marginVertical: 5, borderRadius: 10, padding: 50 }}
        />
    </View>
}
