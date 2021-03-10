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
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import FrontScreen from './FrontScreen';
import AddNewScreen from './AddNewScreen';
import FormScreen from './FormScreen';

const Stack = createStackNavigator();

// play store service apps examples:
// https://www.youtube.com/watch?v=5bieNOHO1Cg
// https://www.youtube.com/watch?v=h0ck8N7f6Ko
// https://www.youtube.com/watch?v=jOt1x43M8CM&t=1s

export default function MainTab() {
    return (
        <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
                // headerShown: false,
            })}
        >
            <Stack.Screen name="FrontScreen" component={FrontScreen}
            // options={{ title: 'Overview' }}

            />
            <Stack.Screen name="AddNewScreen" component={AddNewScreen}
                options={{ title: 'إضافة طلب جديد' }}
            />
            <Stack.Screen name="FormScreen" component={FormScreen} 
                options={{ title: 'املأ الطلب' }}

            />

        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({

});
