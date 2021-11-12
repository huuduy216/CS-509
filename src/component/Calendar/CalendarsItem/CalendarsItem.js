import React from 'react';
import { connect } from 'react-redux';

import { Spin } from 'antd';

import classes from './CalendarsItem.module.css';
import Week from './Week/Week';
import Time from './Time/Time'
import CreateTimesheet from './CreateTimesheet/CreateTimesheet';
import TotalBar from './Time/TotalBar';
import EditAddProject from './Time/EditAddProject/EditAddProject';

const CalendarsItem = (props) => {

    //separate total and saved project
    const { "Total(/day)": total, ...saveTemp } = { ...props.show };
    //set show Timesheet
    let showTimesheet = null;
    //set createTimesheet
    let createTimesheet = <p className={classes.noRecord}>NO RECORD</p>;
    if (props.create) {
        createTimesheet = (<CreateTimesheet projectInfo={props.projectInfo} />);
    } else {
        createTimesheet = <p className={classes.noRecord}>NO RECORD</p>;
    }
    if (props.loading) {
        showTimesheet = (
            <div className={classes.loading}>
                <Week />
                <Spin size="large" style={{ marginTop: "10%" }} />
            </div>
        );
    } else {
        // Object.keys(props.show).length !== 0 && Object.keys(props.weekdate).length !== 0 &&
        if ( props.edit) {
            showTimesheet = (
                <div className={classes.background}>
                    <Week />
                    {Object.keys(saveTemp).map((key) =>
                    (
                        <Time key={key} title={key} show={props.show[key]} projectInfo={props.projectInfo} isProject={key === 'Total(/day)' ? false : true} />
                    )
                    )}
                    <EditAddProject projectInfo={props.projectInfo} />
                    <TotalBar />
                </div>);
        } else {
            showTimesheet = (
                <div className={classes.emptyBacground}>
                    <Week />
                    {createTimesheet}
                </div>
            );
        }
    }


    return (
        <React.Fragment>
            {showTimesheet}
        </React.Fragment>

    );
};

const mapStateToProps = state => {

    return {
        show: state.timesheet.show,
        weekdate: state.timesheet.weekDate,
        loading: state.timesheet.loading,
        create: state.timesheet.create,
        edit: state.timesheet.edit
    };
}


export default connect(mapStateToProps, null)(CalendarsItem);