import axios from 'axios'


export const getUserImage = async () => {
    const data = (await axios.get('/api/user/image')).data
    return data
}

export const getProviderImage = async () => {
    const data = (await axios.get('/api/provider/image')).data
    return data
}

export const signUpUser = async (name, phoneNumber, password, image) => {
    const data = await axios.post('/api/signup', {
        name: name, phone_number: phoneNumber, password: password, image: image
    }).data
    return data

}

export const enrollProvider = async (name, coverage, image) => {
    return await axios.post('/api/enrollProvider', {
        name: name, coverage: coverage, image: image
    })

}

export const editUserProfile = async (name, phoneNumber, image) => {
    const data = (await axios.post('/api/user/edit', {
        name: name, phone_number: phoneNumber, image: image
    })).data
    return data
}

export const editProviderProfile = async (name, phoneNumber, image) => {
    return await axios.post('/api/provider/edit', {
        name: name, image: image
    })
}

export const refreshUser = async (token) => {
    const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    };
    const data = (await axios.get('/api/user', config)).data
    return data
}

export const refreshProvider = async (token) => {
    const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    };
    const data = (await axios.get('/api/provider', config)).data
    return data
}

export const activateUser = async (name, phoneNumber, password, activationNumber) => {
    const data = await axios.post('/api/signup', {
        name: name, phone_number: phoneNumber, password: password, activationNumber: activationNumber
    })
    return data
}

export const fetchServices = async () => {
    let response = await axios.get('/api/services')
    let data = await response.data
    return data
}

export const fetchActivatedProvider = async (id) => {
    return (await axios.get('/api/provider/' + id)).data
}

export const fetchActivatedProviderApprovedServices = async (id) => {
    return (await axios.get('/api/provider/' + id + '/services')).data
}

export const fetchActivatedProviderImage = async (id) => {
    return (await axios.get('/api/provider/' + id + '/image')).data
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

    let response = await axios.get('/api/myServices')
    let data = await response.data
    return data

}

export const fetchServiceProviderOrders = async () => {
    const orders = (await axios.get('/api/providerOrders')).data
    return orders
}

export const fetchServiceReviews = async (id) => {
    return (await axios.get('/api/service/' + id + '/reviews')).data
}

export const fetchUserOrders = async (token) => {
    const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    };
    const orders = (await axios.get('/api/userOrders', config)).data
    return orders
}

export const submitOrder = async (array_of_fields, service_id) => {

    const bodyParameters = {
        array_of_fields: array_of_fields, service_id: service_id
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

export const createService = async (title, description, array_of_fields, category_id, image, meta_data) => {
    const body = {
        title: title, description: description, array_of_fields: array_of_fields, category_id: category_id, image: image, meta_data: meta_data
    }
    const response = (await axios.post('api/services', body)).data
    return response
}

export const editService = async (service_id, title, description, array_of_fields, category_id, image, meta_data) => {
    const body = {
        title: title, description: description, array_of_fields: array_of_fields, category_id: category_id, image: image, meta_data: meta_data
    }
    const response = (await axios.put('api/services/' + service_id, body))
    // console.log('editService data', response.config)
    return response
}

export const getAvailableCategories = async () => {
    const response = (await axios.get('api/category')).data
    return response

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
    return (await axios.get('api/user', config)).data
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

export async function providerDeleteOrder(id, token) {
    const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    };
    response = await axios.delete('api/providerOrder/' + id, config)
    return response
}

export async function submitReviewReport(review_id, body, token) {
    const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    };

    return await axios.post('api/reportReview/', {
        review_id: review_id, body: body
    }, config)
}