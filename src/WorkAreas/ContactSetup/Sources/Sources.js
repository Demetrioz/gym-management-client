import React, { Component } from 'react';
import { connect } from 'react-redux';
import Enumerable from 'linq';

import DataTable from 'Components/DataTable/DataTable';
import Form from 'Components/Form/Form';
import Input from 'Components/Input/Input';
import OutlinedSelect from 'Components/OutlinedSelect/OutlinedSelect';
import FloatingButton from 'Components/FloatingButton/FloatingButton';

import NotificationActions from 'Actions/NotificationActions';

import FormUtility from 'Utilities/FormUtility';

import GymManagementApiService from 'Services/GymManagementApiService';

import Common from 'Styles/Common.module.css';

class Sources extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showForm: false,
            selectedSource: null,
            type: null,
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    configureColumns() {
        return [
            {
                label: 'Type',
                property: 'type.name',
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

    handleClick() {

    }

    handleAdd() {
        this.setState({ showForm: true });
    }

    handleCancel() {
        this.setState({
            showForm: false,
            selectedSource: null,
            type: null
        });
    }

    async handleSave() {
        this.props.dispatch(NotificationActions.addNotification(
            'Saving...',
            'Saving Information',
            'saving_notification'
        ));

        let typeId = FormUtility.getChildValue(this.props.form, 'type');
        let name = FormUtility.getChildValue(this.props.form, 'name');
        let label = FormUtility.getChildValue(this.props.form, 'label');
        let description = FormUtility.getChildValue(this.props.form, 'description');

        try {
            if(this.state.type === 'edit') {

            }
            else {
                let newSource = {
                    TypeId: typeId,
                    Name: name,
                    Label: label,
                    Description: description
                }

                let result = await GymManagementApiService.createSources([newSource]);

                console.log("result:", result);

                this.props.dispatch({
                    type: 'ADMIN_PUSH_DATA',
                    property: 'contacts.sources',
                    data: result
                });

                this.setState({ showForm: false });
            }
        }
        catch(error) {
            // TODO: Error Modal
            console.log("error:", error);
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
            let sourceRequest = GymManagementApiService.getSources();
            let typeRequest = GymManagementApiService.getTypes();
            
            let sources = await sourceRequest;
            let types = await typeRequest;

            this.props.dispatch({
                type: 'ADMIN_SET_DATA',
                property: 'contacts.sources',
                data: sources,
            });

            this.props.dispatch({
                type: 'ADMIN_SET_DATA',
                property: 'types',
                data: types,
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

        let sourceTypes = Enumerable
            .from(this.props.types)
            .where(type => type.category === 'source')
            .toArray();

        let typeOptions = sourceTypes.map(type => {
            return {
                label: type.label,
                value: type.typeId
            }
        });

        let form = this.state.showForm
            ?
                <div id='form' className={Common.width45}>
                    <Form name='source_form' className={Common.flexColumn}>
                        <OutlinedSelect
                            name='type'
                            label='Type'
                            options={typeOptions}
                        />
                        <Input 
                            name='name'
                            label='Name'
                            // defaultValue={defaultName}
                        />
                        <Input
                            name='label'
                            label='Label'
                            // defaultValue={defaultLabel}
                        />
                        <Input
                            name='description'
                            label='Description'
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
                        data={this.props.sources}
                        onClick={this.handleClick}
                    />
                    <div id='table_button' className={`${Common.margin3} ${Common.marginLeftAuto}`}>
                        <FloatingButton  
                            label='Add'
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

    let index = FormUtility.findFormIndexByName(state.forms, 'source_form');

    return {
        sources: state.admin.contacts.sources,
        types: state.admin.types,
        form: state.forms[index],
    }
}

export default connect(mapStateToProps, null)(Sources);