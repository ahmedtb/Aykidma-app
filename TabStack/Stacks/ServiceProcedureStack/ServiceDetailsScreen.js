import React from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import NavigationBar from '../../../components/NavigationBar'
import ReviewsComponent from './components/ReviewsComponent'
export default function ServiceDetailsScreen(props) {
  const service = props.route.params.service;
  const serviceTitle = service.title;
  const description = service.description;
  const provider = service.service_provider;
  React.useEffect(() => {
    if (service) {
      // console.log('ServiceDetailsScreen', service.service_provider)
    }
  }, [])

  const [viewSP, setviewSP] = React.useState(false)

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar name='تفاصيل العرض' />

      <ScrollView style={{ marginHorizontal: 15, padding: 5, }}>
        <View style={{ marginBottom: 30 }}>

          <Text style={{ margin: 15, padding: 5, fontSize: 20, fontWeight: 'bold' }}>{serviceTitle}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ServiceProviderPage', { provider: provider })}
          >
            <Text >{service.service_provider.name}</Text>
            {/* <ModalScreen visible={viewSP}>
              <ServiceProviderPage id={service.service_provider.id} onServiceClick={() => null} />
              <TouchableOpacity
                onPress={() => setviewSP(false)}
              >
                <Text >close</Text>
              </TouchableOpacity>

            </ModalScreen> */}
          </TouchableOpacity>
          <Text> {description} </Text>
        </View>
        <ReviewsComponent service={service} />

      </ScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('FormScreen', { service: service })}
        style={{ backgroundColor: 'red', flexDirection: 'row', margin: 10, padding: 10, borderRadius: 10, }}
      >
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, flex: 1 }}>املأ نموذج طلب</Text>
      </TouchableOpacity>
    </View>
  );
}
