import axios from 'axios'
import logError from './logError'


export { logError }

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
    try {
        const orders = (await axios.get('/api/orders')).data
        return orders
    } catch (error) {
        console.log('fetchServiceProviderOrders error')
        logError(error)
    }

}

export const submitOrder = async (fields, service_id) => {

    const bodyParameters = {
        fields: fields, service_id: service_id
    };

    const response = (await axios.post('/api/orders', bodyParameters)).data
    return response
}

export const resumeNewOrder = async (orderId) => {
    try {
        const body = {
            order_id: orderId
        }
        const orders = (await axios.put('api/order/resume', body)).data
        return orders
    } catch (error) {
        console.log('resumeNewOrder error')
        logError(error)
    }
}

export const doneResumedOrder = async (token, orderId) => {
    // try {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const body = {
        order_id: orderId
    }
    const orders = (await axios.put('api/order/done', body)).data
    return orders
    // } catch (error) {
    //     console.log('doneResumedOrder error')
    //     logError(error)
    // }
}

// export const creatNewServiceWtihOffer = async (title, description, fields, category_id, meta_data, details) => {
//     try {
//         const body = {
//             title: title, description: description, fields: fields, category_id: category_id, meta_data: meta_data, details: details
//         }
//         const response = (await axios.post('api/createServiceWithOffer', body)).data
//         console.log(response)
//         return response
//     } catch (error) {
//         console.log('creatNewServiceWtihOffer error')
//         logError(error)
//     }
// }

export const createService = async (title, description, fields, category_id, image, meta_data) => {
    const body = {
        title: title, description: description, fields: fields, category_id: category_id, image: image, meta_data: meta_data
    }
    const response = (await axios.post('api/services', body)).data
    return response
}

export const editService = async (service_id,title, description, fields, category_id, image, meta_data) => {
    const body = {
        title: title, description: description, fields: fields, category_id: category_id, image: image, meta_data: meta_data
    }
    const response = (await axios.put('api/services/'+service_id, body)).data
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