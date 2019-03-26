import React, { Component } from 'react';
import { connect } from 'react-redux';
import Enumerable from 'linq';

import Form from 'Components/Form/Form';
import Input from 'Components/Input/Input';
import OutlinedSelect from 'Components/OutlinedSelect/OutlinedSelect';
import DatePicker from 'Components/DatePicker/DatePicker';
import FloatingButton from 'Components/FloatingButton/FloatingButton';

import NotificationActions from 'Actions/NotificationActions';
import ModalActions from 'Actions/ModalActions';

import FormUtility from 'Utilities/FormUtility';

import GymManagementApiService from 'Services/GymManagementApiService';

import Save from '@material-ui/icons/Save';
import Style from './ContactForm.module.css';
import Common from 'Styles/Common.module.css';

class ContactForm extends Component {

    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
    }

    async handleSave() {

        this.props.dispatch(NotificationActions.addNotification(
            'Saving...',
            'Saving Contacts',
            'contact_saving_notification'
        ));

        try {
            // Build the new contact
            let firstName = FormUtility.getChildValue(this.props.contactForm, 'firstName')
                ? FormUtility.getChildValue(this.props.contactForm, 'firstName')
                : this.props.contact.firstName;

            let lastName = FormUtility.getChildValue(this.props.contactForm, 'lastName')
                ? FormUtility.getChildValue(this.props.contactForm, 'lastName')
                : this.props.contact.lastName;

            let phone = FormUtility.getChildValue(this.props.contactForm, 'phone')
                ? FormUtility.getChildValue(this.props.contactForm, 'phone')
                : this.props.contact.phone;

            let email = FormUtility.getChildValue(this.props.contactForm, 'email')
                ? FormUtility.getChildValue(this.props.contactForm, 'email')
                : this.props.contact.email;

            let timesContacted = FormUtility.getChildValue(this.props.statusForm, 'timesContacted')
                ? FormUtility.getChildValue(this.props.statusForm, 'timesContacted')
                : this.props.contact.timesContacted;

            let notes = FormUtility.getChildValue(this.props.generalForm, 'notes')
                ? FormUtility.getChildValue(this.props.generalForm, 'notes')
                : this.props.contact.leadNotes;

            let updatedContact = {
                ContactId: this.props.contact.contactId,
                StatusId: FormUtility.getChildValue(this.props.statusForm, 'status'),
                SourceId: this.props.contact.sourceId,
                InterestId: FormUtility.getChildValue(this.props.generalForm, 'interest'),
                FirstName: firstName,
                LastName: lastName,
                Phone: phone,
                Email: email,
                LastContact: FormUtility.getChildValue(this.props.statusForm, 'lastContact'),
                TimesContacted: timesContacted,
                Created: this.props.contact.created,
                IsDeleted: this.props.contact.isDeleted,
                LeadNotes: notes,
                nextAppointment: FormUtility.getChildValue(this.props.statusForm, 'nextAppointment')
            }

            let result = await GymManagementApiService.updateContact([updatedContact]);
            
            let index = -1
            for(let i = 0; i < this.props.contacts.length; i++) {
                if(this.props.contacts[i].contactId === result[0].contactId) {
                    index = i;
                    break;
                }
            }

            let status = Enumerable
                .from(this.props.statuses)
                .where(s => s.statusId === result[0].statusId)
                .firstOrDefault();

            result[0].status = status;

            // Update state
            this.props.dispatch({
                type: 'MERGE_CONTACT_DATA',
                property: 'contacts',
                index: index,
                data: result[0]
            });

            // Close modal
            this.props.dispatch(ModalActions.removeModal(this.props.name));
        }
        catch(error) {
            console.log("Error:", error);
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'contact_saving_notificaiton'));
        }
    }

    async componentDidMount() {
        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Contacts',
            'contact_loading_notification'
        ));

        try {
            let sourceRequest = GymManagementApiService.getSources();
            // TODO: add filter to only retrieve contact statuses
            let statusRequest = GymManagementApiService.getStatuses();
            let interestRequest = GymManagementApiService.getInterests();

            let sources = await sourceRequest;
            let statuses = await statusRequest;
            let interests = await interestRequest;

            // !! NOTE: 0 value doesn't seem to work with select, so adding 1 when
            // creating options and subtracting 1 when saving
            let sourceOptions = sources.map(source => {
                return {
                    value: source.sourceId,
                    label: source.label
                }
            });

            statuses = Enumerable
                .from(statuses)
                .where(status => status.type === 'contact')
                .toArray();

            let statusOptions = statuses.map(status => {
                return {
                    value: status.statusId,
                    label: status.label
                }
            });

            let interestOptions = interests.map(interest => {
                return {
                    value: interest.interestId,
                    label: interest.label
                }
            });

            this.props.dispatch({
                type: 'SET_CONTACT_DATA',
                property: 'status',
                data: statuses
            });

            this.props.dispatch({
                type: 'UPDATE_FORM_CHILD',
                formName: 'status_form',
                childName: 'status',
                properties: {
                    options: statusOptions
                }
            });

            this.props.dispatch({
                type: 'UPDATE_FORM_CHILD',
                formName: 'general_form',
                childName: 'source',
                properties: {
                    options: sourceOptions
                }
            });

            this.props.dispatch({
                type: 'UPDATE_FORM_CHILD',
                formName: 'general_form',
                childName: 'interest',
                properties: {
                    options: interestOptions
                }
            });
        }
        catch(error) {
            // TODO: Error modal
            console.log("Error:", error);
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'contact_loading_notificaiton'));
        }
    }

    render() {

        console.log("contact:", this.props.contact);
        console.log(this.props.contact.statusId);
        console.log(this.props.contact.sourceId);

        return (
            <div id='container' className={`${Common.flexColumn}`}>
                <div id='contact_info' className={Style.container}>
                    <p className={Style.contactLabel}>Contact Information</p>
                    <Form name='contact_form' className={`${Common.flexRow} ${Common.flexWrap} ${Common.flexAround}`}>
                        <Input
                            name='firstName'
                            label='First Name'
                            defaultValue={this.props.contact.firstName}
                        />
                        <Input
                            name='lastName'
                            label='Last Name'
                            defaultValue={this.props.contact.lastName}
                        />
                        <Input
                            name='phone'
                            label='Phone'
                            defaultValue={this.props.contact.phone}
                        />
                        <Input
                            name='email'
                            label='Email'
                            defaultValue={this.props.contact.email}
                        />
                    </Form>
                </div>
                <div id='status_info' className={Style.container}>
                    <p className={Style.statusLabel}>Status Information</p>
                    <Form name='status_form' className={`${Common.flexRow} ${Common.flexWrap} ${Common.flexAround}`}>
                        <OutlinedSelect 
                            name='status'
                            label='Status'
                            value={this.props.contact.statusId}
                        />
                        <Input
                            name='convertDate'
                            label='Converted'
                            disabled={true}
                            value={this.props.contact.dateConverted ? this.props.dateConverted : 'N/A'}
                        />
                        <DatePicker
                            className={Style.paddingTop}
                            name='lastContact'
                            label='Last Contact'
                            defaultValue={this.props.contact.lastContact}
                        />
                        <Input
                            name='timesContacted'
                            label='Times Contacted'
                            defaultValue={this.props.contact.timesContacted}
                        />
                        <DatePicker
                            name='nextAppointment'
                            label='Next Appointment'
                            defaultValue={this.props.contact.nextAppointment}
                        />
                    </Form>
                </div>
                <div id='general_info' className={Style.container}>
                    <p className={Style.generalLabel}>General Information</p>
                    <Form name='general_form' className={`${Common.flexRow} ${Common.flexWrap} ${Common.flexAround}`}>
                        <OutlinedSelect
                            name='source'
                            label='Source'
                            disabled={true}
                            value={this.props.contact.sourceId}
                        />
                        <OutlinedSelect
                            name='interest'
                            label='Interest'
                            value={this.props.contact.interestId + 1}
                        />
                        <Input
                            name='notes'
                            label='Notes'
                            defaultValue={this.props.contact.leadNotes}
                        />
                    </Form>
                </div>
                <div id='button' className={`${Common.flexCenter} ${Common.margin1}`}>
                    <FloatingButton
                        icon={<Save />}
                        label='Save'
                        onClick={this.handleSave}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let contactIndex = FormUtility.findFormIndexByName(state.forms, 'contact_form');
    let statusIndex = FormUtility.findFormIndexByName(state.forms, 'status_form');
    let generalIndex = FormUtility.findFormIndexByName(state.forms, 'general_form');

    return {
        contacts: state.contacts.contacts,
        statuses: state.contacts.status,
        contactForm: state.forms[contactIndex],
        statusForm: state.forms[statusIndex],
        generalForm: state.forms[generalIndex],
    }
}

export default connect(mapStateToProps, null)(ContactForm);