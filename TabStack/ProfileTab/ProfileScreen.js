
import React from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import StatusBar from '../components/StatusBar'
import { getUserImage, getUser, } from '../../utilityFunctions/apiCalls'
import RefreshScrollView from '../../components/RefreshScrollView'
import useIsMountedRef from '../../components/useIsMountedRef'
import { logoutProcedure, logError } from '../../redux/AuthFunctions'
import { FontAwesome } from '@expo/vector-icons'
function ProfileScreen(props) {
    const isMountedRef = useIsMountedRef()
    const name = props.state.user.name
    const phone_number = props.state.user.phone_number

    const [image, setimage] = React.useState(null)

    React.useEffect(() => {
        getUserImage()
            .then(data => {
                if (isMountedRef.current)
                    setimage(data)
            })
            .catch(error => logError(error))
    }, [])


    async function RefreshUserData() {
        try {
            const data = await getUser()
            console.log('RefreshUserData', data)
        } catch (error) {
            logError(error)
        }
    }


    async function refreshFunction() {
        await RefreshUserData()
        try {
            const data = await getUserImage()
            setimage(data)
        } catch (error) {
            logError(error)
        }
    }

    return (
        <RefreshScrollView refreshFunction={refreshFunction}>

            <StatusBar style={{ margin: 10 }} title='الملف الشخصي' />

            <View style={{ padding: 10, borderWidth: 0.4, borderRadius: 10, marginHorizontal: 15  }}>

                <View style={{ flexDirection: 'row'}}>
                    <View>
                        <Image source={{ uri: 'data:image/png;base64,' + image }} style={{ width: 150, height: 150, borderRadius: 8, borderColor: 'red', borderWidth: 1 }} />
                        <Text style={{ fontSize: 20, flex: 1, textAlign: 'center' }} >{name}</Text>
                    </View>
                    <View style={{  flex: 1, marginLeft: 5 }}>

                        <View style={{ margin: 3, flexDirection: 'row', justifyContent:'space-around' }}>
                            <FontAwesome name="mobile-phone" size={35} color="black" />
                            {/* <Text style={{ fontSize: 20 }} >رقم الهاتف</Text> */}
                            <Text style={{ fontSize: 20, textAlign: 'center' }} >{phone_number}</Text>
                        </View>

                    </View>

                </View>


                <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 30 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'grey', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                        onPress={() => { logoutProcedure() }}
                    >
                        <Text style={{ color: 'white' }}>تسجيل الخروج</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                        onPress={() => { props.navigation.navigate('EditProfileScreen', { image: image }) }}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>تعديل الملف الشخصي</Text>
                    </TouchableOpacity>
                </View>

            </View>


        </RefreshScrollView>

    );
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);