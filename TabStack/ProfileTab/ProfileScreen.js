
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

    async function refreshFunction() {
        await RefreshUserData()
        try{
            const data = await getUserImage()
            setimage(data)
        }catch(error){
            InspectAPIError(error)
        }
    }

    return (
        <RefreshScrollView refreshFunction={refreshFunction}>

            <StatusBar style={{margin:10}} title='الملف الشخصي'/>


            <View style={{ flexDirection: 'row', padding:10, borderWidth:0.4, borderRadius:10, marginHorizontal:15 }}>

                <Image source={{ uri: 'data:image/png;base64,' + image }} style={{ width: 150, height: 150, borderRadius:8, borderColor:'red', borderWidth:1 }} />

                <View style={{ justifyContent: 'space-around', flex: 1, marginLeft:5 }}>

                    <View style={{ margin: 3, flexDirection:'row' }}>
                        <Text style={{ fontSize: 20, marginRight:5 }} >الاسم</Text>
                        <Text style={{ fontSize: 20, flex:1, textAlign:'center' }} >{name}</Text>

                    </View>

                    <View style={{ margin: 3, flexDirection:'row' }}>
                        <Text style={{ fontSize: 20, marginRight:5 }} >رقم الهاتف</Text>
                        <Text style={{ fontSize: 20, flex:1, textAlign:'center' }} >{phone_number}</Text>
                    </View>

                </View>

            </View>


            <View style={{justifyContent:'space-around', flexDirection:'row', marginTop: 30}}>
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
