import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';


//required pros:
// onChange, value, style

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

function imageValueSetup(value) {
    if (value) {
        if (isValidURL(value)){
            return value
        }else
            return 'data:image/png;base64,' + value
    } else
        return null
}

export default function ImagePickerComponent(props) {
    const [image, setImage] = useState(imageValueSetup(props.value));
    
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
            quality: 1,
            base64: true
        });

        // console.log(result);

        if (!result.cancelled) {
            // setImage(result.uri);
            setImage('data:image/png;base64,' + result.base64)
            props.onChange(result.base64);
        }
    };

    return (
        <View style={{ ...props.style, alignItems: 'center', justifyContent: 'center', borderWidth: 1 }} >
            <TouchableOpacity onPress={pickImage} >
                {!image && <AntDesign name="camerao" size={75} color="black" />}
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} >

                {(image) ?
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                    :
                    null
                }
            </TouchableOpacity>


        </View>
    );
}