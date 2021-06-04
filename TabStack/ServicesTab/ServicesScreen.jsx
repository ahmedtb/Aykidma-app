import React, { useEffect, useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    Button,
    StatusBar,
    TouchableOpacity
} from 'react-native';

import axios from 'axios'
import { AuthContext } from '../../StateManagment/AuthState'
import LoadingIndicator from '../components/loadingIndicator'

const RenderServiceCard = (props) => {
    const image = props.image;
    const title = props.title;
    const price = props.price

    return (
        <View style={{ flexDirection: 'row', margin: 10, width: '70%' }}>
            <Image source={{ uri: 'data:image/png;base64,' + image }} style={{ width: 100, height: 100 }} />

            <View style={{ margin: 10 }}>
                <Text style={styles.serviceTitle}>{title}</Text>
                <Text style={{ color: 'red' }}>{price}</Text>
            </View>
        </View>
    )
}

import RefreshScrollView from '../components/RefreshScrollView'
import { fetchServices } from '../../utilityFunctions/apiCalls'

export default function ServicesScreen({ navigation }) {
    const { InspectAPIError } = React.useContext(AuthContext)
    const [services, setServices] = useState(null);
    const [loading, setLoading] = useState(true);

    async function setupServices() {
        try {
            const data = await fetchServices()
            setServices(data)
            setLoading(false)
        } catch (error) {
            InspectAPIError(error)
        }
    }

    useEffect(() => {
        setupServices()
    }, [])

    const navigateToDetails = (service) => {
        navigation.navigate('ServiceProcedureStack', {
            screen: 'ServiceDetailsScreen', params: { service: service }
        })
    }

    return (
        <View style={styles.container}>
            <RefreshScrollView refreshFunction={setupServices} style={{ padding: 20 }}>

                {
                    (services) ?
                        services.map(
                            (service, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => navigateToDetails(service)} style={styles.serviceCard}>
                                        <RenderServiceCard image={service.image} title={service.title} price={service.meta_data?.price} />
                                    </TouchableOpacity>
                                )
                            }
                        ) : (null)
                }

                {/* this is for bottom spaceing */}
                <View style={{ height: 50 }}></View>

            </RefreshScrollView >


            <LoadingIndicator visibility={loading} />


        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // marginTop: StatusBar.currentHeight,
        paddingBottom: 10,
    },
    serviceCard: {
        borderWidth: 1, marginVertical: 10,
        borderRadius: 10,
        borderColor: 'red',
    },
    serviceTitle: {
        fontSize: 20,
    }
});
