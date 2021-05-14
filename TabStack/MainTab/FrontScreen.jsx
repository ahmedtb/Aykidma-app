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
    TouchableOpacity
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import { getAvailableCategories } from '../../utilityFunctions/apiCalls'

export default function FrontScreen({ navigation }) {

    const [categories, setCategories] = React.useState([])
    React.useEffect(() => {
        getAvailableCategories().then((data) => {
            setCategories(data)
        })
    }, [])

    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={require('../../resources/background.jpg')} style={{ alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width, height: Dimensions.get('window').width / 1.77, alignSelf: 'center' }}>
                <Image source={require('../../resources/Aykidma.png')} style={{ width: 100 * 2.4, height: 100 }} />

                <Text style={{ fontSize: 30, backgroundColor: 'white', opacity: 0.7 }}>اطلب خدمتك الان</Text>
            </ImageBackground>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}>
                <TextInput style={{ flex: 3 }} />
                <FontAwesome5 style={{ flex: 1, }} name="search-location" size={24} color="black" />
            </View>

            <View style={styles.servicesContainer} >

                {(categories) ? (
                    categories.map((category, index) => (
                        <TouchableOpacity key={index} style={styles.serviceBox} onPress={() => navigation.navigate('OffersScreen',{category:category})}>
                            <Image source={require('../../resources/carpet-cleaning-service.png')} style={{ width: 100, height: 100 }} />
                            <Text style={styles.serviceLabel} >{category.name}</Text>
                        </TouchableOpacity>
                    ))
                ) : (null)}

            </View>
        </ScrollView>

    );
}




const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center"
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '2%',
        borderWidth: 1,
        justifyContent: 'center'
        // justifyContent:'space-between'
    },
    serviceBox: {
        margin: '1%',
        borderWidth: 1,
        flexBasis: '30%',
        borderRadius: 5,
    },
    serviceLabel: {
        textAlign: 'center'
    }
});
