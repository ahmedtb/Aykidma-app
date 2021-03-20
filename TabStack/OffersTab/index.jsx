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
            <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', borderBottomWidth: 1, borderTopWidth: 1, backgroundColor: 'red' }}>
                {/* <Ionicons style={{ flex: .1, margin: 20 }} name="menu-outline" size={45} color="black" /> */}
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: 'white' }}>كافة العروض</Text>
            </View>

            <ScrollView style={{ padding: 20 }}>

                <TouchableOpacity onPress={() => navigation.navigate('OfferDetailsScreen',{service:1} )} style={{ borderWidth: 1, marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        {/* <Image source={require('../../resources/cleanHouse.jpg')} style={{ width: 100, height: 100 }} /> */}
                        <Image source={{uri:'https://static.seattletimes.com/wp-content/uploads/2018/11/cleaning_1111-780x520.jpg'}} style={{ width: 100, height: 100 }} />
                        
                        <View style={{ margin: 10 }}>
                            <Text style={{fontSize:15}}>عروض التنظيف لشهر رمضان المبارك</Text>
                            <Text style={{ color: 'red' }}>300 جنيه</Text>
                        </View>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('OfferDetailsScreen',{service:2} )} style={{ borderWidth: 1, marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Image source={{uri: 'https://www.end-of-tenancy-london.co.uk/wp-content/uploads/2018/02/car-interior-cleaning.jpg?x53702'}} style={{ width: 100, height: 100 }} />
                       
                        <View style={{ margin: 10 }}>
                            <Text>غسيل صالونات السيارات</Text>
                            <Text style={{ color: 'red' }}>300 جنيه</Text>
                        </View>
                    </View>
                </TouchableOpacity>


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
        marginTop: StatusBar.currentHeight,
    },
});
