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
    TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

export default function OffersScreen({ navigation }) {
    return (
        <>
            <ScrollView style={{  flex: 1, }}>
                <Text style={{ textAlign: 'center', fontSize:25, fontWeight:'bold' }}>نظافة منزلية كاملة</Text>
                <Image source={require('../../resources/cleanHouse.jpg')} style={{ width: 200, height: 200, alignSelf: 'center' }} />
                <View style={{ padding: 20 }}>
                    <Text >
                        جديد من تاسكتي، خدمة لنظافة المنزلية الكاملة، والتي ينفذها مجموعة:{"\n"}
العرض يشمل:{"\n"}
* تنظيف 7 وحدات (3 غرف + ){"\n"}
* الحمامات غسي الحمامات،{"\n"}

                    </Text>
                </View>

            </ScrollView>

            <TouchableOpacity onPress={() => navigation.navigate('FormScreen')} style={{ backgroundColor: 'red', flexDirection: 'row', margin:10, padding:10, borderRadius:10 }}>
                <Text style={{ textAlign: 'center', flex: 1, color:'white', fontSize:20 }}>إبدا الان</Text>
                {/* <AntDesign name="caretleft" size={24} color="black" /> */}
            </TouchableOpacity>
        </>
    );
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});
