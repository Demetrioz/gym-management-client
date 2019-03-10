import React, { Component } from 'react';
import { connect } from 'react-redux';
import Enumerable from 'linq';

import GridLayout from'react-grid-layout';

import NotificationActions from 'Actions/NotificationActions';

import ClassUtility from 'Utilities/ClassUtility';

import GymManagementApiService from 'Services/GymManagementApiService';

import Style from './ScheduleGrid.module.css';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';

class ScheduleGrid extends Component {

    constructor(props) {
        super(props);

        this.createLayout = this.createLayout.bind(this);

        this.classColorMap = {
            'krav_maga_1': Style.krav1,
            'krav_maga_2': Style.krav2,
            'krav_maga_3': Style.krav3,
            'fitness_bootcamp': Style.fitness,
            'mitt_work': Style.mittWork,
            'cardio_kickboxing': Style.kickboxing,
        }
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
                    x: ClassUtility.xPositionMap[classSchedule.day],
                    y: ClassUtility.calculateScheduleYPosition(classSchedule.beginTime),
                    w: 1,
                    h: ClassUtility.calculateScheduleHeight(classSchedule.beginTime, classSchedule.endTime),
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
                    id={layoutObject.i}
                    ref={`classSchedule_${layoutObject.i}`}
                    className={this.classColorMap[layoutObject.classType]}
                    key={layoutObject.i}
                >
                    {layoutObject.classLabel}
                </div>
            )
        });
    }

    async componentDidMount() {

        this.props.dispatch(NotificationActions.addNotification(
            'Loading...',
            'Loading Classes',
            'class_loading_notification'
        ));

        try {
            let classSchedules = await GymManagementApiService.getClassSchedules();

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

    componentDidUpdate(prevProps) {
        if(this.refs.length !== prevProps.classes.classSchedules.length) {
            this.props.dispatch({
                type: 'SET_CLASS_DATA',
                property: 'layout',
                data: this.refs
            });
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