import { combineReducers } from 'redux';

const INITIAL_STATE = {
    notifications: []
};

const stateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'refresh-notifications':
            console.log(state.notifications)
            return { notifications: action.notifications };

        default:
            return state
    }
};

export default combineReducers({
    state: stateReducer
});