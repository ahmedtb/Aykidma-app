import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    Pressable,
    TouchableOpacity,
    Modal
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
// import ListOptions from '../components/ListOptions'
// import LocationPicker from '../components/LocationPicker'
// import ImagePicker from '../components/ImagePicker'

import { useNavigation } from '@react-navigation/native';

const ViewFormFields = (props) => {
    const navigation = useNavigation();

    const fields = props.fields;
    const CustomFields = (props) => <ScrollView>
        {
            fields.map((field, fieldIndex) => {
                if (field.type === 'string') {
                    return (
                        <View key={fieldIndex}>
                            <Text style={{ fontSize: 12 }}>{field.label}</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                onChangeText={(text) => {
                                }}
                                value={field.value}
                            />
                        </View>
                    )
                } else if (field.type === 'textarea') {
                    return (
                        <View key={fieldIndex}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
                            {(field.subLabel) ? (<Text style={{ fontSize: 12 }}>{field.subLabel}</Text>) : (null)}

                            <View
                                style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5, padding: 20 }}
                            />
                        </View>
                    )
                } else if (field.type === 'options') {
                    return (
                        <View key={fieldIndex}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
                            <Text>خيارات حقل الاحتيار</Text>
                            {field.titles.map((title, index) => (
                                <Text key={index} style={{ fontSize: 12, borderWidth: 1 }}>
                                    {title}
                                </Text>
                            ))}
                        </View>
                    )
                } else if (field.type === 'location') {
                    return (
                        <View key={fieldIndex} >
                            <View style={{ margin: 8 }}>
                                <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', borderBottomWidth: 1, }}>{field.label}</Text>
                            </View>
                            <Text>here we should pick the location</Text>
                            {/* <LocationPicker
                                onChange={
                                    (value) => {
                                    }
                                }
                                value={field.value}
                            /> */}
                        </View>
                    )
                } else if (field.type == 'image') {
                    return (
                        <View key={fieldIndex}>
                            <Text>حقل اختيار صورى</Text>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1 }}>
                                <AntDesign name="camerao" size={75} color="black" />
                            </View>
                        </View>
                    )
                }
                return null;
            })
        }
    </ScrollView>
    return (
        <View style={{ padding: 25 }}>
            <CustomFields />
        </View>
    );
}

export default ViewFormFields;