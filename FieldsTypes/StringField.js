import React from 'react'
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons'

export const StringFieldClass = 'App\\FieldsTypes\\StringField'

export function StringFieldInput(props) {
    const field = props.field
    const dispatch = props.dispatch

    return <View >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
        <TextInput
            style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
            onChangeText={(text) => {
                dispatch(text)
            }}
            value={field.value}
        />
    </View>
}

export function StringFieldRender(props) {
    const field = props.field
    return <View >
        <Text style={{ fontSize: 12 }}>{field.label}</Text>
        <TextInput
            style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
            onChangeText={(text) => { }}
            value={field.value}
        />
    </View>
}

export function StringFieldFormView(props) {
    const field = props.field
    return <View style={{
        marginHorizontal: 8,
        borderWidth: 0.5,
        borderColor: '#d1c5c5',
        borderRadius: 10,
        marginVertical: 5,
    }}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, }}>
            <Entypo name="list" size={24} color="grey" />
            <View style={{ marginLeft: 5, flex: 1, }}>
                <Text style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{field.label}</Text>
                <Text style={{ color: 'grey', fontSize: 10, }}>حقل نصي</Text>
            </View>
        </View>
        <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', padding: 10, backgroundColor: '#f5f0f0' }}>{field.value}</Text>
    </View>
}



export function StringFieldCreator(props) {
    const set = props.set

    return <View style={{ marginVertical: 10 }}>
        <Text>اكتب النص الذي يصف هذا الحقل للزبون</Text>
        <TextInput
            style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
            onChangeText={(text) => {
                set({
                    label: text, class: StringFieldClass, value: null
                })
            }}
        />
    </View>
}

export function StringFieldEditor(props) {
    const field = props.field
    const dispatch = props.dispatch
    const [label, setlabel] = React.useState(field.label)
    const [value, setvalue] = React.useState(field.value)

    return (
        <View style={{ marginVertical: 15 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>حقل نصي</Text>
            </View>

            <TextInput style={{ fontSize: 12, borderWidth: 1, borderColor: '#dec9c8', borderRadius: 10 }}
                onChangeText={(text) => {
                    setlabel(text)
                    dispatch({
                        class: StringFieldClass, label: text, value: value
                    })
                }}
                value={label}
            />
            <TextInput
                style={{ borderWidth: 1, borderColor: '#dec9c8', borderRadius: 10, marginVertical: 5 }}
                onChangeText={(text) => {
                    setvalue(text)
                    dispatch({
                        class: StringFieldClass, label: label, value: value
                    })
                }}
                value={value}
            />
        </View>
    )
}