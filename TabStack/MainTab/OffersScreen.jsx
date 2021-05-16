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
    TouchableOpacity
} from 'react-native';
import LoadingIndicator from '../components/loadingIndicator'

import { fetchOffersByCategory } from '../../utilityFunctions/apiCalls'
import logError from '../../utilityFunctions/logError'

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

export default function OffersScreen({ navigation, route }) {
    const category = route.params.category

    const [offers, setOffers] = React.useState([])
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {

        fetchOffersByCategory(category.id).then((data) => {
            setOffers(data)
            // console.log(data)
            setLoading(false)
        }).catch((error) => logError(error))
    }, [])

    const navigateToDetails = (offer) => {
        navigation.navigate('OfferProcedureStack', {
            screen: 'OfferDetailsScreen', params: { offer: offer }
        })
    }

    return (

        <View style={styles.container}>

            <ScrollView style={{ padding: 20 }}>

                {(offers) ? offers.map((offer, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => navigateToDetails(offer)} style={styles.offerCard}>
                            <RenderOfferCard image={offer.image} title={offer.title} price={offer.meta_data?.price} />
                        </TouchableOpacity>
                    )
                }) : (null)}

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
