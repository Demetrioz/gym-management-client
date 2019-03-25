import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from 'Components/DataTable/DataTable';
import Form from 'Components/Form/Form';
import Input from 'Components/Form/Form';
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

    async componentDidMount() {
        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Information',
            'loading_notification'
        ));

        try {
            let sources = await GymManagementApiService.getSources();

            this.props.dispatch({
                type: 'ADMIN_SET_DATA',
                property: 'contacts.sources',
                data: sources,
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

        let form = null;

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
    return {
        sources: state.admin.contacts.sources,
    }
}

export default connect(mapStateToProps, null)(Sources);