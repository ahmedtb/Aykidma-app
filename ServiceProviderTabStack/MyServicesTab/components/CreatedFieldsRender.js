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

const CreatedFieldsRender = (props) => {

    const fields = props.fields;
    return (
        <View style={{ padding: 10 }}>
            <ScrollView>
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

                                    <TextInput
                                        multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                        onChangeText={(text) => {
                                        }}
                                        value={field.value}
                                    />
                                </View>
                            )
                        } else if (field.type === 'options') {
                            return (
                                <View key={fieldIndex}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
                                    <Text>here list of the options</Text>
                                    {
                                        field.titles.map((title, index) => (
                                            <Text key={index}>{title}</Text>
                                        ))
                                    }
                                </View>
                            )
                        } else if (field.type === 'location') {
                            return (
                                <View key={fieldIndex} >
                                    <View style={{ margin: 8 }}>
                                        <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', borderBottomWidth: 1, }}>{field.label}</Text>
                                    </View>
                                    <Text>here we should pick the location</Text>
                                    <Image source={require('../../../resources/MapIcon.png')} style={{ width: 100, height: 100 }} />
                                </View>
                            )
                        } else if (field.type == 'image') {
                            return (
                                <View key={fieldIndex}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
                                    <Text>this is a image picker fields</Text>
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
        </View>
    );
}

export default CreatedFieldsRender;