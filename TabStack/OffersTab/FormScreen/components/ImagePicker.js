import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { AntDesign } from '@expo/vector-icons';


//required pros:
// onChange, value, style
export default function ImagePickerExample(props) {
    // const [image, setImage] = useState(props.value);
    // useEffect(() => {
    //     (async () => {
    //         if (Platform.OS !== 'web') {
    //             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //             if (status !== 'granted') {
    //                 alert('Sorry, we need camera roll permissions to make this work!');
    //             }
    //         }
    //     })();
    // }, []);

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     // console.log(result);

    //     if (!result.cancelled) {
    //         setImage(result.uri);
    //         props.onChange(result.uri);
    //     }
    // };

    return (null);
    return (
        <View style={{ ...props.style, alignItems: 'center', justifyContent: 'center', borderWidth: 1,  }} >
            <TouchableOpacity onPress={pickImage} >
                {!image && <AntDesign name="camerao" size={75} color="black" />}
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} >

                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </TouchableOpacity>

        </View>
    );
}