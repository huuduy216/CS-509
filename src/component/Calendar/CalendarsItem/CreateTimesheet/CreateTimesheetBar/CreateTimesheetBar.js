import React from 'react';
import { connect } from 'react-redux';

import { Select, Button, Popconfirm } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import classes from './CreateTimesheetBar.module.css';
import InputProjectTime from '../../Time/InputProjectTime';
import * as timeSheetActions from '../../../../../store/action/timesheet';

const { Option } = Select;

const CreateTimesheetBar = (props) => {


    const show = {
        su: 0,
        mo: 0,
        tu: 0,
        we: 0,
        th: 0,
        fr: 0,
        sa: 0
    };


    let createTimesheetTemp = {};
    let timesheetProjectTemp = [];
    let projectRestTemp = [];
    let selectProjectTemp = [];
    let DisableInputNumber = {};

    //Util update Project from TimesheetProject
    const UpdateItemFromTimesheetProject = (newProject, oldProject, projectArray) => {
        for (let i = 0; i <= projectArray.length; i++) {
            if (projectArray[i] === oldProject) {
                projectArray.splice(i, 1, newProject);
            }
        }
    }
    //select 
    const handleSelectOption = (value) => {
        //disable input
        DisableInputNumber = { ...props.disableInputNumber };
        delete DisableInputNumber[props.projectName];
        DisableInputNumber[value] = false;
        props.SetdisableInputNumber(DisableInputNumber);
        //enable add button
        props.SetDisableAddButton(false);
        //update timesheetProject/projectRest
        timesheetProjectTemp = [...props.timesheetProject];
        projectRestTemp = [...props.projectRest];
        UpdateItemFromTimesheetProject(value, props.projectName, timesheetProjectTemp);
        UpdateItemFromTimesheetProject(props.projectName, value, projectRestTemp);
        props.SetTimesheetProject(timesheetProjectTemp);
        props.SetProjectRest(projectRestTemp);
        //update select project
        selectProjectTemp = [...props.selectProject];
        selectProjectTemp.splice(selectProjectTemp.indexOf(value), 1);
        if (!props.disableInputNumber[props.projectName]) {
            selectProjectTemp.push(props.projectName);
        }
        props.SetSelectProject(selectProjectTemp);
        //set createTimesheet
        createTimesheetTemp = { ...props.createTimesheet };
        if (!props.disableInputNumber[props.projectName]) {
            delete createTimesheetTemp[props.projectName];
        }
        createTimesheetTemp[value] = show;
        props.createTimeSheet(createTimesheetTemp);
        //set save button
        props.saveButtonDisable(false);
    }

    //cancel button
    const handleClickCancelButton = () => {
        createTimesheetTemp = { ...props.createTimesheet };
        // turn value back to display repo and clear data
        props.handleClickCancel(props.projectName);
    }

    return (
        <React.Fragment>
            <div className={classes.background}>
                <Select
                    value={props.disableInputNumber[props.projectName] ? null : props.projectName}
                    onChange={handleSelectOption}
                    size="large"
                    className={classes.select}
                    placeholder="Select a project">
                    {props.selectProject.map((item) => (
                        <Option key={item} value={item}>
                            {item}
                        </Option>
                    ))
                    }
                </Select>
                <InputProjectTime title={"su"} disableInputNumber={props.disableInputNumber[props.projectName]} createTimesheet={props.createTimesheet} SetCreateTimesheet={props.SetCreateTimesheet} projectName={props.projectName} />
                <InputProjectTime title={"mo"} disableInputNumber={props.disableInputNumber[props.projectName]} createTimesheet={props.createTimesheet} SetCreateTimesheet={props.SetCreateTimesheet} projectName={props.projectName} />
                <InputProjectTime title={"tu"} disableInputNumber={props.disableInputNumber[props.projectName]} createTimesheet={props.createTimesheet} SetCreateTimesheet={props.SetCreateTimesheet} projectName={props.projectName} />
                <InputProjectTime title={"we"} disableInputNumber={props.disableInputNumber[props.projectName]} createTimesheet={props.createTimesheet} SetCreateTimesheet={props.SetCreateTimesheet} projectName={props.projectName} />
                <InputProjectTime title={"th"} disableInputNumber={props.disableInputNumber[props.projectName]} createTimesheet={props.createTimesheet} SetCreateTimesheet={props.SetCreateTimesheet} projectName={props.projectName} />
                <InputProjectTime title={"fr"} disableInputNumber={props.disableInputNumber[props.projectName]} createTimesheet={props.createTimesheet} SetCreateTimesheet={props.SetCreateTimesheet} projectName={props.projectName} />
                <InputProjectTime title={"sa"} disableInputNumber={props.disableInputNumber[props.projectName]} createTimesheet={props.createTimesheet} SetCreateTimesheet={props.SetCreateTimesheet} projectName={props.projectName} />
                <div className={classes.choice} >
                    <Popconfirm
                        title="Are you sure to delete this timesheet?"
                        onConfirm={handleClickCancelButton}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            style={{ width: "100%", height: "100%", color: "red" }}
                            icon={<CloseOutlined />}
                        />
                    </Popconfirm>

                </div>
            </div>
        </React.Fragment>

    );
};
const mapStateToProps = state => {
    return {
        createTimesheet: state.timesheet.timesheet
    };
}


const mapDispatchToProps = dispatch => {
    return {
        createTimeSheet:(timesheet)=>dispatch(timeSheetActions.createTimeSheet(timesheet)),
        saveButtonDisable:(saveButton)=>dispatch(timeSheetActions.SetSaveButton(saveButton)),
        createButtonDisable:(createButton)=>dispatch(timeSheetActions.SetCreateButton(createButton))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateTimesheetBar);


