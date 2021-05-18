import React, { useReducer, useState } from 'react';

import {NotificationsContext} from './NotificationsProvider'

export const AuthContext = React.createContext({});

import logError from '../utilityFunctions/logError'
import {
    getUserAuth,
    checkIfUserTokenIsValid,
    loginUserAuth,
    storeUserAuthRecord,
    logoutUserAuth,
    deleteUserAuthRecord,

    getProviderAuth,
    checkIfProviderTokenIsValid,
    loginProviderAuth,
    storeProviderAuthRecord,
    logoutProviderAuth,
    deleteProviderAuthRecord
} from './ApiBackendOfAuth'

export const AuthProvider = ({ children }) => {
    const {expoPushToken} = React.useContext(NotificationsContext)

    const [user, setUser] = useState(null);
    const [providerAuth, setProvider] = useState(null)

    function tryLoginUserFromStore() {
        getUserAuth().then((data) => {
            checkIfUserTokenIsValid(data.token)
                .then(() => setUser(data))
                .catch(error => console.log('user is in the store but is not validated'))
        }).catch(error => console.log('user not validated'))
    }

    function login(phoneNumber, password) {
        console.log(expoPushToken)
        loginUserAuth(phoneNumber, password, expoPushToken)
            .then((data) => {
                storeUserAuthRecord(data)
                setUser(data)
            })
            .catch(error => logError(error))
    }

    function logout() {
        logoutUserAuth(user).then((response) => {
            console.log(response)
            deleteUserAuthRecord()
            setUser(null)
        }).catch((error) => logError(error))
    }

    function tryLoginProviderFromStore() {
        getProviderAuth().then((data) => {
            checkIfProviderTokenIsValid(data.token)
                .then(() => setProvider(data))
                .catch(error => console.log('provider is in the store but is not validated'))
        }).catch(error => null)
    }

    function loginProvider(phoneNumber, password) {
        loginProviderAuth(phoneNumber, password, expoPushToken)
            .then((data) => {
                console.log('loginProvider')
                storeProviderAuthRecord(data)
                setProvider(data)
            })
            .catch((error) => {
                logError(error)
            })
    }

    function logoutProvider() {
        logoutProviderAuth(providerAuth.token).then((response) => {
            console.log('logout response')
            console.log(response)
            deleteProviderAuthRecord()
            setProvider(null)
        })
            .catch(
                (error) => {
                    logError(error)
                }
            )
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                tryLoginUserFromStore,
                login,
                logout,

                providerAuth,
                tryLoginProviderFromStore,
                loginProvider,
                logoutProvider
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}