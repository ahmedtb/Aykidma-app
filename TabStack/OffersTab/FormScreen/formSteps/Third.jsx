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

import ImagePickerExample from '../ImagePickerExample';

const Third = () => {
    return (
        <View style={{ padding: 25, flex: 1 }}>
            <View style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>أوصف مشكلتك وحاجتك بوضوح</Text>
                <Text style={{ fontSize: 12 }}>أضف وصف واضح لمشكلتك، ليتمكن مزود الخدمة من فهمها وتقديم العرض الافضل لك</Text>
                <TextInput multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }} />
            </View>

            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>أضف صور للمشكلة (اختياري)</Text>
            <ImagePickerExample style={{ marginVertical: 5, borderRadius: 10 }} />
        </View>
    );
}

export default Third;