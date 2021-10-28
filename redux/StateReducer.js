import { combineReducers } from 'redux';

const INITIAL_STATE = {
    providerNotifications: [],
    providerNotification: null,
    userNotifications: [],
    userNotification: null,
    expoPushToken: null,

    categories: [],
    // services: [],
    // service_providers: [],
    provider: null,
    user: null,
    token: null,

};

const stateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'setProviderNotifications':
            return { ...state, providerNotifications: action.providerNotifications };
        case 'setProviderNotification':
            return { ...state, providerNotification: action.providerNotification };
        case 'setUserNotifications':
            return { ...state, userNotifications: action.userNotifications };
        case 'setUserNotification':
            return { ...state, userNotification: action.userNotification };
        case 'setExpoPushToken':
            // console.log('state reducer expo token', action)
            return { ...state, expoPushToken: action.expoPushToken };
        case 'setCategories':
            return { ...state, categories: action.categories };
        // case 'setServices':
        //     return { ...state, services: action.services };
        // case 'setServiceProviders':
        //     return { ...state, service_providers: action.service_providers };
        case 'setProvider':
            return { ...state, provider: action.provider };
        case 'setUser':
            return { ...state, user: action.user };
        case 'setToken':
            return { ...state, token: action.token };
        default:
            return state
    }
};

export default combineReducers({
    state: stateReducer
});