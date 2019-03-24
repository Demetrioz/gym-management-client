import update from 'immutability-helper';

const defaultState = () => {
    return {
        contacts: {
            interests: [],
            sources: [],
            statuses: [],
        },
        promotions: [],
        locations: [],
    }
}

const AdminReducer = (admin = defaultState(), action) => {

    switch(action.type) {
        case 'ADMIN_SET_DATA': {
            let property = action.property.split('.');
            let newState = update(admin, {});

            if(property.length === 1) {
                newState = update(admin, {
                    [property[0]]: {
                        $set: action.data
                    }
                });
            }

            if(property.length === 2) {
                newState = update(admin, {
                    [property[0]]: {
                        [property[1]]: {
                            $set: action.data
                        }
                    }
                });
            }


            return newState;
        }

        case 'ADMIN_PUSH_DATA': {
            let property = action.property.split('.');
            let newState = update(admin, {});

            if(property.length === 1) {
                newState = update(admin, {
                    [property[0]]: {
                        $push: action.data
                    }
                });
            }

            if(property.length === 2) {
                newState = update(admin, {
                    [property[0]]: {
                        [property[1]]: {
                            $push: action.data
                        }
                    }
                });
            }

            return newState;
        }

        case 'ADMIN_SPLICE_DATA': {
            let property = action.property.split('.');
            let newState = update(admin, {});

            if(property.length === 1) {
                newState = update(admin, {
                    [property[0]]: {
                        $splice: [[action.index, 1, action.data]]
                    }
                })
            }

            if(property.length === 2) {
                newState = update(admin, {
                    [property[0]]: {
                        [property[1]]: {
                            $splice: [[action.index, 1, action.data]]
                        }
                    }
                });
            }

            return newState;
        }


        default: 
            return admin;
    }
}

export default AdminReducer;