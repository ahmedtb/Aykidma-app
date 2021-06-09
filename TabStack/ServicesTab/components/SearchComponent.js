import React, { useEffect, useState, useContext } from 'react';
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
    StatusBar,
    TouchableOpacity
} from 'react-native';

import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../../../StateManagment/AuthState'
import LoadingIndicator from '../../components/loadingIndicator'

const RenderServiceCard = (props) => {
    const image = props.image;
    const title = props.title;
    const price = props.price

    return (
        <View style={{ flexDirection: 'row', margin: 10, width: '70%' }}>
            <Image source={{ uri: 'data:image/png;base64,' + image }} style={{ width: 100, height: 100 }} />

            <View style={{ margin: 10 }}>
                <Text style={styles.serviceTitle}>{title}</Text>
                <Text style={{ color: 'red' }}>{price}</Text>
            </View>
        </View>
    )
}

import RefreshScrollView from '../../components/RefreshScrollView'
import { searchThroughServices } from '../../../utilityFunctions/apiCalls'

export default function SearchComponent(props, { navigation }) {
    const focus = props.focus
    const focusHere = props.focusHere
    const unFocusFromHere = props.unFocusFromHere

    const { InspectAPIError } = React.useContext(AuthContext)
    const [services, setServices] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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
            InspectAPIError(error)
        }
    }

    useEffect(() => {

    }, [])

    const navigateToDetails = (service) => {
        navigation.navigate('ServiceProcedureStack', {
            screen: 'ServiceDetailsScreen', params: { service: service }
        })
    }

    return (
        <View >

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, padding: 10, }}>
                <View style={{ borderWidth: 1, borderRadius: 5, flex: 1, textAlign: 'right' }}>
                    <TextInput onChangeText={(text) => { setSearchTerm(text) }} />
                    {
                        (focus) ? (
                            <TouchableOpacity onPress={() => (unFocusFromHere())}>
                                <AntDesign name="closecircleo" size={24} color="black" />
                            </TouchableOpacity>
                        ) : (null)
                    }


                </View>
                <TouchableOpacity onPress={() => (search(searchTerm))}>
                    <FontAwesome5 style={{}} name="search-location" size={24} color="black" />
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
                        <View style={{ height: 50 }}></View>

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
