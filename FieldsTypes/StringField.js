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
    const fieldIndex = props.fieldIndex
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
    return <View key={index} style={{ ...styles.fieldRow }}>
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

function RemoveFieldButton(props) {
    const deleteField = props.deleteField
    return (
        <TouchableOpacity onPress={() => deleteField()}>
            <AntDesign name="closecircleo" size={24} color="black" />
        </TouchableOpacity>
    )
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
    const fieldIndex = props.fieldIndex
    const field = props.field
    const deleteField = props.deleteField
    const changeLabel = props.changeLabel
    const change = props.change

    return (
        <View key={fieldIndex} style={{ marginVertical: 15 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>حقل نصي</Text>
                <RemoveFieldButton deleteField={() => deleteField(fieldIndex)} />
            </View>

            <TextInput style={{ fontSize: 12, borderWidth: 1, borderColor: '#dec9c8', borderRadius: 10 }}
                onChangeText={(text) => {
                    changeLabel(text, fieldIndex)
                }}
                value={field.label}
            />
            <TextInput
                style={{ borderWidth: 1, borderColor: '#dec9c8', borderRadius: 10, marginVertical: 5 }}
                onChangeText={(text) => {
                    change(text, fieldIndex)
                }}
                value={field.value}
            />
        </View>
    )
}