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
    Button
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function OffersScreen({ navigation }) {
    return (

        <ScrollView style={{   }}>

            <TouchableOpacity onPress={() => navigation.navigate('OfferDetailsScreen')} style={{ borderWidth: 1,  }}>
                    <View style={{ flexDirection: 'row', margin: 10}}>
                        <Image source={require('../../resources/cleanHouse.jpg')} style={{ width: 100, height: 100 }} />
                        <View style={{ margin: 10 }}>
                            <Text>نظافة منزلية كاملة</Text>
                            <Text style={{ color: 'red' }}>300 جنيه</Text>
                        </View>
                    </View>
            </TouchableOpacity>

            

        </ScrollView>

    );
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});
