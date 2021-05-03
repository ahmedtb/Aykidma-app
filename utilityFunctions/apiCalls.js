import axios from 'axios'

export const signUpUser = async (name, phoneNumber, password) => {
    try {
        const data = await axios.post('/api/signup', {
            name: name, phone_number: phoneNumber, password: password
        }).data
        return data
    } catch (error) {
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
}

export const activateUser = async (name, phoneNumber, password, activationNumber) => {
    try {
        const data = await axios.post('/api/signup', {
            name: name, phone_number: phoneNumber, password: password, activationNumber:activationNumber
        })
        return data
    } catch (error) {
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
}