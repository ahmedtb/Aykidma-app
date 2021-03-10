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
    Button
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

const First = () => {

    return (
        <View>
            <Text>اختر المنطقة</Text>
            <TextInput />
            <Text>اختر نوع الخدمة المطلوبة تنفيذها</Text>
            <TextInput />
            <Text>اختر نوع الوحدة السكنية</Text>
            <TextInput />
        </View>
    );
}

const Second = () => {

    return (
        <View>
            <Text>أوصف مشكلتك وحاجتك بوضوح</Text>
            <Text>أضف وصف واضح لمشكلتك، ليتمكن مزود الخدمة من فهمها وتقديم العرض الافضل لك</Text>
            <TextInput multiline={true} numberOfLines={4} />
            <Text>اختار الوقت المفضل للتنفيذ</Text>
            <TextInput />

        </View>
    );
}

import ImagePickerExample from './ImagePickerExample';
const Third = () => {

    return (
        <View>
            <Text>أضف صور للمشكلة (اختياري)</Text>
            <ImagePickerExample />
            <Text>third</Text>
            <Text>third</Text>

        </View>
    );
}


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
    }, [index]);

    return (
        <View style={styles.container} >
            <Button onPress={() => { if (index > 1) setIndex(index - 1) }} title='previous' />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 30, height: 2, marginHorizontal: 5, borderRadius: 4, backgroundColor: (index == 1) ? 'yellow' : 'grey' }} />
                <View style={{ width: 30, height: 2, marginHorizontal: 5, borderRadius: 4, backgroundColor: (index == 2) ? 'yellow' : 'grey' }} />
                <View style={{ width: 30, height: 2, marginHorizontal: 5, borderRadius: 4, backgroundColor: (index == 3) ? 'yellow' : 'grey' }} />
            </View>
            {page}

            <Button onPress={() => { if (index < 3) setIndex(index + 1) }} title='next' />

        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

});
