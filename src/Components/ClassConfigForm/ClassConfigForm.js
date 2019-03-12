import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'Components/Form/Form';
import Input from 'Components/Input/Input';
import FloatingButton from 'Components/FloatingButton/FloatingButton';

import Save from '@material-ui/icons/Save';

import FormUtility from 'Utilities/FormUtility';

import Common from 'Styles/Common.module.css';

class ClassConfigForm extends Component {

    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSave() {

        let name = FormUtility.getChildValue(this.props.form, 'name');
        let label = FormUtility.getChildValue(this.props.form, 'label');
        let description = FormUtility.getChildValue(this.props.form, 'desc');

        if(this.props.onSave)
            this.props.onSave(name, label, description);
    }

    handleCancel() {
        if(this.props.onCancel)
            this.props.onCancel();
    }
    
    render() {
        return (
            <div className={Common.width50}>
                <Form name='class_modification_form' className={Common.flexColumn}>
                    <Input 
                        name='name'
                        label='Name'
                        defaultValue={this.props.name}
                    />
                    <Input 
                        name='label'
                        label='Label'
                        defaultValue={this.props.label}
                    />
                    <Input
                        name='desc'
                        label='Description'
                        defaultValue={this.props.description}
                    />
                </Form>
                <div id='button' className={`${Common.flexCenter} ${Common.flexAround} ${Common.margin3}`}>
                    <FloatingButton
                        label='Cancel'
                        onClick={this.handleCancel}
                        color='secondary'
                    />
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

function mapStateToProps(state) {
    let index = FormUtility.findFormIndexByName(state.forms, 'class_modification_form');
    
    return {
        form: state.forms[index],
    }
}

export default connect(mapStateToProps, null)(ClassConfigForm);