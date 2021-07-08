import { combineReducers } from 'redux';

const INITIAL_STATE = {
    notifications: [],
    categories: []
};

const stateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'refresh-notifications':
            return { ...state, notifications: action.notifications };
        case 'setCategories':
            return { ...state, categories: action.categories };
        default:
            return state
    }
};

export default combineReducers({
    state: stateReducer
});