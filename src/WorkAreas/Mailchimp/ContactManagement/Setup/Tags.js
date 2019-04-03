import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Form from 'Components/Form/Form';
import OutlinedSelect from 'Components/OutlinedSelect/OutlinedSelect';
import DataTable from 'Components/DataTable/DataTable';

import NotificationActions from 'Actions/NotificationActions';

import GymManagementApiService from 'Services/GymManagementApiService';

import Common from 'Styles/Common.module.css';

const StyledPaper = withStyles({
    root: {
        flexGrow: 1,
    }
})(Paper);

class Tags extends Component {

    constructor(props) {
        super(props);

        this.handleListChange = this.handleListChange.bind(this);
    }

    configureColumns() {
        return [
            {
                label: 'Name',
                property: 'name',
            },
            {
                label: 'Created',
                property: 'created_at',
            },
            {
                label: 'Members',
                property: 'member_count',
            }
        ];
    }

    async loadLists() {
        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Lists',
            'loading_notification'
        ));

        try {
            let response = await GymManagementApiService.getMailchimpLists();

            let listOptions = response.data.lists.map(list => {
                return {
                    value: list.id,
                    label: list.name
                }
            });

            this.props.dispatch({
                type: 'UPDATE_FORM_CHILD',
                formName: 'tag_list_select_form',
                childName: 'list',
                properties: {
                    options: listOptions
                }
            });
        }
        catch(error) {
            console.log("Error:", error);
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'loading_notification'));
        }
    }

    async handleListChange(value) {
        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Segments',
            'loading_notification'
        ));

        try {
            let segmentResponse = await GymManagementApiService.getMailchimpSegments(value);

            let segments = segmentResponse.data.segments.filter(segment => segment.type === 'static');

            this.props.dispatch({
                type: 'ADMIN_SET_DATA',
                property: 'mailchimp.tags',
                data: segments,
            });
        }
        catch(error) {
            console.log("Error:", error);
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'loading_notification'));
        }
    }

    componentDidMount() {
        this.loadLists();
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'ADMIN_SET_DATA',
            property: 'mailchimp.segments',
            data: [],
        });
    }

    render() {

        let columns = this.configureColumns();

        return (
            <div id='container'>
                <StyledPaper>
                    <div id='list_select' className={`${Common.flexCenter}`}>
                        <Form name='tag_list_select_form'>
                            <OutlinedSelect
                                name='list'
                                label='List'
                                onChange={this.handleListChange}
                            />
                        </Form>
                    </div>
                    <DataTable
                        styledHeader={true}
                        columns={columns}
                        data={this.props.tags}
                    />
                </StyledPaper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tags: state.admin.mailchimp.tags,
    }
}

export default connect(mapStateToProps, null)(Tags);