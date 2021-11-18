import { logError } from "../redux/AuthFunctions"

export default async function ApiCallHandler(ApiEndpoint, setData = null, Identifier = '', logData = false) {
    try {
        const response = await ApiEndpoint()
        if (setData)
            setData(response.data)
        if (Identifier && logData)
            console.log(Identifier, response.data)
    } catch (error) {
        logError(error, Identifier)
    }
}