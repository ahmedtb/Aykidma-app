
import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import StatusBar from '../components/StatusBar'
import RefreshScrollView from '../../components/RefreshScrollView'
import { getProviderImage } from '../../utilityFunctions/apiCalls'
import useIsMountedRef from '../../components/useIsMountedRef'
import { fetchProvider, logoutProcedure, logError } from '../../redux/AuthFunctions'

function ProfileScreen(props) {

    const isMountedRef = useIsMountedRef()
    const name = props.state.provider?.name
    const phone_number = props.state.user?.phone_number
    const image = props.state.user?.image

    // const [image, setimage] = React.useState(null)

    // async function getImage() {
    //     try {
    //         const data = await getProviderImage()
    //         if (isMountedRef.current)
    //             setimage(data)
    //     } catch (error) {
    //         logError(error, 'ProfileScreen getImage')
    //     }
    // }

    React.useEffect(() => {
        // getImage()
    }, [])

    return (
        <RefreshScrollView refreshFunction={fetchProvider}>

            <StatusBar title='الملف الشخصي' />

            <View style={{ flexDirection: 'row', padding: 10, borderWidth: 0.4, borderRadius: 10, marginHorizontal: 15, borderColor: 'red', marginVertical: 7, elevation: 4, backgroundColor: 'white' }}>

                <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 8, borderColor: 'red', borderWidth: 1 }} />

                <View style={{ justifyContent: 'space-around', flex: 1, marginLeft: 5 }}>

                    <View style={{ margin: 3, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, marginRight: 5 }} >الاسم</Text>
                        <Text style={{ fontSize: 20, flex: 1, textAlign: 'center' }} >{name}</Text>

                    </View>

                    <View style={{ margin: 3, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, marginRight: 5 }} >رقم الهاتف</Text>
                        <Text style={{ fontSize: 20, flex: 1, textAlign: 'center' }} >{phone_number}</Text>
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
                    onPress={() => { props.navigation.navigate('ProviderEditProfileScreen', { image: image }) }}
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}>تعديل الملف الشخصي</Text>
                </TouchableOpacity>
            </View>


        </RefreshScrollView>

    );
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setToken } from '../../redux/StateActions';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUser,
        setToken
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
