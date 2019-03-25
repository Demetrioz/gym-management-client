import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormUtility from 'Utilities/FormUtility';

class Form extends Component {
    
    componentWillMount() {

        let newForm = {
            name: this.props.name,
            children: [],
            valid: false
        };

        this.props.dispatch({
            type: 'ADD_FORM',
            form: newForm
        });
    }

    render() {
        
        let children = FormUtility
            .addNameToChildren(this.props.children, this.props.name);

        return (
            React.createElement(
                'span',
                this.props,
                children
            )
        );
    }

    componentWillUnmount() {

        this.props.dispatch({
            type: 'REMOVE_FORM',
            formName: this.props.name
        });
    }
}

// function mapStateToProps(state) {
//     return {

//     }
// }

export default connect(null, null)(Form);