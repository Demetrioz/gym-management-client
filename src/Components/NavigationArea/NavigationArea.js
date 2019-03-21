import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Style from './NavigationArea.module.css';

class NavigationArea extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(this.props.onClick)
            this.props.onClick();
    }

    render() {

        let style = this.props.subArea
        ? Style.base
        : '';

        return (
            <div id='container' className={style}>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        {this.props.icon}
                    </ListItemIcon>
                    <ListItemText inset primary={this.props.label} />
                </ListItem>
            </div>
        )
    }
}

NavigationArea.defaultProps = {
    subArea: true,
}

export default NavigationArea;