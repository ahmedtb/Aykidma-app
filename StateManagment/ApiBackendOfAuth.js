
import { saveItem, getValueFor, deleteItem } from './SecureStoreFunctions'
import axios from 'axios'

export async function getUserAuth() {
    const storedResult = await getValueFor('userAuth')
    if (storedResult) {
        return JSON.parse(storedResult)
    } else {
        throw new Error('userAuth does not in exist in Secure Store')
    }
}

export async function loginUserAuth(phoneNumber, password) {


    const userAuthResponse = (await axios.post('api/login', {
        'phone_number': phoneNumber,
        'password': password,
        'device_name': 'mobile'
    })).data
    return (userAuthResponse)
}

export async function storeUserAuth(data) {
    saveItem('userAuth', JSON.stringify(data))
}

export async function logoutUserAuth(token) {
    if (!token) {
        console.log('user token is not valid')
        return
    }
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    response = await axios.delete('api/logout', config)
    return response
}

export async function deleteUserAuthRecord(){
    deleteItem('userAuth')
}

export async function getProviderAuth() {
    const storedResult = await getValueFor('providerAuth')
    if (storedResult) {
        return JSON.parse(storedResult)
    } else {
        throw new Error('providerAuth does not in exist in Secure Store')
    }
}

export async function checkIfProviderTokenIsValid(token) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get('api/provider', config)
}

export async function loginProviderAuth(phoneNumber, password) {

    const providerAuthResponse = (await axios.post('api/loginProvider', {
        'phone_number': phoneNumber,
        'password': password
    })).data
    return (providerAuthResponse)

}

export async function storeProviderAuthRecord(data) {
    saveItem('providerAuth', JSON.stringify(data))
}

export async function logoutProviderAuth(token) {

    if (!token) {
        console.log('token is not login end')
        return
    }
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    response = await axios.delete('api/logoutProvider', config)
    return response
}

export async function deleteProviderAuthRecord() {
    deleteItem('providerAuth')
}