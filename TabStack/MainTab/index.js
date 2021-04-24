import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    ScrollView
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FrontScreen from './FrontScreen';
import OffersScreen from './OffersScreen';
import OfferDetailsScreen from './OfferDetailsScreen';
import AddNewScreen from './AddNewScreen';
import FormScreen from './FormScreen';
import ServiceProviderScreen from './ServiceProviderScreen';

const Stack = createStackNavigator();

// play store service apps examples:
// https://www.youtube.com/watch?v=5bieNOHO1Cg
// https://www.youtube.com/watch?v=h0ck8N7f6Ko
// https://www.youtube.com/watch?v=jOt1x43M8CM&t=1s

export default function MainTab() {
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
            <Stack.Screen name="FrontScreen" component={FrontScreen}
                options={{ title: '' }}

            />
            <Stack.Screen name="OffersScreen" component={OffersScreen}
                options={{ title: 'العروض' }}
            />
            <Stack.Screen name="OfferDetailsScreen" component={OfferDetailsScreen}
                options={{ title: 'نظافة منزلية' }}
            />
            <Stack.Screen name="AddNewScreen" component={AddNewScreen}
                options={{ title: 'إضافة طلب جديد' }}
            />
            <Stack.Screen name="FormScreen" component={FormScreen}
                options={{ title: 'املأ الطلب' }}
            />
            <Stack.Screen name="ServiceProviderScreen" component={ServiceProviderScreen}
                options={{ title: 'عمرو محمد عبد الله' }}
            />


        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({

});
