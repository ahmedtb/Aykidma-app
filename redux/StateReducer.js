import { combineReducers } from 'redux';

const INITIAL_STATE = {
    providerNotifications: [],
    userNotifications: [],
    categories: [],
    provider: null,
    user: null,
    token: null
};

const stateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'setProviderNotifications':
            return { ...state, providerNotifications: action.providerNotifications };
        case 'setUserNotifications':
            return { ...state, userNotifications: action.userNotifications };
        case 'setCategories':
            return { ...state, categories: action.categories };
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