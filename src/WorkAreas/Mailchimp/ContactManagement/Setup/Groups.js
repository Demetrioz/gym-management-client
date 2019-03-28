import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import DataTable from 'Components/DataTable/DataTable';

const StyledPaper = withStyles({
    root: {
        flexGrow: 1,
    }
})(Paper);

class Groups extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tab: 0,
        }

        this.handleChange = this.handleChange.bind(this);
        this.filterData = this.filterData.bind(this);
    }

    configureColumns() {
        return [
            {
                label: 'Name',
                property: 'name'
            },
            {
                label: 'Members',
                property: 'subscriber_count'
            }
        ];
    }

    filterData() {
        return [];
    }

    handleChange(event, value) {
        this.setState({ tab: value });
    }

    render() {

        let columns = this.configureColumns();

        let data = this.filterData();

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
                        <Tab label='Group 1' />
                        <Tab label='Group 2' />
                        <Tab label='Group 3' />
                    </Tabs>
                    <DataTable
                        styledHeader={true}
                        columns={columns}
                        data={data}
                    />
                </StyledPaper>
            </div>
        )
    }
}

export default Groups;