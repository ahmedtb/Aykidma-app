import { getValueFor, deleteItem, saveItem } from "./SecureStoreFunctions"

export async function getUserAuth() {
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


export async function storeProviderAuthRecord(data) {
    saveItem('providerAuth', JSON.stringify(data))
}


export async function deleteProviderAuthRecord() {
    deleteItem('providerAuth')
}