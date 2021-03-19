import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    Pressable,
    TouchableOpacity,
    Modal
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import ListOptions2 from '../ListOptions2'

const Second = (props) => {
    const [fields, dispatch] = props.ReducerState;
    const CustomFields = (props) => <View>
        {
            fields.map((field, index) => {
                if (field.type === 'string') {
                    return (
                        <View key={index}>
                            <Text style={{ fontSize: 12 }}>{field.label}</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                onChangeText={(text) => {
                                    dispatch({ type: 'change_testingString', payload: { name: field.name, value: text } })
                                }}
                                value={field.value}
                            />
                        </View>
                    )
                } else if (field.type === 'textarea') {
                    return (
                        <View>
                            <Text style={{ fontSize: 12 }}>{field.label}</Text>
                            <TextInput
                                multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                onChangeText={(text) => {
                                    dispatch({ type: 'change_testingString', payload: { name: field.name, value: text } })
                                }}
                                value={field.value}
                            />
                        </View>
                    )
                } else if (field.type === 'options') {
                    return (
                        <>
                            <Text style={{ fontSize: 20 }}>{field.label}</Text>
                            <ListOptions2
                                onChange={
                                    (option) => {
                                        dispatch({ type: 'change_testingOptions', payload: { name: field.name, value: option } })
                                    }
                                }
                                choice={field.value}
                                list={field.titles} label='اختر منطقتك' />
                        </>
                    )
                }
                return null;
            })
        }
    </View>
    return (
        <View style={{ padding: 25 }}>
            <CustomFields />
        </View>
    );
}

export default Second;