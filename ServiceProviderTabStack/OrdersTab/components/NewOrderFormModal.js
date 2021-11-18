import React, { useState, useContext } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    Modal,
    Pressable,
    TouchableOpacity
} from 'react-native';
import moment from 'moment'
import LocationModal from '../../../components/LocationModal'
import { FontAwesome5, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

import { resumeNewOrder } from '../../../utilityFunctions/apiCalls'
import ModalWrapper from '../../../components/ModalWrapper'
import { logError } from '../../../redux/AuthFunctions'
import ArrayOfFieldsFormView from '../../../FieldsTypes/ArrayOfFieldsFormView'

function NewOrderFormModal(props) {
    const [dialogVis, setDialogVis] = React.useState(false)
    const [modalVisible, setModalVisible] = props.visible;
    const { order, refreshFunction } = props;

    const service_title = order.service.title
    const date = order.created_at
    const cost = order.service.cost
    const comment = order.comment
    const rating = order.rating
    const service_provider_name = props.state.provider.name
    const array_of_fields = order.array_of_fields
    const id = order.id

    const [locationModalVisibility, setLocationModalVisibility] = useState(false)
    return (
        <ModalWrapper visible={modalVisible}>
            <View style={{ marginBottom: 10, borderBottomWidth: 0.5 }}>
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 25, flex: 1 }}>تفاصــيـل الطـلــب</Text>

                <Text style={{ color: 'black', alignSelf: 'flex-end' }}>تاريخ الطلب: {moment(date).format('yyyy-MM-DD hh:mm')} م</Text>
            </View>

            <View style={{ marginBottom: 20 }}>

                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ borderWidth: 1, borderColor: '#d1c5c5', borderRadius: 7, flex: 1, margin: 7, padding: 4 }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                <FontAwesome5 name="person-booth" size={24} color="red" />
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 2 }}>مقدم الخدمـــة</Text>
                            </View>
                            <Text style={{ color: 'black', fontSize: 20 }}>{service_provider_name}</Text>
                        </View>

                        <View style={{ borderWidth: 1, borderColor: '#d1c5c5', borderRadius: 7, flex: 1, margin: 7 }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                <FontAwesome5 name="tools" size={24} color="red" />
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 2 }}>الخدمة</Text>
                            </View>

                            <Text style={{ color: 'black', fontSize: 20, flex: 2 }}>{service_title}</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1 }}>

                        <View style={{ borderWidth: 1, borderColor: '#d1c5c5', borderRadius: 7, flex: 1, margin: 7 }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                <FontAwesome name="comments-o" size={24} color="red" />
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 2, flex: 1 }}>تعليقك على الخدمة</Text>
                            </View>
                            <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', flex: 2 }}>{comment}</Text>
                        </View>

                        <View style={{ borderWidth: 1, borderColor: '#d1c5c5', borderRadius: 7, flex: 1, margin: 7 }}>

                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                <MaterialIcons name="star-rate" size={24} color="red" />
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 2 }}>تقييمك للخدمة</Text>
                            </View>
                            <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', flex: 2 }}>{rating}</Text>
                        </View>

                        <View style={{ borderWidth: 1, borderColor: '#d1c5c5', borderRadius: 7, flex: 1, margin: 7 }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                <Entypo name="price-tag" size={24} color="red" />
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 2 }}>الــــســـعـــــر</Text>
                            </View>
                            <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', flex: 2 }}>{cost}</Text>
                        </View>
                    </View>
                </View>


                <Text style={{ fontSize: 21, fontWeight: 'bold', backgroundColor: '#b2a9a7', borderBottomWidth: 1, textAlign: 'center', height: 35 }}>تفاصيل حقول المعبئة للطلب</Text>
                <View style={{ borderWidth: 0.7, borderRadius: 7 }}>
                    <ArrayOfFieldsFormView array_of_fields={array_of_fields} />

                </View>


            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>اغلاق</Text>
                </Pressable>

                <Pressable
                    style={{ ...styles.button, backgroundColor: '#f4c18b' }}
                    onPress={() => { setDialogVis(true) }}
                >
                    <Text style={styles.textStyle}>استئناف الطلب</Text>
                </Pressable>
                <ModalWrapper visible={dialogVis}>
                    <Text>are you sure</Text>
                    <Pressable
                        style={{ ...styles.button, backgroundColor: '#f4c18b' }}
                        onPress={() => {
                            resumeNewOrder(id).then(() => {
                                refreshFunction()
                                setModalVisible(false)
                            }).catch(error => logError(error, 'NewOrderFormModal'))

                        }}
                    >
                        <Text style={styles.textStyle}>استئناف الطلب</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setDialogVis(false)}
                    >
                        <Text style={styles.textStyle}>اغلاق</Text>
                    </Pressable>
                </ModalWrapper>

            </View>

        </ModalWrapper>
    )

}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderFormModal);

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