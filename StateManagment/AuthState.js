import React, { useReducer, useState } from 'react';
import axios from 'axios'
import { NotificationsContext } from './NotificationsProvider'

export const AuthContext = React.createContext();

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
    const { expoPushToken } = React.useContext(NotificationsContext)

    const [user, setUser] = useState(null);
    const [providerAuth, setProvider] = useState(null)

    function setUserAndAxiosToken(data) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data?.token}`;
        setUser(data)
    }

    function tryLoginUserFromStore() {
        getUserAuth().then((data) => {
            checkIfUserTokenIsValid(data.token)
                .then(() => setUserAndAxiosToken(data))
                .catch(error => {
                    setUserAndAxiosToken(null)
                    console.log('user is in the store but is not validated')
                })
        }).catch(error => console.log('user not validated'))
    }

    function login(phoneNumber, password) {
        if (expoPushToken)
            loginUserAuth(phoneNumber, password, expoPushToken)
                .then((data) => {
                    storeUserAuthRecord(data)
                    setUserAndAxiosToken(data)
                })
                .catch(error => logError(error))
    }

    function logout() {
        logoutUserAuth(user.token).then((response) => {
            console.log(response)
            deleteUserAuthRecord()
            setUserAndAxiosToken(null)
        }).catch((error) => logError(error))
    }

    function setProviderAndAxiosToken(data) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data?.token}`;
        setProvider(data)
    }

    function tryLoginProviderFromStore() {
        getProviderAuth().then((data) => {
            checkIfProviderTokenIsValid(data.token)
                .then(() => setProviderAndAxiosToken(data))
                .catch(error => {
                    setProviderAndAxiosToken(null)
                    console.log('provider is in the store but is not validated')
                })
        }).catch(error => null)
    }

    function loginProvider(phoneNumber, password) {
        loginProviderAuth(phoneNumber, password, expoPushToken)
            .then((data) => {
                console.log('loginProvider')
                storeProviderAuthRecord(data)
                setProviderAndAxiosToken(data)
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
            setProviderAndAxiosToken(null)
        })
            .catch(
                (error) => {
                    logError(error)
                }
            )
    }

    function InspectAPIError(error) {

        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            if (error.response.status == 401) {
                tryLoginUserFromStore()
                tryLoginProviderFromStore()
            }
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }

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
                logoutProvider,

                InspectAPIError
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}