import store from './store'
import { setCategories } from './StateActions';
import { getAvailableCategories } from '../utilityFunctions/apiCalls'
import { logError } from './AuthFunctions';

export async function setupCategories() {
    try {
        const data = await getAvailableCategories()
        store.dispatch(setCategories(data))
    } catch (error) {
        logError(error,'setupCategories')
    }
}

export function getCategory(id) {
    const state = store.getState();
    
    let category = null;
    // console.log('getCategory', state);

    state.state.categories.forEach((item) => {
        if (item.id == id) {
            category = item;
        }
    });
    // console.log('getCategory', category);
    return category
}