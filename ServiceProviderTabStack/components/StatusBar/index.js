import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { NotificationsContext } from '../../../StateManagment/NotificationsProvider'
import { AuthContext } from '../../../StateManagment/AuthState'
import Constants from 'expo-constants';
import NotificationsBell from './NotificationsBell'
import { fetchProviderNotifications } from '../../../utilityFunctions/apiCalls'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

function StatusBar(props) {
    const title = props.title
    const backButton = props.backButton
    const navigation = useNavigation()
    const { notification } = React.useContext(NotificationsContext)
    const { providerAuth, InspectAPIError } = React.useContext(AuthContext)

    React.useEffect(() => {
        fetchProviderNotifications()
            .then(data => props.refreshNotifications(data))
            .catch(error => InspectAPIError(error))
    }, [notification])

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
            <Text style={{ fontSize: 15 }}>{providerAuth.provider.name}</Text>
            <Text style={{ fontSize: 15 }}>{title}</Text>

            <NotificationsBell
                notifications={props.state.notifications}
                notification={notification}
            />
        </View>
    )
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { refreshNotifications } from '../../StateActions';
const mapStateToProps = (state1) => {
    const { state } = state1
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        refreshNotifications,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);