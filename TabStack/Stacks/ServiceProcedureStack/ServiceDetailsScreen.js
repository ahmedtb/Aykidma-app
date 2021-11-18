import React from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import NavigationBar from '../../../components/NavigationBar'
import ReviewsComponent from './components/ReviewsComponent'
import { fetchActivatedProvider, fetchServiceReviews } from "../../../utilityFunctions/apiCalls";
import useIsMountedRef from '../../../components/useIsMountedRef'

export default function ServiceDetailsScreen(props) {
  const isMountedRef = useIsMountedRef();

  const service = props.route.params.service;
  const serviceTitle = service.title;
  const description = service.description;
  const [provider, setprovider] = React.useState(null)
  const [reviews, setreviews] = React.useState(null)

  async function setup() {
    if (!service?.service_provider) {
      // console.log('ServiceDetailsScreen setup')
      let data = await fetchActivatedProvider(service.service_provider_id)
      if (isMountedRef.current)
        setprovider(data)
    } else {
      if (isMountedRef.current)
        setprovider(service.service_provider)
    }
    if (!service?.reviews) {
      let data = await fetchServiceReviews(service.id)
      if (isMountedRef.current)
        setreviews(data)
    } else {
      if (isMountedRef.current)
        setreviews(service.reviews)
    }
  }

  React.useEffect(() => {
    if (service) {
      setup()
    }
  }, [service])

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar name='تفاصيل العرض' />

      <ScrollView style={{ marginHorizontal: 15, padding: 5, }}>
        <View style={{ marginBottom: 30 }}>

          <Text style={{ margin: 15, padding: 5, fontSize: 20, fontWeight: 'bold' }}>{serviceTitle}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ServiceProcedureStack', { screen: 'ServiceProviderScreen', params: { provider: provider } })}
          >
            <Text >{provider?.name}</Text>
          </TouchableOpacity>
          <Text> {description} </Text>
        </View>
        <ReviewsComponent reviews={reviews} />

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
