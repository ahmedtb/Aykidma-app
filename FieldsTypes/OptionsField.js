import React from 'react'
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

import { Entypo, AntDesign } from '@expo/vector-icons';
import ListOptions from '../components/ListOptions'

export const OptionsFieldClass = 'App\\FieldsTypes\\OptionsField'

export function OptionsFieldInput(props) {
    const field = props.field
    const dispatch = props.dispatch

    return <View >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
        <ListOptions
            onChange={
                (option) => {
                    dispatch(option)
                }
            }
            choice={field.value}
            list={field.options} label='اختر' />
    </View>
}

export function OptionsFieldRender(props) {

    return <View style={{ marginVertical: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
        {field.titles.map((title, index) => (
            <Text key={index} style={{ fontSize: 15, textAlign: 'center' }}>
                {title}
            </Text>
        ))}
    </View>
}

export function OptionsFieldFormView(props) {
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
                <Text style={{ color: 'grey', fontSize: 10, }}>حقل اختيارات</Text>
            </View>
        </View>
        <Text style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', padding: 5, backgroundColor: '#f5f0f0' }}>{field.value}</Text>
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

export function OptionsFieldCreator(props) {
    const set = props.set
    const [label, setLabel] = React.useState(null)
    const [title, setTitle] = React.useState(null)
    const [titles, setTitles] = React.useState([])

    function addTitle(title) {
        if (!title)
            return
        set({
            label: label, type: 'options', titles: [...titles, title], value: null
        })
        setTitles([...titles, title])
    }
    function addLabel(label) {
        set({
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

export function OptionsFieldEditor(props) {

    return <View style={{ marginVertical: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>حقل اختياري</Text>
            <RemoveFieldButton deleteField={() => deleteField(fieldIndex)} />
        </View>
        <TextInput style={{ fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderColor: '#dec9c8', borderRadius: 7 }}
            onChangeText={(text) => {
                changeLabel(text, fieldIndex)
            }}
            value={field.label}
        />
        <OptionsTitlesEditor titles={field.titles} onChange={
            (value) => changeTitles(value, fieldIndex)
        } />
    </View>
}
