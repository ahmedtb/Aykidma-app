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


const OrderItem = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { title, location, category, date, cost, image, service_provider_name, fields, id, animate } = props;
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
            <NewOrderFormModal visible={[modalVisible, setModalVisible]}
                date={date} service_provider_name={service_provider_name}
                offer_title={title} cost={cost}
                location_name={location} fields={fields} id={id}
                refreshFunction={props.refreshFunction}

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
                            title={order.service.title}
                            location={'this field should be canceled'}
                            category={order.service.category}
                            date={order.created_at}
                            cost={order.service.cost}
                            image={order.service.image}
                            service_provider_name={props.state.provider.name}
                            fields={order.fields}
                            id={order.id}
                            animate={true}
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
const mapStateToProps = ({state}) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NewOrders);


const styles = StyleSheet.create({



    // modal styles
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.9)',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#b2a9a7",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})