import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Route } from 'react-router-dom';

import Form from 'Components/Form/Form';
import Input from 'Components/Input/Input';
import FloatingButton from 'Components/FloatingButton/FloatingButton';

import DesktopLogo from 'Images/Logo/Logo_Desktop.png';

import GymManagementApiService from 'Services/GymManagementApiService';

import Settings from 'Settings';

import Style from './Login.module.css';
import Common from 'Styles/Common.module.css';

class Login extends Component {

    async handleLogin(history, route) {
        
        try {

            // TODO: Hook into authentication
            // TODO: Load different routes based on authenticated user
            //      Home/Dashboard for admin, Member portal for user
            //      Class login screen for service account
            
            // TODO: history.push does not work in v4
            history.push(route);
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

export default Login;