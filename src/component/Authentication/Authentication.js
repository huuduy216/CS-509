import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// import axios from '../../axios/axios-local'

import * as authActions from '../../store/action/auth';
import classes from './Authentication.module.css'

import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';



const NormalLoginForm = (props) => {


    const OnFinish = (values) => {
        props.onAuth(values["username"], values["password"]);
    };
    //judge auth state
    let authRedirect = null;
    let failedLogin = null;
    let iconName = null;
 
    //test
    if (props.auth && props.role==="admin") {
        localStorage.setItem('timesheetisAuthenticated', true);
        localStorage.setItem('role','admin');
        let username = localStorage.getItem('username');
        if(username.length===1){
            iconName = username[0];
        }else{
            iconName = username[0]+username[1];
        }
        iconName = iconName.toUpperCase();
        localStorage.setItem('timesheeticonName', iconName);
        authRedirect = <Redirect to="/userhome" />
    }
    if (props.auth && props.role==="user") {
        localStorage.setItem('timesheetisAuthenticated', true);
        localStorage.setItem('role','user');
        let username = localStorage.getItem('username');
        if(username.length===1){
            iconName = username[0];
        }else{
            iconName = username[0]+username[1];
        }
        iconName = iconName.toUpperCase();
        localStorage.setItem('timesheeticonName', iconName);
        authRedirect = <Redirect to="/userhome" />
    }

    if (!props.auth && props.error !== "") {
        failedLogin = <p className={classes.failedLogin}>{props.error}</p>
    }

    //form
    let form = (

        <Form className={classes.loginform} onFinish={OnFinish} name="normalLogin">

            <h2 className={classes.title}>Log In</h2>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}>
                <Input className={classes.info} prefix={<UserOutlined className="formicon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}>
                <Input className={classes.info} prefix={<LockOutlined className="formicon" />} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className={classes.info}>
                    Log in
                </Button>
            </Form.Item>
            {failedLogin}
        </Form>)

    let bar=(
        <div className={classes.bar}>
            <NavLink to="/" className={classes.logo}></NavLink>
        </div>
    );


    return (
        <React.Fragment>
            <div className={classes.div}>
                {bar}
                {authRedirect}
                {form}
            </div>
        </React.Fragment>

    );
};

const mapStateToProps = state => {

    return {
        auth: state.auth.isAuthenticated,
        error: state.auth.loginError,
        load: state.auth.loading,
        user: state.user.user,
        role:state.auth.role
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (name, pwd) => dispatch(authActions.auth(name, pwd))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);