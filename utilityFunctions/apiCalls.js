import axios from 'axios'
import logError from './logError'


export { logError }

export const getUserImage = async () => {
    const data = (await axios.get('/api/user/image')).data
    return data
}

export const getProviderImage = async () => {
    const data = (await axios.get('/api/provider/image')).data
    return data
}

export const signUpUser = async (name, phoneNumber, password) => {
    try {
        const data = await axios.post('/api/signup', {
            name: name, phone_number: phoneNumber, password: password
        }).data
        return data
    } catch (error) {
        logError(error)
    }
}

export const editUserProfile = async (name, phoneNumber, image) => {
    const data = (await axios.post('/api/user/edit', {
        name: name, phone_number: phoneNumber, image: image
    })).data
    return data
}

export const editProviderProfile = async (name, phoneNumber, image) => {
    const data = (await axios.post('/api/provider/edit', {
        name: name, phone_number: phoneNumber, image: image
    })).data
    return data
}

export const refreshUser = async (token) => {
    const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    };
    const data = (await axios.get('/api/user', config)).data
    return data
}

export const refreshProvider = async (token) => {
    // console.log('refreshProvider auth token', axios.defaults.headers.common['Authorization'])
    const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    };
    const data = (await axios.get('/api/provider', config)).data
    return data
}

export const activateUser = async (name, phoneNumber, password, activationNumber) => {
    try {
        const data = await axios.post('/api/signup', {
            name: name, phone_number: phoneNumber, password: password, activationNumber: activationNumber
        })
        return data
    } catch (error) {
        logError(error)
    }
}

export const fetchServices = async () => {
    let response = await axios.get('/api/services')
    let data = await response.data
    return data
}

export const searchThroughServices = async (q) => {
    let response = await axios.get('api/search/services/' + q)
    let data = await response.data
    return data
}

export const searchThroughServicesWithCategory = async (category_id, q) => {
    let response = await axios.get('api/search/services/' + category_id + '/' + q)
    let data = await response.data
    return data
}

export const fetchMyServices = async () => {

    try {
        let response = await axios.get('/api/myServices')
        let data = await response.data
        return data
    } catch (error) {
        logError(error)
    }
    return null
}

export const fetchServiceProviderOrders = async () => {
    const orders = (await axios.get('/api/orders')).data
    return orders
}

export const fetchUserOrders = async () => {
    const orders = (await axios.get('/api/orders')).data
    return orders
}

export const submitOrder = async (fields, service_id) => {

    const bodyParameters = {
        fields: fields, service_id: service_id
    };

    const response = (await axios.post('/api/orders', bodyParameters)).data
    return response
}

export const resumeNewOrder = async (orderId) => {
    const body = {
        order_id: orderId
    }
    return (await axios.put('api/order/resume', body)).data
}

export const doneResumedOrder = async (orderId, comment, rating) => {
    const body = {
        order_id: orderId,
        comment: comment,
        rating: rating
    }
    const orders = (await axios.put('api/order/done', body)).data
    return orders
}

export const createService = async (title, description, fields, category_id, image, meta_data) => {
    const body = {
        title: title, description: description, fields: fields, category_id: category_id, image: image, meta_data: meta_data
    }
    const response = (await axios.post('api/services', body)).data
    return response
}

export const editService = async (service_id, title, description, fields, category_id, image, meta_data) => {
    const body = {
        title: title, description: description, fields: fields, category_id: category_id, image: image, meta_data: meta_data
    }
    const response = (await axios.put('api/services/' + service_id, body))
    // console.log('editService data', response.config)
    return response
}

export const getAvailableCategories = async () => {
    try {
        const response = (await axios.get('api/category')).data
        return response
    } catch (error) {
        console.log('getAvailableCategories error')
        logError(error)
        return []
    }
}

export const fetchServicesByCategory = async (category_id) => {
    const response = (await axios.get('api/services/' + category_id)).data
    return response

}

export const fetchUserNotifications = async () => {

    return (await axios.get('api/userNotifications')).data
}

export const fetchProviderNotifications = async () => {

    return (await axios.get('api/providerNotifications')).data
}


export async function getUser(token) {
    const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    };
    return await axios.get('api/user', config)
}

export async function loginUser(phoneNumber, password, expoPushToken) {
    const userAuthResponse = (await axios.post('api/login', {
        'phone_number': phoneNumber,
        'password': password,
        'device_name': 'mobile',
        'expo_token': expoPushToken
    })).data
    return (userAuthResponse)
}

export async function logout(token) {

    const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    };
    response = await axios.delete('api/logout', config)
    return response
}

export async function userDeleteOrder(id, token) {
    const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    };
    response = await axios.delete('api/userOrder/' + id, config)
    return response
}

export async function providerDeleteOrder(token) {
    const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    };
    response = await axios.delete('api/logout', config)
    return response
}
