import React from 'react';
import { connect } from 'react-redux';

// import axios from '../../axios/axios-local';
import classes from './Code.module.css';

import Algorithm from './Algorithm/Algorithm';
import AlgorithmRead from './Algorithm/AlgorithmRead';
import { Layout } from 'antd';


const { Content } = Layout;

const Code = (props) => {

    let role = localStorage.getItem("role");
    let CodeBody = (
        <div className={classes.background}>
            <Algorithm spaceTreeData={props.spaceTreeData}/>
        </div>);

    if (role === null) {
        CodeBody = (
            <Layout className={classes.layout}>
                <Content className={classes.site_layout}>
                    <AlgorithmRead spaceTreeData={props.spaceTreeData}/>
                </Content>
            </Layout>
        );
    }

    if (role === "user" || role === "admin") {
        CodeBody = (
            <div className={classes.background}>
                <Algorithm spaceTreeData={props.spaceTreeData}/>
            </div>);
    }
    return (
        <React.Fragment>
            {CodeBody}
        </React.Fragment>

    );
};

const mapStateToProps = state => {

    return {
        edit: state.code.edit,
        role: state.auth.role

    };
}
export default connect(mapStateToProps, null)(Code);
