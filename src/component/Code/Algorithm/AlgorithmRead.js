import React, { useState } from 'react';

import classes from './AlgorithmRead.module.css';
import { Button } from 'antd';

import TreeDemo from '../TreeDemo/tree/tree'
import * as treeData from '../treeData';
let Editbutton = (
    <div className={classes.headerRest}>
        <Button type="primary" className={classes.EditButton} size="large">Upload Benchmarks</Button>
    </div>
);

let UserButton = (
    <div className={classes.headerRest}>
        <Button className={classes.userButton} type="primary" size="large">Save</Button>
        <Button className={classes.userButton} type="primary" size="large">Load</Button>
    </div>
);

function callback(key) {
    console.log(key);
}





const AlgorithmRead = (props) => {



    return (
        <React.Fragment>
            {/* <div className={classes.header}>
                <p className={classes.p}>Top Class</p> */}
            <div className={classes.body}>
            </div>

        </React.Fragment>

    );
};

export default AlgorithmRead;