import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Enumerable from 'linq';

import Typography from '@material-ui/core/Typography';

import Save from '@material-ui/icons/Save';

import Form from 'Components/Form/Form';
import Input from 'Components/Input/Input';
import OutlinedSelect from 'Components/OutlinedSelect/OutlinedSelect';
import DatePicker from 'Components/DatePicker/DatePicker';
import FloatingButton from 'Components/FloatingButton/FloatingButton';

import NotificationActions from 'Actions/NotificationActions';
import ModalActions from 'Actions/ModalActions';

import FormUtility from 'Utilities/FormUtility';

import GymManagementApiService from 'Services/GymManagementApiService';

import Common from 'Styles/Common.module.css';

class LeadForm extends Component {

    constructor(props) {
        super(props);

        this.saveLead = this.saveLead.bind(this);
    }

    async saveLead() {

        this.props.dispatch(NotificationActions.addNotification(
            'Saving...',
            'Saving Lead Information',
            'save_lead_notification'
        ));

        try {

            let statuses = await GymManagementApiService.getStatuses();

            let leadStatus = Enumerable
                .from(statuses)
                .where(status => status.name === 'propsect')
                .firstOrDefault();
    
            let name = FormUtility.getChildValue(this.props.form, 'name');
            name = name.split(' ');
    
            let appointment = moment(FormUtility.getChildValue(this.props.form, 'appointment_date'))
                .format('YYYY-MM-DD HH:mm:ss');

            let newContact = {
                StatusId: leadStatus.statusId,
                SourceId: FormUtility.getChildValue(this.props.form, 'source'),
                InterestId: FormUtility.getChildValue(this.props.form, 'goals'),
                FirstName: name[0],
                LastName: name[1],
                Phone: FormUtility.getChildValue(this.props.form, 'phone'),
                Email: FormUtility.getChildValue(this.props.form, 'email'),
                LastContact: moment().format('YYYY-MM-DD HH:mm:ss'),
                LeadNotes: FormUtility.getChildValue(this.props.form, 'notes'),
                NextAppointment: appointment
            }
    
            let result = await GymManagementApiService.createContact([newContact]);

            // Add status object to result so name can be displayed
            result[0].status = leadStatus;

            this.props.dispatch({
                type: 'PUSH_LEAD_DATA',
                property: 'contacts',
                data: result[0]
            });

            this.props.dispatch(ModalActions.removeModal('add_user_modal'));
        }
        catch(error) {
            console.log("Error saving contact:", error)
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'save_lead_notification'));
        }

    }

    async componentDidMount() {
        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Information',
            'lead_info_notification'
        ));

        try {
            let sourceRequest = GymManagementApiService.getSources();
            let interestRequest = GymManagementApiService.getInterests();

            let sources = await sourceRequest;
            let interests = await interestRequest;

            let sourceOptions = sources.map(source => {
                return {
                    value: source.sourceId,
                    label: source.label
                }
            });

            let interestOptions = interests.map(interest => {
                return {
                    value: interest.interestId,
                    label: interest.label
                }
            });

            this.props.dispatch({
                type: 'UPDATE_FORM_CHILD',
                formName: 'lead_form',
                childName: 'source',
                properties: {
                    options: sourceOptions
                }
            });

            this.props.dispatch({
                type: 'UPDATE_FORM_CHILD',
                formName: 'lead_form',
                childName: 'goals',
                properties: {
                    options: interestOptions
                }
            });
        }
        catch(error) {
            console.log("Error loading contacts:", error);
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'lead_info_notification'));
        }
    }

    render() {

        return (
            <div>
                <Form name='lead_form' className={`${Common.flexColumn} ${Common.margin2}`}>
                    <Typography variant='body2' align='center'>
                        Hello! Thank you for calling Gym Managment, how may I direct your call?
                    </Typography>
                    <Input 
                        name='name'
                        label='Name'
                        placeholder='My name is <name>, who am I speaking with?'
                    />
                    <Input
                        name='phone'
                        label='Phone'
                        placeholder={`What's a good number in case of disconnect?`}
                    />
                    <Input
                        name='email'
                        label='Email'
                        placeholder={`If you'd like, we can send you a special offer`}
                    />
                    <OutlinedSelect
                        name='source'
                        label='Source'
                    />
                    <Typography variant='body2' align='center'>
                        Fantastic! Is this information for you, or somebody else?
                    </Typography>
                    <OutlinedSelect
                        name='goals'
                        label='Goals'
                    />
                    <Typography variant='body2' align='center'>
                        Great! We have facilities specifically designed to...
                    </Typography>
                    <Typography variant='body2' align='center'>
                        Sounds like we should get together and chat (ask for appointment)
                        It's about X-o-clock. Would Y or Z work?
                    </Typography>
                    <DatePicker 
                        name='appointment_date'
                    />
                    <Typography variant='body2' align='center'>
                        Before I put you on the schedule, is there any reason you 
                        wouldn't be able to make it?
                    </Typography>
                    <Input
                        name='notes'
                        label='Notes'
                        placeholder='Enter any notes from the conversation'
                    />
                </Form>
                <div id='button' className={`${Common.flexCenter} ${Common.margin3}`}>
                    <FloatingButton 
                        icon={<Save />}
                        label='Save'
                        onClick={this.saveLead}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    let formIndex = FormUtility.findFormIndexByName(state.forms, 'lead_form');

    return {
        sources: state.app.sources,
        form: state.forms[formIndex],
    }
}

export default connect(mapStateToProps, null)(LeadForm);