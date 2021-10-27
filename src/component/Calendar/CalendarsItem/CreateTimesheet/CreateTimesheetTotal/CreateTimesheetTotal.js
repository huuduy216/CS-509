import React from 'react';
import { connect } from 'react-redux';

import classes from './CreateTimesheetTotal.module.css';

const CreateTimesheetTotal = (props) => {

    let total = {
        su: 0,
        mo: 0,
        tu: 0,
        we: 0,
        th: 0,
        fr: 0,
        sa: 0
    };

    let Total = 0;

    if (Object.keys(props.timesheet).length !== 0) {
        Object.keys(props.timesheet).map((key) => (
            Object.keys(total).map((totalkey) => (
                total[totalkey] += props.timesheet[key][totalkey]
            ))
        ));
    }

    Object.keys(total).map((totalkey) => (
        Total += total[totalkey]
    ))

    return (
        <React.Fragment>
            <div className={classes.dividing}></div>
            <div className={classes.background}>
                <div className={classes.total}>Total(/day)</div>
                <div className={classes.totalNumber}>{total.su}</div>
                <div className={classes.totalNumber}>{total.mo}</div>
                <div className={classes.totalNumber}>{total.tu}</div>
                <div className={classes.totalNumber}>{total.we}</div>
                <div className={classes.totalNumber}>{total.th}</div>
                <div className={classes.totalNumber}>{total.fr}</div>
                <div className={classes.totalNumber}>{total.sa}</div>
                <div className={classes.choiceNoUse} />
            </div>
            <div className={classes.Totalbackground}>
                <div className={classes.number}>{Total + " Hours"}</div>
                <div className={classes.Totalbody}>Total(/week):</div>
            </div>
        </React.Fragment>

    );
};

const mapStateToProps = state => {
    return {
        timesheet: state.timesheet.timesheet
    };
}

export default connect(mapStateToProps, null)(CreateTimesheetTotal);




