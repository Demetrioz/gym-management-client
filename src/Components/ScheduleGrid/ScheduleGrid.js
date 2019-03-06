import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Enumerable from 'linq';

import GridLayout from'react-grid-layout';

import NotificationActions from 'Actions/NotificationActions';

import GymManagementApiService from 'Services/GymManagementApiService';

import Style from './ScheduleGrid.module.css';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';

class ScheduleGrid extends Component {

    constructor(props) {
        super(props);

        this.createLayout = this.createLayout.bind(this);

        this.xPositionMap = {
            'Sunday': 0,
            'Monday': 1,
            'Tuesday': 2,
            'Wednesday': 3,
            'Thursday': 4,
            'Friday': 5,
            'Saturday:': 6,
        }

        this.classColorMap = {
            'krav_maga_1': Style.krav1,
            'krav_maga_2': Style.krav2,
            'krav_maga_3': Style.krav3,
            'fitness_bootcamp': Style.fitness,
            'mitt_work': Style.mittWork,
            'cardio_kickboxing': Style.kickboxing,
        }
    }

    calculateYPosition(time) {

        // 5:00 = 0, increase 2 for each hour, increase 1 if 30 minutes
        let y = 0;

        let hours = moment(time).hours();
        let minutes = moment(time).minutes();

        y = y + ((hours - 5) * 2)
        y = y + (minutes / 30)

        return y;
    }

    calculateHeight(beginTime, endTime) {

        // Height increases 1 for every 30 minutes
        let begin = moment(beginTime);
        let end = moment(endTime);
        return (end.diff(begin, 'minutes') / 30);
    }

    createLayout() {
        let layout = [];
        
        this.props.classes.classSchedules.forEach(classSchedule => {

            if(this.props.classes.classTypes.length > 0) {
                let classType = Enumerable
                .from(this.props.classes.classTypes)
                .where(type => type.typeId === classSchedule.classTypeId)
                .firstOrDefault();

                layout.push({
                    i: `${classSchedule.classScheduleId}`,
                    x: this.xPositionMap[classSchedule.day],
                    y: this.calculateYPosition(classSchedule.beginTime),
                    w: 1,
                    h: this.calculateHeight(classSchedule.beginTime, classSchedule.endTime),
                    maxW: 1,
                    // Custom addition for background color and text
                    classType: classType.name,
                    classLabel: classType.label,
                });
            }
        });

        return layout;
    }

    createClassSchedules(layout) {
        return layout.map(layoutObject => {

            return (
                <div 
                    className={this.classColorMap[layoutObject.classType]}
                    key={layoutObject.i}
                >
                    {layoutObject.classLabel}
                </div>
            )
        })
    }

    async componentDidMount() {

        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Classes',
            'class_loading_notification'
        ));

        try {
            let classScheduleRequest = GymManagementApiService.getClassSchedules();

            let classSchedules = await classScheduleRequest;

            this.props.dispatch({
                type: 'SET_CLASS_DATA',
                property: 'classSchedules',
                data: classSchedules
            });
        }
        catch(error) {
            // TODO: Error Modal
            console.log("Error loading class schedules:", error);
        }
        finally {
            this.props.dispatch(NotificationActions.removeNotification(
                'class_loading_notificaiton'));
        }
    }

    render() {

        let layout = this.createLayout();
        let classScheduleDivs = this.createClassSchedules(layout);

        return(
            <GridLayout 
                classname={Style.base} 
                layout={layout}
                cols={7}
                rowHeight={15}
                width={940}
                maxRows={30}
                verticalCompact={false}
            >
                {classScheduleDivs}
            </GridLayout>
        )
    }
}

function mapStateToProps(state) {
    return {
        classes: state.classes,
    }
}

export default connect(mapStateToProps, null)(ScheduleGrid);