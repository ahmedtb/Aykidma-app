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

import { AuthContext } from '../../StateManagment/AuthState'
import LoadingIndicator from '../components/loadingIndicator'
import { fetchMyServices } from '../../utilityFunctions/apiCalls'
import { Feather } from '@expo/vector-icons';
import RefreshScrollView from '../components/RefreshScrollView'
import useIsMountedRef from '../../utilityFunctions/useIsMountedRef'

const RenderServiceCard = (props) => {
    const image = props.image;
    const title = props.title;
    const price = props.price
    const rating = props.rating
    // const servicePrice = props.servicePrice
    return (
        <View style={{ flexDirection: 'row', margin: 10, width: '70%' }}>
            <Image source={{ uri: 'data:image/png;base64,' + image }} style={{ width: 100, height: 100 }} />

            <View style={{ margin: 10 }}>
                <Text style={styles.serviceTitle}>{title}</Text>
                <Text style={{ color: 'red' }}>سعر العروض{price}</Text>
                {/* <Text style={{ color: 'red' }}>سعري{servicePrice}</Text> */}

                <Text style={{ color: 'red' }}>التقييم: {rating}</Text>

            </View>
        </View>
    )
}


export default function ServiceScreen({ navigation }) {
    const isMountedRef = useIsMountedRef()
    const [Services, setServices] = useState(null);
    const [loading, setLoading] = useState(false);

    async function setupServices() {
        if (isMountedRef.current)
            setLoading(true);
        try {

            const data = await fetchMyServices()
            if (isMountedRef.current)
                setServices(data);
        } catch (error) {

        }
        if (isMountedRef.current)

            setLoading(false)
    }

    useEffect(() => {
        setupServices()
    }, [])


    return (
        <View style={styles.container}>

            <RefreshScrollView refreshFunction={setupServices} style={{ padding: 20 }}>

                {
                    (Services) ?
                        Services.map(
                            (service, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate('ViewServiceScreen', { service: service })} style={styles.serviceCard}>
                                        <RenderServiceCard
                                            image={service.image}
                                            title={service.title}
                                            price={service.meta_data?.price}
                                            rating={service.meta_data?.rating}
                                        // servicePrice={service.meta_data?.cost}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        ) : (null)
                }



                {/* this is for bottom spaceing */}
                <View style={{ height: 50 }}></View>

            </RefreshScrollView >

            <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('AddNewService') }} >
                    <Feather name="plus-circle" size={50} color="red" />
                </TouchableOpacity>
            </View>
            <LoadingIndicator visibility={loading} />


        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingBottom: 10,
    },
    serviceCard: {
        borderWidth: 1, marginVertical: 10,
        borderRadius: 10,
        borderColor: 'red',
    },
    serviceTitle: {
        fontSize: 20,
        // textAlign:'justify',
    }
});
