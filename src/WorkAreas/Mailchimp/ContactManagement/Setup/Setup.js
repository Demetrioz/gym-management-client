import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubHeader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import NavigationArea from 'Components/NavigationArea/NavigationArea';

import Lists from 'WorkAreas/Mailchimp/ContactManagement/Setup/Lists';
import Groups from 'WorkAreas/Mailchimp/ContactManagement/Setup/Groups';
import Tags from 'WorkAreas/Mailchimp/ContactManagement/Setup/Tags';
import Segments from 'WorkAreas/Mailchimp/ContactManagement/Setup/Segments';

import ListIcon from '@material-ui/icons/List';
import Group from '@material-ui/icons/Group';
import Label from '@material-ui/icons/Label';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
import Style from './Setup.module.css';
import Common from 'Styles/Common.module.css';

class Organization extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: null,
        }

        this.contentMap = {
            'lists': Lists,
            'groups': Groups,
            'tags': Tags,
            'segments': Segments,
        }
    }

    // List - Get a list of all lists

    // Groups - Get a list of all lists, then for each list, get the
    // a list of all interest categories (displayed as tabs), 
    // then for all interest categories, get a list of all interests
    // (in table under tab )

    // Segments/tags - get a list of segments, filter by type

    // List - /lists
	// Name - name
	// Created - date_created
	// Member Count - stats.member_count

    // Groups - /lists/{list_id}/interest-categories
    //     title

    //     Group Names - /lists/{list_id}/interest-categories/{interest_category_id}/interests
    //         Name - name
    //         Subscriber Count - subscriber_count

    // Segments - /lists/{list_id}/segments (type saved)
    //     Name - name
    //     Created - created_ad
    //     Member Count - member_count
        

    // Tags - /lists/{list_id}/segments (type static)
    //     Name - name
    //     Created - created_at
    //     Member Count - member_count
    
    render() {

        let content = this.state.content
            ? React.createElement(this.contentMap[this.state.content])
            : null;

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
                                onClick={() => {this.setState({ content: 'lists'} )}}
                                icon={<ListIcon />}
                                label='Lists'
                                subArea={false}
                            />
                            <Divider />
                            <NavigationArea
                                onClick={() => {this.setState({ content: 'groups'} )}}
                                icon={<Group />}
                                label='Groups'
                                subArea={false}
                            />
                            <Divider />
                            <NavigationArea
                                onClick={() => {this.setState({ content: 'tags'} )}}
                                icon={<Label />}
                                label='Tags'
                                subArea={false}
                            />
                            <Divider />
                            <NavigationArea
                                onClick={() => {this.setState({ content: 'segments'} )}}
                                icon={<ViewCarousel />}
                                label='Segments'
                                subArea={false}
                            />
                        </List>
                    </Paper>
                </div>
                <div id='content' className={`${Common.marginLeftSm} ${Common.width100}`}>
                    {content}
                </div>
            </div>
        )
    }
}

export default Organization;