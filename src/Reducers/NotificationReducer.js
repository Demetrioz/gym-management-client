import update from 'immutability-helper';

const NotificationReducer= (notifications = [], action) => {

    switch(action.type) {
        case 'ADD_NOTIFICATION': {
            let newState = update(notifications, {
                $push: [action.notification]
            });

            return newState;
        }

        case 'REMOVE_NOTIFICATION': {

            let notificationIndex = -1;
            for(let i = 0; i < notifications.length; i++) {
                if(notifications[i].name === action.name) {
                    notificationIndex = i;
                    break;
                }
            }

            let newState = update(notifications, {
                $splice: [[notificationIndex, 1]]
            })

            return newState;
        }

        default:
            return notifications;
    }
}

export default NotificationReducer;