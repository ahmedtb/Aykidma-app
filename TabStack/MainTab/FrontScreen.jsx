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

export default function FrontScreen({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={require('../resources/background.jpg')} style={{ alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width, height: Dimensions.get('window').width / 1.77, alignSelf: 'center' }}>
                <Image source={require('../resources/Aykidma.png')} style={{ width: 100 * 2.4, height: 100 }} />

                <Text style={{ fontSize: 20 }}>اطلب خدمتك الان</Text>
            </ImageBackground>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}>
                <TextInput style={{ flex: 3 }} />
                <FontAwesome5 style={{ flex: 1, }} name="search-location" size={24} color="black" />
            </View>

            <View style={styles.servicesContainer} >

                <TouchableOpacity onPress={() => navigation.navigate('AddNewScreen')}>

                    <View style={styles.serviceBox}>
                        <Image source={require('../resources/carWashing.png')} style={{ width: 100, height: 100 }} />
                        <Text style={styles.serviceLabel} >غسيل سيارات</Text>
                    </View>
                </TouchableOpacity>


                <View style={styles.serviceBox}>
                    <Image source={require('../resources/cleanHouse.jpg')} style={{ width: 100, height: 100 }} />
                    <Text style={styles.serviceLabel}>تنظيف مكتب</Text>
                </View>

                <View style={styles.serviceBox}>
                    <Image source={require('../resources/carpet-cleaning-service.png')} style={{ width: 100, height: 100 }} />
                    <Text style={styles.serviceLabel}>تنظيف سجاد</Text>
                </View>

                <View style={styles.serviceBox}>
                    <Image source={require('../resources/cleanPool.webp')} style={{ width: 100, height: 100 }} />
                    <Text style={styles.serviceLabel} >تنظيف احواض سباحة</Text>
                </View>

                <View style={styles.serviceBox}>
                    <Image source={require('../resources/cleanGlasses.webp')} style={{ width: 100, height: 100 }} />
                    <Text style={styles.serviceLabel} >تنظيف واجهات</Text>
                </View>

                <View style={styles.serviceBox}>
                    <Image source={require('../resources/Anti-pest.png')} style={{ width: 100, height: 100 }} />
                    <Text style={styles.serviceLabel} >مكافحة الافات</Text>
                </View>
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
