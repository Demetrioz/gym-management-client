import React, { Component } from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Style from './ScheduleCard.module.css';
import Common from 'Styles/Common.module.css';

class ScheduleCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: moment().format('YYYY-MM-DD')
        }
    }
    handleNavigation() {
        console.log("navigating the schedule!");
    }

    componentDidMount() {

    }

    render () {
        return (
            // <div id='container' className={Common.flexColumn}>
            <Card className={Style.base}>
                <CardContent>
                    <div id='header' className={Common.flexRow}>
                        <KeyboardArrowLeft 
                            className={Style.navigation} 
                            onClick={this.handleNavigation}
                        />
                        {this.state.date}
                        <KeyboardArrowRight 
                            className={Style.navigation}
                            onClick={this.handleNavigation}
                        />
                        {/* Left arrow */}
                        {/* Date */}
                        {/* Right Arrow */}
                    </div>
                    <div id='schedule'>
                    </div>
                </CardContent>
            </Card>
            // </div>
        )
    }
}

export default ScheduleCard;