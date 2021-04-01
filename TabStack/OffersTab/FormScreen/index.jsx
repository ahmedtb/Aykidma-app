import React, { useState, useEffect, useReducer } from 'react';
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

const reducer = (fields, action) => {
    switch (action.type) {
        case 'change':
            return fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
        case 'change_testingOptions':
            return fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
        case 'change_testingString':
            return fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
        case 'change_testingTextArea':
            return fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
        case 'change_testingLocation':
            return fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
        case 'change_testingImage':
            return fields.map((field) => {
                if (field.name == action.payload.name)
                    field.value = action.payload.value;
                return field;
            })
    }
    return fields;

}
import offers_fields from '../jsons/offers_fields.json'
import Providers_Services from '../jsons/Providers_Services.json'

function initialFieldsOfOffer(offer) {
    return offer.fields.concat({
        "label": "اختر مزود للخدمة",
        "name": "testingSPs",
        "type": "SPs",
        "value": null
    })
    return offers_fields.find((field) => (field.offer_id == offerId)).fields.concat({
        "label": "اختر مزود للخدمة",
        "name": "testingSPs",
        "type": "SPs",
        "value": null
    })
}

const offerServices = async (offerId) => {

    return Providers_Services.filter((service) => {
        if (service.offer_id == offerId)
            return true
        else
            return false
    })
}

const fetchOfferServices = async (offerId) => {
    try {
        let response = await axios.get('/api/services/1')
        let data = await response.data
        return data
    } catch (error) {
        console.error(error.message + " at FormScreen/Index.jsx offerServices function");
    }
    return null
}

import FormModal from './components/formModal'

const FormScreen = ({ navigation, route }) => {
    const offer = route.params.offer
    const offerId = offer.id;
    const offerTitle = offer.title;
    const initial_fields = initialFieldsOfOffer(offer)

    const [services, setServices] = useState([]);

    useEffect(() => {
        async function fetch() {
            setServices(await fetchOfferServices(offerId))
        }
        fetch()

    }, [])

    const [index, setIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const [fields, dispatch] = useReducer(reducer, initial_fields);


    let FormPages = [
        <Second ReducerState={[fields.slice(0, 3), dispatch]} />,
        <Second ReducerState={[fields.slice(3, 5), dispatch]} />,
        <Second ReducerState={[fields.slice(5, 6), dispatch]} />,
        <Services ReducerState={[fields, dispatch]} services={services} />,
    ];

    const numberOfPages = FormPages.length;

    useEffect(() => {

    }, []);

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
                        else
                            setModalVisible(true)
                    }}
                >
                    <Text style={{ color: 'white' }}>{(index < (numberOfPages - 1)) ? ('التالي') : ('نموذج الطلب')}</Text>
                </TouchableOpacity>
            </View>

            <FormModal visibility={[modalVisible, setModalVisible]}
                fields={fields}
                offerTitle={offerTitle}

            />

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
