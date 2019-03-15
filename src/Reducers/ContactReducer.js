import update from 'immutability-helper';

const defaultState = () => {
    return {
        contacts: [],
        status: [],
    }
}

const ContactReducer = (contacts =  defaultState(), action) => {

    switch(action.type) {

        case 'SET_LEADS': {

            let newState = update(contacts, {
                contacts: {
                    $set: action.data
                }
            });

            return newState;
        }

        case 'SET_CONTACT_DATA': {
            let property = action.property.split('.');
            let newState = update(contacts, {});

            if(property.length === 1) {
                newState = update(contacts, {
                    [property[0]]: {
                        $set: action.data
                    }
                });
            }

            return newState;
        }

        case 'PUSH_LEAD_DATA': {
            let property = action.property.split('.');
            let newState = update(contacts, {});

            if(property.length === 1) {
                newState = update(contacts, {
                    [property[0]]: {
                        $push: [action.data]
                    }
                });
            }

            return newState;
        }

        case 'REPLACE_CONTACT_DATA': {
            let property = action.property.split('.');
            let newState = update(contacts, {});

            if(property.length === 1) {
                newState = update(contacts, {
                    [property[0]]: {
                        $splice: [[action.index, 1, action.data]]
                    }
                });
            }

            return newState;
        }

        case 'MERGE_CONTACT_DATA': {
            let property = action.property.split('.');
            let newState = update(contacts, {});

            if(property.length === 1) {
                newState = update(contacts, {
                    [property[0]]: {
                        [action.index]: {
                            $merge: action.data
                        }
                    }
                });
            }

            return newState;
        }

        default:
            return contacts;
    }
}

export default ContactReducer;