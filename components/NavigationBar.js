import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



export default function NavigationBar(props) {
    const navigation = useNavigation();

    const name = props.name
    return (
        <View style={{
            marginTop: Constants.statusBarHeight, borderWidth: 1, padding: 15, margin: 10,
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="caretright" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 15 }}>{name}</Text>
        </View>
    )
}