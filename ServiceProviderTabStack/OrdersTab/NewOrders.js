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
import {getCategory} from '../../redux/CategoriesFunctions'


const OrderItem = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { order, refreshFunction } = props;

    const title = order.service.title
    const location = 'this field should be canceled'
    const category_id = order.service.category_id
    const date = order.created_at
    const cost = order.service.cost
    const image = order.service.image
    const fields = order.fields
    const id = order.id
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
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{ borderWidth: 1, borderRadius: 4, borderColor:'red', marginVertical: 7, elevation: 5, backgroundColor: 'white' }}
            >

                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <View>
                        <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 7, }} />
                        <Text style={{ textAlign: 'center' }}>{moment(date).format('yyyy-MM-DD')}</Text>
                    </View>
                    <View style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }} >{title}</Text>
                        <Text>تصنيف الخدمة: {getCategory(category_id)?.name}</Text>
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

function NewOrders(props) {


    useEffect(() => {

    }, [props.newOrders])

    return (
        <ScrollView>
            {
                props.newOrders.map((order, index) => {
                    if (order.status == "new")
                        return <OrderItem
                            key={index}
                            order={order}
                            refreshFunction={props.refreshFunction}
                        />
                    else
                        return null
                })
            }
        </ScrollView>
    )
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../../redux/StateActions';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NewOrders);

