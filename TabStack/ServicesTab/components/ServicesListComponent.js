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
import { fetchServices } from '../../../utilityFunctions/apiCalls'
import { logError } from '../../../redux/AuthFunctions'
import useIsMountedRef from '../../../components/useIsMountedRef'
import ServicesList from '../../components/ServicesList'


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
            logError(error, 'ServicesListComponent')
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
                        <ServicesList services={services} onServiceClick={(service) => navigateToDetails(service)} /> : (null)
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
        elevation: 4,
        backgroundColor: 'white',
    },
    serviceTitle: {
        fontSize: 20,
    }
});
