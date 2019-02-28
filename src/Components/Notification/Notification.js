import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import Common from 'Styles/Common.module.css';

class Notification extends Component {
    render() {
        return (
            <Dialog 
                open={true}
            >
                <DialogTitle>{this.props.action}</DialogTitle>
                <div className={Common.flexColumn}>
                    <CircularProgress 
                        className={Common.marginHAuto}
                        size={50}
                    />
                    <p className={`${Common.marginHAuto} ${Common.padding1}`}>
                        {this.props.message}
                    </p>
                </div>
            </Dialog>
        );
    }
}

export default Notification;