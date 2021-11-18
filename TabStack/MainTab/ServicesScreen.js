import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    Button,
    TouchableOpacity
} from 'react-native';
import LoadingIndicator from '../../components/loadingIndicator'
import NavigationBar from '../../components/NavigationBar'

import { fetchServicesByCategory } from '../../utilityFunctions/apiCalls'
import { logError } from '../../redux/AuthFunctions'
import useIsMountedRef from '../../components/useIsMountedRef'

const RenderServiceCard = (props) => {
    const image = props.image;
    const title = props.title;
    const price = props.price

    return (
        <View style={{ flexDirection: 'row', margin: 10, width: '70%' }}>
            <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />

            <View style={{ margin: 10 }}>
                <Text style={styles.serviceTitle}>{title}</Text>
                <Text style={{ color: 'red' }}>{price}</Text>
            </View>
        </View>
    )
}

export default function ServicesScreen({ navigation, route }) {
    const isMountedRef = useIsMountedRef();

    const category = route.params.category

    const [services, setServices] = React.useState([])
    const [loading, setLoading] = React.useState(true);

    async function setup() {
        try {
            const data = await fetchServicesByCategory(category.id)
            if (isMountedRef.current) {
                setServices(data)
                setLoading(false)
            }
        } catch (error) { logError(error, 'ServicesScreen setup') }
    }

    React.useEffect(() => {
        setup()
    }, [])

    const navigateToDetails = (service) => {
        navigation.navigate('ServiceProcedureStack', {
            screen: 'ServiceDetailsScreen', params: { service: service }
        })
    }

    return (

        <View style={styles.container}>
            <NavigationBar name={category.name} />

            <ScrollView style={{ padding: 20 }}>

                {(services) ? services.map((service, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => navigateToDetails(service)} style={styles.serviceCard}>
                            <RenderServiceCard image={service.image} title={service.title} price={service.meta_data?.price} />
                        </TouchableOpacity>
                    )
                }) : (null)}

                {/* this is for bottom spaceing */}
                <View style={{ height: 50 }}></View>

            </ScrollView>


            <LoadingIndicator visibility={loading} />


        </View >

    );
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // marginTop: StatusBar.currentHeight,
        paddingBottom: 10,
    },
    serviceCard: {
        borderWidth: 1, marginVertical: 10,
        borderRadius: 10,
        borderColor: 'red',
    },
    serviceTitle: {
        fontSize: 20,
        // textAlign:'justify',
    }
});
