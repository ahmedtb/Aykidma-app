import React from 'react';
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

export default function ServicesList(props) {

    const services = props.services
    const onServiceClick = props.onServiceClick

    return (
        <View>
            {
                services?.map((service, index) => {
                    const image = service.image;
                    const title = service.title;
                    const price = service.price
                    return (
                        <TouchableOpacity key={index} onPress={() => onServiceClick(service)} style={styles.serviceCard}>
                            <View style={{ flexDirection: 'row', margin: 10, width: '70%' }}>
                                <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />

                                <View style={{ margin: 10 }}>
                                    <Text style={styles.serviceTitle}>{title}</Text>
                                    <Text style={{ color: 'red' }}>{price}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )


}

const styles = StyleSheet.create({

    serviceCard: {
        borderWidth: 1, marginVertical: 10,
        borderRadius: 10,
        borderColor: 'red',
        elevation: 4,
        backgroundColor: 'white',
    },
    serviceTitle: {
        fontSize: 20,
    }
});
