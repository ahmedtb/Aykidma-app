import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    Button,
    TouchableOpacity
} from 'react-native';

import CreateOfferComponent from './components/CreateServiceComponent'


export default function AddNewService({ navigation }) {
    const [title, setTitle] = useState(null)


    return (
        <ScrollView>

            <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>

                <View style={{ margin: 10 }}>
                    <Text style={styles.fieldLable} >عنوان الخدمة</Text>
                    <TextInput style={styles.enrollField}
                        onChangeText={setTitle}
                    />
                </View>

                <CreateOfferComponent title={title} />
                
            </View>

        </ScrollView>

    );
}


const styles = StyleSheet.create({
    enrollField: {
        borderWidth: 1, borderColor: 'grey', borderRadius: 5, padding: 10, fontSize: 20
    },

    fieldLable: {
        fontSize: 20,
    },

})