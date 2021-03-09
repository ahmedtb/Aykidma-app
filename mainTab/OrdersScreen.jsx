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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

export default function OrdersScreen() {
    return (
        <ScrollView style={styles.container}>

            <View >

                <View style={{ borderWidth: 1 }}>
                    <Text style={{ fontSize: 20, padding: 10, margin: 10 }}>قائمة طلباتك</Text>
                </View>

                {/* <View style={{ borderWidth: 1 }}>
                    <Text style={{ fontSize: 20, padding: 10, margin: 10 }}>قائمة طلباتك</Text>
                </View> */}

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
})