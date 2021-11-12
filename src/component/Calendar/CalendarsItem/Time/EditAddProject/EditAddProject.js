import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import classes from './EditAddProject.module.css';
import EditAddProjectBar from './EditAddProjectBar/EditAddProjectBar';
import * as timeSheetActions from '../../../../../store/action/timesheet';

const EditAddProject = (props) => {

    //set timesheet project
    const [editSelectProject, SetEditSelectProject] = useState([]);
    const [createTimesheetProject, SetCreateTimesheetProject] = useState([]);
    //disable add button
    const [disableAddButton, SetDisableAddButton] = useState(false);

    const [disableInputNumber, SetdisableInputNumber] = useState({});


    //set disable AddButton
    useEffect(() => {
        let flag = false;
        Object.keys(disableInputNumber).map((key) => (
            flag = disableInputNumber[key] || flag
        ))
        SetDisableAddButton(flag);
    }, [disableInputNumber])


    useEffect(() => {
        let editSelectProjectTemp = [];
        let showTempArray = [];
        const { "Total(/day)": total, ...showTemp } = { ...props.show };
        Object.keys(showTemp).map((key) => (
            showTempArray.push(key)
        ));
        for (let i = 0; i < props.projectInfo.length; i++) {
            if (!showTempArray.includes(props.projectInfo[i]["name"])) {
                editSelectProjectTemp.push(props.projectInfo[i]["name"]);
            }
        }
        SetEditSelectProject(editSelectProjectTemp);
    }, [props.show, props.projectInfo])


    const handleClickAddButton = () => {
        //set projectRest or timesheetProject
        let createTimesheetProjectTemp = [];
        let editSelectProjectTemp = [];
        let deleteProject = null;
        createTimesheetProjectTemp = [...createTimesheetProject];
        editSelectProjectTemp = [...editSelectProject];
        deleteProject = editSelectProjectTemp.splice(0, 1);
        createTimesheetProjectTemp.push(...deleteProject);
        SetCreateTimesheetProject(createTimesheetProjectTemp);

        let DisableInputNumber = {};
        // disable inputnumber
        DisableInputNumber = { ...disableInputNumber };
        DisableInputNumber[deleteProject] = true;
        SetdisableInputNumber(DisableInputNumber);

        //disable addButton
        SetDisableAddButton(true);
        // disable saveButton
        props.saveButtonDisable(true);
    }

    //click cancel button
    const handleClickCancel = (projectName) => {
        let createTimesheetProjectTemp = [];
        let editSelectProjectTemp = [];
        let DisableInputNumber = [];
        let flag = null;
        //set timesheetProject and projectRest
        createTimesheetProjectTemp = [...createTimesheetProject];
        for (let i = 0; i < createTimesheetProjectTemp.length; i++) {
            if (createTimesheetProjectTemp[i] === projectName) {
                createTimesheetProjectTemp.splice(i, 1);
            }
        }
        SetCreateTimesheetProject(createTimesheetProjectTemp);
        //set Select Project
        if (!disableInputNumber[projectName]) {
            editSelectProjectTemp = [...editSelectProject];
            if (editSelectProjectTemp.includes(projectName) === false) {
                editSelectProjectTemp.push(projectName);
            }

            SetEditSelectProject(editSelectProjectTemp);

        }
        //disable inputNumber and add Button
        DisableInputNumber = { ...disableInputNumber };
        delete DisableInputNumber[projectName];
        SetdisableInputNumber(DisableInputNumber);
        //delete createTimesheet
        let editCreateTimesheetTemp={};
        editCreateTimesheetTemp = { ...props.editTimesheet };
        delete editCreateTimesheetTemp[projectName];
        props.editCreateTimesheet(editCreateTimesheetTemp);
        //enable saveButton
        Object.keys(DisableInputNumber).map((key) => (
            flag = DisableInputNumber[key] || flag
        ))
        if (flag) {
            props.saveButtonDisable(true);
        } else {
            props.saveButtonDisable(false);
        }
    }

    let addButton = null;
    addButton = (
        <div className={classes.buttonBackground}>
            <Button
                onClick={handleClickAddButton}
                hidden={Object.keys(props.show).length  + createTimesheetProject.length>= props.projectInfo.length }
                disabled={disableAddButton}
                className={classes.addButton}
                icon={<PlusOutlined />}
                style={{ height: "100%", border: "1px #90a4ae solid", alignItems: "center", justifyContent: "center" }}
            />
        </div>);

    return (
        <React.Fragment>

            {createTimesheetProject.map((item) => {
                return <EditAddProjectBar
                    key={item}
                    selectProject={editSelectProject}
                    projectName={item}
                    // disable InputNumber
                    disableInputNumber={disableInputNumber}
                    SetdisableInputNumber={SetdisableInputNumber}
                    // set createTimesheetProject/editSelectProject
                    createTimesheetProject={createTimesheetProject}
                    SetCreateTimesheetProject={SetCreateTimesheetProject}
                    editSelectProject={editSelectProject}
                    SetEditSelectProject={SetEditSelectProject}
                    //disable add button
                    disableAddButton={disableAddButton}
                    //cancel Button
                    handleClickCancel={handleClickCancel}
                />
            })
            }
            {addButton}
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


export default connect(mapStateToProps, mapDispatchToProps)(EditAddProject);

