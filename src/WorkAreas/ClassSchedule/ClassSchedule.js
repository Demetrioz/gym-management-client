import React, { Component } from 'react';

import ScheduleGrid from 'Components/ScheduleGrid/ScheduleGrid';

import NotificationActions from 'Actions/NotificationActions';

import GymManagementApiService from 'Services/GymManagementApiService';

import Style from './ClassSchedule.module.css';
import Common from 'Styles/Common.module.css';

class ClassSchedule extends Component {

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

    async componentDidMount() {
        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Classes',
            'class_loading_notification'
        ));

        try {
            let classTypeRequest = GymManagementApiService.getTypesByCategory('class');
            let classInstanceRequest = GymManagementApiService.getClassInstances();

            let classTypes = await classTypeRequest;
            let classInstances = await classInstanceRequest;
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
                <div id='class_schedule_classes'>
                    My list of classes is here
                </div>
            </div>
        )
    }
}

export default ClassSchedule;