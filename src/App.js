import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Enumerable from 'linq';

import Header from 'Components/Header/Header';
import Login from 'Components/Login/Login';
import WorkSpace from 'Components/WorkSpace/WorkSpace';

import GymManagementApiService from 'Services/GymManagementApiService';

class App extends Component {

    startup() {
        GymManagementApiService.setApiUrl();
    }

    componentDidMount() {
        this.startup();
    }


    render() {

        let modals = this.props.modals.map(modal => {
            return modal.component
        });

        let notifications = this.props.notifications.map(notification => {
            return notification.component
        });

        return (
            <div className="App">
                <Header
                    //user={this.props.user}
                    title='Gym Management'
                />
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/Home' component={WorkSpace} />
                </Switch>
                {modals}
                {notifications}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        modals: state.modals,
        notifications: state.notifications,
    }
}

export default connect(mapStateToProps, null)(App);