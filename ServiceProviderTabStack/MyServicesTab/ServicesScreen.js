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

const RenderServiceCard = (props) => {
    const image = props.image;
    const title = props.title;
    const price = props.price
    const rating = props.rating
    const servicePrice = props.servicePrice
    return (
        <View style={{ flexDirection: 'row', margin: 10, width: '70%' }}>
            <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />

            <View style={{ margin: 10 }}>
                <Text style={styles.serviceTitle}>{title}</Text>
                <Text style={{ color: 'red' }}>سعر العروض{price}</Text>
                <Text style={{ color: 'red' }}>سعري{servicePrice}</Text>

                <Text style={{ color: 'red' }}>التقييم: {rating}</Text>

            </View>
        </View>
    )
}

import { fetchServices } from '../../utilityFunctions/apiCalls'
import { Feather } from '@expo/vector-icons';

export default function ServiceScreen({ navigation }) {
    const { providerAuth } = useContext(AuthContext)
    const [Services, setServices] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices(providerAuth.token).then(data => {
            setServices(data);
            setLoading(false);
        })
    }, [])


    return (
        <View style={styles.container}>

            <ScrollView style={{ padding: 20 }}>

                {
                    (Services) ?
                        Services.map(
                            (service, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate('serviceDetailsScreen', { service: service })} style={styles.serviceCard}>
                                        <RenderServiceCard
                                            image={service.offer.image}
                                            title={service.offer.title}
                                            price={service.offer.meta_data?.price}
                                            rating={service.meta_data?.rating}
                                            servicePrice={service.meta_data?.cost}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        ) : (null)
                }



                {/* this is for bottom spaceing */}
                <View style={{ height: 50 }}></View>

            </ScrollView>

            <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('AddNewService') }} >
                    <Feather name="plus-circle" size={50} color="red" />
                </TouchableOpacity>
            </View>
            {/* <LoadingIndicator visibility={loading} /> */}


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
