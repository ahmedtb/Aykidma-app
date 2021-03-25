import React from 'react';
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

import offers_json from './jsons/offers.json'

const RenderOffersList = (props) => {
    const offers = props.offers
    const navigation = props.navigation
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

export default function OffersScreen({ navigation }) {
    return (
        <View style={styles.container}>

            <ScrollView style={{ padding: 20 }}>
                <RenderOffersList offers={offers_json} navigation={navigation} />

                <View style={{ height: 50 }}></View>

            </ScrollView>

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
