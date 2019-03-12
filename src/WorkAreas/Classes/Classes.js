import React, { Component } from 'react';
import { connect } from 'react-redux';
import Enumerable from 'linq';

import Form from 'Components/Form/Form';
import OutlinedSelect from 'Components/OutlinedSelect/OutlinedSelect';
import ContainedButton from 'Components/ContainedButton/ContainedButton';
import ClassConfigForm from 'Components/ClassConfigForm/ClassConfigForm';

import Add from '@material-ui/icons/Add';

import NotificationActions from 'Actions/NotificationActions';

import GymManagementApiService from 'Services/GymManagementApiService';

import Style from './Classes.module.css';
import Common from 'Styles/Common.module.css';

class Classes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showForm: false,
            selectedClass: null,
            type: null,
        }

        this.handleAddClass = this.handleAddClass.bind(this);
        this.onSave = this.onSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    handleChange(value) {

        let selected = Enumerable
            .from(this.props.classTypes)
            .where(classType => classType.typeId === value)
            .firstOrDefault();

        this.setState({
            showForm: true,
            selectedClass: selected,
            type: 'edit'
        });
    }

    handleAddClass() {
        this.setState({
            showForm: true,
            type: 'create'
        });
    }

    async onSave(name, label, description) {

        this.props.dispatch(NotificationActions.addNotification(
            'Saving...',
            'Saving Information',
            'class_save_notification'
        ));
        
        try {
            if(this.state.type === 'edit') {
                let updatedType = {
                    Category: this.state.selectedClass.category,
                    Created: this.state.selectedClass.created,
                    IsDeleted: this.state.selectedClass.isDeleted,
                    TypeId: this.state.selectedClass.typeId
                }
    
                updatedType.Name = name !== null
                    ? name
                    : this.state.selectedClass.name;
    
                updatedType.Label = label !== null
                    ? label
                    : this.state.selectedClass.label;
    
                updatedType.Description = description !== null
                    ? description
                    : this.state.selectedClass.description;
    
                let result = await GymManagementApiService.updateTypes([updatedType]);
                
                let index = -1;
                for(let i = 0; i < this.props.classTypes; i++) {
                    if(this.props.classTypes[i].typeId === this.state.selectedClass.typeId) {
                        index = i;
                        break;
                    }
                }

                this.props.dispatch({
                    type: 'SPLICE_CLASS_DATA',
                    property: 'classTypes',
                    index: index,
                    data: result[0]
                });
            }
            else {
                let updatedType = {
                    Category: 'class',
                    Name: name,
                    Label: label,
                    Description: description,
                }
    
                let result = await GymManagementApiService.createType([updatedType]);

                this.props.dispatch({
                    type: 'PUSH_CLASS_DATA',
                    property: 'classTypes',
                    data: result
                });

                //Update select options
                let classTypeOptions = this.props.classTypes.map(classType => {
                    return {
                        value: classType.typeId,
                        label: classType.label
                    }
                });
    
                this.props.dispatch({
                    type: 'UPDATE_FORM_CHILD',
                    formName: 'class_select_form',
                    childName: 'class',
                    properties: {
                        options: classTypeOptions
                    }
                });
            }
        }
        catch(error) {
            console.log("Error:", error);
        }
        finally {

            this.setState({
                showForm: false,
                selectedClass: null,
                type: null
            });

            this.props.dispatch(NotificationActions.removeNotification(
                'class_save_notification'));
        }
    }

    onCancel() {
        this.setState({
            showForm: false,
            selectedClass: null,
            type: null,
        });
    }

    async componentDidMount() {
        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Information',
            'lead_info_notification'
        ));

        try {
            let classTypes = await GymManagementApiService.getTypesByCategory('class');

            let classTypeOptions = classTypes.map(classType => {
                return {
                    value: classType.typeId,
                    label: classType.label
                }
            });

            this.props.dispatch({
                type: 'UPDATE_FORM_CHILD',
                formName: 'class_select_form',
                childName: 'class',
                properties: {
                    options: classTypeOptions
                }
            });

            this.props.dispatch({
                type: 'SET_CLASS_DATA',
                property: 'classTypes',
                data: classTypes
            });
        }
        catch(error) {
            console.log("Error:", error);
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'lead_info_notification'));
        }
    }

    render() {

        let form = this.state.showForm
        ? 
        <ClassConfigForm 
            onSave={this.onSave}
            onCancel={this.onCancel}
            name={this.state.selectedClass ? this.state.selectedClass.name : ''}
            label={this.state.selectedClass ? this.state.selectedClass.label : ''}
            description={this.state.selectedClass ? this.state.selectedClass.description : ''}
        />
        : null;
        
        return (
            <div id='container'>
                <div id='class_selection' className={Common.flexRow}>
                    <Form name='class_select_form'>
                        <OutlinedSelect
                            name='class'
                            label='Class'
                            onChange={this.handleChange}
                        />
                    </Form>
                    <ContainedButton 
                        className={Style.button}
                        icon={<Add />}
                        onClick={this.handleAddClass}
                    />
                </div>
                {form}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        classTypes: state.classes.classTypes,
    }
}

export default connect(mapStateToProps, null)(Classes);