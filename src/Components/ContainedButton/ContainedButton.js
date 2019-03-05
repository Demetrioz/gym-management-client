import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import Style from './ContainedButton.module.css';

class ContainedButton extends Component {

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
            <div className={this.props.className}>
                <Button
                    variant={this.props.variant}
                    color='primary'
                    onClick={this.handleClick}
                >
                    {this.props.label}
                    <div className={Style.icon}>
                        {this.props.icon}
                    </div>
                </Button>
            </div>
        )
    }
}

ContainedButton.defaultProps = {
    variant: 'contained',
    color: 'primary',
    icon: null,
}

export default ContainedButton;