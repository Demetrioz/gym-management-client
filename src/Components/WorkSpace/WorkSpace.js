import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import MediaQuery from 'react-responsive';

import NavigationDrawer from 'Components/NavigationDrawer/NavigationDrawer';
import Content from 'Components/Content/Content';

import Style from './WorkSpace.module.css';
import Common from 'Styles/Common.module.css';

class WorkSpace extends Component {

    render() {
        return (
            <div id='workspace' className={Common.flex}>
                <NavigationDrawer />
                <Content className={Style.base}/>
            </div>
        )
    }
}

export default WorkSpace;