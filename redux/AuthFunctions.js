import { getValueFor, deleteItem, saveItem } from "../utilityFunctions/SecureStoreFunctions"
import axios from 'axios'
import store from './store'
import { setUser, setToken, setProvider } from "./StateActions";
import { getUser, refreshProvider, logout, loginUser, refreshUser } from "../utilityFunctions/apiCalls"


export function logError(error) {
    if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status == 401) {
            deleteUserAuthRecord()
            setUserAndAxiosToken(null)
            store.dispatch(setProvider(null))
        }
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
}

export function setUserAndAxiosToken(data) {
    if (data) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data?.token}`;
        store.dispatch(setUser(data.user))
        store.dispatch(setToken(data.token))
    } else {
        axios.defaults.headers.common['Authorization'] = null;
        store.dispatch(setUser(null))
        store.dispatch(setToken(null))
    }

}


export function loginProcedure(phoneNumber, password) {
    const state = store.getState();
    // console.log('state', state)
    if (state.state.expoPushToken)
        loginUser(phoneNumber, password, state.state.expoPushToken)
            .then((data) => {
                // console.log('loginProcedure',data)
                storeUserAuthRecord(data)
                setUserAndAxiosToken(data)
            })
            .catch(error => logError(error))
    else {
        console.log('loginProcedure', 'there is no expo push token to use')
    }
}

// export function checkIfUserTokenIsValid(token) {
//     refreshUser(token).then((response) => {
//         console.log('checkIfUserTokenIsValid response', response)
//         store.dispatch(setUser(response))
//     }).catch((error) => logError(error))
// }

export function tryLoginUserFromStore() {
    getUserAuthFromStorage().then((data) => {
        getUser(data.token)
            .then(() => setUserAndAxiosToken(data))
            .catch(error => {
                logError(error)
                setUserAndAxiosToken(null)
                console.log('AuthenticationStack', 'user is in the store but is not validated')
            })
    }).catch(error => logError(error))
}

export function logoutProcedure() {
    const state = store.getState();
    logout(state.state.token).then((response) => {
        console.log('logoutProcedure', response)
        deleteUserAuthRecord()
        setUserAndAxiosToken(null)
        store.dispatch(setProvider(null))
    }).catch((error) => logError(error))
}

export function fetchProvider(token) {
    const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    };
    refreshProvider().then((response) => {
        // console.log('fetchProvider response', response)
        store.dispatch(setProvider(response))
    }).catch((error) => logError(error))
}


export function fetchUser(token) {

    refreshUser(token).then((response) => {
        console.log('fetchUser response', response)
        store.dispatch(setUser(response))
    }).catch((error) => {
        logError(error)
        // store.dispatch(setUser(null))
        // store.dispatch(setProvider(null))
        // store.dispatch(setToken(null))
        // deleteUserAuthRecord()
    })
}

export async function getUserAuthFromStorage() {
    const storedResult = await getValueFor('userAuth')
    if (storedResult) {
        return JSON.parse(storedResult)
    } else {
        throw new Error('userAuth does not in exist in Secure Store')
    }
}

export async function storeUserAuthRecord(data) {
    saveItem('userAuth', JSON.stringify(data))
}

export async function deleteUserAuthRecord() {
    deleteItem('userAuth')
}

// export async function getProviderAuthFromStorage() {
//     const storedResult = await getValueFor('providerAuth')
//     if (storedResult) {
//         return JSON.parse(storedResult)
//     } else {
//         throw new Error('providerAuth does not in exist in Secure Store')
//     }
// }


// export async function storeProviderAuthRecord(data) {
//     saveItem('providerAuth', JSON.stringify(data))
// }


// export async function deleteProviderAuthRecord() {
//     deleteItem('providerAuth')
// }