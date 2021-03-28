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

const RenderOffersList = (props) => {
    const offers = props.offers
    const navigation = props.navigation

    useEffect(() => {

    }, [props.offers])

    if (!offers)
        return null

    return (
        offers.map(
            (offer, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate('OfferDetailsScreen', { offer: offer })} style={styles.offerCard}>
                        <View style={{ flexDirection: 'row', margin: 10, width: '70%' }}>
                            <Image source={{ uri: offer.image }} style={{ width: 100, height: 100 }} />

                            <View style={{ margin: 10 }}>
                                <Text style={styles.offerTitle}>{offer.title}</Text>
                                <Text style={{ color: 'red' }}>{offer.price}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }
        )
    )
}


const fetchOffers = async () => {
    try {
        let response = await axios.get('/api/offers')
        let data = await response.data
        return data
    } catch (error) {
        console.error(error.message + " at OffersScreen.jsx/fetchOffers function");
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
                <RenderOffersList offers={offers} navigation={navigation} />

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
