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

    const field = props.field
    const dispatch = props.dispatch
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
    const field = props.field
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
                <Text style={{ color: 'grey', fontSize: 10, }}>حقل منطفة نصية</Text>
            </View>
        </View>
        <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', padding: 15, backgroundColor: '#f5f0f0' }}>{field.value}</Text>
    </View>
}

export function TextAreaFieldCreator(props) {
    const set = props.set
    return <View style={{ marginVertical: 10 }}>
        <Text>اكتب النص الذي يصف مساحة النص هذه للزبون</Text>
        <TextInput
            style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
            onChangeText={(text) => {
                set({
                    label: text, class: TextAreaFieldClass, value: null
                })
            }}
        />
    </View>
}

export function TextAreaFieldEditor(props) {

    const field = props.field
    const dispatch = props.dispatch
    const [label, setlabel] = React.useState(field.label)
    const [subLabel, setsubLabel] = React.useState(field.subLabel)

    const [value, setvalue] = React.useState(field.value)

    return <View style={{ marginVertical: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>حقل مساحة نصية</Text>
        </View>
        <TextInput style={{ fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderColor: '#dec9c8', borderRadius: 7 }}
            onChangeText={(text) => {
                setlabel(text)
                dispatch({
                    class: TextAreaFieldClass, label: text, setsubLabel: subLabel, value: value
                })
            }}
            value={field.label}
        />
        {(field.subLabel) ? (
            <TextInput style={{ fontSize: 12, borderWidth: 1, borderColor: '#dec9c8', borderRadius: 7 }}
                onChangeText={(text) => {
                    setsubLabel(text)
                    dispatch({
                        class: TextAreaFieldClass, label: label, setsubLabel: text, value: value
                    })
                }}
                value={field.subLabel}
            />
        ) : null}

        <View style={{ borderWidth: 1, borderColor: '#e4f0ec', borderRadius: 10, marginVertical: 5, padding: 30, backgroundColor: 'grey' }} />
    </View>
}
