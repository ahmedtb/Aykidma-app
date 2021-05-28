import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Modal } from 'react-native';

const LoadingIndicator = (props) => {
    const [stopIndicating, setStopIndicating] = React.useState(false);
    useEffect(() => {
        setTimeout(()=>setStopIndicating(true),7000)
    },[props.visibility])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={(stopIndicating)? false : props.visibility}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(52, 52, 52, 0.6)',
                }}>
                <View style={{
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
                }}>
                    <ActivityIndicator size="large" color="red" />
                    <Text style={{
                        textAlign: 'center',
                        color: 'grey',
                        margin: 10,
                        fontSize: 15,
                        fontWeight: 'bold',
                    }}>
                        { (props.label) ? (props.label) : ('جار التحميل')}
                        </Text>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({

});

export default LoadingIndicator;
