import { getValueFor, deleteItem, saveItem } from "../utilityFunctions/SecureStoreFunctions"
import axios from 'axios'
import store from './store'
import { setUser, setToken, setProvider } from "./StateActions";
import { getUser, refreshProvider, logout, loginUser, refreshUser } from "../utilityFunctions/apiCalls"


export function logError(error, caller = '') {
    let Id = caller ? caller + ':' : ''
    if (error.response) {
        // Request made and server responded
        console.log(Id, error);

        console.log(Id, error.response.data);
        console.log(Id, error.response.status);
        console.log(Id, error.response.headers);
        console.log(Id, 'url ' + error.response.request.responseURL);

        if (error.response.status == 401) {
            deleteTokenRecord()
            setUserAndAxiosToken(null)
            store.dispatch(setProvider(null))
        }
    } else if (error.request) {
        // The request was made but no response was received
        console.log(Id, error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log(Id, error.message);
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
    const storeState = store.getState();
    // console.log('state', state)
    if (storeState.state.expoPushToken)
        loginUser(phoneNumber, password, storeState.state.expoPushToken)
            .then((data) => {
                console.log('loginProcedure', data.token)
                storeTokenRecord(data.token)
                setUserAndAxiosToken(data)
            })
            .catch(error => logError(error, 'authfunction loginProcedure'))
    else {
        console.log('loginProcedure', 'there is no expo push token to use')
    }
}

export function tryLoginUserFromStore() {
    getTokenFromStorage().then((token) => {
        getUser(token)
            .then((data) => setUserAndAxiosToken({ user: data, token: token }))
            .catch(error => {
                logError(error, 'tryLoginUserFromStore getUser')
                setUserAndAxiosToken(null)
                console.log('AuthenticationStack', 'user is in the store but is not validated')
            })
    }).catch(error => logError(error, 'tryLoginUserFromStore getTokenFromStorage'))
}

export function logoutProcedure() {
    const storeState = store.getState();
    logout(storeState.state.token).then((response) => {
        console.log('logoutProcedure', response)
        deleteTokenRecord()
        setUserAndAxiosToken(null)
        store.dispatch(setProvider(null))
    }).catch((error) => logError(error, 'logoutProcedure'))
}

export function fetchProvider(token) {

    refreshProvider(token).then((response) => {
        // console.log('fetchProvider response', response)
        store.dispatch(setProvider(response))
    }).catch((error) => logError(error, 'fetchProvider'))
}


export function fetchUser(token) {

    refreshUser(token).then((response) => {
        console.log('fetchUser response', response)
        store.dispatch(setUser(response))
    }).catch((error) => {
        logError(error, 'fetchUser')
    })
}

export async function getTokenFromStorage() {
    const storedResult = await getValueFor('token')
    if (storedResult) {
        return JSON.parse(storedResult)
    } else {
        throw new Error('token does not in exist in Secure Store')
    }
}

export async function storeTokenRecord(data) {
    saveItem('token', JSON.stringify(data))
}

export async function deleteTokenRecord() {
    deleteItem('token')
}