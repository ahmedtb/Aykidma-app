import React, { useEffect, useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import StatusBar from '../components/StatusBar';
import LoadingIndicator from '../../components/loadingIndicator'
import { fetchMyServices } from '../../utilityFunctions/apiCalls'
import { Feather } from '@expo/vector-icons';
import RefreshScrollView from '../../components/RefreshScrollView'
import useIsMountedRef from '../../components/useIsMountedRef'

const RenderServiceCard = (props) => {
    const image = props.image;
    const title = props.title;
    const price = props.price
    const rating = props.rating

    return (
        <View style={{ paddingVertical: 10, paddingHorizontal: 4 }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, }}>
                <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 7 }} />
                <Text style={styles.serviceTitle}>{title}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, paddingVertical: 3, justifyContent: 'space-evenly', }}>
                <Text style={{ color: 'red' }}>سعر: {price}</Text>
                <Text style={{ color: 'red' }}>التقييم: {rating}</Text>
            </View>

        </View>
    )
}


function ServiceScreen(props) {
    const isMountedRef = useIsMountedRef()
    const [Services, setServices] = useState(null);
    const [loading, setLoading] = useState(false);

    async function setupServices() {
        if (isMountedRef.current)
            setLoading(true);
        try {

            const data = await fetchMyServices()
            if (isMountedRef.current)
                setServices(data);
        } catch (error) {

        }
        if (isMountedRef.current)
            setLoading(false)
    }

    useEffect(() => {
        setupServices()
    }, [props.route?.params?.refresh])

    return (
        <View style={styles.container}>

            <StatusBar title={props.state.provider?.name} />

            <RefreshScrollView refreshFunction={setupServices} style={{ paddingHorizontal: 20 }}>

                {
                    (Services) ?
                        Services.map(
                            (service, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => props.navigation.navigate('ViewServiceScreen', { service: service })}
                                        style={styles.serviceCard}
                                    >
                                        <RenderServiceCard
                                            image={service.image}
                                            title={service.title}
                                            price={service.price}
                                            rating={service.meta_data?.rating}
                                        // servicePrice={service.meta_data?.cost}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        ) : (null)
                }



                {/* this is for bottom spaceing */}
                <View style={{ height: 50 }}></View>

            </RefreshScrollView >

            <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('AddNewService') }} >
                    <Feather name="plus-circle" size={50} color="red" />
                </TouchableOpacity>
            </View>
            <LoadingIndicator visibility={loading} />


        </View >

    );
}
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../../redux/StateActions';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ServiceScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    serviceCard: {
        borderWidth: 0.8,
        marginVertical: 10,
        borderRadius: 10,
        borderColor: 'red',
        elevation: 3,
        backgroundColor: 'white'

    },
    serviceTitle: {
        fontSize: 20, flex: 1
    }
});
