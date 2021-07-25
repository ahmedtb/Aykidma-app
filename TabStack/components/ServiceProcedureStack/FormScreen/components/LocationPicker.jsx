import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';


// props required [value{latitude:..., longitude:...}, onChange={function(value) } ]
export default function LocationPicker(props) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState((props.value?.latitude) ? (props.value.latitude) : (0));
    const [longitude, setLongitude] = useState((props.value?.longitude) ? (props.value.longitude) : (0));

    useEffect(() => {
        if (!props.value?.longitude)
            (async () => {
                if (Platform.OS === 'android' && !Constants.isDevice) {
                    setErrorMsg(
                        'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
                    );
                    return;
                }
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
                setLatitude(location.coords.latitude);
                setLongitude(location.coords.longitude);
                props.onChange({ latitude: location.coords.latitude, longitude: location.coords.longitude });
                //   let postalAddress = await Location.reverseGeocodeAsync({ latitude: latitude, longitude: longitude });
            })();
    }, []);

    let text = 'الرجاء الانتظار لتحديد موقعك..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        // text = 'خط العرض: ' + location.coords.latitude + ' - خط الطول: ' + location.coords.longitude;
        // text = JSON.stringify(location);
        text = '';
    }

    return (
        <View style={styles.container} >
            {/* <View style={{ margin: 8 }}>
                <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', borderBottomWidth: 1, }}>سيتم استخدام موقعك الحالي كدليل لتقديم الخدمة</Text>
            </View> */}
            <Text style={styles.paragraph}>{text}</Text>

            <Text style={styles.paragraph}>خط العرض: {latitude}</Text>
            <Text style={styles.paragraph}>خط الطول: {longitude}</Text>


            <View
                pointerEvents="none"
            >
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={{
                        latitude: latitude ? latitude : 37.78825,
                        longitude: longitude ? longitude : -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    pointerEvents="none"
                >
                    <Marker coordinate={{ latitude: latitude, longitude: longitude }} title="موقعك" description="موقعك الحالي" />
                </MapView>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        // padding: 20,
    },
    paragraph: {
        fontSize: 12,
        textAlign: 'center',
    },
    map: {
        width: Dimensions.get('window').width / 1.5,
        height: 200,
    },
});
