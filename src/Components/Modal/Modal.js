import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

// TODO: Figure out how to make modal width variable
// TODO: Don't close on click

const StyledDialogTitle = withStyles({
    root: {
        padding: '10px',
    }
})(DialogTitle);

class Modal extends Component {

    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.dispatch({
            type: 'REMOVE_MODAL',
            name: this.props.name
        });
    }

    render() {

        let title = <StyledDialogTitle>{this.props.title}</StyledDialogTitle>
        
        return (
            <Dialog 
                className={this.props.className}
                open={true} 
                onClose={this.handleClose}
            >
                {title}
                <div id='content'>
                    {this.props.content}
                </div>
            </Dialog>
        )
    }
}

export default connect(null, null)(Modal);