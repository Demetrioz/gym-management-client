import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import DataTableRow from 'Components/DataTableRow/DataTableRow';

import Style from './DataTable.module.css';

class DataTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
        }

        this.handleChangePage = this.handleChangePage.bind(this);
    }

    createHeader() {

        let headerRow = 
            <DataTableRow
                styledHeader={this.props.styledHeader}
                columns={this.props.columns}
            />

        return (
            <TableHead>
                {headerRow}
            </TableHead>
        );
    }

    createDataRows() {

        let rows = this.props.data.map(row => {
            return (
                <DataTableRow
                    onClick={this.props.onClick}
                    data={row}
                    columns={this.props.columns}
                />
            );
        });

        if(this.props.showFooter === false)
            return (
                <TableBody>
                    {rows}
                </TableBody>
            )

        else {

            return (
                <TableBody>
                    {rows.slice(this.state.page * this.props.rowsPerPage,
                        this.state.page * this.props.rowsPerPage + this.props.rowsPerPage)
                        .map(row => {
                            return row
                        })
                    }
                </TableBody>
            )
        }
    }

    createFooter() {
        
        return (
            <TableFooter>
                <TableRow>
                    <TablePagination 
                        rowsPerPageOptions={this.props.rowsPerPageOptions}
                        colSpan={this.props.columns.length}
                        count={this.props.data.length}
                        rowsPerPage={this.props.rowsPerPage}
                        page={this.state.page}
                        SelectProps={{native: true}}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </TableRow>
            </TableFooter>
        )
    }

    handleChangePage(event, page) {
        this.setState({ page: page });
    }

    // TODO: Won't work yet, rows per page passed as props
    handleChangeRowsPerPage(event) {

        this.setState({
            page: 0,
            rowsPerPage: event.target.value
        });
    }

    render() {

        let header = this.props.showHeader
            ? this.createHeader()
            : null;

        let dataRows = this.createDataRows();

        let footer = this.props.showFooter
            ? this.createFooter()
            : null;

        return (
            <Card className={Style.base}>
                <CardContent>
                    <Table>
                        {header}
                        {dataRows}
                        {footer}
                    </Table>
                </CardContent>
            </Card>
        )
    }
}

DataTable.defaultProps = {
    columns: [],
    data: [],
    showHeader: true,
    showFooter: true,
    rowsPerPageOptions: [10],
    rowsPerPage: 10,
    styledHeader: false,
}

export default DataTable;