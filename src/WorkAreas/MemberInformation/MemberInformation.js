import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Enumerable from 'linq';

import DataTable from 'Components/DataTable/DataTable';
import ContactForm from 'Components/ContactForm/ContactForm';
import ValueSummary from 'Components/ValueSummary/ValueSummary';

import ModalActions from 'Actions/ModalActions';
import NotificationActions from 'Actions/NotificationActions';

import GymManagementApiService from 'Services/GymManagementApiService';

import Common from 'Styles/Common.module.css';
import People from '@material-ui/icons/People';
import ExposurePlus1 from '@material-ui/icons/ExposurePlus1';

class MemberInformation extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    configureColumns() {
        return [
            {
                label: 'Name',
                method: this.displayName,
            },
            {
                label: 'Phone',
                property: 'phone',
            },
            {
                label: 'Email',
                property: 'email'
            }
        ];
    }

    displayName(data) {
        return `${data.firstName} ${data.lastName}`;
    }

    handleClick(event, props) {
        let modal = {
            name: 'edit_contact',
            title: 'Edit Contact',
            content: <ContactForm name='edit_contact' contact={props} />
        }

        this.props.dispatch(ModalActions.addModal(modal));
    }

    calculateMembersThisMonth(members) {
        let month = moment().month();
        let year = moment().year();

        let membersThisMonth = Enumerable
            .from(members)
            .where(member => moment(member.dateConverted).month() === month
                && moment(member.dateConverted).year() === year)
            .toArray();

        return membersThisMonth.length;
    }

    async componentDidMount() {
        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Contacts',
            'contact_loading_notification'
        ));

        try {
            let contacts = await GymManagementApiService.getContacts();

            this.props.dispatch({
                type: 'SET_LEADS',
                data: contacts
            });
        }
        catch(error) {

        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'contact_loading_notification'));
        }
    }

    render() {

        let columns = this.configureColumns();

        let members = Enumerable
            .from(this.props.contacts)
            .where(contact => contact.status.name === 'member')
            .toArray();

        let totalMembers = members.length;

        return (
            <div id='member_information' className={Common.flexColumn}>
                <div id='member_summaries' className={`${Common.flexRow} ${Common.flexAround}`}>
                    <ValueSummary
                        title='Total Members'
                        icon={<People />}
                        value={totalMembers}
                    />
                    <ValueSummary
                        title='New Members this Month'
                        icon={<ExposurePlus1 />}
                        data={members}
                        function={this.calculateMembersThisMonth}
                    />
                </div>
                <div id='lead_table'>
                    <DataTable
                        styledHeader={true}
                        columns={columns}
                        data={members}
                        onClick={this.handleClick}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        contacts: state.contacts.contacts,
    }
}

export default connect(mapStateToProps, null)(MemberInformation);