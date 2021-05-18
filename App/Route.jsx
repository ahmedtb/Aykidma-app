import React, { useContext, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

import { AuthProvider, AuthContext } from '../StateManagment/AuthState'
// import { AppStateProvider, AppStateContext } from '../StateManagment/AppState'
import { NotificationsProvider, NotificationsContext } from '../StateManagment/NotificationsProvider'

export default function Route() {
    const { user } = useContext(AuthContext)

    return (
        <NotificationsProvider>

            <AuthProvider>
                {/* <AppStateProvider> */}
                <AppStack />
                {/* </AppStateProvider> */}
            </AuthProvider>
        </NotificationsProvider>
    )
}