import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
export default function Fifth({ navigation }) {
    const [choose, setChoose] = useState(null);

    return (
        <ScrollView style={{}}>

            <View style={{ borderWidth: 1, margin: 10 }}>

            <TouchableOpacity onPress={() => navigation.navigate('ServiceProviderScreen')} style={{ flexDirection: 'row', margin: 10 }}>
                    <Image source={require('../../../resources/worker.jpg')} style={{ width: 50, height: 100 }} />
                    <View style={{ margin: 10, flex: 1 }}>
                        <Text>محمد عمر بن عبد الله</Text>
                        <View style={{ alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: 'yellow' }}>
                            <AntDesign name="staro" size={15} color="black" />
                            <AntDesign name="staro" size={15} color="black" />
                            <AntDesign name="staro" size={15} color="black" />
                            <AntDesign name="staro" size={15} color="black" />
                            <AntDesign name="staro" size={15} color="black" />
                            <Text>تقييم 33</Text>
                        </View>
                        <Text style={{ color: 'red' }}>صيانة تشطيب ترتيب</Text>
                    </View>
                    <TouchableOpacity onPress={() => setChoose(1)} style={{ justifyContent: 'center', paddingHorizontal: 25, paddingVertical: 10, alignSelf: 'center', borderRadius: 10 }}>
                        <View>
                            {(choose == 1) ?
                                (<AntDesign name="check" size={50} color="black" />)

                                :
                                (<Ionicons name={"radio-button-off"} size={24} color="black" />)
                            }
                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={() => navigation.navigate('ServiceProviderScreen')} style={{ backgroundColor: 'red', justifyContent: 'center', paddingHorizontal: 25, paddingVertical: 10, alignSelf: 'center', borderRadius: 10 }}>
                        <Text style={{ color: 'white' }}>حجز</Text>
                    </TouchableOpacity> */}
                </TouchableOpacity>


            </View>



        </ScrollView>

    );
}

const styles = StyleSheet.create({

});
