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
    TouchableOpacity,
    Pressable
} from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';
import RefreshScrollView from '../../components/RefreshScrollView'
import NotificationsBell from '../components/StatusBar/NotificationsBell';
import { setupCategories } from '../../redux/CategoriesFunctions'
import useIsMountedRef from '../../components/useIsMountedRef'
import { searchThroughServices } from '../../utilityFunctions/apiCalls'
import LoadingIndicator from '../../components/loadingIndicator'

function FrontScreen(props) {
    // const isMountedRef = useIsMountedRef();
    const [services, setServices] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const isMountedRef = useIsMountedRef()

    async function search(q) {
        if (q == '')
            return
        try {
            if (isMountedRef.current) {
                setLoading(true)
                const data = await searchThroughServices(q)
                setServices(data)
                setLoading(false)
            }
        } catch (error) {
            logError(error,'FrontScreen search')
        }
    }

    const navigateToDetails = (service) => {
        navigation.navigate('ServiceProcedureStack', {
            screen: 'ServiceDetailsScreen', params: { service: service }
        })
    }

    React.useEffect(() => {
        setupCategories()
        // console.log(props.state)
    }, [])

    return (
        <RefreshScrollView style={styles.container} refreshFunction={setupCategories} >

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'red', borderBottomWidth: 0.5, margin: 10, padding: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons name="home-repair-service" size={40} color="red" />
                    <Text style={{ fontSize: 30, color: 'red', marginLeft: 3 }}>تطبيق خدمات</Text>
                </View>
                {props.state.user ?
                    <NotificationsBell /> : null}
            </View>
            <Text style={{ fontSize: 20, backgroundColor: 'white', marginHorizontal: 20 }}>مرحبا بك في تطبيق خدمات...عن اي خدمة تبحث؟</Text>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: 10,
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                elevation: 3,
                backgroundColor: 'white',
                borderColor: 'green'
            }}>
                <TextInput value={searchTerm} style={{ flex: 3 }} placeholder="بحث" onChangeText={(text) => { setSearchTerm(text) }} />
                {
                    (services) ? (
                        <TouchableOpacity onPress={() => {
                            setServices(null)
                            setSearchTerm(null)
                        }}>
                            <AntDesign name="closecircleo" size={24} color="black" />
                        </TouchableOpacity>
                    ) : (null)
                }
                <TouchableOpacity style={{}} onPress={() => (search(searchTerm))}>
                    <FontAwesome5 name="search-location" size={30} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.servicesContainer} >
                {
                    (services?.length == 0) ?
                        <Text>
                            لا توجد نتائج لهذا البحث
                        </Text> : null
                }
                {
                    (services?.length > 0) ?
                        services.map(
                            (service, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => navigateToDetails(service)} style={styles.serviceCard}>
                                        <View style={{ flexDirection: 'row', margin: 10, width: '70%' }}>
                                            <Image source={{ uri: service.image }} style={{ width: 100, height: 100 }} />

                                            <View style={{ margin: 10 }}>
                                                <Text style={styles.serviceTitle}>{service.title}</Text>
                                                <Text style={{ color: 'red' }}>{service.price}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        ) : null

                }

                {(props.state.categories && !services) ? (
                    props.state.categories.map((category, index) => (
                        <TouchableOpacity key={index} style={styles.categoryBox} onPress={() => props.navigation.navigate('ServicesScreen', { category: category })}>
                            <Image style={{ borderWidth: 1 }} source={{ uri:  category.image }} style={{ width: 100, height: 100 }} />
                            <Text style={styles.serviceLabel} >{category.name}</Text>
                        </TouchableOpacity>
                    ))
                ) : (null)}

                <LoadingIndicator visibility={loading} />
            </View>

            <View style={{
                backgroundColor: 'yellow',
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                borderRadius: 5,
                borderColor: 'red',
                borderWidth: 0.6,
                elevation: 3,
            }}>
                <Text>هل انت مزود خدمة</Text>
                <Pressable style={{ backgroundColor: 'red', borderRadius: 5, padding: 10 }}>
                    <Text>تسجيل كمزود خدمة</Text>
                </Pressable>
            </View>


        </RefreshScrollView>

    );
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCategories } from '../../redux/StateActions'
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setCategories
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(FrontScreen);


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center"
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '2%',
        // borderWidth: 1,
        justifyContent: 'center'
        // justifyContent:'space-between'
    },
    categoryBox: {
        margin: '1%',
        borderWidth: 1,
        flexBasis: '30%',
        borderRadius: 5,
        alignItems: 'center',
        elevation: 1,
        backgroundColor: 'white',
        borderColor: 'red'
    },
    serviceLabel: {
        textAlign: 'center'
    },
    serviceCard: {
        borderWidth: 1, marginVertical: 10,
        borderRadius: 10,
        borderColor: 'red',
    },
    serviceTitle: {
        fontSize: 20,
    }
});
