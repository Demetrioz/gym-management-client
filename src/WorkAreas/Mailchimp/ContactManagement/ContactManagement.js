import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Organization from 'WorkAreas/Mailchimp/ContactManagement/Organization/Organization';
import ImportExport from 'WorkAreas/Mailchimp/ContactManagement/ImportExport';

const StyledPaper = withStyles({
    root: {
        flexGrow: 1,
    }
})(Paper);

class ContactManagmenet extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tab: 0
        }

        this.contentMap = {
            0: Organization,
            1: ImportExport,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, value) {
        this.setState({ tab: value });
    }

    render() {

        let content = React.createElement(this.contentMap[this.state.tab]);

        return (
            <div id='container'>
                <StyledPaper>
                    <Tabs
                        value={this.state.tab}
                        onChange={this.handleChange}
                        indicatorColor='primary'
                        textColor='primary'
                        centered
                    >
                        <Tab label='Organization' />
                        <Tab label='Import / Export' />
                    </Tabs>
                </StyledPaper>
                {content}
            </div>
        )
    }
}

export default ContactManagmenet;