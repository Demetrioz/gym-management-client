import update from 'immutability-helper';

import Dashboard from 'WorkAreas/Dashboard/Dashboard';

const defaultState = () => {
    return Dashboard
}

const ContentReducer = (content = defaultState(), action) => {

    switch(action.type) {

        case 'SET_CONTENT':

            let newState = update(content, {
                $set: action.component
            });

            return newState;
        
        default:
            return content;
    }
}

export default ContentReducer;