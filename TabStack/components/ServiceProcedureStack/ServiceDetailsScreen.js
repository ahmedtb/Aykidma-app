import { startGeofencingAsync } from "expo-location";
import React from "react";
import { ScrollView, useWindowDimensions, View, TouchableOpacity, Text } from "react-native";
import NavigationBar from '../../../components/NavigationBar'
import { AntDesign, Octicons } from '@expo/vector-icons'
import { TextInput } from "react-native-gesture-handler";

export default function ServiceDetailsScreen({ navigation, route }) {
  const service = route.params.service;
  const serviceTitle = service.title;
  const description = service.description;
  const reviews = service.reviews

  React.useEffect(() => {
    if (service) {
      // console.log('service.reviews', service.reviews)
    }
  }, [])

  const [report, setreport] = React.useState('')

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar name='تفاصيل العرض' />

      <ScrollView style={{ marginHorizontal: 15, padding: 5, }}>
        <View style={{ marginBottom: 30 }}>

          <Text style={{ margin: 15, padding: 5, fontSize: 20, fontWeight: 'bold' }}>{serviceTitle}</Text>
          <Text> {description} </Text>
        </View>

        <View style={{}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>تعليقات حول الخدمة</Text>
          {
            reviews.map((review, index) => (
              <View key={index} style={{ borderBottomWidth: 0.7 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Text>{review.user.name}</Text>
                  <Text>
                    {
                      (() => {
                        let stars = []
                        for (let i = 0; i < review.rating; i++) {
                          stars.push(<AntDesign key={i} name="star" size={24} color="black" />)
                        }
                        return stars
                      })()
                    }
                  </Text>
                  <TouchableOpacity onPress={() => null}>
                    <Octicons name="report" size={24} color="black" />
                  </TouchableOpacity>
                  <ModalWrapper visible={false}>
                      <TextInput onTextChange={()=>null}/>
                  </ModalWrapper>
                </View>
                <Text>{review.comment}</Text>
              </View>
            ))
          }
        </View>
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
