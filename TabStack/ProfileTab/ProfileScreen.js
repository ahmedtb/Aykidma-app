
import React from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import { AuthContext } from '../../StateManagment/AuthState'
import StatusBar from '../components/StatusBar'
import { getUserImage } from '../../utilityFunctions/apiCalls'

export default function ProfileScreen({ navigation }) {

    const { logout, user, InspectAPIError } = React.useContext(AuthContext)
    const name = user.user.name
    const phone_number = user.user.phone_number

    const [image, setimage] = React.useState(null)

    React.useEffect(() => {
        getUserImage().then(data => setimage(data)).catch(error => InspectAPIError(error))
    }, [])

    return (
        <ScrollView >

            <StatusBar />

            <View style={{ alignItems: 'center', borderBottomWidth: 1, marginBottom: 10, padding: 10, backgroundColor: 'red' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>
                    الملف الشخصي
                </Text>
            </View>

            <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>

                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 20 }} >الاسم: {name}</Text>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 20 }} >رقم الهاتف: {phone_number}</Text>
                </View>

            </View>

            <Image source={{ uri: 'data:image/png;base64,' + image }} style={{ width: 200, height: 200 }} />


            <TouchableOpacity
                style={{ alignSelf: 'center', backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => {
                    navigation.navigate('EditProfileScreen',{image:image})
                }}
            >
                <Text style={{ color: 'white' }}>تعديل الملف الشخصي</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ alignSelf: 'center', backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => {
                    logout()
                }
                }
            >
                <Text style={{ color: 'white' }}>تسجيل الخروج</Text>
            </TouchableOpacity>


        </ScrollView>

    );
}
