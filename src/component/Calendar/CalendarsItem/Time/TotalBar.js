import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import classes from './TotalBar.module.css';
import TotalTime from './TotalTime';

const TotalBar = (props) => {

    const [totalEditTime, SetTotalEditTime] = useState({
        "su": 0,
        "mo": 0,
        "tu": 0,
        "we": 0,
        "th": 0,
        "fr": 0,
        "sa": 0
    });
    const [totalShowTime, SetTotalShowTime] = useState({
        "su": 0,
        "mo": 0,
        "tu": 0,
        "we": 0,
        "th": 0,
        "fr": 0,
        "sa": 0
    });
    const [totalTime, SetTotalTime] = useState({
        "su": 0,
        "mo": 0,
        "tu": 0,
        "we": 0,
        "th": 0,
        "fr": 0,
        "sa": 0
    });


    useEffect(() => {
        if (Object.keys(props.editCreateTimesheet).length !== 0) {
            let editTotal = {
                "su": 0,
                "mo": 0,
                "tu": 0,
                "we": 0,
                "th": 0,
                "fr": 0,
                "sa": 0
            };
            Object.keys(props.editCreateTimesheet).map((projectkey) => (
                Object.keys(editTotal).map((weekkey) => (
                    editTotal[weekkey] += props.editCreateTimesheet[projectkey][weekkey]
                ))
            ));
            SetTotalEditTime(editTotal);
        }
    }, [props.editCreateTimesheet])

    useEffect(() => {
        let editShow = {
            "su": 0,
            "mo": 0,
            "tu": 0,
            "we": 0,
            "th": 0,
            "fr": 0,
            "sa": 0
        };
        Object.keys(props.show).map((projectkey) => (
            Object.keys(editShow).map((weekkey) => (
                editShow[weekkey] += props.show[projectkey][weekkey]
            ))
        ));
        SetTotalShowTime(editShow);

    }, [props.show])

    useEffect(() => {
        let editTime = {
            "su": 0,
            "mo": 0,
            "tu": 0,
            "we": 0,
            "th": 0,
            "fr": 0,
            "sa": 0
        };
        Object.keys(editTime).map((weekkey) => (
            editTime[weekkey] += totalEditTime[weekkey]+totalShowTime[weekkey]
        ))
        SetTotalTime(editTime);
    }, [totalEditTime,totalShowTime])


    let dividing = null;
    let project = null;
    let timeNumber = null;

    dividing = (<div className={classes.dividing} />);
    project = (
        <React.Fragment>
            <div className={classes.total}>{"Total(/day)"}</div>
        </React.Fragment>
    );
    timeNumber = (
        <React.Fragment>
            <div className={classes.background}> 
            <div className={classes.totalNumber}>{totalTime["su"]}</div>
            <div className={classes.totalNumber}>{totalTime["mo"]}</div>
            <div className={classes.totalNumber}>{totalTime["tu"]}</div>
            <div className={classes.totalNumber}>{totalTime["we"]}</div>
            <div className={classes.totalNumber}>{totalTime["th"]}</div>
            <div className={classes.totalNumber}>{totalTime["fr"]}</div>
            <div className={classes.totalNumber}>{totalTime["sa"]}</div>
            <div className={classes.choiceNoUse}/>
            </div>
        </React.Fragment>
    );

    if (Object.keys(props.editCreateTimesheet).length !== 0) {

    }

    return (
        <React.Fragment>
            {dividing}
            <div className={classes.background}>
                {project}
                {timeNumber}
            </div>
            <div className={classes.totalResult}>
                <TotalTime show={totalTime}/>
            </div>
        </React.Fragment>

    );
};
const mapStateToProps = state => {
    return {
        show: state.timesheet.show,
        editCreateTimesheet: state.timesheet.editCreateTimesheet
    };
}



export default connect(mapStateToProps, null)(TotalBar);


