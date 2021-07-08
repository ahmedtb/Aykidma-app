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
    const CustomFields = (props) => <View>
        {
            fields.map((field, fieldIndex) => {
                if (field.type === 'string') {
                    return (
                        <View key={fieldIndex} style={{marginVertical:5}}>
                            <Text style={{ fontSize: 20, fontWeight:'bold' }}>{field.label}</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                
                                value={field.value}
                                editable={false}
                            />
                        </View>
                    )
                } else if (field.type === 'textarea') {
                    return (
                        <View key={fieldIndex} style={{marginVertical:5}}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
                            {(field.subLabel) ? (<Text style={{ fontSize: 12 }}>{field.subLabel}</Text>) : (null)}
                            <TextInput
                                multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                
                                value={field.value}
                            />
                        </View>
                    )
                } else if (field.type === 'options') {
                    return (
                        <View key={fieldIndex} style={{marginVertical:5}}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
                            {field.titles.map((title, index) => (
                                <Text key={index} style={{ fontSize: 15, textAlign:'center' }}>
                                    {title}
                                </Text>
                            ))}
                        </View>
                    )
                } else if (field.type === 'location') {
                    return (
                        <View key={fieldIndex} style={{marginVertical:5}}>
                            <View style={{ margin: 8 }}>
                                <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>{field.label}</Text>
                            </View>
                            <Image source={require('../../../resources/MapIcon.png')} style={{ width: 100, height: 100,alignSelf: 'center', }} />
                        </View>
                    )
                } else if (field.type == 'image') {
                    return (
                        <View key={fieldIndex} style={{marginVertical:5}}>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
                            <View style={{ alignItems: 'center', justifyContent: 'center', padding:20, borderWidth: 1, borderRadius:10 }}>
                                <AntDesign name="camerao" size={75} color="black" />
                            </View>
                        </View>
                    )
                }
                return null;
            })
        }
    </View>
    return (
        <View >
            <CustomFields />
        </View>
    );
}

export default ViewFormFields;