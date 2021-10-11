import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
// import { NotificationsContext } from '../../../StateManagment/NotificationsProvider'
import Constants from 'expo-constants';
import NotificationsBell from './NotificationsBell'
import { fetchProviderNotifications, logError } from '../../../utilityFunctions/apiCalls'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

function StatusBar(props) {
    const title = props.title
    const backButton = props.backButton
    const navigation = useNavigation()
    // const { notification } = React.useContext(NotificationsContext)

    React.useEffect(() => {
        fetchProviderNotifications()
            .then(data => props.setProviderNotifications(data))
            .catch(error => logError(error))
    }, [props.state.providerNotification])

    return (
        <View style={{
            marginTop: Constants.statusBarHeight, borderWidth: 1, padding: 15, margin: 10,
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            {(backButton) ? <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name="arrow-right" size={24} color="black" />
            </TouchableOpacity> : null}
            <Text style={{ fontSize: 15 }}>{props.state.provider?.name}</Text>
            <Text style={{ fontSize: 15 }}>{title}</Text>

            <NotificationsBell
                notifications={props.state.notifications}
                notification={props.state.userNotification}
            />
        </View>
    )
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setProviderNotifications } from '../../../redux/StateActions';
const mapStateToProps = ({state}) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUser,
        setProviderNotifications
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
