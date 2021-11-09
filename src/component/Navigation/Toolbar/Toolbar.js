import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


import 'antd/dist/antd.css';
import { Layout, Dropdown, Menu, Button } from 'antd';

import classes from './Toolbar.module.css';
import DrawerToggle from '../../DrawerToggle/DrawerToggle';
import Login from '../../../UI/Link/Login';
import Register from '../../../UI/Link/Register';
import * as authActions from '../../../store/action/auth';
import * as userActions from '../../../store/action/user'

const { Header } = Layout;

const Toolbar = (props) => {


    //////////////// personal info menu


    const handleClickLogout = () => {
        props.logout();
    }



    // let userInfo = (
    //     <div className={classes.menuprofile}>
    //         <p className={classes.menuname}>{localStorage['timesheetUsername']}</p>
    //         <p className={classes.menumail}>{localStorage['timesheetuseremail']}</p>
    //     </div>
    // );


    let logout = (
        <Menu.Item onClick={handleClickLogout}>
            <a href="/">
                Logout
            </a>
        </Menu.Item>
    )
    const menu = (
        <Menu className={classes.menu}>
            {/* {userInfo} */}
            {/* {setting} */}
            {logout}
        </Menu>
    );
    /////////////////// notification menu
    // const notificationMenu = (
    //     <Menu className={classes.menu}>

    //         <p> 1st menu item</p>
    //         <p> 2st menu item</p>
    //         <p> 3st menu item</p>

    //     </Menu>
    // );
    ///////////////logo
    let logo = (<NavLink to="/" className={classes.logo}></NavLink>);
    if(props.role==="admin"||props.role==="user"){
        logo = (<NavLink to="/" className={classes.logo}></NavLink>);
    }
    ///////////////toolbar     
    let toolbar = (
        <Header className={classes.header}>
            <DrawerToggle display={"none"} />
            {logo}
            <nav className={classes.des}>
                <Login link="/login" exact >LOGIN </Login>
                <Register link="/register" exact >REGISTER </Register>
            </nav>
        </Header>
    );
    if (localStorage['timesheetisAuthenticated']) {
        toolbar = (
            <Header className={classes.header}>
                <DrawerToggle />
                <NavLink to="/employee" className={classes.logo}></NavLink>
                <nav className={classes.des}>
                    <Login link="/login" exact displayLogin={"none"}>LOGIN </Login>
                    <div className={classes.loginButton}>

                        {/* <Dropdown overlay={notificationMenu} placement="bottomLeft" trigger="click">
                            <Button type="link" icon={<NotificationOutlined />} size="middle"></Button>
                        </Dropdown> */}

                        <Dropdown overlay={menu} placement="bottomLeft" trigger="click">
                            <Button size="middle" type="primary" shape="circle" className={classes.profilepic}>{localStorage['timesheeticonName']}</Button>
                        </Dropdown>
                    </div>
                </nav>
            </Header>)
    };

    return (
        <Layout className="layout">
            {toolbar}
        </Layout>
    )
};

const mapStateToProps = state => {

    return {
        auth: state.auth.authorization,
        role: state.auth.role,
        user: state.user.user,
        loginstate: state.user.userLoginState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.authLogout()),
        getuser: (username) => dispatch(userActions.userGet(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);