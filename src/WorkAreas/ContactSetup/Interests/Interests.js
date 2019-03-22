import React, { Component } from 'react';

import DataTable from 'Components/DataTable/DataTable';
import Form from 'Components/Form/Form';
import Input from 'Components/Input/Input';
import FloatingButton from 'Components/FloatingButton/FloatingButton';

import Common from 'Styles/Common.module.css';
import Style from './Interests.module.css';

class Interests extends Component {

    configureColumns() {
        return [
            {
                label: 'Name',
                property: 'name',
            },
            {
                label: 'Label',
                property: 'label'
            }
        ];
    }
    render() {

        let columns = this.configureColumns();

        return (
            <div id='container' className={`${Common.flexRow} ${Common.flexBetween} ${Common.marginTopSm}`}>
                <div id='table' className={`${Common.width45} ${Common.flexColumn}`}>
                    <DataTable
                        styledHeader={true}
                        columns={columns}
                        data={[]}
                    />
                    <div id='table_button' className={`${Common.margin3} ${Common.marginLeftAuto}`}>
                        <FloatingButton  
                            label='Add'
                        />
                    </div>
                </div>
                <div id='form' className={Common.width45}>
                    <Form name='interest_form' className={Common.flexColumn}>
                        <Input 
                            name='name'
                            label='Name'
                        />
                        <Input
                            name='label'
                            label='Label'
                        />
                    </Form>
                    <div id='form_button' className={`${Common.flexCenter} ${Common.flexAround} ${Common.margin3}`}>
                        <FloatingButton
                            label='Cancel'
                            color='secondary'
                        />
                        <FloatingButton
                            label='Save'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Interests;