import { combineReducers } from 'redux';

const INITIAL_STATE = {
    notifications: [],
    categories: [],
    provider: null
};

const stateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'refresh-notifications':
            return { ...state, notifications: action.notifications };
        case 'setCategories':
            return { ...state, categories: action.categories };
        case 'setProvider':
            return { ...state, provider: action.provider };
        default:
            return state
    }
};

export default combineReducers({
    state: stateReducer
});