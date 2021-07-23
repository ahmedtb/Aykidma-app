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
import { AuthContext } from '../../../../StateManagment/AuthState'
import NavigationBar from '../../NavigationBar'

const FormScreen = ({ route }) => {
    const service = route.params.service
    const serviceId = service.id;
    const serviceTitle = service.title;
    const initial_state = initialFieldsOfService(service)

    useEffect(() => { }, [])

    // const [index, setIndex] = useState(0);

    const { user } = useContext(AuthContext)

    const [dialogVisible, setDialogVisible] = useState(false)

    const [state, dispatch] = useReducer(reducer, initial_state);

    let FormPages = [
        ,
    ];

    const numberOfPages = FormPages.length;

    return (
        <View style={styles.container} >
            <NavigationBar name={serviceTitle} />

            <View style={{ flex: 1 }}>
                <FormFields ReducerState={[state.fields, dispatch]} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>


                <TouchableOpacity style={{ backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                    onPress={() => { setDialogVisible(true) }}
                >
                    <Text style={{ color: 'white' }}>{'تقديم الطلب'}</Text>
                </TouchableOpacity>
            </View>


            {
                (user) ?
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

export default FormScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
