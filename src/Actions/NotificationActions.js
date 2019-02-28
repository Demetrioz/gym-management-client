import React from 'react';

import Notification from 'Components/Notification/Notification';

class NotificationActions {

    static addNotification(action, message, name) {

        let dispatch = {
            name: name,
            component: 
                <Notification
                    action={action}
                    message={message}
                />
        };

        return {
            type: 'ADD_NOTIFICATION',
            notification: dispatch
        }

    }

    static removeNotification(name) {

        return {
            type: 'REMOVE_NOTIFICATION',
            name: name
        }
    }
}

export default NotificationActions;