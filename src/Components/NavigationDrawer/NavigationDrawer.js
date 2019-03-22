import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubHeader from '@material-ui/core/ListSubheader';

import NavigationArea from 'Components/NavigationArea/NavigationArea';
import NavigationExpand from 'Components/NavigationExpand/NavigationExpand';

// Collapse Panel Icons
import Dashboard from '@material-ui/icons/Dashboard';
import Business from '@material-ui/icons/Business';
import People from '@material-ui/icons/People';
import Build from '@material-ui/icons/Build';

// Area Icons
import Email from '@material-ui/icons/Email';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Schedule from '@material-ui/icons/Schedule';
import Class from '@material-ui/icons/Class';
import Settings from '@material-ui/icons/Settings';

// Work Areas
import DashboardWorkArea from 'WorkAreas/Dashboard/Dashboard';
import EmailWorkArea from 'WorkAreas/Email/Email';
import MemberInformation from 'WorkAreas/MemberInformation/MemberInformation';
import LeadInformation from 'WorkAreas/LeadInformation/LeadInformation';
import Classes from 'WorkAreas/Classes/Classes';
import ClassSchedule from 'WorkAreas/ClassSchedule/ClassSchedule';
import ContactSetup from 'WorkAreas/ContactSetup/ContactSetup';

import Style from './NavigationDrawer.module.css';

const StyledDrawer = withStyles({
    paper: {
        top: '64px',
        width: '250px',
        backgroundColor: '#BBBBBB'
    }
})(Drawer);

class NavigationDrawer extends Component {

    handleClick(clickedComponent) {
        let componentMap = {
            dashboard: DashboardWorkArea,
            email: EmailWorkArea,
            member: MemberInformation,
            lead: LeadInformation,
            classes: Classes,
            class_schedule: ClassSchedule,
            contact_setup: ContactSetup,
        };

        this.props.dispatch({
            type: 'SET_CONTENT',
            component: componentMap[clickedComponent]
        });
    }

    render() {
        return (
            <StyledDrawer 
                variant='permanent'
                anchor='left'
            >
                <List
                    component='nav'
                    subheader={<ListSubHeader component='div'>Work Areas</ListSubHeader>}
                >
                    <Divider />

                    <NavigationArea
                        onClick={this.handleClick.bind(this, 'dashboard')}
                        icon={<Dashboard />}
                        label='Dashboard'
                        subArea={false}
                    />

                    <Divider />

                    <NavigationExpand
                        icon={<People />}
                        label='Contacts'
                    >
                        <NavigationArea
                            onClick={this.handleClick.bind(this, 'lead')}
                            icon={<AccountCircle />}
                            label='Leads'
                        />
                        <NavigationArea
                            onClick={this.handleClick.bind(this, 'member')}
                            icon={<AccountCircle />}
                            label='Members'
                        />
                    </NavigationExpand>

                    <Divider />

                    <NavigationExpand
                        icon={<Schedule />}
                        label='Schedule'
                    >
                        <NavigationArea
                            onClick={this.handleClick.bind(this, 'classes')}
                            icon={<Class />}
                            label='Classes'
                        />
                        <NavigationArea
                            onClick={this.handleClick.bind(this, 'class_schedule')}
                            icon={<Schedule />}
                            label='Class Schedule'
                        />
                    </NavigationExpand>

                    <Divider />

                    <NavigationExpand
                        icon={<Build />}
                        label='Admin'
                    >
                        <NavigationExpand
                            icon={<Settings />}
                            label='Setup'
                            subArea={true}
                        >
                            <NavigationArea
                                onClick={this.handleClick.bind(this, 'contact_setup')}
                                icon={<Email />}
                                label='Contact'
                            />

                            <NavigationArea
                                onClick={this.handleClick.bind(this, 'email')}
                                icon={<Email />}
                                label='Promotions'
                            />
                            <NavigationArea
                                onClick={this.handleClick.bind(this, 'email')}
                                icon={<Email />}
                                label='Locations'
                            />

                        </NavigationExpand>

                        <Divider />

                        <NavigationArea
                            onClick={this.handleClick.bind(this, 'email')}
                            icon={<Email />}
                            label='Email Integration'
                        />
                    </NavigationExpand>

                    <Divider />

                </List>
            </StyledDrawer>
        )
    }
}

export default connect(null, null)(NavigationDrawer);