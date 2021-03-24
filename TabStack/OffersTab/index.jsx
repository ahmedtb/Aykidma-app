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




import { createStackNavigator } from '@react-navigation/stack';
import OffersScreen from './OffersScreen'
import OfferDetailsScreen from './OfferDetailsScreen';
import FormScreen from './FormScreen'
import ServiceProviderScreen from './ServiceProviderScreen'

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

            <Stack.Screen name="ServiceProviderScreen" component={ServiceProviderScreen}
                options={{ title: 'مزود خدمة' }}
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
        borderRadius: 10,
        borderColor: 'red',
    },
    offerTitle: {
        fontSize: 20,
        // textAlign:'justify',
    }
});
