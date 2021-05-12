import React, { useReducer, useState } from 'react'

function logError(error) {
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

export const AppStateContext = React.createContext({});
// import {StacksEnum} from '../App/AppStack'

export const AppStateProvider = ({ children }) => {

    // const [stack, setStack] = useState(StacksEnum.ServiceProviderTabStack)


    return (
        <AppStateContext.Provider
            value={{
                logError,
                // stack,
                // setStack
            }} >
            {children}
        </AppStateContext.Provider>
    )
}