import React from 'react';
import AppStack from './AppStack';
import { AuthProvider } from '../StateManagment/AuthState'
import { NotificationsProvider, NotificationsContext } from '../StateManagment/NotificationsProvider'

import { Provider } from 'react-redux';
import store from '../redux/store';

export default function Route() {

    return (
        <NotificationsProvider>
            <Provider store={store}>
                {/* <AuthProvider> */}
                    <AppStack />
                {/* </AuthProvider> */}
            </Provider>
        </NotificationsProvider>
    )
}