import React from 'react';
import { connect } from 'react-redux';

import classes from './DrawerButton.module.css'
import * as authActions from '../../../store/action/code';

import {Button} from 'antd';



const drawButton = (props) => {

    let button=(
        <Button icon={props.icon} className={classes.button} href={props.to} style={{fontWeight:"bolder"}} onClick={props.editHome}>{props.title}</Button>
    )
    if(props.edit==="algorithm"){
        button =(
            <Button icon={props.icon} className={classes.button} href={props.to} style={{fontWeight:"bolder"}} onClick={props.editAlgorithm}>{props.title}</Button>
        ) 
    }

    if(props.edit==="benchmark"){
        button =(
            <Button icon={props.icon} className={classes.button} href={props.to} style={{fontWeight:"bolder"}} onClick={props.editBenchmark}>{props.title}</Button>
        ) 
    }
    

    return (
        <React.Fragment>
            <div className={classes.drawerBody}>
                {button}
            </div>
        </React.Fragment>

    );
};

const mapDispatchToProps = dispatch => {
    return {
        editAlgorithm: () => dispatch(authActions.algorithmEdit()),
        editHome:() => dispatch(authActions.homeEdit()),
        editBenchmark:() => dispatch(authActions.benchmarkEdit()),
    }
}

export default connect(null,mapDispatchToProps)(drawButton);
