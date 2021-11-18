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
    TouchableOpacity,
    Modal,
    Pressable
} from 'react-native';
import moment from 'moment';

import OrderFormModal from './components/OrderFormModal'
import { getCategory } from '../../redux/CategoriesFunctions'

function DoneOrders(props) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView>
            {
                props.doneOrders.map((order, index) => {
                    const title = order.service.title
                    const category_id = order.service.category_id
                    const date = order.created_at
                    const image = order.service.image
                    if (order.status == "done")
                        return <View key={index}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}
                                style={{
                                    borderWidth: 1, borderRadius: 4, marginVertical: 7, elevation: 3,
                                    backgroundColor: 'white',
                                    borderColor: 'red'
                                }}>

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
                            <OrderFormModal
                                visible={[modalVisible, setModalVisible]}
                                order={order}
                                refreshFunction={props.refreshFunction}
                            />
                        </View>
                    else
                        return null
                })
            }
        </ScrollView>
    )
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCategories } from '../../redux/StateActions';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setCategories
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DoneOrders);