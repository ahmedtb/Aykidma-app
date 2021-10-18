import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    TouchableOpacity,
    Modal
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment'
import ModalWrapper from '../../../components/ModalWrapper'

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const NotificationsBell = (props) => {
    const forceUpdate = useForceUpdate();
    const [visible, setVisible] = useState(false)

    function bellTab() {
        setVisible(true)
        forceUpdate();
    }
    React.useEffect(() => {

    }, [props.state.userNotification])

    return (
        <View style={props.style} >
            <View style={{ borderWidth: 1, borderRadius: 20, borderColor: 'red' }}>
                <TouchableOpacity onPress={() => bellTab()}>
                    {(props.state.userNotification) ?
                        <MaterialIcons style={{ padding: 15 }} name="notifications-on" size={24} color="red" />
                        :
                        <AntDesign style={{ padding: 15 }} name="bells" size={24} color="red" />}
                </TouchableOpacity>
            </View>

            <ModalWrapper style={{ marginHorizontal: 25, marginVertical: 10, padding: 3 }} visible={visible}>

                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setVisible(!visible)
                            props.setUserNotification(null)
                        }}
                    >
                        <Text style={styles.textStyle}>اغلاق</Text>
                    </Pressable>
                </View>
                {
                    props.state.userNotification?.request.content.data.type == 'user' ? (
                        <View
                            style={{ borderColor: 'grey', justifyContent: 'center', borderWidth: 0.5, borderRadius: 10, padding: 10, margin: 5 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, color: 'red', borderBottomWidth: 0.3, marginBottom: 3, paddingBottom: 3 }}>اشعار جديد</Text>

                            <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 15, }}>{props.state.userNotification.request.content.title}</Text>
                            <Text style={{ color: 'black', fontSize: 15, }}>{props.state.userNotification.request.content.body}</Text>
                            <Text style={{ color: 'black', fontSize: 15, }}>{moment(props.state.userNotification.created_at).fromNow()}</Text>
                        </View>
                    ) : null
                }
                <View style={{ borderWidth: 0.5, borderRadius: 10, padding: 10, margin: 5 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, color: 'red', borderBottomWidth: 1, marginBottom: 3, paddingBottom: 3 }}>كل الاشعارات</Text>

                    {
                        props.state.userNotifications.reverse().map((notification, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{ borderColor: 'grey', justifyContent: 'center', borderWidth: 0.5, borderRadius: 4, marginBottom: 5 }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 15, }}>{notification.title}</Text>
                                    <Text style={{ color: 'black', fontSize: 15, }}>{notification.body}</Text>
                                    <Text style={{ color: 'black', fontSize: 15, }}>{moment(notification.created_at).fromNow()}</Text>
                                </View>
                            )
                        })
                    }
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setVisible(!visible)
                            props.setUserNotification(null)
                        }}
                    >
                        <Text style={styles.textStyle}>اغلاق</Text>
                    </Pressable>
                </View>
            </ModalWrapper>
        </View >
    );
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserNotification } from '../../../redux/StateActions';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUserNotification
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBell);


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
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

});
