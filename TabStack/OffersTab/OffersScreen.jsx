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
import LoadingIndicator from '../components/loadingIndicator'
import offers_json from './jsons/offers.json'


const RenderOfferCard = (props) => {
    const image = props.image;
    const title = props.title;
    const price = props.price

    return (
        <View style={{ flexDirection: 'row', margin: 10, width: '70%' }}>
            <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />

            <View style={{ margin: 10 }}>
                <Text style={styles.offerTitle}>{title}</Text>
                <Text style={{ color: 'red' }}>{price}</Text>
            </View>
        </View>
    )
}


const fetchOffers = async () => {
    try {
        let response = await axios.get('/api/offers')
        let data = await response.data
        return data
    } catch (error) {
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
    }
    return null
}

export default function OffersScreen({ navigation }) {
    const [offers, setOffers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOffers().then(data => {
            setOffers(data);
            setLoading(false);
        })
    }, [])


    return (
        <View style={styles.container}>

            <ScrollView style={{ padding: 20 }}>

                {
                    (offers) ?
                        offers.map(
                            (offer, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate('OfferDetailsScreen', { offer: offer })} style={styles.offerCard}>
                                        <RenderOfferCard image={offer.meta_data.image} title={offer.title} price={offer.meta_data.price} />
                                    </TouchableOpacity>
                                )
                            }
                        ) : (null)
                }

                {/* this is for bottom spaceing */}
                <View style={{ height: 50 }}></View>

            </ScrollView>


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
    offerCard: {
        borderWidth: 1, marginVertical: 10,
        borderRadius: 10,
        borderColor: 'red',
    },
    offerTitle: {
        fontSize: 20,
        // textAlign:'justify',
    }
});
