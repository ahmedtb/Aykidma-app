import React from 'react'
import { View, Modal, ScrollView } from 'react-native'



export default function ModalScreen(props) {
    const visible = props.visible
    const children = props.children

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                }}>
                {/* <View style={{
                    backgroundColor: 'white',
                    padding: 10,
                    marginHorizontal: 40,
                    borderRadius: 10,
                    shadowColor: 'blue',
                    shadowOffset: {
                        width: 10,
                        height: 20,
                    },
                    shadowOpacity: 0.9,
                    shadowRadius: 40,
                }}> */}
                    <ScrollView>
                        {children}
                    </ScrollView>
                {/* </View> */}
            </View>
        </Modal >
    )
}
