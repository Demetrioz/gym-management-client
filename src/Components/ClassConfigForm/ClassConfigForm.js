import React, { Component } from 'react';

import Form from 'Components/Form/Form';
import Input from 'Components/Input/Input';
import FloatingButton from 'Components/FloatingButton/FloatingButton';

import Save from '@material-ui/icons/Save';

import GymManagementApiService from 'Services/GymManagementApiService';

import Common from 'Styles/Common.module.css';

class ClassConfigForm extends Component {

    handleSave() {

    }
    
    render() {
        return (
            <div className={Common.width50}>
                <Form name='class_modification_form' className={Common.flexColumn}>
                    <Input 
                        name='name'
                        label='Name'
                    />
                    <Input 
                        name='label'
                        label='Label'
                    />
                    <Input
                        name='desc'
                        label='Description'
                    />
                </Form>
                <div id='button' className={`${Common.flexCenter} ${Common.margin3}`}>
                    <FloatingButton
                        icon={<Save />}
                        label='Save'
                        onClick={this.handleSave}
                    />
                </div>
            </div>
        )
    }
}

export default ClassConfigForm;