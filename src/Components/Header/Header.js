import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Style from './Header.module.css';

class Header extends Component {
    
    render() {
        return (
            <div>
                <AppBar position='static'>
                    <Toolbar className={Style.base}>
                        <div id='user'>
                            {this.props.user}
                        </div>
                        <div id='title'>
                            {this.props.title}
                        </div>
                        <div id='actions'>
                            {this.props.actions}
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

Header.defaultProps = {
    user: null,
    title: null,
    actions: null
}

export default Header;