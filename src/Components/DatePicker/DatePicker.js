import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import MomentUtils from '@date-io/moment';

import { DateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

import FormUtility from 'Utilities/FormUtility';

const StyledDateTimePicker = withStyles({
    root: {
        marginTop: '3%',
        marginBottom: '3%'
    }
})(DateTimePicker);

class DatePicker extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {

        this.props.dispatch({
            type: 'UPDATE_FORM_CHILD',
            formName: this.props.formName,
            childName: this.props.name,
            properties: {
                value: date
            }
        });

        if(this.props.onChange)
            this.props.onChange(date);
    }

    componentDidMount() {

        let element = FormUtility.createChildFromProps(this.props);

        this.props.dispatch({
            type: 'ADD_CHILD_TO_FORM',
            formName: this.props.formName,
            child: element,
        });
    }

    render() {

        let value = this.props.form
        ? FormUtility.getChildValue(this.props.form, this.props.name)
        : moment();

        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <StyledDateTimePicker 
                    className={this.props.className}
                    value={value}
                    onChange={this.handleChange}
                />
            </MuiPickersUtilsProvider>
        )
    }
}

DatePicker.defaultProps = {
    value: moment(),
}

function mapStateToProps(state, ownProps) {

    let formIndex = FormUtility.findFormIndexByName(state.forms, ownProps.formName);

    return {
        form: state.forms[formIndex],
    }
}

export default connect(mapStateToProps, null)(DatePicker);