import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'

import { fetchOffers, createNewService } from '../../../utilityFunctions/apiCalls'

import OfferChoiceModal from './OfferChoiceModal'

const RenderOfferCard = (props) => {
    const image = props.image;
    const title = props.title;
    const price = props.price

    return (
        <View style={{ flexDirection: 'row', margin: 10, width: '70%' }}>
            <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />

            <View style={{ margin: 10 }}>
                <Text style={styles.offerTitle}>{title}</Text>
                <Text style={{ color: 'red' }}>{price}</Text>
            </View>
        </View>
    )
}

export default function ChoiceListFromOffersModal(props) {
    const [ListVisibility, setListVisibility] = useState(false)
    const [offers, setOffers] = useState([])
    const [ChosenOffer, setChosenOffer] = useState(null)

    useEffect(() => {
        fetchOffers().then(data => {
            setOffers(data);
        })
    }, [])


    return (
        <View>
            <TouchableOpacity onPress={() => { setListVisibility(true) }}
                style={{}}
            >
                <Text>اختر تصميما لعرض</Text>

            </TouchableOpacity>

            {
                (ChosenOffer) ? (
                    <View>
                        <RenderOfferCard image={ChosenOffer.image} title={ChosenOffer.title} price={ChosenOffer.meta_data?.price} />


                        <TouchableOpacity
                            onPress={() => createNewService(ChosenOffer.id, [])}
                            style={{ backgroundColor: 'red', flexDirection: 'row', width: '50%', alignSelf: 'center', height: 50, alignItems: 'center', borderRadius: 19 }}>
                            <Text style={{ textAlign: 'center', color: 'white', flex: 1, fontSize: 20 }}>طلب تسجيل الخدمة</Text>
                        </TouchableOpacity>
                    </View>
                ) : (null)
            }


            <Modal
                animationType="fade"
                transparent={true}
                visible={ListVisibility}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: 'rgba(52, 52, 52, 0.6)',
                    }}>
                    <View style={{
                        height: '80%',
                        width: '80%',
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
                        <ScrollView>
                            {
                                (offers) ?
                                    offers.map(
                                        (offer, index) => {
                                            return (

                                                <OfferChoiceModal
                                                    key={index}
                                                    offer={offer}
                                                    choice={[ChosenOffer, setChosenOffer]}
                                                />

                                            )
                                        }
                                    ) : (null)
                            }
                        </ScrollView>


                        <TouchableOpacity
                            style={{ alignSelf: 'center', backgroundColor: 'grey', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                            onPress={() => {
                                setListVisibility(false)
                            }}
                        >
                            <Text style={{ color: 'white' }}>اغلاق</Text>
                        </TouchableOpacity>


                    </View>
                </View>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.9)',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#b2a9a7",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});