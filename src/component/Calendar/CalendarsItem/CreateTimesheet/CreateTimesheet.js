import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import classes from './CreateTimesheet.module.css';
import CreateTimesheetBar from './CreateTimesheetBar/CreateTimesheetBar';
import CreateTimesheetTotal from './CreateTimesheetTotal/CreateTimesheetTotal';
import * as timeSheetActions from '../../../../store/action/timesheet';


const Timetoolbar = (props) => {

    //set createTimesheet
    // const [createTimesheet, SetCreateTimesheet] = useState({});
    //set Project index \rest index\select
    const [timesheetProject, SetTimesheetProject] = useState([]);
    const [projectRest, SetProjectRest] = useState([]);
    const [selectProject, SetSelectProject] = useState([]);
    //disable add button
    const [disableAddButton, SetDisableAddButton] = useState(true);

    //disable inputnumber
    const [disableInputNumber, SetdisableInputNumber] = useState({});

    let deleteProject = [];
    let timesheetProjectTemp = [];
    let projectRestTemp = [];
    let DisableInputNumber = {};
    let createTimesheetTemp = {};


    useEffect(() => {
        let ProjectRestTemp = [];
        let SelectProjectTemp = [];
        let DisableInputNumberTemp = {};
        for (let i = 0; i < Object.keys(props.projectInfo).length; i++) {

            if (i === 0) {
                SetTimesheetProject([props.projectInfo[i]["name"]])
                DisableInputNumberTemp[props.projectInfo[i]["name"]] = true;
            } else {
                ProjectRestTemp.push(props.projectInfo[i]["name"]);
            }
            SelectProjectTemp.push(props.projectInfo[i]["name"]);
        }
        SetProjectRest(ProjectRestTemp);
        SetSelectProject(SelectProjectTemp);
        SetdisableInputNumber(DisableInputNumberTemp);
    }, [props.projectInfo])

    //set disable AddButton
    useEffect(() => {
        let flag = false;
        Object.keys(disableInputNumber).map((key) => (
            flag = disableInputNumber[key] || flag
        ))
        SetDisableAddButton(flag);
    }, [disableInputNumber])

    const handleClickAddButton = () => {
        //set projectRest or timesheetProject
        projectRestTemp = [...projectRest];
        deleteProject = projectRestTemp.splice(0, 1);
        SetProjectRest(projectRestTemp);
        timesheetProjectTemp = [...timesheetProject];
        timesheetProjectTemp.push(...deleteProject);
        SetTimesheetProject(timesheetProjectTemp);
        //disable inputnumber
        DisableInputNumber = { ...disableInputNumber };
        DisableInputNumber[deleteProject] = true;
        SetdisableInputNumber(DisableInputNumber);
        //disable addButton
        SetDisableAddButton(true);
        DisableInputNumber = {};
        projectRestTemp = [];
        timesheetProjectTemp = [];
        //disable saveButton
        props.saveButtonDisable(true);
    }
    //click cancel button
    const handleClickCancel = (projectName) => {
        //set timesheetProject and projectRest
        timesheetProjectTemp = [...timesheetProject];
        for (let i = 0; i < timesheetProjectTemp.length; i++) {
            if (timesheetProjectTemp[i] === projectName) {
                timesheetProjectTemp.splice(i, 1);
            }
        }
        projectRestTemp = [...projectRest];
        projectRestTemp.push(projectName);
        SetProjectRest(projectRestTemp);
        SetTimesheetProject(timesheetProjectTemp);
        //set Select Project
        if (!disableInputNumber[projectName]) {
            let selectProjectTemp = [...selectProject];
            selectProjectTemp.push(projectName);
            SetSelectProject(selectProjectTemp);
        }
        //disable inputNumber and add Button
        DisableInputNumber = { ...disableInputNumber };
        delete DisableInputNumber[projectName];
        SetdisableInputNumber(DisableInputNumber);
        SetDisableAddButton(false);
        //delete createTimesheet
        createTimesheetTemp = { ...props.timesheet };
        delete createTimesheetTemp[projectName];
        props.createTimeSheet(createTimesheetTemp);
        //enable saveButton
        if (!disableAddButton && timesheetProject.length !== 1) {
            props.saveButtonDisable(false);
        }
        if (timesheetProject.length === 1) {
            props.saveButtonDisable(true);
        }
    }

    return (
        <React.Fragment>
            {
                timesheetProject.map((item) => {

                    return <CreateTimesheetBar
                        projectInfo={props.projectInfo}
                        key={item}
                        handleClickCancel={handleClickCancel}
                        projectName={item}
                        //project index/rest index/select
                        timesheetProject={timesheetProject}
                        SetTimesheetProject={SetTimesheetProject}
                        projectRest={projectRest}
                        SetProjectRest={SetProjectRest}
                        selectProject={selectProject}
                        SetSelectProject={SetSelectProject}
                        //disable inputNumber and addButton
                        disableInputNumber={disableInputNumber}
                        SetdisableInputNumber={SetdisableInputNumber}
                        SetDisableAddButton={SetDisableAddButton}
                    />
                })
            }
            {/* <CreateTimesheetBar projectInfo={props.projectInfo} /> */}
            <div className={classes.buttonBackground}>
                <Button
                    disabled={disableAddButton}
                    className={classes.addButton}
                    icon={<PlusOutlined />}
                    onClick={handleClickAddButton}
                    style={{ height: "100%", border: "1px #90a4ae solid", display: projectRest.length === 0 ? "none" : "flex", alignItems: "center", justifyContent: "center" }}
                />
            </div>
            <CreateTimesheetTotal/>
        </React.Fragment>

    );
};


const mapStateToProps = state => {
    return {
        timesheet: state.timesheet.timesheet,
        saveTimesheet: state.timesheet.saveDisable
    };
}


const mapDispatchToProps = dispatch => {
    return {
        createTimeSheet:(timesheet)=>dispatch(timeSheetActions.createTimeSheet(timesheet)),
        saveButtonDisable:(saveButton)=>dispatch(timeSheetActions.SetSaveButton(saveButton)),
        createButtonDisable:(createButton)=>dispatch(timeSheetActions.SetCreateButton(createButton))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Timetoolbar);
