import update from 'immutability-helper';

const defaultState = () => {
    return {
        classTypes: [],
        classInstances: [],
    }
}

const ClassReducer = (classes = defaultState(), action) => {
    
    switch(action.type) {
        case 'SET_CLASS_DATA': {

            let property = action.property.split('.');
            let newState = update(classes, {});

            if(property.length === 1) {
                newState = update(classes, {
                    [property[0]]: {
                        $set: action.data
                    }
                });
            }

            return newState;
        }

        default: 
            return classes;
    }
}

export default ClassReducer;