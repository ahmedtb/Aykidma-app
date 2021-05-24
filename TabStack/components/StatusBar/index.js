import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { NotificationsContext } from '../../../StateManagment/NotificationsProvider'
import { AuthContext } from '../../../StateManagment/AuthState'
import Constants from 'expo-constants';
import NotificationsBell from './NotificationsBell'

import { fetchUserNotifications } from '../../../utilityFunctions/apiCalls'


function StatusBar(props) {
    const { notification } = React.useContext(NotificationsContext)
    const { user, InspectAPIError } = React.useContext(AuthContext)

    React.useEffect(() => {
        fetchUserNotifications(user.token)
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
            <Text style={{ fontSize: 15 }}>{user.user.name}</Text>
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