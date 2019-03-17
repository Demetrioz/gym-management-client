import React, { Component } from 'react';

import Common from 'Styles/Common.module.css';

class UnAuthorized extends Component {
    render() {
        return (
            <div className={`${Common.flexRow} ${Common.flexCenter} ${Common.marginTop20}`}>
                <p><strong>You Shall Not Pass!</strong></p>
            </div>
        )
    }
}

export default UnAuthorized;