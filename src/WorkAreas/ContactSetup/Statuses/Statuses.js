import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from 'Components/DataTable/DataTable';
// import Form from 'Components/Form/Form';
// import Input from 'Components/Input/Input';
// import FloatingButton from 'Components/FloatingButton/FloatingButton';

import NotificationActions from 'Actions/NotificationActions';

import FormUtility from 'Utilities/FormUtility';

import GymManagementApiService from 'Services/GymManagementApiService';

import Common from 'Styles/Common.module.css';

class Statuses extends Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         showForm: false,
    //         selectedStatus: null,
    //         type: null,
    //     }

    //     this.handleAdd = this.handleAdd.bind(this);
    //     this.handleCancel = this.handleCancel.bind(this);
    //     this.handleSave = this.handleSave.bind(this);
    // }

    configureColumns() {
        return [
            {
                label: 'Type',
                property: 'type',
            },
            {
                label: 'Label',
                property: 'label',
            },
            {
                label: 'Description',
                property: 'description',
            }
        ];
    }

    // handleClick(event, props) {
    //     this.setState({
    //         showForm: true,
    //         selectedStatus: props,
    //         type: 'edit'
    //     });
    // }

    // handleAdd() {
    //     this.setState({ showForm: true });
    // }

    // handleCancel() {
    //     this.setState({
    //         showForm: false,
    //         selectedStatus: null,
    //         type: null
    //     });
    // }

    // async handleSave() {
    //     this.props.dispatch(NotificationActions.addNotification(
    //         'Saving...',
    //         'Saving Information',
    //         'saving_notification'
    //     ));

    //     let type = FormUtility.getChildValue(this.props.form, 'type')
    //     let name = FormUtility.getChildValue(this.props.form, 'name');
    //     let label = FormUtility.getChildValue(this.props.form, 'label');
    //     let description = FormUtility.getChildValue(this.props.form, 'description');

    //     try {
    //         if(this.state.type === 'edit') {
                
    //         }
    //         else {

    //         }
    //     }
    //     catch(error) {
    //         // TODO: Error Modal
    //         console.log("Error saving interests:", error);
    //     }
    //     finally {
    //         this.props.dispatch(NotificationActions.removeNotification(
    //             'saving_notification'));
    //     }
    // }

    async componentDidMount() {

        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Information',
            'loading_notification'
        ));

        try {
            let statuses = await GymManagementApiService.getStatuses();

            this.props.dispatch({
                type: 'ADMIN_SET_DATA',
                property: 'contacts.statuses',
                data: statuses,
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

        // TODO: name cannot be edited after creation
        // let form = this.state.showForm
        //     ?
        //         <div id='form' className={Common.width45}>
        //             <Form name='interest_form' className={Common.flexColumn}>
        //                 <Input 
        //                     name='type'
        //                     label='Type'
        //                 />
        //                 <Input
        //                     name='name'
        //                     label='Name'
        //                 />
        //                 <Input
        //                     name='label'
        //                     label='Label'
        //                 />
        //                 <Input
        //                     name='description'
        //                     label='Description'
        //                 />
        //             </Form>
        //             <div id='form_button' className={`${Common.flexCenter} ${Common.flexAround} ${Common.margin3}`}>
        //                 <FloatingButton
        //                     label='Cancel'
        //                     color='secondary'
        //                     onClick={this.handleCancel}
        //                 />
        //                 <FloatingButton
        //                     label='Save'
        //                     onClick={this.handleSave}
        //                 />
        //             </div>
        //         </div>
        //     : null;

        return (
            <div id='container' className={`${Common.flexRow} ${Common.flexBetween} ${Common.marginTopSm}`}>
                <div id='table' className={`${Common.flexColumn} ${Common.width100}`}>
                    <DataTable
                        styledHeader={true}
                        columns={columns}
                        data={this.props.statuses}
                        onClick={this.handleClick}
                    />
                    {/* <div id='table_button' className={`${Common.margin3} ${Common.marginLeftAuto}`}>
                        <FloatingButton  
                            label='Add'
                            onClick={this.handleAdd}
                        />
                    </div>
                </div>
                {form} */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    let index = FormUtility.findFormIndexByName(state.forms, 'status_form');

    return {
        statuses: state.admin.contacts.statuses,
        form: state.forms[index],
    }
}

export default connect(mapStateToProps, null)(Statuses);