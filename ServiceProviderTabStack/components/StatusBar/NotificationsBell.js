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

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const NotificationsBell = (props) => {
    const forceUpdate = useForceUpdate();
    const [visible, setVisible] = useState(false)
    const [newBell, setNewBell] = useState(false)

    function bellTab() {
        setVisible(true)
        setNewBell(false)
        forceUpdate();
    }
    const notifications = props.notifications;
    const notification = props.notification
    React.useEffect(() => {
        if (notification)
            setNewBell(true)
    }, [notification])

    return (
        <View style={props.style} >
            <View style={{ padding: 5 }}>
                <TouchableOpacity onPress={() => bellTab()}>
                    {(newBell) ? <MaterialIcons name="notifications-on" size={24} color="black" /> : <AntDesign name="bells" size={24} color="black" />}
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(!visible);
                }}
            >
                <View style={styles.centeredView}>
                    <ScrollView style={styles.modalView}>
                        <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 20 }}>
                            {
                                notifications.reverse().map((notification, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={{ borderColor: 'grey', justifyContent: 'center', borderBottomWidth: 1 }}>
                                            <Text style={{ color: 'black', textAlign: 'center', fontSize: 15, }}>{notification.title}</Text>
                                            <Text style={{ color: 'black', textAlign: 'center', fontSize: 15, }}>{notification.body}</Text>
                                            <Text style={{ color: 'black', textAlign: 'center', fontSize: 15, }}>{moment(notification.created_at).fromNow()}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setVisible(!visible)}
                            >
                                <Text style={styles.textStyle}>اغلاق</Text>
                            </Pressable>
                        </View>

                    </ScrollView>
                </View>
            </Modal>
        </View >
    );
}
export default NotificationsBell;


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
