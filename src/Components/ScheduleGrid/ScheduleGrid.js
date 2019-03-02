import React, { Component } from 'react';
import { connect } from 'react-redux';

import GridLayout from'react-grid-layout';

import Style from './ScheduleGrid.module.css';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';

class ScheduleGrid extends Component {

    createLayout() {
        return [

        ];
    }

    render() {

        //let layout = this.createLayout();
        let layout = [
            {
                i: 'a', x: 0, y: 0, w: 1, h: 2, maxW: 1,
            },
            {
                i: 'b', x: 1, y: 0, w: 1, h: 2, maxW: 1,
            },
            {
                i: 'c', x: 2, y: 0, w: 1, h: 2, maxW: 1,
            },
            {
                i: 'd', x: 3, y: 0, w: 1, h: 2, maxW: 1,
            },
            {
                i: 'e', x: 4, y: 0, w: 1, h: 2, maxW: 1,
            },
            {
                i: 'f', x: 5, y: 0, w: 1, h: 2, maxW: 1,
            }
        ];

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
                <div className={Style.krav1} key='a'>Krav Level 1</div>
                <div className={Style.fitness} key='b'>Fitness Bootcamp</div>
                <div className={Style.mittWork} key='c'>Mitt work</div>
                <div className={Style.kickboxing} key='d'>Cardio Kickboxing</div>
                <div className={Style.krav2} key='e'>Krav Level 2</div>
                <div className={Style.krav3} key='f'>Krav Level 3</div>
            </GridLayout>
        )
    }
}

export default connect(null, null)(ScheduleGrid);