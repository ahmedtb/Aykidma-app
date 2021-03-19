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
    Pressable,
    TouchableOpacity,
    Modal
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import ListOptions from '../ListOptions';




const First = () => {
    const [region, setRegion] = useState(null);
    const [dwellingType, setDwellingType] = useState(null);
    const [period, setPeriod] = useState(null);
    return (
        <View style={{ padding: 25 }}>

            <Text style={{ fontSize: 20 }}>اختر المنطقة</Text>
            <ListOptions setChoice={setRegion} choice={region} list={['سوق الجمعة', 'حي الاندلس', 'ابو سليم']} label='اختر منطقتك' />

            <Text style={{ fontSize: 20 }}>اختر نوع الوحدة السكنية</Text>
            <ListOptions setChoice={setDwellingType} choice={dwellingType} list={['شقة', 'فيلا', 'مبنى', 'اخرى']} label='يرجى اختيار نوع الوحدة' />

            <Text style={{ fontSize: 20 }}>اختار الوقت المفضل للتنفيذ</Text>
            <ListOptions setChoice={setPeriod} choice={period} list={['اليوم', 'غدا', 'خلال اسبوع', 'الاسبوع القادم']} label='اختر الوقت المناسب' />


        </View>
    );
}

export default First;