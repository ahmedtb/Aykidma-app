import React from 'react'
import {
    Text, View, Image, ScrollView
} from 'react-native'
import ServicesList from '../../components/ServicesList'
import { fetchActivatedProviderApprovedServices, fetchActivatedProviderImage } from '../../../utilityFunctions/apiCalls'
import { logError } from '../../../redux/AuthFunctions'
import NavigationBar from '../../../components/NavigationBar'
// import { tabBarHeight } from '../../index'
export default function ServiceProviderScreen(props) {

    const provider = props.route.params.provider

    const [services, setservices] = React.useState([])
    const [image, setimage] = React.useState(null)

    function onServiceClick(service) {
        props.navigation.navigate('ServiceProcedureStack', {
            screen: 'ServiceDetailsScreen', params: { service: service }
        })
    }

    async function setup() {
        try {
            let data = await fetchActivatedProviderApprovedServices(provider.id)
            // console.log('ServiceProviderScreen setup', data.length)
            setservices(data)
            data = await fetchActivatedProviderImage(provider.id)
            setimage(data)
        } catch (error) {
            logError(error, 'ServiceProviderScreen')
        }
    }

    React.useEffect(() => {
        // console.log('ServiceProviderScreen', provider);
        setup()
    }, [])

    return (
        <View>
            <NavigationBar name={provider?.name} />
            <ScrollView>

                <Text>{provider?.name}</Text>
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />

                <Text>{provider?.phone_number}</Text>
                <Text>his coverage</Text>
                <View>{provider?.coverage.map((location, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                        <Text>{location.city}</Text>
                        <Text>{location.area}</Text>
                    </View>
                ))}</View>
                <Text>his servies</Text>
                <ServicesList services={services} onServiceClick={onServiceClick} />
                <View style={{ padding: 70 }}></View>
            </ScrollView>
        </View>

    )
}