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

function OffersScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', borderBottomWidth: 1, borderTopWidth: 1, backgroundColor: 'red' }}>
                <Ionicons style={{ flex: .1, margin: 20 }} name="menu-outline" size={45} color="black" />
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: 'white' }}>كافة العروض</Text>
            </View> */}

            <ScrollView style={{ padding: 20 }}>

                <TouchableOpacity onPress={() => navigation.navigate('OfferDetailsScreen',{offer:1} )} style={styles.offerCard}>
                    <View style={{  flexDirection: 'row', margin: 10, width:'70%'}}>
                        {/* <Image source={require('../../resources/cleanHouse.jpg')} style={{ width: 100, height: 100 }} /> */}
                        <Image source={{uri:'https://static.seattletimes.com/wp-content/uploads/2018/11/cleaning_1111-780x520.jpg'}} style={{ width: 100, height: 100 }} />
                        
                        <View style={{ margin: 10,  }}>
                            <Text style={styles.offerTitle}>عروض التنظيف لشهر رمضان المبارك</Text>
                            <Text style={{ color: 'red' }}>300 جنيه</Text>
                        </View>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('OfferDetailsScreen',{offer:2} )} style={styles.offerCard}>
                    <View style={{  flexDirection: 'row', margin: 10, width:'70%'}}>
                        <Image source={{uri: 'https://www.end-of-tenancy-london.co.uk/wp-content/uploads/2018/02/car-interior-cleaning.jpg?x53702'}} style={{ width: 100, height: 100 }} />
                       
                        <View style={{ margin: 10 }}>
                            <Text style={styles.offerTitle}>غسيل صالونات السيارات</Text>
                            <Text style={{ color: 'red' }}>300 جنيه</Text>
                        </View>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('OfferDetailsScreen',{offer:3} )} style={styles.offerCard}>
                    <View style={{  flexDirection: 'row', margin: 10, width:'70%'}}>
                        <Image source={{uri: 'https://scontent.fmji1-1.fna.fbcdn.net/v/t1.0-9/162401705_1168100206969525_4678605220874723277_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=9267fe&_nc_ohc=YNHgciJmL6wAX9RRyIY&_nc_ht=scontent.fmji1-1.fna&oh=87a0570264a6a12bf73300ac46a8169f&oe=607BAC98'}} style={{ width: 100, height: 100 }} />
                       
                        <View style={{ margin: 10 }}>
                            <Text style={styles.offerTitle}>سيارة نقل بورتر حافظة لنقل اغرضكم الشخصية</Text>
                            <Text style={{ color: 'red' }}>300 جنيه</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('OfferDetailsScreen',{offer:4} )} style={styles.offerCard}>
                    <View style={{  flexDirection: 'row', margin: 10, width:'70%'}}>
                        <Image source={{uri: 'https://scontent.fmji1-1.fna.fbcdn.net/v/t1.0-9/161046382_777648833127560_8437564257839968440_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=825194&_nc_ohc=UHo9dO0aUjMAX_WPcw8&_nc_ht=scontent.fmji1-1.fna&oh=a4288bd2fe56a74e44e0850c1b83193d&oe=607C328C'}} style={{ width: 100, height: 100 }} />
                       
                        <View style={{ margin: 10 }}>
                            <Text style={styles.offerTitle}>خدمات طلاء</Text>
                            <Text style={{ color: 'red' }}>300 جنيه</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('OfferDetailsScreen',{offer:5} )} style={styles.offerCard}>
                    <View style={{  flexDirection: 'row', margin: 10, width:'70%'}}>
                        <Image source={{uri: 'https://scontent.fmji1-1.fna.fbcdn.net/v/t1.0-9/159316826_1162178994228313_7413538856658560435_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=9267fe&_nc_ohc=6Zflkfk_HloAX91xR2o&_nc_ht=scontent.fmji1-1.fna&oh=da01d63b4c89e03a9f7fcbfdfa3eaf59&oe=607D5B41'}} style={{ width: 100, height: 100 }} />
                       
                        <View style={{ margin: 10 }}>
                            <Text style={styles.offerTitle}>تجديد وترميم الحمامات والمطابخ</Text>
                            <Text style={{ color: 'red' }}>300 جنيه</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('OfferDetailsScreen',{offer:6} )} style={styles.offerCard}>
                    <View style={{  flexDirection: 'row', margin: 10, width:'70%'}}>
                        <Image source={{uri: 'https://cache-landingpages-images.services.handy.com/2018/10/30/03/35/42/c0565f0f-d9b9-4273-87be-c1890dd997f9/woman-cleaning-oven-in-kitchen-closeup-picture-id942141666.jpg'}} style={{ width: 100, height: 100 }} />
                       
                        <View style={{ margin: 10 }}>
                            <Text style={styles.offerTitle}>صيانة وتنظيف وتجديد أفران الغاز والكهربائية</Text>
                            <Text style={{ color: 'red' }}>300 جنيه</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{height:50}}></View>

            </ScrollView>

        </View>

    );
}

import { createStackNavigator } from '@react-navigation/stack';
import OfferDetailsScreen from './OfferDetailsScreen';
import FormScreen from './FormScreen'

const Stack = createStackNavigator();

export default function OffersTab() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen name="OffersScreen" component={OffersScreen}
                options={{ title: 'كل العروض' }}
            />
            <Stack.Screen name="OfferDetailsScreen" component={OfferDetailsScreen}
                options={{ title: 'تفاصيل العرض' }}
            />
            <Stack.Screen name="FormScreen" component={FormScreen}
                options={{ title: 'املأ الطلب' }}
            />


        </Stack.Navigator>
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
        borderRadius:10,
        borderColor:'red',
    },
    offerTitle: {
        fontSize:20,
        // textAlign:'justify',
    }
});
