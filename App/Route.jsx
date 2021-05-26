import React from 'react';
import AppStack from './AppStack';
import { AuthProvider } from '../StateManagment/AuthState'
import { NotificationsProvider, NotificationsContext } from '../StateManagment/NotificationsProvider'

export default function Route() {

    return (
        <NotificationsProvider>
            <AuthProvider>
                <AppStack />
            </AuthProvider>
        </NotificationsProvider>
    )
}