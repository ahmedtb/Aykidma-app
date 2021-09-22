import React from 'react'
import {
    View,
    Text
} from 'react-native'
// import { NotificationsContext } from '../../../StateManagment/NotificationsProvider'

import Constants from 'expo-constants';
import NotificationsBell from './NotificationsBell'

import { fetchUserNotifications, logError } from '../../../utilityFunctions/apiCalls'


function StatusBar(props) {
    const title = props.title
    const style = props.style
    // const { notification } = React.useContext(NotificationsContext)

    React.useEffect(() => {
        fetchUserNotifications(props.state.token)
            .then(data => props.setUserNotifications(data))
            .catch(error => logError(error))
        // console.log('statusbar props',props)
    }, [props.state.userNotification])

    return (
        <View style={{
            ...style,
            marginTop: Constants.statusBarHeight, borderWidth: 1, padding: 5,
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Text style={{ fontSize: 15 }}>{props.state.user.name}</Text>
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
import { setUserNotifications } from '../../../redux/StateActions';
const mapStateToProps = ({state}) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUserNotifications,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);