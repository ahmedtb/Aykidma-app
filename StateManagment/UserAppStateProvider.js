import React from 'react';
import logError from '../utilityFunctions/logError'
import {fetchUserNotifications} from '../utilityFunctions/apiCalls'
import { AuthContext } from './AuthState';
// import { NotificationsContext } from './NotificationsProvider';

export const UserAppStateContext = React.createContext({});

export const UserAppStateProvider = ({ children }) => {
    const {user} = React.useContext(AuthContext)
    // const {notification} = React.useContext(NotificationsContext)


    const [notifications, setNotifications] = React.useState([])

    // React.useEffect(() => {
    //     fetchUserNotifications(user.token).then(()=>null)
    //     .catch(error => logError(error))
    // },[notification])

    return (
        <UserAppStateContext.Provider
            value={{
                notifications
            }}
        >
            {children}
        </UserAppStateContext.Provider>
    )
}