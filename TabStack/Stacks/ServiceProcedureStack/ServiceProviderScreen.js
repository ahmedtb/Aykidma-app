import React from 'react'
import {
    Text, View, Image
} from 'react-native'
import ServicesList from '../../components/ServicesList'
import { fetchProvider } from '../../../utilityFunctions/apiCalls'
import { logError } from '../../../redux/AuthFunctions'

export default function ServiceProviderScreen(props) {

    const provider = props.provider
    const onServiceClick = props.onServiceClick
    const [provider, setprovider] = React.useState(null)

    async function setup() {
        try {
            const data = await fetchProvider(id)
            setprovider(data)
        } catch (error) {
            logError(error, 'ServiceProviderScreen')
        }
    }

    React.useEffect(() => {
        setup()
    }, [])

    return (
        <View>
            <Text>{provider?.name}</Text>
            <Image source={{ uri: 'data:image/png;base64,' + provider?.image }} style={{ width: 200, height: 200 }} />

            <Text>{provider?.phone_number}</Text>
            <Text>{provider?.coverage}</Text>
            {/* <ServicesList services={provider?.services} onServiceClick={onServiceClick} /> */}
        </View>
    )
}