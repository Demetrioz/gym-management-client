import React, { Component } from 'react';

import Fab from '@material-ui/core/Fab';

class FloatingButton extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(this.props.onClick)
            this.props.onClick();
    }

    render() {
        return (
            <Fab 
                variant={this.props.variant}
                size={this.props.size}
                color={this.props.color}
                onClick={this.handleClick}
            >
                {this.props.icon}
                {this.props.label}
            </Fab>
        );
    }
}

FloatingButton.defaultProps = {
    variant: 'extended',
    size: 'medium',
    color: 'primary'
}

export default FloatingButton;