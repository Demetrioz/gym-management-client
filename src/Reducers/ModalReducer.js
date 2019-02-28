import update from 'immutability-helper';

const defaultState = () => {
    return [];
}

const ModalReducer = (modals = defaultState(), action) => {

    switch(action.type) {

        case 'ADD_MODAL': {
            let newState = update(modals, {
                $push: [action.modal]
            });

            return newState;
        }

        case 'REMOVE_MODAL': {
            
            let modalIndex = -1;
            for(let i = 0; i < modals.length; i++) {
                if(modals[i].name === action.name) {
                    modalIndex = i;
                    break;
                }
            }

            let newState = update(modals, {
                $splice: [[modalIndex, 1]]
            });

            return newState;
        }

        default:
            return modals;
    }
}

export default ModalReducer;