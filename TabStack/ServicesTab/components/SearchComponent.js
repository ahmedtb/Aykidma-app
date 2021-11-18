import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import LoadingIndicator from '../../../components/loadingIndicator'
import { searchThroughServices } from '../../../utilityFunctions/apiCalls'

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
export default function SearchComponent(props) {
    const navigation = useNavigation()

    const focus = props.focus
    const focusHere = props.focusHere
    const unFocusFromHere = props.unFocusFromHere

    const [services, setServices] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');

    async function search(q) {
        if (q == '')
            return
        try {
            setLoading(true)
            const data = await searchThroughServices(q)
            setServices(data)
            focusHere()
            setLoading(false)
        } catch (error) {
            logError(error, 'SearchComponent')
        }
    }

    // useEffect(() => {

    // }, [])

    const navigateToDetails = (service) => {
        navigation.navigate('ServiceProcedureStack', {
            screen: 'ServiceDetailsScreen', params: { service: service }
        })
    }

    return (
        <View >

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginHorizontal: 5, paddingTop: 5, paddingHorizontal: 5, paddingBottom: 1 }}>
                <View style={{ borderWidth: 1, borderRadius: 5, flex: 1, textAlign: 'right', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextInput style={{ flex: 1 }} onChangeText={(text) => { setSearchTerm(text) }} />
                    {
                        (focus) ? (
                            <TouchableOpacity onPress={() => (unFocusFromHere())}>
                                <AntDesign name="closecircleo" size={24} color="black" />
                            </TouchableOpacity>
                        ) : (null)
                    }

                </View>
                <TouchableOpacity style={{}} onPress={() => (search(searchTerm))}>
                    <FontAwesome5 name="search-location" size={30} color="black" />
                </TouchableOpacity>
            </View>

            {
                (focus) ? (
                    <ScrollView style={{ padding: 20 }}>

                        {
                            (Array.isArray(services) && services.length > 0) ?
                                services.map(
                                    (service, index) => {
                                        return (
                                            <TouchableOpacity key={index} onPress={() => navigateToDetails(service)} style={styles.serviceCard}>
                                                <RenderServiceCard image={service.image} title={service.title} price={service.meta_data?.price} />
                                            </TouchableOpacity>
                                        )
                                    }
                                ) : (
                                    <Text>
                                        لا توجد نتائج لهذا البحث
                                    </Text>
                                )
                        }

                        {/* this is for bottom spaceing */}
                        {/* <View style={{ height: 50 }}></View> */}

                    </ScrollView >
                ) : null
            }



            <LoadingIndicator visibility={loading} />


        </View >

    );
}

const styles = StyleSheet.create({
    serviceCard: {
        borderWidth: 1, marginVertical: 10,
        borderRadius: 10,
        borderColor: 'red',
    },
    serviceTitle: {
        fontSize: 20,
    }
});
