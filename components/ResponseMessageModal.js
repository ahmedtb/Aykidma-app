import React from 'react'
import { Pressable,View,Text } from 'react-native'
import ModalWrapper2 from './ModalWrapper2'

export default function ResponseMessageModal(props) {
    const response = props.response
    const [visible, setvisible] = React.useState(false)
    React.useEffect(() => {
        if (response)
            setvisible(true)
        else setvisible(false)
    }, [response])
    return (
        <ModalWrapper2 visible={visible}>
            {
                (() => {
                    if (response?.data?.success) {
                        return <Text>{response?.data?.success}</Text>

                    } else if (response?.data?.errors) {
                        return <View>{response?.data?.errors.map((error, index) => <View key={index}>
                            <Text>{error}</Text>
                        </View>)}</View>
                    }
                })()
            }
            <Pressable onPress={() => setvisible(false)}>
                <Text>اغلق</Text>
            </Pressable>
        </ModalWrapper2>
    )
}