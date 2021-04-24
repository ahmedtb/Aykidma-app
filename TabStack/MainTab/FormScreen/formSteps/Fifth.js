import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import { Icon } from 'react-native-elements'



export default function Fifth({ navigation }) {
    const [choose, setChoose] = useState(null);

    return (
        <ScrollView style={{}}>

            <View style={{ margin: 10 }}>

                <TouchableOpacity onPress={() => navigation.navigate('ServiceProviderScreen')} style={{ flexDirection: 'row', borderWidth: 1, margin: 10 }}>
                    <Image source={require('../../../../resources/worker.jpg')} style={{ width: 50, height: 125 }} />
                    <View style={{ margin: 10, flex: 1 }}>
                        <Text>محمد عمر بن عبد الله</Text>
                        <View style={{ alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: 'yellow' }}>
                            <Icon
                                name='rowing' />
                            <Icon
                                name='rowing' />
                            <Icon
                                name='rowing' />
                            <Icon
                                name='rowing' />
                            <Icon
                                name='rowing' />
                            <Text>تقييم 33</Text>
                        </View>
                        <Text style={{ color: 'red' }}>صيانة تشطيب ترتيب</Text>
                    </View>
                    <TouchableOpacity onPress={() => setChoose(1)} style={{ justifyContent: 'center', paddingHorizontal: 25, paddingVertical: 10, alignSelf: 'center', borderRadius: 10 }}>
                        <View>
                            {(choose == 1) ?
                                (<Icon
                                    name='rowing' />)

                                :
                                (<Icon
                                    name='rowing' />)
                            }
                        </View>
                    </TouchableOpacity>

                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('ServiceProviderScreen')} style={{ flexDirection: 'row', borderWidth: 1, margin: 10 }}>
                    <Image source={require('../../../../resources/background.jpg')} style={{ width: 100, height: 100 }} />
                    <View style={{ margin: 10, flex: 1 }}>
                        <Text>شركة التضامن للصيانة العامة</Text>
                        <View style={{ alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: 'yellow' }}>
                            <Icon
                                name='rowing' />
                            <Icon
                                name='rowing' />
                            <Icon
                                name='rowing' />
                            <Icon
                                name='rowing' />
                            <Icon
                                name='rowing' />
                            <Text>تقييم 33</Text>
                        </View>
                        <Text style={{ color: 'red' }}>صيانة تشطيب ترتيب</Text>
                    </View>
                    <TouchableOpacity onPress={() => setChoose(2)} style={{ justifyContent: 'center', paddingHorizontal: 25, paddingVertical: 10, alignSelf: 'center', borderRadius: 10 }}>
                        <View>
                            {(choose == 2) ?
                                (<Icon
                                    name='rowing' />)
                                :
                                (<Icon
                                    name='rowing' />)
                            }
                        </View>
                    </TouchableOpacity>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ServiceProviderScreen')} style={{ flexDirection: 'row', borderWidth: 1, margin: 10 }}>
                    <Image source={require('../../../../resources/worker.jpg')} style={{ width: 50, height: 125 }} />
                    <View style={{ margin: 10, flex: 1 }}>
                        <Text>مصطفى ابراهيم</Text>
                        <View style={{ alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: 'yellow' }}>
                            <Icon
                                name='rowing' />
                            <Icon
                                name='rowing' />
                            <Icon
                                name='rowing' />
                            <Icon
                                name='rowing' />
                            <Icon
                                name='rowing' />
                            <Text>تقييم 33</Text>
                        </View>
                        <Text style={{ color: 'red' }}>فني تركيب</Text>
                    </View>
                    <TouchableOpacity onPress={() => setChoose(3)} style={{ justifyContent: 'center', paddingHorizontal: 25, paddingVertical: 10, alignSelf: 'center', borderRadius: 10 }}>
                        <View>
                            {(choose == 3) ?
                                (<Icon
                                    name='rowing' />)

                                :
                                (<Icon
                                    name='rowing' />)
                            }
                        </View>
                    </TouchableOpacity>

                </TouchableOpacity>


            </View>



        </ScrollView>

    );
}

const styles = StyleSheet.create({

});
