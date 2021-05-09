

import React, { useEffect } from "react";
import { ScrollView, useWindowDimensions, View, TouchableOpacity, Text, Modal } from "react-native";
import HTML from "react-native-render-html";

import ViewFormFields from './ViewFormFields'

export default function OfferDetailsScreen(props) {
  const [visibility, setVisibility] = props.visibility

  const offer = props.offer;
  const fields = (offer) ? offer.fields : null;
  const offerId = (offer) ? offer.id : null;
  const offerTitle = (offer) ? offer.title : null;
  let htmlContent = (offer) ? offer.description : null;

  const contentWidth = useWindowDimensions().width;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibility}>
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
              <View style={{ flex:1 }}>
                <ScrollView style={{ marginHorizontal: 15, padding: 5, }}>
                  <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />
                
                  <ViewFormFields fields={fields} />
                </ScrollView>

                <View style={{ flexDirection: 'row',height:50 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('FormScreen', { offer: offer })}
                    style={{ backgroundColor: 'red',  padding: 10, borderRadius: 10, flex:1,  }}
                  >
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, flex: 1 }}>اختر هذا العرض</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setVisibility(false)}
                    style={{ backgroundColor: 'grey', padding: 10, borderRadius: 10,flex:1 }}
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
  );
}
