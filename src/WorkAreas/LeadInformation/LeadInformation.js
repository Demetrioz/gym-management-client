import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Enumerable from 'linq';

import DataTable from 'Components/DataTable/DataTable';
import FloatingButton from 'Components/FloatingButton/FloatingButton';
import ValueSummary from 'Components/ValueSummary/ValueSummary';
import LeadForm from 'Components/LeadForm/LeadForm';
import ContactForm from 'Components/ContactForm/ContactForm';

import Add from'@material-ui/icons/Add';
import People from '@material-ui/icons/People';
import Call from '@material-ui/icons/Call';
import ExposurePlus1 from '@material-ui/icons/ExposurePlus1';

import ModalActions from 'Actions/ModalActions';
import NotificationActions from 'Actions/NotificationActions';

import GymManagementApiService from 'Services/GymManagementApiService';

import Style from './LeadInformation.module.css';
import Common from 'Styles/Common.module.css';

class LeadInformation extends Component {

    constructor(props) {
        super(props);

        this.addLead = this.addLead.bind(this);
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
            },
            {
                label: 'Days Since Contact',
                method: this.getDaysSinceContact,
            },
            {
                label: 'Times Contacted',
                property: 'timesContacted',
            }
        ];
    }

    displayName(data) {
        return `${data.firstName} ${data.lastName}`;
    }

    getDaysSinceContact(data) {
        let now = moment();
        let lastContact = moment(data.lastContact);
        return now.diff(lastContact, 'days');
    }

    calculateContactNeeded(users) {
        
        let count = 0;
        
        if(users != undefined) {
            users.forEach(user => {
                if(this.getDaysSinceContact(user) > 3)
                    count++;
            })
        }

        return count;
    }

    caluclateLeadsToday(users) {

        let now = moment().date();

        let leadsToday = Enumerable
            .from(users)
            .where(user => moment(user.created).date() == now)
            .toArray();
        
        return leadsToday.length;
    }

    addLead() {

        let modal = {
            name: 'add_user_modal',
            title: 'Add Lead',
            content: <LeadForm />,
        };

        this.props.dispatch(ModalActions.addModal(modal));
    }

    handleClick(event, props) {
        let modal = {
            name: 'edit_contact',
            title: 'Edit Contact',
            content: <ContactForm name='edit_contact' contact={props}/>,
        };

        this.props.dispatch(ModalActions.addModal(modal));
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
            // TODO: Error Modal
            console.log("Error loading contacts:", error);
        }
        finally {

            this.props.dispatch(NotificationActions.removeNotification(
                'contact_loading_notificaiton'));
        }
    }

    render() {

        let columns = this.configureColumns();

        let leads = Enumerable
            .from(this.props.contacts)
            .where(contact => contact.status.name === 'prospect')
            .toArray();

        let totalLeads = leads.length;

        return (
            <div id='lead_information' className={Common.flexColumn}>
                <div id='lead_summaries' className={`${Common.flexRow} ${Common.flexAround}`}>
                    <ValueSummary 
                        title='Total Leads'
                        icon={<People />}
                        value={totalLeads}
                    />
                    <ValueSummary 
                        title='Contact Needed'
                        icon={<Call />}
                        data={leads}
                        function={this.calculateContactNeeded.bind(this)}
                    />
                    <ValueSummary 
                        title='Leads Today'
                        icon={<ExposurePlus1 />}
                        data={leads}
                        function={this.caluclateLeadsToday}
                    />
                </div>
                <div id='lead_table'>
                    <DataTable 
                        styledHeader={true}
                        columns={columns}
                        data={leads}
                        onClick={this.handleClick}
                    />
                </div>
                <div id='add_lead_button' className={Style.addLeadButton}>
                    <FloatingButton
                        icon={<Add />}
                        label='New Lead'
                        onClick={this.addLead}
                    />
                </div>
            </div>
        )
    }

    componentWillUnmount() {

    }
}

function mapStateToProps(state) {
    return {
        contacts: state.contacts.contacts,
    }
}

export default connect(mapStateToProps, null)(LeadInformation);