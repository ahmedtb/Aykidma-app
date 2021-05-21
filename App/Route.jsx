import React, { useContext, useReducer } from 'react';

// import AuthStack from './AuthStack';
import AppStack from './AppStack';

import { AuthProvider } from '../StateManagment/AuthState'
// import { UserAppStateProvider } from '../StateManagment/UserAppStateProvider'
import { NotificationsProvider, NotificationsContext } from '../StateManagment/NotificationsProvider'

export default function Route() {

    return (
        <NotificationsProvider>
            <AuthProvider>
                {/* <UserAppStateProvider> */}
                    <AppStack />
                {/* </UserAppStateProvider> */}
            </AuthProvider>
        </NotificationsProvider>
    )
}