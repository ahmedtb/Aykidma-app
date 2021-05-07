import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    Button,
    TouchableOpacity,
    ProgressViewIOSComponent
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useLinkProps } from '@react-navigation/native';


const Stack = createStackNavigator();

export default function MoreTabStack() {
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
            <Stack.Screen name="enrollment" component={MoreTab}
                options={{ title: 'المزيد' }}
            />

        </Stack.Navigator>
    );
}

function MoreTab(props) {

    return (

        <View style={styles.container}>

            <Image source={require('../../resources/Aykidma.png')} style={{ width: 100 * 2.4, height: 100 }} />

            <Text style={{ fontSize: 30, backgroundColor: 'white', opacity: 0.7 }}>اطلب خدمتك الان</Text>

            <View style={styles.menuItem}>
                <Text style={styles.fieldLable} >الرئيسية</Text>
            </View>

            <View style={styles.menuItem}>
                <Text style={styles.fieldLable} >الاشعارات</Text>
            </View>

            <View style={styles.menuItem}>
                <Text style={styles.fieldLable} >طلباتي</Text>
            </View>

            <View style={styles.menuItem}>
                <Text style={styles.fieldLable} >المحفظة</Text>
            </View>

            <TouchableOpacity onPress={() => props.navigation.navigate('الملف الشخصي')} style={styles.menuItem}>
                <Text style={styles.fieldLable} >الملف الشخصي</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => props.navigation.navigate('الملف الشخصي')} style={styles.menuItem} >
                <Text style={styles.fieldLable} >تسجيل الدخول</Text>
            </TouchableOpacity>

            <View style={styles.menuItem}>
                <Text style={styles.fieldLable} >عن الشركة</Text>
            </View>

            <View style={{ margin: 10, flex: 1 }}>
                <Text style={styles.fieldLable} >اتصل بنا</Text>


            </View>


        </View>
    );
}


const styles = StyleSheet.create({
    enrollField: {
        borderWidth: 1, borderColor: 'grey', borderRadius: 5, padding: 10, fontSize: 20
    },

    menuItem: {
        margin: 10, flex: 1,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'pink'
    },

    fieldLable: {
        fontSize: 20,
        color: 'white',
    },

    container: {
        backgroundColor: 'red', borderWidth: 1, flex: 1, paddingHorizontal: 20
    },

})