import React, { useState, useEffect, useRef } from 'react';
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
    TouchableOpacity,
    Modal,
    Pressable,
    Animated
} from 'react-native';
import moment from 'moment';


import NewOrderFormModal from './components/NewOrderFormModal'
import ModalWrapper from '../components/ModalWrapper';

const OrderItem = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { order, refreshFunction } = props;

    const title = order.service.title
    const category = order.service.category
    const date = order.created_at
    const image = order.service.image
    const animate = true

    // this animation for the new order is enabled when animate var is true
    const fadeAnim = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            },
        ).start();
    }, [])



    return (
        <Animated.View style={{ opacity: (animate) ? fadeAnim : 1, }}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ borderWidth: 1, borderRadius: 4, marginVertical: 7 }}>

                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <View>
                        <Image source={{ uri: 'data:image/png;base64,' + image }} style={{ width: 100, height: 100, borderRadius: 7, }} />
                        <Text style={{ textAlign: 'center' }}>{moment(date).format('yyyy-MM-DD')}</Text>
                    </View>
                    <View style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }} >{title}</Text>
                        <Text>تصنيف الخدمة: {category.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <NewOrderFormModal
                visible={[modalVisible, setModalVisible]}
                order={order}
                refreshFunction={refreshFunction}
            />
        </Animated.View>
    )
}

export default function NewOrders(props) {

    const { newOrders, refreshFunction } = props;

    return (
        <ScrollView>
            {
                newOrders.map((order, index) => {
                    const title = order.service.title
                    const category = order.service.category
                    const date = order.created_at
                    const image = order.service.image
                    const animate = true
                    if (order.status == "new")
                        return <OrderItem
                            key={index}
                            order={order}
                            refreshFunction={refreshFunction}
                        />
                    else
                        return null
                })
            }
        </ScrollView>
    )
}
