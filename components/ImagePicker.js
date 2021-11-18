import React, { useState, useEffect } from 'react';
import { Alert, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { onChange } from 'react-native-reanimated';

export default function ImagePickerComponent(props) {
    const [image, setImage] = useState(props.value);
    const onChange = props.onChange

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
            base64: true
        });
        // let result = await ImagePicker.launchCameraAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.All,
        //     allowsEditing: true,
        //     aspect: [4, 3],
        //     quality: 1,
        //     base64: true
        // });

        // console.log(result);

        if (!result.cancelled) {
            // setImage(result.uri);
            // console.log(result.base64.length)
            if (result.base64.length >= 8000000) {
                Alert.alert(
                    "Please choose image with approprite size",
                );

            } else {
                setImage(result.base64)
                onChange(result.base64);
            }
        }
    };

    return (
        <View style={{ ...props.style, alignItems: 'center', justifyContent: 'center', borderWidth: 1, }} >
            <TouchableOpacity onPress={pickImage} >
                {!image && <AntDesign name="camerao" size={75} color="black" />}
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} >

                {image && <Image source={{ uri: 'data:image/png;base64,' + image }} style={{ width: 200, height: 200 }} />}
            </TouchableOpacity>

        </View>
    );
}