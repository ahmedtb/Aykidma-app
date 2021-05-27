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

import ChoiceListFromOffersModal from './components/ChoiceListFromOffersModal'
import CreateOfferComponent from './CreateOfferComponent'
import { Ionicons } from '@expo/vector-icons';



export default function AddNewService({ navigation }) {
    const [newOfferDesign, setNewOfferDesign] = useState(false)

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

                <View>
                    <Text style={styles.fieldLable} >اختر تصميم عرض موجود بالفعل (موصى به)</Text>

                    {
                        (newOfferDesign) ?
                            (
                                <TouchableOpacity onPress={() => setNewOfferDesign(false)}>
                                    <Ionicons name="radio-button-off" size={24} color="black" />
                                </TouchableOpacity>
                            )
                            :
                            (
                                <View>
                                    <Ionicons name="radio-button-on" size={24} color="black" />
                                    <ChoiceListFromOffersModal />
                                </View>
                            )
                    }

                </View>


                <View>
                    {
                        (newOfferDesign) ?
                            (
                                <View>
                                    <Ionicons name="radio-button-on" size={24} color="black" />
                                    <CreateOfferComponent title={title} />
                                </View>
                            )
                            :
                            (
                                <TouchableOpacity onPress={() => setNewOfferDesign(true)}>
                                    <Ionicons name="radio-button-off" size={24} color="black" />
                                </TouchableOpacity>
                            )

                    }
                </View>
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