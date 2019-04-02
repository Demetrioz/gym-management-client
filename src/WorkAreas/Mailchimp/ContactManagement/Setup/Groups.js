import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

class Groups extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tab: 0,
        }

        this.handleChange = this.handleChange.bind(this);
        this.filterData = this.filterData.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
        this.buildTabs = this.buildTabs.bind(this);
    }

    configureColumns() {
        return [
            {
                label: 'Name',
                property: 'name'
            },
            {
                label: 'Members',
                property: 'subscriber_count'
            }
        ];
    }

    async handleListChange(value) {
        
        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Lists',
            'loading_notification'
        ));

        try {

            this.setState({ tab: 0 });

            let groupResponse = await GymManagementApiService.getMailchimpGroups(value);

            this.props.dispatch({
                type: 'ADMIN_SET_DATA',
                property: 'mailchimp.groups',
                data: groupResponse.categories
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

    filterData() {
        let groups = this.props.groups[this.state.tab];

        return groups !== null && groups !== undefined
            ? groups.interests
            : [];
    }

    handleChange(event, value) {
        this.setState({ tab: value });
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
                formName: 'list_select_form',
                childName: 'list',
                properties: {
                    options: listOptions
                }
            });
        }
        catch(error) {

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
            property: 'mailchimp.groups',
            data: []
        });
    }

    buildTabs() {
        
        let tabs = this.props.groups.length > 0
        ? 
            this.props.groups.map((category, index) => {
                return <Tab key={index} label={category.title} />
            })
        : null;

        let tabContainer = 
            <Tabs
                value={this.state.tab}
                onChange={this.handleChange}
                indicatorColor='primary'
                textColor='primary'
                centered
            >
                {tabs}
            </Tabs>

        return tabContainer;
    }

    render() {

        let columns = this.configureColumns();

        let tabs = this.buildTabs();

        let data = this.filterData();

        return (
            <div id='container'>
                <StyledPaper>
                    <div id='list select' className={`${Common.flexCenter}`}>
                        <Form name='list_select_form'>
                            <OutlinedSelect
                                name='list'
                                label='List'
                                onChange={this.handleListChange}
                            />
                        </Form>
                    </div>
                    {tabs}
                    <DataTable
                        styledHeader={true}
                        columns={columns}
                        data={data}
                    />
                </StyledPaper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        groups: state.admin.mailchimp.groups,
    }
}

export default connect(mapStateToProps, null)(Groups);