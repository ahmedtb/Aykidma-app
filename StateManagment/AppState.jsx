import React, {useReducer, useState} from 'react'
import axios from 'axios'

export const AppStateContext = React.createContext({});

export const AppStateProvider = ({children}) => {


    return (
        <AppStateContext.Provider >
            {children}
        </AppStateContext.Provider>
    )
}