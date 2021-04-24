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
import { Icon } from 'react-native-elements'

import Providers_Services from '../../jsons/Providers_Services.json'

// import SPs_json from '../../jsons/SPs.json'
// const SPs = SPs_json;
import { useNavigation } from '@react-navigation/native';


const Services = (props) => {
    const navigation = useNavigation();
    const [fields, dispatch] = props.ReducerState;
    // const services = getServices(SP_field.SPs)
    const services = props.services

    const [choice, setChoice] = useState(null);

    const ServicesChoices = (props) =>

        <ScrollView>
            {
                services.map(
                    (service, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('ServiceScreen', { service: service })} style={{ flexDirection: 'row', borderWidth: 1, margin: 10 }}>
                            <Image source={{ uri: service.service_provider.image }} style={{ flex: 0.5 }} />
                            <View style={{ margin: 10, flex: 1 }}>
                                <Text>{service.service_provider.name}</Text>
                                <View style={{ alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: 'yellow' }}>
                                    <Icon name='g-translate' color='#00aced' />

                                    <Icon name='g-translate' color='#00aced' />

                                    <Icon name='g-translate' color='#00aced' />

                                    <Icon name='g-translate' color='#00aced' />

                                    <Icon name='g-translate' color='#00aced' />

                                    <Text>تقييم {service.meta_data.rating}</Text>
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
                                        (<Icon name='g-translate' color='#00aced' />)

                                        :
                                        (<Icon name='g-translate' color='#00aced' />)
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