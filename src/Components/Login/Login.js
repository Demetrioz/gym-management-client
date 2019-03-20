import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Route, withRouter } from 'react-router-dom';

import Form from 'Components/Form/Form';
import Input from 'Components/Input/Input';
import FloatingButton from 'Components/FloatingButton/FloatingButton';

import DesktopLogo from 'Images/Logo/Logo_Desktop.png';

import FormUtility from 'Utilities/FormUtility';

import GymManagementApiService from 'Services/GymManagementApiService';

import Settings from 'Settings';

import Style from './Login.module.css';
import Common from 'Styles/Common.module.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    async handleLogin(history, route) {
        
        try {

            let credentials = {
                UserName: FormUtility.getChildValue(this.props.form, 'email'),
                Password: FormUtility.getChildValue(this.props.form, 'password')
            }

            let result = await GymManagementApiService.login(credentials);
            console.log("result:", result);
            
            // TODO: Load different routes based on authenticated user
            //      Home/Dashboard for admin, Member portal for user
            //      Class login screen for service account

            // TODO: result should be decoded - check for parts and dispatch to state
            if(result) {
                this.props.dispatch({
                    type: 'SET_USER',
                    data: result.token
                });
                
                history.push(route);
            }
        }
        catch(error) {
            console.log("Error: ", error);
        }
    }
    
    componentDidMount() {

    }

    render () {
        
        return (
            <React.Fragment>

                {/* Desktop Layout */}
                <MediaQuery minDeviceWidth={Settings.minDesktopWidth}>
                    <div id='computerContainer' className={Style.base}>
                        <div id='logo' className={`${Common.flexCenter} ${Style.logo}`}>
                            <img src={DesktopLogo} alt='logo' />
                        </div>
                        <Form name='login_form' className={`${Common.flexColumn} ${Common.margin5}`}>
                            <Input 
                                name='email'
                                label='Email'
                            />
                            <Input 
                                name='password'
                                label='Password'
                                type='password'
                            />
                        </Form>
                        <div className={`${Common.flexEnd} ${Style.button}`}>
                            <Route render={({history}) => (
                                <FloatingButton
                                    label='Login'
                                    onClick={() => this.handleLogin(history, '/Home')}
                                />
                            )}/>
                        </div>
                    </div>
                </MediaQuery>

                {/* Tablet Layout */}
                <MediaQuery minDeviceWidth={Settings.maxPhoneWidth + 1} maxDeviceWidth={Settings.maxTabletWidth}>
                    <div id='tabletContainer' className={Style.baseTablet}>
                        <div id='logo' className={`${Common.flexCenter} ${Style.logo}`}>
                            <img src={DesktopLogo} alt='logo' />
                        </div>
                        <Form name='login_form' className={`${Common.flexColumn} ${Common.margin5}`}>
                            <Input 
                                label='Email'
                            />
                            <Input 
                                label='Password'
                                type='password'
                            />
                        </Form>
                        <div className={`${Common.flexEnd} ${Style.button}`}>
                            <Route render={({history}) => (
                                <FloatingButton
                                    label='Login'
                                    onClick={() => this.handleLogin(history, '/Home')}
                                />
                            )}/>
                        </div>
                    </div>
                </MediaQuery>

                {/* Phone Layout */}
                <MediaQuery maxDeviceWidth={Settings.maxPhoneWidth}>
                    <div id='phoneContainer' className={Style.basePhone}>
                    <div id='logo' className={`${Common.flexCenter} ${Style.logo}`}>
                            <img src={DesktopLogo} alt='logo' width={200} height={142}/>
                        </div>
                        <Form name='login_form' className={`${Common.flexColumn} ${Common.margin5}`}>
                            <Input 
                                label='Email'
                            />
                            <Input 
                                label='Password'
                                type='password'
                            />
                        </Form>
                        <div className={`${Common.flexEnd} ${Style.button}`}>
                            <Route render={({history}) => (
                                <FloatingButton
                                    label='Login'
                                    onClick={() => this.handleLogin(history, '/Home')}
                                />
                            )}/>
                        </div>
                    </div>
                </MediaQuery>
            
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    
    let index = FormUtility.findFormIndexByName(state.forms, 'login_form');

    return {
        form: state.forms[index],
    }
}

export default withRouter(connect(mapStateToProps, null)(Login));