

import React, { useEffect } from "react";
import { ScrollView, useWindowDimensions, View, TouchableOpacity, Text } from "react-native";
import HTML from "react-native-render-html";


export default function OfferDetailsScreen({ navigation, route }) {
  const offer = route.params.offer;
  const offerId = offer.id;
  const offerTitle = offer.title;
  let htmlContent = offer.description;
    


  const contentWidth = useWindowDimensions().width;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 15, padding: 5, }}>
        <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('FormScreen', { offer: offer })}
        style={{ backgroundColor: 'red', flexDirection: 'row', margin: 10, padding: 10, borderRadius: 10, }}
      >
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, flex: 1 }}>املأ نموذج طلبك الان</Text>
      </TouchableOpacity>
    </View>
  );
}
