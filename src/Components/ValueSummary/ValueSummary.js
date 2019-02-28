import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Style from './ValueSummary.module.css';
import Common from 'Styles/Common.module.css';

const StyledCard = withStyles({
    root: {
        backgroundColor: '#2087FB',
        height: '60px',
    }
})(Card);

const StyledTypography = withStyles({
    root: {
        marginTop: '10px',
        marginLeft: '70px'
    }
})(Typography);

class ValueSummary extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("my data!:", this.props.data);
    }

    render() {

        let value = this.props.value
        ? this.props.value
        : this.props.function(this.props.data);

        // If value passed, there's no additional data
        // If no value is passed, data and a function were passed and you
        // can drill down
        let clickableStyle = this.props.value
        ? ''
        : value > 0
            ? Style.clickable
            : '';

        return (
            <Card className={Common.margin1}>
                <CardContent>
                    {/* Image */}
                    <StyledCard className={Style.image}>
                        <CardContent 
                            className={clickableStyle}
                            onClick={this.handleClick}
                        >
                            {this.props.icon}
                        </CardContent>
                    </StyledCard>
                    {/* Text */}
                    <StyledTypography className={Style.text} variant='h5' component='h2'>
                        {this.props.title} : {value}
                    </StyledTypography>
                </CardContent>
            </Card>
        )
    }
}

ValueSummary.defaultProps = {
    value: null,
    function: () => {return 0},
    data: [],
}

export default ValueSummary;