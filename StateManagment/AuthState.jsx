import React, { useReducer, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

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

    async function login(phoneNumber, password) {
        try {
            data = await axios.post('api/login', {
                'phone_number': phoneNumber,
                'password': password,
                'device_name': 'mobile'
            }).data;
            setUser(data)
            return data
        } catch (error) {
            console.warn('error happened at AuthState.js: login func');
        }
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