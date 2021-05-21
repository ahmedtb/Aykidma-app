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

export const fetchOffers = async () => {
    try {
        let response = await axios.get('/api/offers')
        let data = await response.data
        return data
    } catch (error) {
        logError(error)
    }
    return null
}

export const fetchServices = async (token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        let response = await axios.get('/api/myServices', config)
        let data = await response.data
        return data
    } catch (error) {
        logError(error)
    }
    return null
}

export const fetchServiceProviderOrders = async (token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const orders = (await axios.get('/api/orders', config)).data
        return orders
    } catch (error) {
        console.log('fetchServiceProviderOrders error')
        logError(error)
    }

}

export const resumeNewOrder = async (token, orderId) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const body = {
            order_id: orderId
        }
        const orders = (await axios.put('api/order/resume', body, config)).data
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
    const orders = (await axios.put('api/order/done', body, config)).data
    return orders
    // } catch (error) {
    //     console.log('doneResumedOrder error')
    //     logError(error)
    // }
}

export const creatNewServiceWtihOffer = async (title, description, fields, category_id, meta_data, details, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const body = {
            title: title, description: description, fields: fields, category_id: category_id, meta_data: meta_data, details: details
        }
        const response = (await axios.post('api/createServiceWithOffer', body, config)).data
        console.log(response)
        return response
    } catch (error) {
        console.log('creatNewServiceWtihOffer error')
        logError(error)
    }
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

export const fetchOffersByCategory = async (category_id) => {
    const response = (await axios.get('api/offers/' + category_id)).data
    return response

}

export const fetchUserNotifications = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return (await axios.get('api/userNotifications', config)).data

}