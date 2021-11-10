import React from 'react';
import { connect } from 'react-redux';

// import axios from '../../axios/axios-local';
import classes from './Code.module.css';

import Algorithm from './Algorithm/Algorithm';
import AlgorithmRead from './Algorithm/AlgorithmRead';

const Code = (props) => {

    let role = localStorage.getItem("role");
    let CodeBody = (
        <div className={classes.background}>
            <Algorithm/>
        </div>);
  
    if (role === null) {
        CodeBody = (
            <div className={classes.background}>
                <AlgorithmRead/>
            </div>);
    }

    if (role === "user" || role === "admin") {
        CodeBody = (
            <div className={classes.background}>
                <Algorithm/>
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
