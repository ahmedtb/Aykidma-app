import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import ModalScreen from '../components/ModalScreen';
// import { AuthContext } from '../../StateManagment/AuthState'

import { MaterialIcons, Ionicons, Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function MoreTab(props) {
    // const { providerAuth } = React.useContext(AuthContext)

    function switchToProvider() {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${providerAuth?.token}`;
        props.navigation.navigate('ServiceProviderTabStack', { screen: 'MyServicesTab' })
    }

    const [aboutVis, setAboutVis] = React.useState(false)
    return (

        <View style={styles.container}>

            <Image source={require('../../resources/Aykidma.png')} style={{ width: 100 * 2.4, height: 100 }} />

            <Text style={{ fontSize: 30, backgroundColor: 'white', opacity: 0.7 }}>اطلب خدمتك الان</Text>

            <View style={{ flexDirection: 'row' }}>


                <TouchableOpacity onPress={() => props.navigation.navigate('الرئيسية')} style={styles.menuItem}>
                    <MaterialIcons name="domain" size={24} color="red" />
                    <Text style={styles.fieldLable} >الرئيسية</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('طلباتي')} style={styles.menuItem}>
                    <Ionicons name="reorder-four" size={24} color="red" />
                    <Text style={styles.fieldLable} >طلباتي</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity onPress={() => props.navigation.navigate('كل العروض')} style={styles.menuItem}>
                    <Entypo name="open-book" size={24} color="red" />
                    <Text style={styles.fieldLable} >كل العروض</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('الملف الشخصي')} style={styles.menuItem}>
                    <MaterialCommunityIcons name="face-profile" size={24} color="red" />
                    <Text style={styles.fieldLable} >الملف الشخصي</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>

                <View style={styles.menuItem}>
                    <AntDesign name="notification" size={24} color="red" />
                    <Text style={styles.fieldLable} >الاشعارات</Text>
                </View>

                <TouchableOpacity
                    onPress={() => switchToProvider()}
                    style={styles.menuItem} >
                    <MaterialIcons name="switch-account" size={24} color="red" />
                    <Text style={styles.fieldLable} >تبديل الى مزود الخدمات</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity onPress={() => setAboutVis(true)} style={styles.menuItem}>
                    <Ionicons name="ios-document-text-outline" size={24} color="red" />

                    <Text style={styles.fieldLable} >عن الشركة</Text>
                    <ModalScreen visible={aboutVis}>
                        <Text>
                            Expos are global events dedicated to finding solutions to fundamental challenges facing humanity by offering a journey inside a chosen theme through engaging and immersive activities. Organised and facilitated by governments and bringing together countries and international organisations (Official Participants), these major public events are unrivalled in their ability to gather millions of visitors, create new dynamics and catalyse change in their host cities.
                        </Text>
                        <TouchableOpacity style={{ borderWidth: 1 }} onPress={() => setAboutVis(false)}>
                            <Text>اغلاق</Text>
                        </TouchableOpacity>
                    </ModalScreen>
                </TouchableOpacity>

                <View style={styles.menuItem}>
                    <MaterialIcons name="phone-callback" size={24} color="red" />
                    <Text style={styles.fieldLable} >اتصل بنا</Text>
                </View>
            </View>


        </View>
    );
}


const styles = StyleSheet.create({

    menuItem: {
        marginVertical: 8,
        marginHorizontal: 5,
        flex: 1,
        borderWidth: 0.3,
        borderRadius: 8,
        padding: 10,

        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 7,
        backgroundColor: 'white',

        alignItems: 'flex-start'

    },

    fieldLable: {
        fontSize: 25,
        marginVertical: 5,
        color: 'black',
    },

    container: {
        marginTop:Constants.statusBarHeight,
        backgroundColor: 'white', paddingHorizontal: 20, flex: 1

    },


})