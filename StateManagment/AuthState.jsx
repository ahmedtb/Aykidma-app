import React, { useReducer, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { set } from 'react-native-reanimated';

export const AuthContext = React.createContext({});

import logError from '../utilityFunctions/logError'
import { getUserAuth, loginUserAuth, logoutUserAuth, getProviderAuth, loginProviderAuth, logoutProviderAuth } from './ApiBackendOfAuth'

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [providerAuth, setProvider] = useState(null)

    function setUserAuthFromStore() {
        getUserAuth().then( (data) => {
            console.log(data)
            setUser(data)
        })
    }

    function login(phoneNumber, password) {
        loginUserAuth(phoneNumber, password)
            .then((data) => setUser(data))
            .catch(error => logError(error))
    }

    function logout() {
        logoutUserAuth(user).then((response) => {
            console.log('logout response')
            console.log(response)
            setUser(null)
        })
            .catch(
                (error) => logError(error)
            )
    }

    function tryLoginProviderFromStore() {
        getProviderAuth().then( (data) => {
            console.log(data)
            setProvider(data)
        }).catch(error => null )
    }

    function loginProvider(phoneNumber, password) {
        loginProviderAuth(phoneNumber, password)
            .then((data) => {
                console.log('loginProvider')
                setProvider(data)
            })
            .catch((error) => {
                logError(error)
            })
    }

    function logoutProvider() {
        logoutProviderAuth(providerAuth).then((response) => {
            console.log('logout response')
            console.log(response)
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
                setUserAuthFromStore,
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