import React from 'react'
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Pressable
} from 'react-native'

import { Entypo, AntDesign } from '@expo/vector-icons';
import ListOptions from '../components/ListOptions'
import ModalWrapper from '../components/ModalWrapper'
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
    const field = props.field
    return <View style={{ marginVertical: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
        {field.options.map((title, index) => (
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


export function OptionsFieldCreator(props) {
    const set = props.set
    const [label, setLabel] = React.useState(null)
    const [title, setTitle] = React.useState(null)
    const [options, setoptions] = React.useState([])

    function addTitle(title) {
        if (!title)
            return
        set({
            label: label, class: OptionsFieldClass, options: [...options, title], value: null
        })
        setoptions([...options, title])
        setTitle(null)
    }
    function addLabel(label) {
        set({
            label: label, class: OptionsFieldClass, options: options, value: null
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
                options?.map((addedTitle, index) => (
                    <View key={index} >
                        <Text>{addedTitle}</Text>
                    </View>
                ))
            }

            <TextInput style={{ fontSize: 12, borderWidth: 1 }}
                value={title}
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
    const field = props.field
    const dispatch = props.dispatch
    const [options, setoptions] = React.useState(field.options)
    const [label, setlabel] = React.useState(field.label)

    const [visible, setVisible] = React.useState(false)

    function onTitleChange(title, index) {
        let changedArray = [...options]
        changedArray[index] = title
        setoptions(changedArray)
        dispatch({
            label: label, class: OptionsFieldClass, options: options, value: null
        })
    }


    return <View style={{ marginVertical: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>حقل اختياري</Text>
        </View>
        <TextInput style={{ fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderColor: '#dec9c8', borderRadius: 7 }}
            onChangeText={(text) => {
                setlabel(text)
                dispatch({
                    label: text, class: OptionsFieldClass, options: options, value: null
                })
            }}
            value={field.label}
        />
        <View >
            <View style={{ padding: 5 }}>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <View style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5, textAlign: 'center', padding: 7, fontSize: 18 }}>
                        {field.options.map((title, index) => (
                            <Text key={index}>{title}</Text>
                        ))}
                    </View>
                </TouchableOpacity>
            </View>

            <ModalWrapper visible={visible}>

                <View>
                    {options.map((title, index) => (
                        <TextInput key={index} style={{ fontSize: 12, borderWidth: 1 }}
                            onChangeText={(text) => {
                                onTitleChange(text, index)
                            }}
                            value={title}
                        />
                    ))}
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                    <Pressable
                        onPress={() => setVisible(!visible)}
                    >
                        <Text >اغلاق</Text>
                    </Pressable>

                </View>

            </ModalWrapper>
        </View >
    </View>
}
