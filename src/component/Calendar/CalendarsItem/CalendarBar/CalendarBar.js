import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { DatePicker, Button } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import moment from 'moment';

import classes from './CalendarBar.module.css';
import * as timeSheetActions from '../../../../store/action/timesheet'

const { WeekPicker } = DatePicker;

const CalenderBar = (props) => {

    let startDate = "";
    let endDate = "";
    const [date, setDate] = useState({});
    const [showDate, setShowDate] = useState('YYYY/MM/DD');

    const [disableInsertButton, setDisableInsertButton] = useState(true);
    const [disableSaveButton, setDisableSaveButton] = useState(true);

 

    useEffect(() => {
        if (Object.keys(props.weekdate).length === 0 || props.loading) {
            setDisableInsertButton(true);
            setDisableSaveButton(true);

        }
        if (Object.keys(props.weekdate).length !== 0 && !props.loading) {
            if (Object.keys(props.show).length === 0) {
        
                if(props.createDisable){
                    setDisableInsertButton(true);
                }else{
                    setDisableInsertButton(false);
                }
                if(props.saveDisable){
                    setDisableSaveButton(true);
                }else{
                    setDisableSaveButton(false);
                }
            }
            else {
    
                if(props.createDisable){
                    setDisableInsertButton(true);
                }else{
                    setDisableInsertButton(false);
                }
                if(props.saveDisable){
                    setDisableSaveButton(true);
                }else{
                    setDisableSaveButton(false);
                }
            }


        }

    }, [props.show, props.weekdate, props.loading, props.saveDisable, props.createDisable])


    //change week
    const handleWeekChange = weekData => {
        //pack week
        let week = [];
        if (moment(weekData).isValid()) {
            for (let i = 0; i < 7; i++) {
                week[i] = moment(weekData).day(i).format('MM/DD');
            };
            props.ChangeWeekDate(week);
            // console.log(moment(weekData).week(),moment(weekData).year())
            //display week
            startDate = moment(weekData).day(0).format('YYYY/MM/DD');//Monday
            endDate = moment(weekData).day(6).format('YYYY/MM/DD');//Sunday

            setShowDate(startDate + "——" + endDate);
            setDate({ start: startDate, end: endDate });
            props.ShowTimesheet(startDate);
        } else {
            props.ChangeWeekDate([]);
            setShowDate("YYYY/MM/DD——YYYY/MM/DD");
            setDate({});
            week = [];
            startDate = "";
            endDate = "";
        }

    }

    const handleClickCreateButton = () => {
        props.createTimesheetStart();
        props.createButtonDisable(true);
    }


    //save Timesheet
    const handleClickSaveButton = () => {
        let saveResult = {};
        if (props.create) {
            console.log(props.timesheet);
            props.createSubmitTimesheet(props.timesheet, date.start, date.end);
        } else {
            const { "Total(/day)": total, ...saveTemp } = { ...props.show };
            Object.keys(saveTemp).map((key) => (
                saveTemp[key].username = localStorage["timesheetUsername"]
            ))
            saveTemp.Info = { ...date, username: localStorage["timesheetUsername"] };
            if (Object.keys(props.editTimesheet).length !== 0) {
                let createEditTimesheet = {};
                createEditTimesheet = { ...props.editTimesheet };
                createEditTimesheet.startDate = date.start;
                createEditTimesheet.endDate = date.end;
                createEditTimesheet.username = localStorage["timesheetUsername"]
                saveResult = { ...saveTemp, CreateEditTimesheet: createEditTimesheet };
            } else {
                saveResult = { ...saveTemp };
            }

            props.saveTimesheet(saveResult, date.start);
        }
    }

    return (
        <React.Fragment>
            <p className={classes.p}>{showDate}</p>
            <div className={classes.body}>
                <Button icon={<SaveOutlined />} className={classes.saveButton} type="primary" size="small" onClick={handleClickSaveButton} disabled={disableSaveButton}>SAVE</Button>
                <Button icon={<PlusOutlined />} className={classes.addButton} type="primary" size="small" onClick={handleClickCreateButton} disabled={disableInsertButton}>CREATE</Button>
                <WeekPicker className={classes.datePicker} onChange={handleWeekChange} />
            </div>

        </React.Fragment>


    );
};

const mapStateToProps = state => {

    return {
        weekdate: state.timesheet.weekDate,
        timesheet: state.timesheet.timesheet,
        show: state.timesheet.show,
        loading: state.timesheet.loading,
        createDisable:state.timesheet.createDisable,
        saveDisable: state.timesheet.saveDisable,
        create: state.timesheet.create,
        editTimesheet: state.timesheet.editCreateTimesheet
        
    };
}

const mapDispatchToProps = dispatch => {
    return {
        ChangeWeekDate: (weekdate) => dispatch(timeSheetActions.getWeekdate(weekdate)),
        ShowTimesheet: (startDate) => dispatch(timeSheetActions.showTimesheet(startDate)),
        ShowTimeSheetLoading: () => dispatch(timeSheetActions.showTimesheetLoading()),
        createTimesheetStart: () => dispatch(timeSheetActions.createTimesheetStart()),
        createSubmitTimesheet: (createtimesheet, startDate, endDate) => dispatch(timeSheetActions.createSubmitTimesheet(createtimesheet, startDate, endDate)),
        saveTimesheet: (savedTimesheet, startdate) => dispatch(timeSheetActions.saveTimesheet(savedTimesheet, startdate)),
        saveButtonDisable:(saveButton)=>dispatch(timeSheetActions.SetSaveButton(saveButton)),
        createButtonDisable:(createButton)=>dispatch(timeSheetActions.SetCreateButton(createButton))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CalenderBar);