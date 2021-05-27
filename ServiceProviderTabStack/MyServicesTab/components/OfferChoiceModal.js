

import React from "react";
import { StyleSheet, Image, ScrollView, useWindowDimensions, View, TouchableOpacity, Text, Modal } from "react-native";
import HTML from "react-native-render-html";
import { Ionicons } from '@expo/vector-icons';

import ViewFormFields from './ViewFormFields'

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

export default function OfferDetailsScreen(props) {
  const [offerChoiceModalVisibility, setOfferChoiceModalVisibility] = React.useState(false)
  const [ChosenOffer, setChosenOffer] = props.choice

  const offer = props.offer;
  const fields = (offer) ? offer.fields : null;
  const offerId = (offer) ? offer.id : null;
  const offerTitle = (offer) ? offer.title : null;
  let htmlContent = (offer) ? offer.description : null;

  const contentWidth = useWindowDimensions().width;
  return (
    <View>
      <TouchableOpacity onPress={() => {
        setOfferChoiceModalVisibility(true)
      }} style={styles.offerCard}>
        {
          (ChosenOffer) ?
            (<Ionicons name="radio-button-on" size={24} color="black" />)
            :
            (<Ionicons name="radio-button-off" size={24} color="black" />)
        }

        <RenderOfferCard image={offer.image} title={offer.title} price={offer.meta_data?.price} />

      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={offerChoiceModalVisibility}>
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
            {
              (offer) ? (
                <View style={{ flex: 1 }}>
                  <ScrollView style={{ marginHorizontal: 15, padding: 5, }}>
                    <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />

                    <ViewFormFields fields={fields} />
                  </ScrollView>

                  <View style={{ flexDirection: 'row', height: 50 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setChosenOffer(offer)
                        setOfferChoiceModalVisibility(false)
                      }}
                      style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, flex: 1, }}
                    >
                      <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, flex: 1 }}>اختر هذا العرض</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setOfferChoiceModalVisibility(false)}
                      style={{ backgroundColor: 'grey', padding: 10, borderRadius: 10, flex: 1 }}
                    >
                      <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, flex: 1 }}>اغلاق</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              ) : (null)
            }

          </View>
        </View>
      </Modal>
    </View>
  );
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