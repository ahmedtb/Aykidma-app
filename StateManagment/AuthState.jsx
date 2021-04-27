import React, { useReducer, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { set } from 'react-native-reanimated';

export const AuthContext = React.createContext({});

function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return { user: action.user, token: action.token, login: true };
        case 'logout':
            return { ...state, login: false };
    }
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

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
        // try {
        //     const data = await axios.post('api/login', {
        //         'phone_number': phoneNumber,
        //         'password': password,
        //         'device_name': 'mobile'
        //     }).data;
        //     setUser(data)
        //     return data
        // } catch (error) {
        //     console.warn('error happened at AuthState.js: login func');
        // }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}