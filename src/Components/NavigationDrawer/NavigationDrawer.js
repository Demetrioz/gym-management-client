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

// Collapse Panel Icons
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Dashboard from '@material-ui/icons/Dashboard';
import Business from '@material-ui/icons/Business';
import People from '@material-ui/icons/People';
import Class from '@material-ui/icons/Class';

// Area Icons
import Email from '@material-ui/icons/Email';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Schedule from '@material-ui/icons/Schedule';

// Work Areas
import DashboardWorkArea from 'WorkAreas/Dashboard/Dashboard';
import EmailWorkArea from 'WorkAreas/Email/Email';
import MemberInformation from 'WorkAreas/MemberInformation/MemberInformation';
import LeadInformation from 'WorkAreas/LeadInformation/LeadInformation';
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
            marketing: false,
            reports: false,
        }
    }

    handleClick(clickedComponent, expandable) {

        let componentMap = {
            dashboard: DashboardWorkArea,
            email: EmailWorkArea,
            member: MemberInformation,
            lead: LeadInformation,
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
                    <ListItem button onClick={() => this.handleClick('dashboard', false)}>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText inset primary='Dashboard' />
                    </ListItem>

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
                            <ListItem button onClick={() => this.handleClick('lead', false)}>
                                <ListItemIcon>
                                    <AccountCircle />
                                </ListItemIcon>
                                <ListItemText inset primary='Leads' />
                            </ListItem>
                            <ListItem button onClick={() => this.handleClick('member', false)}>
                                <ListItemIcon>
                                    <AccountCircle />
                                </ListItemIcon>
                                <ListItemText inset primary='Members' />
                            </ListItem>
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
                            <ListItem button onClick={() => this.handleClick('class_schedule', false)}>
                                <ListItemIcon>
                                    <Class />
                                </ListItemIcon>
                                <ListItemText inset primary='Class Schedule'/>
                            </ListItem>
                        </List>
                    </Collapse>


                    <ListItem button onClick={() => this.handleClick('marketing', true)}>
                        <ListItemIcon>
                            <Business />
                        </ListItemIcon>
                        <ListItemText inset primary='Marketing' />
                        {this.state.marketing ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Divider />

                    {/* Marketing Collapse Panel */}
                    <Collapse in={this.state.marketing} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            <ListItem button onClick={() => this.handleClick('email', false)}>
                                <ListItemIcon>
                                    <Email />
                                </ListItemIcon>
                                <ListItemText inset primary='Email Integration' />
                            </ListItem>
                        </List>
                    </Collapse>

                    <Divider />
                </List>
            </StyledDrawer>
        )
    }
}

export default connect(null, null)(NavigationDrawer);