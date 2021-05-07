import React, { useReducer, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { set } from 'react-native-reanimated';

export const AuthContext = React.createContext({});

import logError from '../utilityFunctions/logError'

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [providerAuth, setProvider] = useState(null)

    function login(phoneNumber, password) {

        axios.post('api/login', {
            'phone_number': phoneNumber,
            'password': password,
            'device_name': 'mobile'
        })
            .then((response) => {
                setUser(response.data)
            })
            .catch(
                (error) => {
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                }
            )
    }

    function logout() {
        if(!user) {
            console.log('user is not login end')
            return
        }
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.delete('api/logout',config)
            .then((response) => {
                console.log('logout response')
                console.log(response)
                setUser(null)
            })
            .catch(
                (error) => {
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                }
            )
    }

    function loginProvider(phoneNumber, password){
        axios.post('api/loginProvider', {
            'phone_number': phoneNumber,
            'password': password,
        })
            .then((response) => {
                setProvider(response.data)
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
                login,
                logout,
                providerAuth,
                loginProvider
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}