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
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import ListOptions2 from '../ListOptions2'
import LocationPicker from '../LocationPicker'
import ImagePicker from '../ImagePicker'

const Second = (props) => {
    const [fields, dispatch] = props.ReducerState;
    const CustomFields = (props) => <ScrollView>
        {
            fields.map((field, index) => {
                if (field.type === 'string') {
                    return (
                        <View key={index}>
                            <Text style={{ fontSize: 12 }}>{field.label}</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                onChangeText={(text) => {
                                    dispatch({ type: 'change', payload: { name: field.name, value: text } })
                                }}
                                value={field.value}
                            />
                        </View>
                    )
                } else if (field.type === 'textarea') {
                    return (
                        <View key={index}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
                            {(field.subLabel) ? (<Text style={{ fontSize: 12 }}>{field.subLabel}</Text>) : (null)}

                            <TextInput
                                multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                onChangeText={(text) => {
                                    dispatch({ type: 'change', payload: { name: field.name, value: text } })
                                }}
                                value={field.value}
                            />
                        </View>
                    )
                } else if (field.type === 'options') {
                    return (
                        <View key={index}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
                            <ListOptions2
                                onChange={
                                    (option) => {
                                        dispatch({ type: 'change', payload: { name: field.name, value: option } })
                                    }
                                }
                                choice={field.value}
                                list={field.titles} label='اختر' />
                        </View>
                    )
                } else if (field.type === 'location') {
                    return (
                        <View key={index} >
                            <View style={{ margin: 8 }}>
                                <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', borderBottomWidth: 1, }}>{field.label}</Text>
                            </View>
                            <LocationPicker
                                onChange={
                                    (value) => {
                                        dispatch({ type: 'change', payload: { name: field.name, value: value } })
                                    }
                                }
                                value={field.value}
                            />
                        </View>
                    )
                } else if (field.type == 'image') {
                    return (
                        <View key={index}>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{field.label}</Text>
                            <ImagePicker
                                onChange={
                                    (imageUri) => {
                                        // console.log(imageUri)
                                        dispatch({ type: 'change', payload: { name: field.name, value: imageUri } })
                                    }
                                }
                                value={field.value}
                                style={{ marginVertical: 5, borderRadius: 10, padding: 50 }}
                            />
                        </View>
                    )
                } else if (field.type == 'SPs') {
                    const [choice, setChoice] = useState(null);
                    return field.SPs.map(
                        (SP, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('ServiceProviderScreen')} style={{ flexDirection: 'row', borderWidth: 1, margin: 10 }}>
                                <Image source={{ uri: 'https://www.safetyandhealthmagazine.com/ext/resources/images/news/government/aging-construction-worker.jpg?1475267293' }} style={{ width: 50, height: 125 }} />
                                <View style={{ margin: 10, flex: 1 }}>
                                    <Text>{SP.name}</Text>
                                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: 'yellow' }}>
                                        <AntDesign name="staro" size={15} color="black" />
                                        <AntDesign name="staro" size={15} color="black" />
                                        <AntDesign name="staro" size={15} color="black" />
                                        <AntDesign name="staro" size={15} color="black" />
                                        <AntDesign name="staro" size={15} color="black" />
                                        <Text>تقييم 33</Text>
                                    </View>
                                    <Text style={{ color: 'red' }}>صيانة تشطيب ترتيب</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    dispatch({ type: 'change', payload: { name: field.name, value: SP.id } });
                                    setChoice(SP.id);
                                }
                                } style={{ justifyContent: 'center', paddingHorizontal: 25, paddingVertical: 10, alignSelf: 'center', borderRadius: 10 }}>
                                    <View>
                                        {(choice == SP.id) ?
                                            (<AntDesign name="check" size={50} color="black" />)

                                            :
                                            (<Ionicons name={"radio-button-off"} size={24} color="black" />)
                                        }
                                    </View>
                                </TouchableOpacity>

                            </TouchableOpacity>
                        )
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

export default Second;