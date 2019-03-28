import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from 'Components/DataTable/DataTable';

class Tags extends Component {

    configureColumns() {
        return [
            {
                label: 'Name',
                property: 'name',
            },
            {
                label: 'Created',
                property: 'created_at',
            },
            {
                label: 'Members',
                property: 'member_count',
            }
        ];
    }
    
    render() {

        let columns = this.configureColumns();

        return (
            <div id='container'>
                <DataTable
                    styledHeader={true}
                    columns={columns}
                    data={[]}
                />
            </div>
        )
    }
}

export default connect(null, null)(Tags);