import React, { Component } from 'react';
import { connect } from 'react-redux';
import Enumerable from 'linq';

import ContainedButton from 'Components/ContainedButton/ContainedButton';
import ScheduleGrid from 'Components/ScheduleGrid/ScheduleGrid';
import FloatingButton from 'Components/FloatingButton/FloatingButton';

import NotificationActions from 'Actions/NotificationActions';

import ClassUtility from 'Utilities/ClassUtility';

import GymManagementApiService from 'Services/GymManagementApiService';

import Add from '@material-ui/icons/Add';

import Style from './ClassSchedule.module.css';
import Common from 'Styles/Common.module.css';

class ClassSchedule extends Component {

    constructor(props) {
        super(props);

        this.createClassButtons = this.createClassButtons.bind(this);
        this.addClassToSchedule = this.addClassToSchedule.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    createTimes() {

        let currentHour = 5;
        let timeArray = [];

        for(let i = 0; i < 30; i++) {
            // Even rows are 5:30 / 6:30 / 7:30
            if(i % 2 === 0) {
                timeArray.push(
                    <div key={i} className={Style.singleTime}>{`${currentHour}:30`}</div>
                )
                currentHour++;
            }
            // Odd rows are 6 / 7 / 8
            else {
                timeArray.push(
                    <div key={i} className={Style.singleTime}>{`${currentHour}:00`}</div>
                )
            }
        }
        return timeArray;
    }

    createClassButtons() {
        return this.props.classes.classTypes.map((classType, i) => {
            return (
                <ContainedButton 
                    key={i}
                    className={Style.classButton}
                    label={classType.label}
                    icon={<Add />}
                    onClick={this.addClassToSchedule.bind(this, classType.typeId)}
                />
            )
        });
    }

    async addClassToSchedule(classType) {

        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Creating Classes',
            'class_loading_notification'
        ));

        try {
            let classTime = ClassUtility.getFirstAvailableTime(this.props.classes.classSchedules);

            // Add a new class schedule
            let newSchedule = {
                ClassTypeId: classType,
                Day: classTime.day,
                BeginTime: classTime.start,
                EndTime: classTime.end,
            }

            let scheduleResult = await GymManagementApiService.createClassSchedule(newSchedule);

            // Add result to state so it's displayed on the schedule grid
            this.props.dispatch({
                type: 'PUSH_CLASS_DATA',
                property: 'classSchedules',
                data: [scheduleResult]
            });
        }
        catch(error) {
            console.log("Error:", error);
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'class_loading_notificaiton'));
        }
    }

    async handleSave() {

        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Saving Classes',
            'class_saving_notification'
        ));

        try {

            let updatedSchedules = [];

            // Loop through all divs created by ScheduleGrid
            Object.entries(this.props.classes.layout).forEach(entry => {

                // Get the Id (ClassScheduleId)
                let id = parseInt(entry[1].id);

                // Get translate(x, y) to determine the time
                // find (xxxpx,) but don't include ( or px,)
                // find px, xxxpx) but don't include px,  or )
                let xRegex = /(?<=\().+(?=px,)/g
                let yRegex = /(?<=px, ).+(?=px\))/g
                let x = parseInt(entry[1].style.cssText.match(xRegex));
                let y = parseInt(entry[1].style.cssText.match(yRegex));
                
                // Get the height to determine duration
                let heightRegex = /(?<=height: ).+(?=px;)/g
                let height = parseInt(entry[1].style.cssText.match(heightRegex));

                // Calculate Day, Hour, and duration
                let day = ClassUtility.calculateDay(x);
                let beginTime = ClassUtility.calculateBegin(y);
                let duration = ClassUtility.calculateDuration(height);

                let hour = beginTime.substring(0,2);
                let minute = beginTime.substring(3);

                let numericHour = parseInt(hour);
                let numericMinute = parseInt(minute);

                for(let i = 0; i < duration; i++) {
                    if(i % 2 === 0) {
                        numericMinute = numericMinute === 30
                            ? 0
                            : 30;
                        
                        numericHour = numericMinute === 0
                            ? numericHour + 1
                            : numericHour;
                    }
                    else {
                        numericMinute = numericMinute === 30
                            ? 0
                            : 30;

                        numericHour = numericMinute === 0
                            ? numericHour + 1
                            : numericHour;
                    }
                }

                hour = numericHour < 10
                ? `0${numericHour}`
                : `${numericHour}`;

                minute = numericMinute < 10
                    ? `0${numericMinute}`
                    : `${numericMinute}`;

                let endTime = `${hour}:${minute}`;

                let schedule = Enumerable
                    .from(this.props.classes.classSchedules)
                    .where(schedule => schedule.classScheduleId === id)
                    .firstOrDefault();

                // TODO: Need to send just the updated info, not recreate the 
                // entire object
                
                // Build the schedule object
                let newSchedule = {
                    ClassScheduleId: schedule.classScheduleId,
                    ClassTypeId: schedule.classTypeId,
                    Day: day,
                    BeginTime: beginTime,
                    EndTime: endTime,
                    Created: schedule.created,
                    IsDeleted: schedule.isDeleted,
                }

                updatedSchedules.push(newSchedule);
            });
            
            // Update the database
            let updates = await GymManagementApiService.updateClassSchedule(updatedSchedules);

            // Save updates to state
            this.props.dispatch({
                type: 'SET_CLASS_DATA',
                propertY: 'classSchedules',
                data: updates
            });
        }
        catch(error) {
            console.log("Error:", error);
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'class_saving_notificaiton'));
        }
    }

    async componentDidMount() {
        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Classes',
            'class_loading_notification'
        ));

        try {
            let classTypes = await GymManagementApiService.getTypesByCategory('class');

            this.props.dispatch({
                type: 'SET_CLASS_DATA',
                property: 'classTypes',
                data: classTypes
            });

        }
        catch(error) {
            // TODO: Error Modal
            console.log("Error loading classes:", error);
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'class_loading_notificaiton'));
        }
    }

    render() {
        let times = this.createTimes();
        let availableClassButtons = this.createClassButtons();

        return (
            <div id='container' className={Common.flexRow}>
                <div id='class_schedule_grid' className={Style.classSchedule}>
                    <div id='days' className={`${Style.weekDays} ${Common.flexRow}`}>
                        <div className={Style.singleDay}>Sunday</div>
                        <div className={Style.singleDay}>Monday</div>
                        <div className={Style.singleDay}>Tuesday</div>
                        <div className={Style.singleDay}>Wednesday</div>
                        <div className={Style.singleDay}>Thursday</div>
                        <div className={Style.singleDay}>Friday</div>
                        <div className={Style.singleDay}>Saturday</div>
                    </div>
                    <div id='times' className={Style.times}>
                        {times}
                    </div>
                    <div id='schedule' className={Style.schedule}>
                        <ScheduleGrid />
                    </div>
                </div>
                <div id='class_schedule_classes' className={`${Common.flexColumn} ${Common.marginLeft5}`}>
                    {availableClassButtons}
                    <div className={`${Common.marginLeftAuto} ${Common.marginTopAuto}`}>
                        <FloatingButton 
                            label='Save Changes'
                            onClick={this.handleSave}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        classes: state.classes,
    }
}

export default connect(mapStateToProps, null)(ClassSchedule);