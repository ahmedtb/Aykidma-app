import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    Pressable,
    TouchableOpacity,
    Modal
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const RegionList = (props) => {
    const [visible, setVisible] = useState(false);
    const choice = props.choice;
    const setChoice = props.setChoice;
    const list = props.list;

    return (
        <>
            <View style={{ padding: 5 }}>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Text style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5, textAlign: 'center' }}>
                        {(choice) ? choice : (props.label)}
                    </Text>
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
                    <View style={styles.modalView}>


                        <View style={{ borderWidth: 1, marginBottom: 20 }}>
                            {
                                list.map((option, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => { setChoice(option); setVisible(false); }} style={{ borderWidth: 1, borderColor: 'grey', height: 40, justifyContent: 'center' }}>
                                            <Text style={{ color: 'black', textAlign: 'center' }}>{option}</Text>
                                        </TouchableOpacity>
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

                    </View>
                </View>
            </Modal>
        </>
    );
}
export default RegionList;


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
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
