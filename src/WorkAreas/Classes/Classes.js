import React, { Component } from 'react';
import { connect } from 'react-redux';

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

    handleAddClass() {
        console.log("adding!");
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
        return (
            <div id='container'>
                <div id='class_selection' className={Common.flexRow}>
                    <Form name='class_select_form'>
                        <OutlinedSelect
                            name='class'
                            label='Class'
                        />
                    </Form>
                    <ContainedButton 
                        className={Style.button}
                        icon={<Add />}
                        onClick={this.handleAddClass}
                    />
                </div>
                <ClassConfigForm />
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