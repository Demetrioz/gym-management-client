import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Interests from 'WorkAreas/ContactSetup/Interests/Interests';
import Sources from 'WorkAreas/ContactSetup/Sources/Sources';
import Statuses from 'WorkAreas/ContactSetup/Statuses/Statuses';

const StyledPaper = withStyles({
    root: {
        flexGrow: 1,
    }
})(Paper);

class ContactSetup extends Component {

    constructor(props) {
        super(props);

        // TODO: Move to redux, create component reducer
        this.state = {
            tab: 0
        }

        this.contentMap = {
            0: Interests,
            1: Sources,
            2: Statuses,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, value) {
        this.setState({
            tab: value
        });
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
                        <Tab label='Interests'/>
                        <Tab label='Sources'/>
                        <Tab label='Statuses'/>
                    </Tabs>
                </StyledPaper>
                {content}
            </div>
        )
    }
}

export default ContactSetup;