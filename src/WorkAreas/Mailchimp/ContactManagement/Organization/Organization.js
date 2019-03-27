import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubHeader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import NavigationArea from 'Components/NavigationArea/NavigationArea';

import Style from './Organization.module.css';
import Common from 'Styles/Common.module.css';

class Organization extends Component {
    render() {
        return (
            <div id='container' className={`${Common.flexRow} ${Common.marginTopSm}`}>
                <div id='item_select' className={`${Style.itemSelect}`}>
                    <Paper>
                        <List
                            component='nav'
                            subheader={<ListSubHeader component='div'>Items</ListSubHeader>}
                        >
                            <Divider />
                            <NavigationArea
                                label='Lists'
                                subheader={false}
                            />
                            <Divider />
                            <NavigationArea
                                label='Groups'
                                subheader={false}
                            />
                            <Divider />
                            <NavigationArea
                                label='Tags'
                                subheader={false}
                            />
                            <Divider />
                            <NavigationArea
                                label='Segments'
                                subheader={false}
                            />
                        </List>
                    </Paper>
                </div>
                organization
            </div>
        )
    }
}

export default Organization;