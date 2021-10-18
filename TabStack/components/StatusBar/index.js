import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
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
            marginTop: Constants.statusBarHeight,
            flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'red', borderBottomWidth: 0.5, margin: 10, padding: 5
        }}>
            <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="home-repair-service" size={40} color="red" />
                <Text style={{ fontSize: 30, color: 'red', marginLeft: 3 }}>تطبيق خدمات</Text>
            </View>
            {props.state.user ?
                <NotificationsBell /> : null}
        </View>
    )
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserNotifications } from '../../../redux/StateActions';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUserNotifications,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);