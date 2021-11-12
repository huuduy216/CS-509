import React from 'react';
import { connect } from 'react-redux';

import { Popover, Button, Popconfirm } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import classes from './Time.module.css';
import InputProjectTime from './InputProjectTime';
import * as timeSheetActions from '../../../../store/action/timesheet';

const Time = (props) => {

    //set project infomation
    let client;
    let desc;
    let supervisor;
    Object.keys(props.projectInfo).map((item) => {
        if (props.projectInfo[item]["name"] === props.title) {
            client = props.projectInfo[item]["client"];
            desc = props.projectInfo[item]["description"];
            supervisor = props.projectInfo[item]["supervisor"];
        }
        return null;
    });
    //project title show
    let content = (
        <div className={classes.content}>
            <p>{"client : " + client}</p>
            <p>{"description : " + desc}</p>
            <p>{"supervisor : " + supervisor}</p>
        </div>
    );
    //project is total or project
    let project = (
        <div className={classes.projectTitle}>
            <Popover content={content} title={props.title} trigger="click" className={classes.popover}>
                <Button type="text" className={classes.projectShow}>{props.title}</Button>
            </Popover>
        </div>);

    //change time

    //delete
    const handleClickCancel = () => {
        if (Object.keys(props.showTimesheetTime) <= 1) {
            // props.createTimesheetSaving(true);
        }
        let showTemp = { ...props.showTimesheetTime };
        delete showTemp[props.title];
        props.editedTimesheet(showTemp);


    }

    let timeNumber = (
        <React.Fragment>
            <InputProjectTime show={props.show} title={"su"} projectTitle={props.title} />
            <InputProjectTime show={props.show} title={"mo"} projectTitle={props.title} />
            <InputProjectTime show={props.show} title={"tu"} projectTitle={props.title} />
            <InputProjectTime show={props.show} title={"we"} projectTitle={props.title} />
            <InputProjectTime show={props.show} title={"th"} projectTitle={props.title} />
            <InputProjectTime show={props.show} title={"fr"} projectTitle={props.title} />
            <InputProjectTime show={props.show} title={"sa"} projectTitle={props.title} />

            <div className={classes.choice} >
                <Popconfirm
                    title="Are you sure to delete this timesheet?"
                    onConfirm={handleClickCancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        style={{ width: "100%", height: "100%" }}
                        icon={<CloseOutlined
                            style={{ color: "red" }} />}
                    />

                </Popconfirm>
            </div>

        </React.Fragment>
    )




    return (
        <React.Fragment>
            <div className={classes.background}>
                {project}
                {timeNumber}
            </div>
        </React.Fragment>

    );
};

const mapStateToProps = state => {
    return {
        showTimesheetTime: state.timesheet.show,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        editedTimesheet: (editedTimesheet) => dispatch(timeSheetActions.editTimesheet(editedTimesheet)),

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Time);