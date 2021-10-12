import React from 'react'
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

import { FontAwesome5, FontAwesome, MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';


export const TextAreaFieldClass = 'App\\FieldsTypes\\TextAreaField'

export function TextAreaFieldInput(props) {

    return <View >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
        {(field.subLabel) ? (<Text style={{ fontSize: 12 }}>{field.subLabel}</Text>) : (null)}

        <TextInput
            multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
            onChangeText={(text) => {
                dispatch(text)
            }}
            value={field.value}
        />
    </View>
}
export function TextAreaFieldRender(props) {

    return <View >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
        {(field.subLabel) ? (<Text style={{ fontSize: 12 }}>{field.subLabel}</Text>) : (null)}

        <TextInput
            multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
            onChangeText={(text) => { }}
            value={field.value}
        />
    </View>
}

export function TextAreaFieldFormView(props) {

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
                <Text style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{label}</Text>
                <Text style={{ color: 'grey', fontSize: 10, }}>حقل منطفة نصية</Text>
            </View>
        </View>
        <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', padding: 15, backgroundColor: '#f5f0f0' }}>{value}</Text>
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

export function TextAreaFieldCreator(props) {
    const set = props.set
    return <View style={{ marginVertical: 10 }}>
        <Text>اكتب النص الذي يصف مساحة النص هذه للزبون</Text>
        <TextInput
            style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
            onChangeText={(text) => {
                set({
                    label: text, type: 'textarea', value: null
                })
            }}
        />
    </View>
}

export function TextAreaFieldEditor(props) {

    return <View style={{ marginVertical: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>حقل مساحة نصية</Text>
            <RemoveFieldButton deleteField={() => deleteField(fieldIndex)} />
        </View>
        <TextInput style={{ fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderColor: '#dec9c8', borderRadius: 7 }}
            onChangeText={(text) => {
                changeLabel(text, fieldIndex)
            }}
            value={field.label}
        />
        {(field.subLabel) ? (
            <TextInput style={{ fontSize: 12, borderWidth: 1, borderColor: '#dec9c8', borderRadius: 7 }}
                onChangeText={(text) => {
                    changeSubLabel(text, fieldIndex)
                }}
                value={field.subLabel}
            />
        ) : null}

        <View style={{ borderWidth: 1, borderColor: '#e4f0ec', borderRadius: 10, marginVertical: 5, padding: 30, backgroundColor: 'grey' }} />
    </View>
}
