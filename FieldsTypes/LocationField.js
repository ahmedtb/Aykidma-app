import React from 'react'
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

import { FontAwesome5, FontAwesome, MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';


export const LocationFieldClass = 'App\\FieldsTypes\\LocationField'

export function LocationFieldInput(props) {

    return <View key={fieldIndex} >
        <View style={{}}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', }}>{field.label}</Text>
        </View>
        <LocationPicker
            onChange={(value) => { dispatch({ actionType: 'change', fieldIndex: fieldIndex, value: value }) }}
            value={field.value}
        />
    </View>
}
export function LocationFieldRender(props) {

    return <View key={fieldIndex} style={{ marginVertical: 5 }}>
        <View style={{ margin: 8 }}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>{field.label}</Text>
        </View>
        {/* <Image source={require('../../../resources/MapIcon.png')} style={{ width: 100, height: 100, alignSelf: 'center', }} /> */}
    </View>
}

export function LocationFieldModalRender(props) {

    const value = field.value.latitude + ", " + field.value.longitude;
    return (
        <View key={index} style={{ ...styles.fieldRow }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, }}>
                <Entypo name="image" size={24} color="grey" />
                <View style={{ marginLeft: 5 }}>
                    <Text style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{label}</Text>
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

function RemoveFieldButton(props) {
    const deleteField = props.deleteField
    return (
        <TouchableOpacity onPress={() => deleteField()}>
            <AntDesign name="closecircleo" size={24} color="black" />
        </TouchableOpacity>
    )
}

export function LocationFieldCreator(props) {

    return <View style={{ marginVertical: 10 }}>
        <Text>اكتب النص الذي يصف حقل تحديد الموقع للزبون</Text>
        <TextInput
            style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
            onChangeText={(text) => {
                setFieldConfig({
                    label: text, type: 'location',
                    value: {
                        latitude: null,
                        longitude: null
                    }
                })
            }}
        />
        {/* <Image source={require('../../../resources/MapIcon.png')} style={{ width: 100, height: 100 }} /> */}

    </View>
}

export function LocationFieldEditor(props) {

    return <View key={fieldIndex} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>حقل تحديد الموقع</Text>
            <RemoveFieldButton deleteField={() => deleteField(fieldIndex)} />
        </View>

        <View style={{ margin: 8 }}>

            <TextInput style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderColor: '#dec9c8', borderRadius: 7 }}
                onChangeText={(text) => {
                    changeLabel(text, fieldIndex)
                }}
                value={field.label}
                multiline={true}
            />
        </View>
        {/* <Image source={require('../../../resources/MapIcon.png')} style={{ width: 100, height: 100 }} /> */}
    </View>
}
