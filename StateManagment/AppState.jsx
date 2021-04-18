import React, {useReducer, useState} from 'react'
import axios from 'axios'

export const UserContext = React.createContext({});

export const UserProvider = ({children}) => {


    return (
        <UserContext.Provider >
            {children}
        </UserContext.Provider>
    )
}