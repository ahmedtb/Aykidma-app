
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
import RefreshScrollView from '../components/RefreshScrollView'
import useIsMountedRef from '../../utilityFunctions/useIsMountedRef'

export default function ProfileScreen({ navigation }) {
    const isMountedRef = useIsMountedRef()
    const { logout, user, InspectAPIError, RefreshUserData } = React.useContext(AuthContext)
    const name = user.user.name
    const phone_number = user.user.phone_number

    const [image, setimage] = React.useState(null)

    React.useEffect(() => {
        getUserImage()
            .then(data => {
                if (isMountedRef.current)
                    setimage(data)
            })
            .catch(error => InspectAPIError(error))
    }, [])

    function refreshFunction() {
        RefreshUserData()
        getUserImage().then(data => setimage(data)).catch(error => InspectAPIError(error))
    }

    return (
        <RefreshScrollView refreshFunction={refreshFunction}>

            <StatusBar style={{margin:10}} title='الملف الشخصي'/>


            <View style={{ flexDirection: 'row' }}>

                <Image source={{ uri: 'data:image/png;base64,' + image }} style={{ width: 200, height: 200 }} />

                <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>

                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 20 }} >الاسم: {name}</Text>
                    </View>

                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 20 }} >رقم الهاتف: {phone_number}</Text>
                    </View>

                </View>

            </View>


            <View style={{justifyContent:'center', flexDirection:'row', marginTop: 30}}>
                <TouchableOpacity
                    style={{ backgroundColor: 'grey', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                    onPress={() => { logout() }}
                >
                    <Text style={{ color: 'white' }}>تسجيل الخروج</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                    onPress={() => { navigation.navigate('EditProfileScreen', { image: image }) }}
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}>تعديل الملف الشخصي</Text>
                </TouchableOpacity>
            </View>



        </RefreshScrollView>

    );
}
