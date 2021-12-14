import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';



import 'antd/dist/antd.css';
import { Layout, Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import classes from './Toolbar.module.css';
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

    let logout = (
        <Menu.Item>
            <NavLink to='/' onClick={handleClickLogout} style={{textAlign:"center",fontWeight:"bold"}}>
                Logout
            </NavLink>
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

    const handleMenuClick = () => {

    }

    
    let notificationMenu =(
        <Menu onClick={handleMenuClick} style={{ backgroundColor: "white", borderTop: " 4px solid  #000000" }}>
            <Menu.Item key="1" style={{ fontWeight: "bold", height: "40px", lineHeight: "30px" }}>
                <NavLink to="/employee">Edit Structure</NavLink>
            </Menu.Item>
            <Menu.Item key="2" style={{ fontWeight: "bold", height: "40px", lineHeight: "30px" }}>
                <NavLink to="/content">Edit Content</NavLink>
            </Menu.Item>
            </Menu>
    );
    if( props.role==="admin"){
     notificationMenu = (
        <Menu onClick={handleMenuClick} style={{ backgroundColor: "white", borderTop: " 4px solid  #000000" }}>
            <Menu.Item key="1" style={{ fontWeight: "bold", height: "40px", lineHeight: "30px" }}>
                <NavLink to="/employee">Edit Structure</NavLink>
            </Menu.Item>
            <Menu.Item key="2" style={{ fontWeight: "bold", height: "40px", lineHeight: "30px" }}>
                <NavLink to="/content">Edit Content</NavLink>
            </Menu.Item>
            <Menu.Item key="3" style={{ fontWeight: "bold", height: "40px", lineHeight: "30px" }}>
                <NavLink to="/users">Users</NavLink>
            </Menu.Item>
        </Menu>
    );}
    ///////////////logo
    let logo = (<NavLink to="/" className={classes.logo}></NavLink>);
    if (props.role === "admin" || props.role === "user") {
        logo = (<NavLink to="/" className={classes.logo}></NavLink>);
    }
    ///////////////toolbar     
    let toolbar = (
        <Header className={classes.header}>
            {logo}
            <nav className={classes.des}>
                <Login link="/login" exact >SIGN IN </Login>
                <Register link="/register" exact >SIGN UP </Register>
            </nav>
        </Header>
    );
    ///////////////registered user
    if (localStorage['timesheetisAuthenticated']) {
        toolbar = (
            <Header className={classes.header}>
                <NavLink to="/userhome" className={classes.logo}></NavLink>
                <Dropdown overlay={notificationMenu} trigger={["click"]}>
                    <Button type='ghost' style={{ height: "80%", border: "none", marginLeft: "2px", fontWeight: "600", fontSize: "12pt", fontStyle: "Fantasy" }}>
                        Edit Mode<DownOutlined />
                    </Button>
                </Dropdown>

                <nav className={classes.des}>
                    <Login link="/login" exact displayLogin={"none"}>LOGIN </Login>
                    <div className={classes.loginButton}>
                        <Dropdown overlay={menu} placement="bottomCenter" trigger="click">
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
        loginstate: state.user.userLoginState,
        userlogout: state.auth.logout,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.authLogoutNew()),
        getuser: (username) => dispatch(userActions.userGet(username)),
        loadingtime: (time) => dispatch(authActions.setLoadingTime(time)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);