import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';

import FormUtility from 'Utilities/FormUtility';

class Input extends Component {

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
            // value: event.target.value,
        });

        if(this.props.onChange)
            this.props.onChange(event.target.value);
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
        return (
            <TextField 
                id={this.props.id}
                label={this.props.label}
                className={this.props.className}
                value={this.props.value}
                defaultValue={this.props.defaultValue}
                onChange={this.handleChange}
                margin={this.props.margin}
                variant={this.props.variant}
                error={this.props.error}
                disabled={this.props.disabled}
                autoComplete={this.props.autoComplete}
                InputProps={this.props.inputProps}
                multiline={this.props.multiline}
                rowsMax={this.props.rowsMax}
                helperText={this.props.helperText}
                placeholder={this.props.placeholder}
                SelectProps={this.props.selectProps}
                InputLabelProps={this.props.inputLabelProps}
                type={this.props.type}
            />
        )
    }
}

Input.defaultProps = {
    margin: 'normal',
    variant: 'outlined',
    disabled: false,
}

// function mapStateToProps(state) {
//     return {

//     }
// }

export default connect(null, null)(Input);