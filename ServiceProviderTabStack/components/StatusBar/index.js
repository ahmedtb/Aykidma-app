import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
// import { NotificationsContext } from '../../../StateManagment/NotificationsProvider'
import Constants from 'expo-constants';
import NotificationsBell from './NotificationsBell'
import { fetchProviderNotifications } from '../../../utilityFunctions/apiCalls'
import { logError } from '../../../redux/AuthFunctions'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

function StatusBar(props) {
    const style = props.style
    const title = props.title
    const backButton = props.backButton
    const navigation = useNavigation()
    // const { notification } = React.useContext(NotificationsContext)

    React.useEffect(() => {
        fetchProviderNotifications()
            .then(data => props.setProviderNotifications(data))
            .catch(error => logError(error,'SP stack StatusBar'))
    }, [props.state.providerNotification])

    return (
        <View style={{
            ...style,

            marginTop: Constants.statusBarHeight,
            flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'red', borderBottomWidth: 0.8, margin: 10, padding: 5

        }}>
            {(backButton) ? <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name="arrow-right" size={24} color="red" />
            </TouchableOpacity> : null}
            <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="home-repair-service" size={40} color="red" />
                <Text style={{ fontSize: 30, color: 'red', marginLeft: 3 }}>{title ?? 'تطبيق خدمات'}</Text>
            </View>

            <NotificationsBell />
        </View>
    )
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setProviderNotifications } from '../../../redux/StateActions';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUser,
        setProviderNotifications
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
