import React from 'react';
import { connect } from 'react-redux';

import { Select, Button, Popconfirm } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import classes from './EditAddProjectBar.module.css';
import InputProjectTime from '../../../Time/InputProjectTime';
import * as timeSheetActions from '../../../../../../store/action/timesheet';

const { Option } = Select;

const EditAddProjectBar = (props) => {

    const show = {
        su: 0,
        mo: 0,
        tu: 0,
        we: 0,
        th: 0,
        fr: 0,
        sa: 0
    };

    //Util update Project from TimesheetProject
    const UpdateItemFromTimesheetProject = (newProject, oldProject, projectArray, select, create) => {
        for (let i = 0; i <= projectArray.length; i++) {
            if (projectArray[i] === oldProject) {
                if (create) {
                    projectArray.splice(i, 1, newProject);
                }
                if (select) {
                    if (props.disableAddButton) {
                        projectArray.splice(i, 1);

                    } else {
                        projectArray.splice(i, 1, newProject);

                    }
                }
            }
        }
    }

    const handleSelectOption = (value) => {
        //disable input
        let DisableInputNumber = {};
        DisableInputNumber = { ...props.disableInputNumber };
        delete DisableInputNumber[props.projectName];
        DisableInputNumber[value] = false;
        props.SetdisableInputNumber(DisableInputNumber);
        //update timesheetProject/projectRest
        let createTimesheetProjectTemp = [];
        let editSelectProjectTemp = [];
        createTimesheetProjectTemp = [...props.createTimesheetProject];
        editSelectProjectTemp = [...props.editSelectProject];
        UpdateItemFromTimesheetProject(value, props.projectName, createTimesheetProjectTemp,false,true);
        UpdateItemFromTimesheetProject(props.projectName, value, editSelectProjectTemp,true,false);
        props.SetCreateTimesheetProject(createTimesheetProjectTemp);
        props.SetEditSelectProject(editSelectProjectTemp);
        //set createTimesheet
        let editCreateTimesheetTemp={};
        editCreateTimesheetTemp = { ...props.editTimesheet };
        if (!props.disableInputNumber[props.projectName]) {
            delete editCreateTimesheetTemp[props.projectName];
        }
        editCreateTimesheetTemp[value] = show;
        props.editCreateTimesheet(editCreateTimesheetTemp);
        //set save button
        props.saveButtonDisable(false);
    }

    const handleClickCancelButton=()=>{
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
                <InputProjectTime title={"su"} editCreateStatus={true} disableInputNumber={props.disableInputNumber[props.projectName]} projectName={props.projectName}/>
                <InputProjectTime title={"mo"} editCreateStatus={true} disableInputNumber={props.disableInputNumber[props.projectName]} projectName={props.projectName}/>
                <InputProjectTime title={"tu"} editCreateStatus={true} disableInputNumber={props.disableInputNumber[props.projectName]} projectName={props.projectName}/>
                <InputProjectTime title={"we"} editCreateStatus={true} disableInputNumber={props.disableInputNumber[props.projectName]} projectName={props.projectName}/>
                <InputProjectTime title={"th"} editCreateStatus={true} disableInputNumber={props.disableInputNumber[props.projectName]} projectName={props.projectName}/>
                <InputProjectTime title={"fr"} editCreateStatus={true} disableInputNumber={props.disableInputNumber[props.projectName]} projectName={props.projectName}/>
                <InputProjectTime title={"sa"} editCreateStatus={true} disableInputNumber={props.disableInputNumber[props.projectName]} projectName={props.projectName}/>
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
        show: state.timesheet.show,
        editTimesheet:state.timesheet.editCreateTimesheet
    };
}

const mapDispatchToProps = dispatch => {
    return {
        editCreateTimesheet:(editedCreateTimesheet)=>dispatch(timeSheetActions.editCreateTimesheet(editedCreateTimesheet)),
        saveButtonDisable:(saveButton)=>dispatch(timeSheetActions.SetSaveButton(saveButton)),
        createButtonDisable:(createButton)=>dispatch(timeSheetActions.SetCreateButton(createButton))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditAddProjectBar);

