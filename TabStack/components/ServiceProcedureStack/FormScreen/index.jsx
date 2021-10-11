import React, { useState, useEffect, useReducer, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
    Modal
} from 'react-native';

import FormFields from './components/FormFields'

const reducer = (state, action) => {

    switch (action.actionType) {
        case 'change':
            state.fields = state.fields.map((field, fieldIndex) => {
                if (fieldIndex == action.fieldIndex)
                    field.value = action.value;
                return field;
            })
            return state
    }

    return state;
}

function initialFieldsOfService(service) {
    return { fields: service.fields, service_id: service.id }
}

import FormModal from './components/formModal'
import LoginModal from '../../LoginModal'
import NavigationBar from '../../NavigationBar'

import ArrayOfFieldsInputs from '../../../../FieldsTypes/ArrayOfFieldsInputs';

const FormScreen = (props) => {
    const service = props.route.params?.service
    const serviceId = service.id;
    const serviceTitle = service.title;
    const initial_state = initialFieldsOfService(service)

    useEffect(() => { }, [])

    // const [index, setIndex] = useState(0);


    const [dialogVisible, setDialogVisible] = useState(false)

    const [state, dispatch] = useReducer(reducer, initial_state);

    return (
        <View style={styles.container} >
            <NavigationBar name={serviceTitle} />

            <View style={{ flex: 1 }}>
                {/* <FormFields ReducerState={[state.fields, dispatch]} /> */}
                <ArrayOfFieldsInputs array_of_fields={service.array_of_fields} setarray_of_fields={() => null} />
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
                    (<FormModal visibility={[dialogVisible, setDialogVisible]}
                        state={state}
                        serviceTitle={serviceTitle}
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
