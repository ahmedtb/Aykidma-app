import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function ImagePickerExample(props) {
  const [image, setImage] = useState(null);

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
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ ...props.style, alignItems: 'center', justifyContent: 'center' }} >
      <Text style={{backgroundColor:'grey', fontSize:20}} >التقط صورة للمشكلة (إختياري)</Text>
      <TouchableOpacity onPress={pickImage} >
        
        <AntDesign name="plussquareo" size={50} color="black" />
      </TouchableOpacity>
      {/* <Button title="التقط صورة للمشكلة (إختياري)" /> */}
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}