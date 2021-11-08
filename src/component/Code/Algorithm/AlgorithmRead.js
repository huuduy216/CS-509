import React, { useState, useEffect } from 'react';

import classes from './AlgorithmRead.module.css';
import { Button } from 'antd';




let Editbutton = (
    <div className={classes.headerRest}>
        <Button type="primary" className={classes.EditButton} size="large">Upload Benchmarks</Button>
    </div>
);

const AlgorithmRead = (props) => {

    return (
        <React.Fragment>
            <div className={classes.header}>
                <p className={classes.p}>Algorithm</p>
                {Editbutton}
            </div>
           
        </React.Fragment>

    );
};

export default AlgorithmRead;