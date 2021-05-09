
import { save, getValueFor, deleteItem } from './SecureStoreFunctions'
import axios from 'axios'

export async function getUserAuth() {

    //check if user already exists
    const storedResult = await getValueFor('userAuth')
    if (storedResult) {
        return JSON.parse(storedResult)
    } else {
        throw new Error('userAuth does not in exist in Secure Store')
    }
}

export async function loginUserAuth(phoneNumber, password) {

    //check if user already exists
    const storedResult = await getValueFor('userAuth')
    if (storedResult) {
        return JSON.parse(storedResult)
    } else {
        const userAuthResponse = (await axios.post('api/login', {
            'phone_number': phoneNumber,
            'password': password,
            'device_name': 'mobile'
        })).data
        save('userAuth', JSON.stringify(userAuthResponse) )
        return (userAuthResponse)

    }
}

export async function logoutUserAuth(userAuth) {
    if (!userAuth) {
        console.log('user is not login end')
        return
    }
    const config = {
        headers: { Authorization: `Bearer ${userAuth.token}` }
    };
    response = await axios.delete('api/logout', config)
    deleteItem('providerAuth')
    return response
}

export async function getProviderAuth() {


    //check if user already exists
    const storedResult = await getValueFor('providerAuth')
    if (storedResult) {
        return JSON.parse(storedResult)
    } else {
        throw new Error('providerAuth does not in exist in Secure Store')
    }
}

export async function loginProviderAuth(phoneNumber, password) {
    //check if user already exists
    const storedResult = await getValueFor('providerAuth')
    if (storedResult) {
        //return the stored result
        return JSON.parse(storedResult)
    } else {
        const providerAuthResponse = (await axios.post('api/loginProvider', {
            'phone_number': phoneNumber,
            'password': password
        })).data
        save('providerAuth', JSON.stringify(providerAuthResponse) )
        return (providerAuthResponse)
    }

    // axios.post('api/loginProvider', {
    //     'phone_number': phoneNumber,
    //     'password': password,
    // })
    //     .then((response) => {
    //         console.log('loginProvider')
    //         console.log(response.data)
    //         setProvider(response.data)
    //     })
    //     .catch(
    //         (error) => {
    //             logError(error)
    //         }
    //     )
}

export async function logoutProviderAuth(providerAuth) {

    if (!providerAuth) {
        console.log('providerAuth is not login end')
        return
    }
    const config = {
        headers: { Authorization: `Bearer ${providerAuth.token}` }
    };
    response = await axios.delete('api/logoutProvider', config)
    deleteItem('providerAuth')
    return response
}