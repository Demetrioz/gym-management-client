import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from'@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Style from './NavigationExpand.module.css';

class NavigationExpand extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            expand: false
        }    
    }

    handleClick() {

        this.setState({
            expand: !this.state.expand
        });

        if(this.props.onClick)
            this.props.onClick();
    }

    render() {
        let style = this.props.subArea
        ? Style.base
        : '';

        let navigationItem = 
        <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
                {this.props.icon}
            </ListItemIcon>
            <ListItemText inset primary={this.props.label} />
            {this.state.expand ? <ExpandLess /> : <ExpandMore />}
        </ListItem>;

        let collapsePanel =
        <Collapse in={this.state.expand} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
                {this.props.children}
            </List>
        </Collapse>

        return (
            <div id='container' className={style}>
                {navigationItem}
                <Divider />
                {collapsePanel}
            </div>
        )
    }
}

NavigationExpand.defaultProps = {
    subArea: false,
}

export default NavigationExpand;