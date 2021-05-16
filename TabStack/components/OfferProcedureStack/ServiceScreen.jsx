import React, { useEffect, useState } from 'react';
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
    useWindowDimensions,
    TouchableOpacity
} from 'react-native';
import HTML from "react-native-render-html";

import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

function ToggleDetailsComments(props) {
    let htmlContent = props.description;
    const contentWidth = useWindowDimensions().width;

    const orders = props.orders

    switch (props.tab) {
        case 1: return (
            <ScrollView>
                {
                    orders.map((order, index) => {
                        return (
                            <View key={index} style={{ flexDirection: 'row', margin: 10 }}>
                                <Image source={require('../../../resources/profile.png')} style={{ width: 50, height: 50 }} />
                                <View style={{ margin: 10, flex: 1 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ flex: 2 }}>{'this field should be canceled'}</Text>
                                    </View>
                                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: 'yellow' }}>
                                        <AntDesign name="staro" size={15} color="black" />
                                        <AntDesign name="staro" size={15} color="black" />
                                        <AntDesign name="staro" size={15} color="black" />
                                        <AntDesign name="staro" size={15} color="black" />
                                        <AntDesign name="staro" size={15} color="black" />
                                    </View>
                                    <Text style={{ color: 'black' }}>{order.meta_data?.review?.comment}</Text>
                                </View>
                            </View>
                        )
                    })
                }
                <View style={{ height: 100 }} />
            </ScrollView>
        )
        case 2: return (
            <ScrollView style={{}}>
                <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />
            </ScrollView>
        )
    }
}

import axios from 'axios'

export default function ServiceProviderScreen(props) {
    const [tab, setTab] = useState(1);
    const service = props.route.params.service;
    const [orders, setOrders] = useState([])

    useEffect(() => {
        // retrieve the recorded orders about this service
        async function fetch() {
            try {
                const orders = (await axios.get('/api/orders/1')).data
                setOrders(orders)
            } catch(error){
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            }
            
        }
        fetch()
    }, [])

    return (
        <View style={{}}>


            <View style={{ flexDirection: 'row', margin: 20 }}>
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
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: '20%' }}>
                <Text>كهربائي</Text>
                <Text>تأسيس</Text>
                <Text>تشطيب</Text>
                <Text>صيانة</Text>
            </View>

            <View style={{ marginTop: 20, borderTopColor: 'grey', borderTopWidth: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => setTab(1)}>
                        <Text style={{ fontSize: 20, padding: 20 }}>التعليقات</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setTab(2)}>
                        <Text style={{ fontSize: 20, padding: 20 }}>تفاصيل</Text>
                    </TouchableOpacity>
                </View>

                <ToggleDetailsComments tab={tab} orders={orders} description={service.meta_data?.details} />

            </View>




        </View>

    );
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});
