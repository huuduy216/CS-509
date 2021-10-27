import React from 'react';
import { connect } from 'react-redux';

import { InputNumber } from 'antd';

import classes from './InputProjectTime.module.css';
import * as timeSheetActions from '../../../../store/action/timesheet';

const InputProjectTime = (props) => {

    //in edit mode
    let inputTimeTemp = {};
    const handChangeTime = (value) => {
        if (value === "" || value === null) {
            value = 0;
        }
        inputTimeTemp = { ...props.showTimesheetTime };
        inputTimeTemp[props.projectTitle][props.title] = value;
        props.editedTimesheet(inputTimeTemp);
        inputTimeTemp = {};
    }

    //in create mode
    const handleCreateTime = (value) => {
        let timesheetcreateTemp = {};
        if (props.createStatus === true) {
            timesheetcreateTemp = { ...props.createTimesheet };
            timesheetcreateTemp[props.projectName][props.title] = value;
            props.createTimeSheet(timesheetcreateTemp);
        }
        if(props.editCreateStatus===true){
            timesheetcreateTemp={...props.editTimesheet};
            timesheetcreateTemp[props.projectName][props.title] = value;
            props.editCreateTimesheet(timesheetcreateTemp);
        }

    }

    let inputnumber = null;

    if (props.createStatus || props.editCreateStatus) {
        inputnumber = (
            <InputNumber maxLength="2" disabled={props.disableInputNumber}
                parser={value => value.replace(/[^\d]|0[\s\S]|[3-9][\s\S]|[2][5-9]|[\s\S][^\d]/, '0')}
                className={classes.inputNumber} defaultValue="0"
                min="0"
                max="24"
                onChange={handleCreateTime}
            />
        )
    } else {
        inputnumber = (
            <InputNumber maxLength="2" disabled={props.disableInputNumber}
                parser={value => value.replace(/[^\d]|0[\s\S]|[3-9][\s\S]|[2][5-9]|[\s\S][^\d]/, '0')}
                className={classes.inputNumber} defaultValue={props.show[props.title]}
                min="0"
                max="24"
                onChange={handChangeTime}
            />
        );
    }



    return (
        <React.Fragment>
            {inputnumber}
        </React.Fragment>

    );
};


const mapStateToProps = state => {
    return {
        showTimesheetTime: state.timesheet.show,
        createStatus: state.timesheet.create,
        editTimesheet:state.timesheet.editCreateTimesheet
    };
}


const mapDispatchToProps = dispatch => {
    return {
        editedTimesheet: (editedTimesheet) => dispatch(timeSheetActions.editTimesheet(editedTimesheet)),
        createTimeSheet: (timesheet) => dispatch(timeSheetActions.createTimeSheet(timesheet)),
        editCreateTimesheet:(editedCreateTimesheet)=>dispatch(timeSheetActions.editCreateTimesheet(editedCreateTimesheet))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InputProjectTime);

