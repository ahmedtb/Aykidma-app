import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import axios from 'axios';

// set the base URL globally
axios.defaults.baseURL = 'https://private-3e8de-aykidmaapp.apiary-mock.com';

export const AppContext = React.createContext({});

export const AppProvider = ({children}) => {

    const [user, setUser] = useState(null)


    return (
        <AppContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </AppContext.Provider>
    )
}