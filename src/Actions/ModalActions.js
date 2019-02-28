import React from 'react';
import Modal from 'Components/Modal/Modal';

class ModalActions {
    static addModal(modal) {
        let dispatch = {
            name: modal.name,
            component: 
                <Modal
                    hideClose={modal.hideClose}
                    name={modal.name}
                    title={modal.title}
                    content={modal.content} 
                    className={modal.className}
                />
        };

        return {
            type: 'ADD_MODAL',
            modal: dispatch
        }
    }

    static removeModal(name) {
        return {
            type: 'REMOVE_MODAL',
            name: name
        }
    }
}

export default ModalActions;