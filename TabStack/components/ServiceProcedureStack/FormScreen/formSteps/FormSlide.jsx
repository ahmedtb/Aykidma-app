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
import ListOptions from '../components/ListOptions'
import LocationPicker from '../components/LocationPicker'
import ImagePicker from '../components/ImagePicker'

import { useNavigation } from '@react-navigation/native';

const FormFields = (props) => {
    const navigation = useNavigation();

    const [fields, dispatch] = props.ReducerState;

    // console.log(fields);
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
                                    dispatch({ actionType: 'change', fieldIndex:fieldIndex,  value: text  })
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

                            <TextInput
                                multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                onChangeText={(text) => {
                                    dispatch({ actionType: 'change', fieldIndex:fieldIndex,  value: text  })
                                }}
                                value={field.value}
                            />
                        </View>
                    )
                } else if (field.type === 'options') {
                    return (
                        <View key={fieldIndex}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
                            <ListOptions
                                onChange={
                                    (option) => {
                                        dispatch({ actionType: 'change', fieldIndex:fieldIndex,  value: option  })
                                    }
                                }
                                choice={field.value}
                                list={field.titles} label='اختر' />
                        </View>
                    )
                } else if (field.type === 'location') {
                    return (
                        <View key={fieldIndex} >
                            <View style={{ margin: 8 }}>
                                <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', borderBottomWidth: 1, }}>{field.label}</Text>
                            </View>
                            <LocationPicker
                                onChange={
                                    (value) => {
                                        dispatch({ actionType: 'change', fieldIndex:fieldIndex,  value: value  })
                                    }
                                }
                                value={field.value}
                            />
                        </View>
                    )
                } else if (field.type == 'image') {
                    return (
                        <View key={fieldIndex}>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
                            <ImagePicker
                                onChange={
                                    (image) => {
                                        // console.log(image)
                                        dispatch({ actionType: 'change', fieldIndex:fieldIndex,  value: image  })
                                    }
                                }
                                value={field.value}
                                style={{ marginVertical: 5, borderRadius: 10, padding: 50 }}
                            />
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

export default FormFields;