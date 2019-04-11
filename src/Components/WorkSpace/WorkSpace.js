import React, { Component } from 'react';
import { connect } from 'react-redux';
// import MediaQuery from 'react-responsive';

import NavigationDrawer from 'Components/NavigationDrawer/NavigationDrawer';
import ClientNavigationDrawer from 'Components/ClientNavigationDrawer/ClientNavigationDrawer';
import Content from 'Components/Content/Content';

import Style from './WorkSpace.module.css';
import Common from 'Styles/Common.module.css';

class WorkSpace extends Component {

    render() {

        let navigation = this.props.user.Role === 'client'
            ? <ClientNavigationDrawer />
            : <NavigationDrawer />;

        return (
            <div id='workspace' className={Common.flex}>
                {navigation}
                <Content className={Style.base}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
    }
}

export default connect(mapStateToProps, null)(WorkSpace);