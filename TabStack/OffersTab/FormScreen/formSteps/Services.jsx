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

import Providers_Services from '../../jsons/Providers_Services.json'

import SPs_json from '../../jsons/SPs.json'
const SPs = SPs_json;
import { useNavigation } from '@react-navigation/native';

function filterServices(offer_id) {
    return Providers_Services.filter((service, index) => {
        if (service.offer_id == offer_id)
            return true
        else
            return false
    });
}

function getServices(SPs) {
    return Providers_Services.filter((service) => {

        return SPs.map((SP_id) => {
            if (service.SP_id == SP_id)
                return true
            else
                return false
        });
    });
}

const Services = (props) => {
    const navigation = useNavigation();
    const [SP_field, dispatch] = props.ReducerState;
    const services = getServices(SP_field.SPs)

    const [choice, setChoice] = useState(null);

    const ServicesChoices = (props) =>
    
        <ScrollView>
            {
                services.map(
                    (service, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('ServiceProviderScreen')} style={{ flexDirection: 'row', borderWidth: 1, margin: 10 }}>
                            <Image source={{ uri: service.SP.image }} style={{ flex: 0.5 }} />
                            <View style={{ margin: 10, flex: 1 }}>
                                <Text>{service.SP.name}</Text>
                                <View style={{ alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: 'yellow' }}>
                                    <AntDesign name="staro" size={15} color="black" />
                                    <AntDesign name="staro" size={15} color="black" />
                                    <AntDesign name="staro" size={15} color="black" />
                                    <AntDesign name="staro" size={15} color="black" />
                                    <AntDesign name="staro" size={15} color="black" />
                                    <Text>تقييم {service.SP.rating}</Text>
                                </View>
                                <Text style={{ color: 'red' }}>{service.meta_data.description}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                dispatch({ type: 'change', payload: { name: 'testingSPs', value: service.id } });
                                setChoice(service.id);
                            }
                            } style={{ justifyContent: 'center', paddingHorizontal: 25, paddingVertical: 10, alignSelf: 'center', borderRadius: 10 }}>
                                <View>
                                    {(choice == service.id) ?
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
            <ServicesChoices />
        </View>
    );
}

export default Services;