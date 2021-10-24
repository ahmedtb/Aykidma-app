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
                    <ScrollView>
                        {children}
                    </ScrollView>
            </View>
        </Modal >
    )
}
