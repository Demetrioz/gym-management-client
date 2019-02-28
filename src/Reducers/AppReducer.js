import update from 'immutability-helper';

const defaultState = () => {
    return {
        user: null,
    }
}

const AppReducer = (app = defaultState(), action) => {
    
    switch(action.type) {
    
        case 'SET_USER': {
            let newState = update(app, {
                user: {
                    $set: action.data
                }
            });

            return newState;
        }

        default: {
            return app;
        }
    }
}

export default AppReducer;