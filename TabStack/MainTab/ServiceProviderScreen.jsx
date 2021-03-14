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
    Button
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ServiceProviderScreen({ navigation }) {
    return (
        <ScrollView style={{}}>


            <View style={{ flexDirection: 'row', margin: 20 }}>
                <Image source={require('../../resources/worker.jpg')} style={{ width: 50, height: 100 }} />
                <View style={{ margin: 10, flex: 1 }}>
                    <Text>محمد عمر بن عبد الله</Text>
                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: 'yellow' }}>
                        <AntDesign name="staro" size={15} color="black" />
                        <AntDesign name="staro" size={15} color="black" />
                        <AntDesign name="staro" size={15} color="black" />
                        <AntDesign name="staro" size={15} color="black" />
                        <AntDesign name="staro" size={15} color="black" />
                        <Text>تقييم 33</Text>
                    </View>
                    <Text style={{ color: 'red' }}>صيانة تشطيب ترتيب</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: '20%' }}>
                <Text>كهربائي</Text>
                <Text>تأسيس</Text>
                <Text>تشطيب</Text>
                <Text>صيانة</Text>
            </View>

            <View style={{ marginTop: 20, }}>
                <Text style={{ fontSize: 20, padding: 20, borderTopColor: 'grey', borderTopWidth: 1 }}>التعليقات</Text>

                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Image source={require('../../resources/profile.png')} style={{ width: 50, height: 50 }} />
                    <View style={{ margin: 10, flex: 1 }}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{flex:2}}>محمد عمر بن عبد الله</Text>
                            <Text style={{flex:1}}>زبون</Text>
                            <Text style={{flex:1}}>2021/3/3</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: 'yellow' }}>
                            <AntDesign name="staro" size={15} color="black" />
                            <AntDesign name="staro" size={15} color="black" />
                            <AntDesign name="staro" size={15} color="black" />
                            <AntDesign name="staro" size={15} color="black" />
                            <AntDesign name="staro" size={15} color="black" />
                        </View>
                        <Text style={{ color: 'black' }}>بصراحة انا مشوفتش صنانعي كده شاطر وبيصلح اي عيب لوحده مش نحتاج تقف علي ايده وتعب معايا والله وخد فولس مناسبه جدا جدا ليا تسلم ايدك ياهندسهخ</Text>
                    </View>
                </View>
            </View>




        </ScrollView>

    );
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});
