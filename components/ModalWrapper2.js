import React from 'react'
import { View, Modal } from 'react-native'



export default function ModalWrapper2(props) {
    const visible = props.visible
    const children = props.children
    const style = props.style

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(52, 52, 52, 0.6)',
                }}>
                <View style={{
                    // height: '80%',
                    // width: '80%',
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
                    ...style
                }}>
                    {children}
                </View>
            </View>
        </Modal >
    )
}
