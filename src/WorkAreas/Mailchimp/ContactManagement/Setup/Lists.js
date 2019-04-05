import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from 'Components/DataTable/DataTable';

import NotificationActions from 'Actions/NotificationActions';

import GymManagementApiService from 'Services/GymManagementApiService';

class Lists extends Component {

    configureColumns() {
        return [
            {
                label: 'Name',
                property: 'name',
            },
            {
                label: 'Created',
                property: 'date_created',
            },
            {
                label: 'Members',
                property: 'stats.member_count'
            }
        ];
    }

    async componentDidMount() {
        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Information',
            'loading_notification'
        ));

        try {
            let response = await GymManagementApiService.getMailchimpLists();

            this.props.dispatch({
                type: 'ADMIN_SET_DATA',
                property: 'mailchimp.lists',
                data: response.data.lists
            });
        }
        catch(error) {
            console.log("Error loading lists:", error);
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'loading_notificaiton'));
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'ADMIN_SET_DATA',
            property: 'mailchimp.lists',
            data: []
        });
    }

    render() {

        let columns = this.configureColumns();

        return (
            <div id='container'>
                <DataTable
                    styledHeader={true}
                    columns={columns}
                    data={this.props.lists}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        lists: state.admin.mailchimp.lists,
    }
}

export default connect(mapStateToProps, null)(Lists);