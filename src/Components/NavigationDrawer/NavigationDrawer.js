import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubHeader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import NavigationArea from 'Components/NavigationArea/NavigationArea';

// Collapse Panel Icons
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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

import Style from './NavigationDrawer.module.css';

const StyledDrawer = withStyles({
    paper: {
        top: '64px',
        width: '250px',
        backgroundColor: '#BBBBBB'
    }
})(Drawer);

class NavigationDrawer extends Component {
    
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            contact: false,
            schedule: false,
            reports: false,
            admin: false,
            setup: false,
            contactSetup: false,
        }
    }

    handleClick(clickedComponent, expandable) {
        let componentMap = {
            dashboard: DashboardWorkArea,
            email: EmailWorkArea,
            member: MemberInformation,
            lead: LeadInformation,
            classes: Classes,
            class_schedule: ClassSchedule,
        };

        if(expandable)
            this.setState({
                [clickedComponent]: !this.state[clickedComponent]
            });
        else {
            this.props.dispatch({
                type: 'SET_CONTENT',
                component: componentMap[clickedComponent]
            });
        }

    }

    // TODO: Refactor to make more readable
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
                        onClick={this.handleClick.bind(this, 'dashboard', false)}
                        icon={<Dashboard />}
                        label='Dashboard'
                        subArea={false}
                    />
                    <Divider />

                    <ListItem button onClick={() => this.handleClick('contact', true)}>
                        <ListItemIcon>
                            <People />
                        </ListItemIcon>
                        <ListItemText inset primary='Contacts' />
                        {this.state.marketing ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Divider />

                    {/* Member Collapse Panel */}
                    <Collapse in={this.state.contact} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            <NavigationArea
                                onClick={this.handleClick.bind(this, 'lead', false)}
                                icon={<AccountCircle />}
                                label='Leads'
                            />
                            <NavigationArea
                                onClick={this.handleClick.bind(this, 'member', false)}
                                icon={<AccountCircle />}
                                label='Members'
                            />
                        </List>
                    </Collapse>

                    <Divider />

                    <ListItem button onClick={() => this.handleClick('schedule', true)}>
                        <ListItemIcon>
                            <Schedule />
                        </ListItemIcon>
                        <ListItemText inset primary='Schedule' />
                        {this.state.schedule ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Divider />

                    {/* Schedule Collapse Panel */}
                    <Collapse in={this.state.schedule} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            <NavigationArea
                                onClick={this.handleClick.bind(this, 'classes', false)}
                                icon={<Class />}
                                label='Classes'
                            />
                            <NavigationArea
                                onClick={this.handleClick.bind(this, 'class_schedule', false)}
                                icon={<Schedule />}
                                label='Class Schedule'
                            />
                        </List>
                    </Collapse>

                    <Divider />

                    <ListItem button onClick={() => this.handleClick('admin', true)}>
                        <ListItemIcon>
                            <Build />
                        </ListItemIcon>
                        <ListItemText inset primary='Admin' />
                        {this.state.admin ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Divider />

                    {/* Admin Collapse Panel */}
                    <Collapse in={this.state.admin} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            <ListItem button onClick={() => this.handleClick('setup', true)}>
                                <ListItemIcon>
                                    <Settings />
                                </ListItemIcon>
                                <ListItemText inset primary='Setup' />
                                {this.state.setup ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>

                            <Divider />

                            {/* Setup Collapse Panel */}
                            <Collapse in={this.state.setup} timeout='auto' unmountOnExit>
                                <List component='div' disablePadding>
                                    <ListItem button onClick={() => this.handleClick('contactSetup', true)}>
                                        <ListItemIcon>
                                            <Build />
                                        </ListItemIcon>
                                        <ListItemText inset primary='Contact' />
                                        {this.state.contactSetup ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>

                                    <Divider />

                                    {/* Contact Setup Collapse Panel */}
                                    <Collapse in={this.state.contactSetup} timeout='auto' unmountOnExit>
                                        <List component='div' disablePadding>
                                            <NavigationArea
                                                onClick={this.handleClick.bind(this, 'email', false)}
                                                icon={<Email />}
                                                label='Interests'
                                            />
                                            <NavigationArea
                                                onClick={this.handleClick.bind(this, 'email', false)}
                                                icon={<Email />}
                                                label='Sources'
                                            />
                                            <NavigationArea
                                                onClick={this.handleClick.bind(this, 'email', false)}
                                                icon={<Email />}
                                                label='Statuses'
                                            />
                                        </List>

                                    </Collapse>

                                    <Divider />

                                    <NavigationArea
                                        onClick={this.handleClick.bind(this, 'email', false)}
                                        icon={<Email />}
                                        label='Promotions'
                                    />
                                    <NavigationArea
                                        onClick={this.handleClick.bind(this, 'email', false)}
                                        icon={<Email />}
                                        label='Locations'
                                    />
                                </List>
                            </Collapse>

                            <Divider />

                            <NavigationArea
                                onClick={this.handleClick.bind(this, 'email', false)}
                                icon={<Email />}
                                label='Email Integration'
                            />
                        </List>
                    </Collapse>

                    <Divider />
                </List>
            </StyledDrawer>
        )
    }
}

export default connect(null, null)(NavigationDrawer);