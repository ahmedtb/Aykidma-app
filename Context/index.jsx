import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import axios from 'axios';

// set the base URL globally
axios.defaults.baseURL = 'http://10.0.3.2:8000';

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