import React from 'react';

import classes from './TotalTime.module.css';



const TotalTime = (props) => {

    let total = 0;
    total = props.show["su"] + props.show["mo"] + props.show["tu"] + props.show["we"] + props.show["th"] + props.show["fr"] + props.show["sa"];
    return (
        <React.Fragment>
            <div className={classes.background}>
                <div className={classes.number}>{total + " Hours"}</div>
                <div className={classes.body}>Total(/week):</div>
            </div>
        </React.Fragment>

    );
};

export default TotalTime;
