import { getValueFor, deleteItem, saveItem } from "../utilityFunctions/SecureStoreFunctions"
import axios from 'axios'
import store from './store'
import { setUser, setToken, setProvider } from "./StateActions";
import { getUser, refreshProvider, logError, logout, loginUser, refreshUser } from "../utilityFunctions/apiCalls"

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


export function loginProcendure(phoneNumber, password) {
    const expoPushToken = 'sadsad'
    if (expoPushToken)
        loginUser(phoneNumber, password, expoPushToken)
            .then((data) => {
                storeUserAuthRecord(data)
                setUserAndAxiosToken(data)
            })
            .catch(error => logError(error))
}


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
    logout(state.token).then((response) => {
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
        console.log('fetchProvider response', response)
        store.dispatch(setProvider(response))
    }).catch((error) => logError(error))
}


export function fetchUser(token) {
    const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    };
    refreshUser().then((response) => {
        console.log('fetchUser response', response)
        store.dispatch(setUser(response))
    }).catch((error) => logError(error))
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