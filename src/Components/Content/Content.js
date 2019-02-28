import React, { Component } from 'react';
import { connect } from 'react-redux';

class Content extends Component {
    
    render() {
        let content = this.props.content
        ? React.createElement(this.props.content)
        : null;

        return (
            <div id='content' className={this.props.className}>
                {content}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        content: state.content
    }
}

export default connect(mapStateToProps, null)(Content);