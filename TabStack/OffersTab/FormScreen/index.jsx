import React, { useState, useEffect, useReducer, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
    Modal
} from 'react-native';

import Second from './formSteps/FormSlide'
import Services from './formSteps/Services'
import axios from 'axios'

const reducer = (state, action) => {
    switch (action.type) {
        case 'change':
            state.fields = state.fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
            return state
        case 'change_testingOptions':
            state.fields = state.fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
            return state
        case 'change_testingString':
            state.fields = state.fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
            return state
        case 'change_testingTextArea':
            state.fields = state.fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
            return state
        case 'change_testingLocation':
            state.fields = state.fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
            return state
        case 'change_testingImage':
            state.fields = state.fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
            return state
        case 'change_service':
            state.service = action.payload.value
            return state
    }
    return state;

}
import offers_fields from '../jsons/offers_fields.json'
import Providers_Services from '../jsons/Providers_Services.json'

function initialFieldsOfOffer(offer) {
    return { fields: offer.fields, service: null }
    // .concat({
    //     "label": "اختر مزود للخدمة",
    //     "name": "testingSPs",
    //     "type": "SPs",
    //     "value": null
    // })
}

const fetchOfferServices = async (offerId) => {
    try {
        let response = await axios.get('/api/service/' + offerId)
        let data = await response.data
        return data
    } catch (error) {
        console.error(error.message + " at FormScreen/Index.jsx offerServices function");
    }
    return null
}

import FormModal from './components/formModal'
import LoginModal from '../../components/LoginModal'
import { AuthContext } from '../../../StateManagment/AuthState'

const FormScreen = ({ route }) => {
    const offer = route.params.offer
    const offerId = offer.id;
    const offerTitle = offer.title;
    const initial_state = initialFieldsOfOffer(offer)

    const [services, setServices] = useState([]);

    useEffect(() => {
        async function fetch() {
            setServices(await fetchOfferServices(offerId))
        }
        fetch()

    }, [])

    const [index, setIndex] = useState(0);

    const { user } = useContext(AuthContext)

    const [dialogVisible, setDialogVisible] = useState(false)

    const [state, dispatch] = useReducer(reducer, initial_state);

    let FormPages = [
        <Second ReducerState={[state.fields.slice(0, state.fields.length), dispatch]} />,
        // <Second ReducerState={[state.fields.slice(3, 5), dispatch]} />,
        // <Second ReducerState={[fields.slice(5, 6), dispatch]} />,
        <Services ReducerState={[state.fields, dispatch]} services={services} />,
    ];

    const numberOfPages = FormPages.length;

    return (
        <View style={styles.container} >
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', margin: 15 }}>
                    {
                        FormPages.map((page, pageIndex) => (
                            <View
                                key={pageIndex}
                                style={{
                                    width: 40, height: 2, marginHorizontal: 5, borderRadius: 4,
                                    backgroundColor: (index == pageIndex) ? 'yellow' : 'grey'
                                }}
                            />
                        ))
                    }
                </View>
                {
                    FormPages.map((page, pageIndex) => (
                        <View key={pageIndex} style={{ height: (index == pageIndex) ? null : 0 }}>
                            {page}
                        </View>
                    ))
                }
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 0.1, alignItems: 'center' }}>

                {(index) ?
                    <TouchableOpacity style={{ backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                        onPress={() => { if (index > 0) setIndex(index - 1) }}
                    >
                        <Text style={{ color: 'white' }}>السابق</Text>
                    </TouchableOpacity> : null}


                <TouchableOpacity style={{ backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                    onPress={() => {
                        // less than pages last index
                        if (index < (numberOfPages - 1))
                            setIndex(index + 1)
                        else {
                            setDialogVisible(true)

                        }
                    }}
                >
                    <Text style={{ color: 'white' }}>{(index < (numberOfPages - 1)) ? ('التالي') : ('نموذج الطلب')}</Text>
                </TouchableOpacity>
            </View>


            {
                (user) ?
                    (
                        <FormModal visibility={[dialogVisible, setDialogVisible]}
                            // fields={state.fields}
                            state={state}
                            offerTitle={offerTitle}
                        />
                    )
                    :
                    (
                        <LoginModal visibility={[dialogVisible, setDialogVisible]} />
                    )
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
