import React, { Component } from 'react';

import ScheduleCard from 'Components/ScheduleCard/ScheduleCard';

import Common from 'Styles/Common.module.css';

class Home extends Component {
    render () {
        return (
            <div id='container' className={`${Common.flexRow} ${Common.flexBetween} ${Common.flexWrap}`}>
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
            </div>
        )
    }
}

export default Home;