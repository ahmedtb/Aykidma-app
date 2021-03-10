import React, { useState, useEffect } from 'react';
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
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

const First = () => {

    return (
        <View style={{ padding: 25 }}>
            <Text>اختر المنطقة</Text>
            <TextInput style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />
            <Text>اختر نوع الخدمة المطلوبة تنفيذها</Text>
            <TextInput style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />
            <Text>اختر نوع الوحدة السكنية</Text>
            <TextInput style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />
        </View>
    );
}

const Second = () => {

    return (
        <View style={{ padding: 25 }}>
            <Text>أوصف مشكلتك وحاجتك بوضوح</Text>
            <Text>أضف وصف واضح لمشكلتك، ليتمكن مزود الخدمة من فهمها وتقديم العرض الافضل لك</Text>
            <TextInput multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />
            <Text>اختار الوقت المفضل للتنفيذ</Text>
            <TextInput style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />

        </View>
    );
}

import ImagePickerExample from './ImagePickerExample';
const Third = () => {

    return (
        <View style={{ padding: 25 }}>
            <Text>أضف صور للمشكلة (اختياري)</Text>
            <ImagePickerExample style={{ marginVertical: 20 }} />
            {/* <Text>third</Text>
            <Text>third</Text> */}

        </View>
    );
}

import Fourth from './formSteps/fourth';


export default function FormScreen() {
    const [index, setIndex] = useState(1);
    const [page, setPage] = useState(<First />);
    useEffect(() => {
        if (index == 1) {
            setPage(<First />);
        } else if (index == 2) {
            setPage(<Second />);
        } else if (index == 3) {
            setPage(<Third />);
        }
        else if (index == 4) {
            setPage(<Fourth />);
        }
    }, [index]);

    return (
        <View style={styles.container} >
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', margin: 15 }}>
                    <View style={{ width: 40, height: 2, marginHorizontal: 5, borderRadius: 4, backgroundColor: (index == 1) ? 'yellow' : 'grey' }} />
                    <View style={{ width: 40, height: 2, marginHorizontal: 5, borderRadius: 4, backgroundColor: (index == 2) ? 'yellow' : 'grey' }} />
                    <View style={{ width: 40, height: 2, marginHorizontal: 5, borderRadius: 4, backgroundColor: (index == 3) ? 'yellow' : 'grey' }} />
                    <View style={{ width: 40, height: 2, marginHorizontal: 5, borderRadius: 4, backgroundColor: (index == 4) ? 'yellow' : 'grey' }} />
                </View>
                {page}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 0.1, alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: '#631a15',height:50, width:100, justifyContent:'center', alignItems:'center', borderRadius:10}} onPress={() => { if (index > 1) setIndex(index - 1) }}>
                    <Text style={{ color: 'white' }}>السابق</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: '#631a15',height:50, width:100, justifyContent:'center', alignItems:'center', borderRadius:10}} onPress={() => { if (index < 4) setIndex(index + 1) }}>
                    <Text style={{ color: 'white' }}>التالي</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

});
