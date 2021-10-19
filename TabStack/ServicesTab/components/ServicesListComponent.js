import React, { useEffect, useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import LoadingIndicator from '../../../components/loadingIndicator'


import RefreshScrollView from '../../../components/RefreshScrollView'
import { fetchServices,logError } from '../../../utilityFunctions/apiCalls'
import useIsMountedRef from '../../../components/useIsMountedRef'

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
export default function ServicesListComponent(props) {
    const navigation = useNavigation()
    const isMountedRef = useIsMountedRef()

    const focus = props.focus
    const focusHere = props.focusHere
    const unFocusFromHere = props.unFocusFromHere

    const [services, setServices] = useState(null);
    const [loading, setLoading] = useState(false);

    async function setupServices() {
        try {
            setLoading(true)
            const data = await fetchServices()
            if (isMountedRef.current) {
                setServices(data)
                setLoading(false)
            }
        } catch (error) {
            logError(error)
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
        <View>

            <RefreshScrollView refreshFunction={setupServices} style={{ padding: 10 }}>
                {
                    (focus && services) ?
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
                <View style={{ height: 150 }}></View>

            </RefreshScrollView >


            <LoadingIndicator visibility={loading} />


        </View >

    );
}

const styles = StyleSheet.create({

    serviceCard: {
        borderWidth: 1, marginVertical: 10,
        borderRadius: 10,
        borderColor: 'red',
    },
    serviceTitle: {
        fontSize: 20,
    }
});
