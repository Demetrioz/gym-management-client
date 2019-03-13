import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

import FormUtility from 'Utilities/FormUtility';

const StyledSelect = withStyles({
    selectMenu: {
        minWidth: '150px',
    }
})(Select);

class OutlinedSelect extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        this.props.dispatch({
            type: 'UPDATE_FORM_CHILD',
            formName: this.props.formName,
            childName: this.props.name,
            properties: {
                value: event.target.value
            }
        });

        if(this.props.onChange)
            this.props.onChange(event.target.value);
    }

    componentWillMount() {
        let element = FormUtility.createChildFromProps(this.props);

        this.props.dispatch({
            type: 'ADD_CHILD_TO_FORM',
            formName: this.props.formName,
            child: element
        });

        this.props.dispatch({
            type: 'UPDATE_FORM_CHILD',
            formName: this.props.formName,
            childName: this.props.name,
            properties: {
                options: this.props.options
            }
        });
    }

    render() {

        let formChild = this.props.form
        ? FormUtility.findFormChildByName(this.props.form, this.props.name)
        : null;

        let availableOptions = formChild
        ? formChild.options
        : [];

        let selectOptions = availableOptions.map((option, i) => {
            return (
                <MenuItem 
                    key={i} 
                    value={option.value}
                >
                    {option.label}
                </MenuItem>
            )
        })
        
        let value = formChild
        ? formChild.value
        : '';

        return (
            <FormControl 
                variant={this.props.variant}
                margin={this.props.margin}
            >
                <InputLabel>
                    {this.props.label}
                </InputLabel>
                <StyledSelect 
                    value={value}
                    onChange={this.handleChange}
                    disabled={this.props.disabled}
                    input={
                        <OutlinedInput
                            labelWidth={this.props.labelWidth}
                            name={this.props.name}
                        />
                    }
                >
                    {selectOptions}
                </StyledSelect>
            </FormControl>
        )
    }
}

OutlinedSelect.defaultProps = {
    options: [],
    variant: 'outlined',
    margin: 'normal',
    labelWidth: 10,
    disabled: false,
}

function mapStateToProps(state, ownProps) {

    let formIndex = FormUtility.findFormIndexByName(state.forms, ownProps.formName);

    return {
        form: state.forms[formIndex]
    }
}

export default connect(mapStateToProps, null)(OutlinedSelect);