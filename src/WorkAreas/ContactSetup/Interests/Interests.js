import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from 'Components/DataTable/DataTable';
import Form from 'Components/Form/Form';
import Input from 'Components/Input/Input';
import FloatingButton from 'Components/FloatingButton/FloatingButton';

import NotificationActions from 'Actions/NotificationActions';

import FormUtility from 'Utilities/FormUtility';

import GymManagementApiService from 'Services/GymManagementApiService';

import Common from 'Styles/Common.module.css';
import Add from '@material-ui/icons/Add';
import Save from '@material-ui/icons/Save';

class Interests extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showForm: false,
            selectedInterest: null,
            type: null,
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    configureColumns() {
        return [
            {
                label: 'Name',
                property: 'name',
            },
            {
                label: 'Label',
                property: 'label'
            }
        ];
    }

    handleClick(event, props) {
        this.setState({
            showForm: true,
            selectedInterest: props,
            type: 'edit'
        });
    }

    handleAdd() {
        this.setState({ showForm: true });
    }

    handleCancel() {
        this.setState({ 
            showForm: false,
            selectedInterest: null,
            type: null
        });
    }

    async handleSave() {
        this.props.dispatch(NotificationActions.addNotification(
            'Saving...',
            'Saving Information',
            'saving_notification'
        ));

        let name = FormUtility.getChildValue(this.props.form, 'name');
        let label = FormUtility.getChildValue(this.props.form, 'label');

        try {
            if(this.state.type === 'edit') {
                
                let updatedInterest = {
                    InterestId: this.state.selectedInterest.interestId,
                    Name: name,
                    Label: label,
                    Created: this.state.selectedInterest.created,
                    IsDeleted: this.state.selectedInterest.isDeleted,
                }

                let result = await GymManagementApiService.updateInterests([updatedInterest]);

                let index = -1;
                for(let i = 0; i < this.props.interests.length; i++){
                    if(this.props.interests[i].interestId === result[0].interestId) {
                        index = i;
                        break;
                    }
                }

                this.props.dispatch({
                    type: 'ADMIN_SPLICE_DATA',
                    property: 'contacts.interests',
                    index: index,
                    data: result[0]
                });

                this.setState({
                    showForm: false,
                    selectedInterest: null,
                    type: null
                });
            }
            else {
                let newInterest = {
                    Name: name,
                    Label: label
                }

                let result = await GymManagementApiService.createInterests([newInterest]);

                this.props.dispatch({
                    type: 'ADMIN_PUSH_DATA',
                    property: 'contacts.interests',
                    data: result
                });

                this.setState({ showForm: false });
            }
        }
        catch(error) {
            // TODO: Error Modal
            console.log("Error saving interests:", error);
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'saving_notification'));
        }
    }

    async componentDidMount() {
        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Information',
            'loading_notification'
        ));

        try {
            let interests = await GymManagementApiService.getInterests();

            this.props.dispatch({
                type: 'ADMIN_SET_DATA',
                property: 'contacts.interests',
                data: interests,
            });
        }
        catch(error) {
            // TODO: Error Modal
            console.log("Error loading contacts:", error);
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'loading_notificaiton'));
        }
    }

    render() {

        let columns = this.configureColumns();

        let defaultName = this.state.selectedInterest
            ? this.state.selectedInterest.name
            : null;

        let defaultLabel = this.state.selectedInterest
            ? this.state.selectedInterest.label
            : null;

        // TODO: name cannot be edited after creation
        let form = this.state.showForm
            ?
                <div id='form' className={Common.width45}>
                    <Form name='interest_form' className={Common.flexColumn}>
                        <Input 
                            name='name'
                            label='Name'
                            defaultValue={defaultName}
                        />
                        <Input
                            name='label'
                            label='Label'
                            defaultValue={defaultLabel}
                        />
                    </Form>
                    <div id='form_button' className={`${Common.flexCenter} ${Common.flexAround} ${Common.margin3}`}>
                        <FloatingButton
                            label='Cancel'
                            color='secondary'
                            onClick={this.handleCancel}
                        />
                        <FloatingButton
                            label='Save'
                            icon={<Save />}
                            onClick={this.handleSave}
                        />
                    </div>
                </div>
            : null;

        return (
            <div id='container' className={`${Common.flexRow} ${Common.flexBetween} ${Common.marginTopSm}`}>
                <div id='table' className={`${Common.width45} ${Common.flexColumn}`}>
                    <DataTable
                        styledHeader={true}
                        columns={columns}
                        data={this.props.interests}
                        onClick={this.handleClick}
                    />
                    <div id='table_button' className={`${Common.margin3} ${Common.marginLeftAuto}`}>
                        <FloatingButton  
                            label='Add'
                            icon={<Add />}
                            onClick={this.handleAdd}
                        />
                    </div>
                </div>
                {form}
            </div>
        )
    }
}

function mapStateToProps(state) {

    let index = FormUtility.findFormIndexByName(state.forms, 'interest_form');

    return {
        interests: state.admin.contacts.interests,
        form: state.forms[index],
    }
}

export default connect(mapStateToProps, null)(Interests);