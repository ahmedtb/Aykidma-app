import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'

import { fetchOffers } from '../../../utilityFunctions/apiCalls'



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

import OfferChoiceModal from './OfferChoiceModal'

export default function ChoiceListFromOffersModal(props) {
    const [ChoiceListVisibility, setChoiceListVisibility] = useState(false)

    // const [visibility, setChoiceListVisibility] = props.visibility
    const [offers, setOffers] = useState([])

    const [offerChoiceModalVisibility, setOfferChoiceModalVisibility] = useState(false)
    const [ChoiceModalOffer, setChoiceModalOffer] = useState(null)

    useEffect(() => {
        fetchOffers().then(data => {
            setOffers(data);
        })
    }, [])

    const [phoneNumber, setPhoneNumber] = useState(null)
    const [password, setPassword] = useState(null)

    return (
        <View>
            <TouchableOpacity onPress={() => { setChoiceListVisibility(true) }}
                style={{}}
            >
                <Text>اختر تصميما لعرض</Text>

            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={ChoiceListVisibility}>
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
                                                <TouchableOpacity key={index} onPress={() => {
                                                    setChoiceModalOffer(offer)
                                                    setOfferChoiceModalVisibility(true)
                                                }} style={styles.offerCard}>
                                                    <RenderOfferCard image={offer.image} title={offer.title} price={offer.meta_data?.price} />
                                                </TouchableOpacity>
                                            )
                                        }
                                    ) : (null)
                            }
                        </ScrollView>

                        <OfferChoiceModal
                            visibility={[offerChoiceModalVisibility, setOfferChoiceModalVisibility]}
                            offer={ChoiceModalOffer}
                        />

                        <TouchableOpacity
                            style={{ alignSelf: 'center', backgroundColor: 'grey', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                            onPress={() => {
                                setChoiceListVisibility(false)
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