import React from 'react';
import AppStack from './AppStack';
import NotificationsProvider from './NotificationsProvider'

import { Provider } from 'react-redux';
import store from '../redux/store';

export default function Route() {

    return (
        <Provider store={store}>
            <NotificationsProvider />
            <AppStack />
        </Provider>
    )
}