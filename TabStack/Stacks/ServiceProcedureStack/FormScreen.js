import React, { useState, useEffect, useReducer, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';


import FormModal from './components/FormModal'
import LoginModal from '../../components/LoginModal'
import NavigationBar from '../../../components/NavigationBar'

import ArrayOfFieldsInputs from '../../../FieldsTypes/ArrayOfFieldsInputs';

const FormScreen = (props) => {
    const service = props.route.params?.service
    const serviceId = service.id;
    const serviceTitle = service.title;

    const [dialogVisible, setDialogVisible] = useState(false)

    const [array_of_fields, setarray_of_fields] = React.useState()
    useEffect(() => {
        // console.log('FormScreen useEffect', array_of_fields)
    }, [array_of_fields])


    return (
        <View style={styles.container} >
            <NavigationBar name={serviceTitle} />

            <View style={{ flex: 1 }}>
                <ArrayOfFieldsInputs service={service} setarray_of_fields={(e) => setarray_of_fields(e)} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>


                <TouchableOpacity style={{ backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                    onPress={() => { setDialogVisible(true) }}
                >
                    <Text style={{ color: 'white' }}>{'تقديم الطلب'}</Text>
                </TouchableOpacity>
            </View>


            {
                (props.state.user) ?
                    (<FormModal 
                        visibility={[dialogVisible, setDialogVisible]}
                        array_of_fields={array_of_fields}
                        service={service}
                    />)
                    :
                    (<LoginModal visibility={[dialogVisible, setDialogVisible]} />)
            }



        </View >
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(FormScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
