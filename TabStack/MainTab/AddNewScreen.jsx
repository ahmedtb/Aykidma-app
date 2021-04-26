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
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AddNewScreen({navigation}) {
    return (

        <View style={{ justifyContent: 'center', borderWidth: 1, flex: 1, }}>
            <View style={{justifyContent: 'center', borderWidth: 1, flex: 1,}}>
                <Text style={{ borderWidth: 1, width:'60%', alignSelf:'center', fontSize:20 }}>سنسألك بعض الاسئلة لجمع التفاصيل حول طلبك وإرسالها للشركات والفنيين</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('FormScreen')} style={{ borderWidth: 1, flexDirection:'row'}}>
                <Text style={{textAlign:'center', flex:1}}>إبدا الان</Text>
                <AntDesign name="caretleft" size={24} color="black" />
            </TouchableOpacity>
        </View>

    );
}




const styles = StyleSheet.create({
    container: {
        // flex:1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
