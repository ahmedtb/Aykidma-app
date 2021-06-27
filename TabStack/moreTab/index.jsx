import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import ModalScreen from '../components/ModalScreen';
import { AuthContext } from '../../StateManagment/AuthState'
import axios from 'axios'
export default function MoreTab(props) {
    const { providerAuth } = React.useContext(AuthContext)

    function switchToProvider() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${providerAuth?.token}`;
        props.navigation.navigate('ServiceProviderTabStack', { screen: 'MyServicesTab' })
    }

    const [aboutVis, setAboutVis] = React.useState(false)
    return (

        <View style={styles.container}>

            <Image source={require('../../resources/Aykidma.png')} style={{ width: 100 * 2.4, height: 100 }} />

            <Text style={{ fontSize: 30, backgroundColor: 'white', opacity: 0.7 }}>اطلب خدمتك الان</Text>

            <TouchableOpacity onPress={() => props.navigation.navigate('الرئيسية')} style={styles.menuItem}>
                <Text style={styles.fieldLable} >الرئيسية</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('طلباتي')} style={styles.menuItem}>
                <Text style={styles.fieldLable} >طلباتي</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('كل العروض')} style={styles.menuItem}>
                <Text style={styles.fieldLable} >كل العروض</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('الملف الشخصي')} style={styles.menuItem}>
                <Text style={styles.fieldLable} >الملف الشخصي</Text>
            </TouchableOpacity>

            <View style={styles.menuItem}>
                <Text style={styles.fieldLable} >الاشعارات</Text>
            </View>

            <TouchableOpacity
                onPress={() => switchToProvider()}
                style={styles.menuItem} >
                <Text style={styles.fieldLable} >تبديل الى مزود الخدمات</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAboutVis(true)} style={styles.menuItem}>
                <Text style={styles.fieldLable} >عن الشركة</Text>
                <ModalScreen visible={aboutVis}>
                    <Text>
                    Expos are global events dedicated to finding solutions to fundamental challenges facing humanity by offering a journey inside a chosen theme through engaging and immersive activities. Organised and facilitated by governments and bringing together countries and international organisations (Official Participants), these major public events are unrivalled in their ability to gather millions of visitors, create new dynamics and catalyse change in their host cities.
                    </Text>
                    <TouchableOpacity style={{ borderWidth:1 }} onPress={() => setAboutVis(false)}>
                        <Text>اغلاق</Text>
                    </TouchableOpacity>
                </ModalScreen>
            </TouchableOpacity>

            <View style={{ margin: 10, flex: 1 }}>
                <Text style={styles.fieldLable} >اتصل بنا</Text>
            </View>


        </View>
    );
}


const styles = StyleSheet.create({
    enrollField: {
        borderWidth: 1, borderColor: 'grey', borderRadius: 5, padding: 10, fontSize: 20
    },

    menuItem: {
        margin: 10, flex: 1,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'pink'
    },

    fieldLable: {
        fontSize: 20,
        color: 'white',
    },

    container: {
        backgroundColor: 'red', borderWidth: 1, flex: 1, paddingHorizontal: 20
    },

})