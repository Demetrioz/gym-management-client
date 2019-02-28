import React, { Component } from 'react';

import Style from './ClassSchedule.module.css';
import Common from 'Styles/Common.module.css';

class ClassSchedule extends Component {

    createTimes() {

        let currentHour = 5;
        let timeArray = [];

        for(let i = 0; i < 31; i++) {
            // Even rows are 5 / 6 / 7
            if(i % 2 === 0) {
                timeArray.push(
                    <div key={i} className={Style.singleTime}>{`${currentHour}:00`}</div>
                )
            }
            // Odd rows are 5:30 / 6:30 / 7:30
            else {
                timeArray.push(
                    <div key={i} className={Style.singleTime}>{`${currentHour}:30`}</div>
                )
                currentHour++;
            }
        }
        return timeArray;
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
                    <div id='schedule' className={Style.schedule}>My classes go here</div>
                </div>
                <div id='class_schedule_classes'>
                    My list of classes is here
                </div>
            </div>
        )
    }
}

export default ClassSchedule;