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
import OfferProcedureStack from '../components/OfferProcedureStack'

const Stack = createStackNavigator();


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
                },
                headerShown: false
            }}
        >
            <Stack.Screen name="FrontScreen" component={FrontScreen}
                options={{ title: '' }}

            />
            <Stack.Screen name="OffersScreen" component={OffersScreen}
                options={{ title: 'العروض' }}
            />

            <Stack.Screen name="OfferProcedureStack" component={OfferProcedureStack}
                options={{ title: 'العروض' }}
            />
            {/* <Stack.Screen name="OfferDetailsScreen" component={OfferDetailsScreen}
                options={{ title: 'نظافة منزلية' }}
            />
            <Stack.Screen name="FormScreen" component={FormScreen}
                options={{ title: 'املأ الطلب' }}
            />

            <Stack.Screen name="ServiceScreen" component={ServiceScreen}
                options={{ title: 'مزود خدمة' }}
            /> */}



        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({

});
