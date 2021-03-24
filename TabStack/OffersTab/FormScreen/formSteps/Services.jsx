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

import SPs_json from './SPs.json'
const SPs = SPs_json;
import { useNavigation } from '@react-navigation/native';

function filterServices(offer_id){

}

const Second = (props) => {
    const navigation = useNavigation();
    const offer_id = props.offer_id;
    const [fields, dispatch] = props.ReducerState;
    const CustomFields = (props) =>
        <ScrollView>
            {

                SPs.map(
                    (SP, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('ServiceProviderScreen')} style={{ flexDirection: 'row', borderWidth: 1, margin: 10 }}>
                            <Image source={{ uri: SP.imageUri }} style={{ flex: 0.5 }} />
                            <View style={{ margin: 10, flex: 1 }}>
                                <Text>{SP.name}</Text>
                                <View style={{ alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: 'yellow' }}>
                                    <AntDesign name="staro" size={15} color="black" />
                                    <AntDesign name="staro" size={15} color="black" />
                                    <AntDesign name="staro" size={15} color="black" />
                                    <AntDesign name="staro" size={15} color="black" />
                                    <AntDesign name="staro" size={15} color="black" />
                                    <Text>تقييم {SP.rating}</Text>
                                </View>
                                <Text style={{ color: 'red' }}>{SP.description}</Text>
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
        </ScrollView>
    return (
        <View style={{ padding: 25 }}>
            <CustomFields />
        </View>
    );
}

export default Second;