import React from 'react'
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image
} from 'react-native'

import { FontAwesome5, FontAwesome, MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import LocationPicker from '../components/LocationPicker'
import LocationModal from '../components/LocationModal'
export const LocationFieldClass = 'App\\FieldsTypes\\LocationField'

export function LocationFieldInput(props) {
    const field = props.field
    const dispatch = props.dispatch

    return <View >
        <View style={{}}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', }}>{field.label}</Text>
        </View>
        <LocationPicker
            onChange={(value) => { dispatch(value) }}
            value={field.value}
        />
    </View>
}
export function LocationFieldRender(props) {
    const field = props.field

    return <View style={{ marginVertical: 5 }}>
        <View style={{ margin: 8 }}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>{field.label}</Text>
        </View>
        <Image source={require('../resources/MapIcon.png')} style={{ width: 100, height: 100, alignSelf: 'center', }} />
    </View>
}

export function LocationFieldFormView(props) {
    const [locationModalVisibility, setLocationModalVisibility] = React.useState(false)
    const field = props.field

    const value = field.value.latitude + ", " + field.value.longitude;
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
                <View style={{ marginLeft: 5 }}>
                    <Text style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{field.label}</Text>
                    <Text style={{ color: 'grey', fontSize: 10, }}>حقل اختيار صورة</Text>
                </View>
            </View>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#d1c5c5' }} onPress={() => setLocationModalVisibility(true)}>
                <Text style={{ color: 'blue', fontSize: 20, textAlign: 'center' }}>{value}</Text>
            </TouchableOpacity>
            <LocationModal
                visible={[locationModalVisibility, setLocationModalVisibility]}
                latitude={field.value.latitude} longitude={field.value.longitude}
            />
        </View>
    )
}


export function LocationFieldCreator(props) {
    const set = props.set
    return <View style={{ marginVertical: 10 }}>
        <Text>اكتب النص الذي يصف حقل تحديد الموقع للزبون</Text>
        <TextInput
            style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
            onChangeText={(text) => {
                set({
                    label: text, class: LocationFieldClass,
                    value: {
                        latitude: null,
                        longitude: null
                    }
                })
            }}
        />
        <Image source={require('../resources/MapIcon.png')} style={{ width: 100, height: 100 }} />

    </View>
}

export function LocationFieldEditor(props) {

    const field = props.field
    const dispatch = props.dispatch
    const [label, setlabel] = React.useState(field.label)
    // const [value, setvalue] = React.useState(field.value)

    return <View >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>حقل تحديد الموقع</Text>
        </View>

        <View style={{ margin: 8 }}>

            <TextInput style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderColor: '#dec9c8', borderRadius: 7 }}
                onChangeText={(text) => {
                    setlabel(text)
                    dispatch({
                        class: LocationFieldClass, label: text, value: field.value
                    })
                }}
                value={label}
                multiline={true}
            />
        </View>
        <Image source={require('../resources/MapIcon.png')} style={{ width: 100, height: 100 }} />
    </View>
}
