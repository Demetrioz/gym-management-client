import React from 'react';
import update from 'immutability-helper';

import FormUtility from 'Utilities/FormUtility';

const FormReducer = (forms = [], action) => {

    let formIndex = FormUtility.findFormIndexByName(forms, action.formName);

    switch(action.type) {

        case 'ADD_FORM': {

            let newState = update(forms, {
                $push: [action.form]
            });

            return newState;
        }

        case 'ADD_CHILD_TO_FORM': {

            let newState = update(forms, {
                [formIndex]: {
                    children: {
                        $push: [action.child]
                    }
                }
            });

            return newState;
        }

        case 'UPDATE_FORM_CHILD': {

            let childIndex = FormUtility
                .findFormChildIndexByName(forms[formIndex], action.childName);

            let newState = update(forms, {
                [formIndex]: {
                    children: {
                        [childIndex]: {
                            $merge: action.properties
                        }
                    }
                }
            });

            return newState;
        }

        case 'REMOVE_FORM': {
            
            let newState = update(forms, {
                $splice: [[[formIndex], 1]]
            });

            return newState;
        }

        default:
            return forms;
    }
}

export default FormReducer;