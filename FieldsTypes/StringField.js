import React from 'react'
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

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
                dispatch({ actionType: 'change', fieldIndex: fieldIndex, value: text })
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
            onChangeText={(text) => {
            }}
            value={field.value}
        />
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