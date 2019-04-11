import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubHeader from '@material-ui/core/ListSubheader';

import NavigationArea from 'Components/NavigationArea/NavigationArea';
import Home from 'ClientWorkAreas/Home/Home';
import History from 'ClientWorkAreas/History/History';

//Icons
import HomeIcon from '@material-ui/icons/Home';
// import Dashboard from '@material-ui/icons/Dashboard';
// import WhatsHot from '@material-ui/icons/Whatshot';
// import Stars from '@material-ui/icons/Stars';
// import PriorityHigh from '@material-ui/icons/PriorityHigh';
// import Assignment from '@material-ui/icons/Assignment';
// import Assessment from '@material-ui/icons/Assessment';
import Timeline from '@material-ui/icons/Timeline';
// import VideoLibrary from '@material-ui/icons/VideoLibrary';
// import ShoppingCart from '@material-ui/icons/ShoppingCart';

const StyledDrawer = withStyles({
    paper: {
        top: '64px',
        width: '250px',
        backgroundColor: '#BBBBBB'
    }
})(Drawer);

class ClientNavigationDrawer extends Component {

    handleClick(clickedComponent) {
        let componentMap = {
            home: Home,
            training_history: History,
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
                        onClick={this.handleClick.bind(this, 'home')}
                        icon={<HomeIcon />}
                        label='Home'
                        subArea={false}
                    />
                    {/* <NavigationArea
                        onClick={this.handleClick.bind(this, 'dashboard')}
                        icon={<Dashboard />}
                        label='Dashboard'
                    />
                    <NavigationArea
                        onClick={this.handleClick.bind(this, 'leaderboard')}
                        icon={<WhatsHot />}
                        label='Leaderboard'
                    />
                    <NavigationArea
                        onClick={this.handleClick.bind(this, 'achievements')}
                        icon={<Stars />}
                        label='Achievements'
                    />
                    <NavigationArea
                        onClick={this.handleClick.bind(this, 'quests')}
                        icon={<PriorityHigh />}
                        label='Quests'
                    />
                    <NavigationArea
                        onClick={this.handleClick.bind(this, 'assigned_tasks')}
                        icon={<Assignment />}
                        label='Assigned Tasks'
                    />
                    <NavigationArea
                        onClick={this.handleClick.bind(this, 'assessments')}
                        icon={<Assessment />}
                        label='Assessments'
                    /> */}
                    <NavigationArea
                        onClick={this.handleClick.bind(this, 'training_history')}
                        icon={<Timeline />}
                        label='Training History'
                        subArea={false}
                    />
                    {/* <NavigationArea
                        onClick={this.handleClick.bind(this, 'video_library')}
                        icon={<VideoLibrary />}
                        label='Video Library'
                    />
                    <NavigationArea
                        onClick={this.handleClick.bind(this, 'store')}
                        icon={<ShoppingCart />}
                        label='Store'
                    /> */}
                </List>
            </StyledDrawer>
        )
    }
}

export default connect(null, null)(ClientNavigationDrawer);