import update from 'immutability-helper';

const defaultState = () => {
    return {
        classTypes: [],
        classInstances: [],
        classSchedules: [],
        layout: null,
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

        case 'PUSH_CLASS_DATA': {

            let property = action.property.split('.');
            let newState = update(classes, {});

            if(property.length === 1) {
                newState = update(classes, {
                    [property[0]]: {
                        $push: action.data
                    }
                });
            }

            return newState;
        }

        case 'REMOVE_CLASS_DATA': {
            let property = action.property.split('.');
            let newState = update(classes, {});

            if(property.length === 1) {
                newState = update(classes, {
                    [property[0]]: {
                        $splice: [[action.index, 1]]
                    }
                });
            }

            return newState;
        }

        case 'SPLICE_CLASS_DATA': {
            let property = action.property.split('.');
            let newState = update(classes, {});

            if(property.length === 1) {
                newState = update(classes, {
                    [property[0]]: {
                        $splice: [[action.index, 1, action.data]]
                    }
                })
            }

            return newState
        }

        default: 
            return classes;
    }
}

export default ClassReducer;