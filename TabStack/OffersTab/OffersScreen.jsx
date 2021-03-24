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
    StatusBar
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import offers_json from './offers.json'
const offers = offers_json;

export default function OffersScreen({ navigation }) {
    return (
        <View style={styles.container}>

            <ScrollView style={{ padding: 20 }}>
                {
                    offers.map((offer, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('OfferDetailsScreen', { offer: offer })} style={styles.offerCard}>
                                <View style={{ flexDirection: 'row', margin: 10, width: '70%' }}>
                                    <Image source={{ uri: offer.uri }} style={{ width: 100, height: 100 }} />

                                    <View style={{ margin: 10 }}>
                                        <Text style={styles.offerTitle}>{offer.title}</Text>
                                        <Text style={{ color: 'red' }}>{offer.price}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    )
                }

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
