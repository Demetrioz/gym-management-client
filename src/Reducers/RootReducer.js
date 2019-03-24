import AppReducer from 'Reducers/AppReducer';
import ContentReducer from 'Reducers/ContentReducer';
import ContactReducer from 'Reducers/ContactReducer';
import ModalReducer from 'Reducers/ModalReducer';
import FormReducer from 'Reducers/FormReducer';
import NotificationReducer from 'Reducers/NotificationReducer';
import ClassReducer from 'Reducers/ClassReducer';
import AdminReducer from 'Reducers/AdminReducer';

const RootReducer = (state = 0, action) => {
    let newState = {
        app: AppReducer(state.app, action),
        content: ContentReducer(state.content, action),
        contacts: ContactReducer(state.contacts, action),
        modals: ModalReducer(state.modals, action),
        forms: FormReducer(state.forms, action),
        notifications: NotificationReducer(state.notifications, action),
        classes: ClassReducer(state.classes, action),
        admin: AdminReducer(state.admin, action),
    }

    console.log(action);
    console.log(newState);

    return newState;
}

export default RootReducer;