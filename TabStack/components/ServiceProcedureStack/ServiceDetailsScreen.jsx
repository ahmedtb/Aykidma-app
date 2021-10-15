import React, { useEffect } from "react";
import { ScrollView, useWindowDimensions, View, TouchableOpacity, Text } from "react-native";
import HTML from "react-native-render-html";
import NavigationBar from '../../../components/NavigationBar'


export default function ServiceDetailsScreen({ navigation, route }) {
  const service = route.params.service;
  const serviceTitle = service.title;
  let htmlContent = service.description;

  const contentWidth = useWindowDimensions().width;
  return (
    <View style={{ flex: 1 }}>
      <NavigationBar name='تفاصيل العرض'/>

      <ScrollView style={{ marginHorizontal: 15, padding: 5, }}>
        <Text style={{ margin: 15, padding: 5, fontSize:20, fontWeight:'bold' }}>{serviceTitle}</Text>
        <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('FormScreen', { service: service })}
        style={{ backgroundColor: 'red', flexDirection: 'row', margin: 10, padding: 10, borderRadius: 10, }}
      >
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, flex: 1 }}>املأ نموذج طلبك الان</Text>
      </TouchableOpacity>
    </View>
  );
}
