import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-local';

//change date
export const getWeekdate = (weekDate) => {
    return {
        type: actionTypes.WEEK_DATE_GET,
        weekDate: weekDate
    }
}
//create timesheet
export const createTimesheetStart = () => {
    return {
        type: actionTypes.CREATE_TIMESHEET_START
    }
}
export const createTimeSheet = (timesheet) => {
    return {
        type: actionTypes.TIMESHEET_CREATE,
        timesheet: timesheet
    }
}


export const createSubmitTimesheet = (createTimesheet, startDate, endDate) => {

    let config = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage["timesheettoken"]
        }
    }

    let timesheet = { ...createTimesheet };
    timesheet.startDate = startDate;
    timesheet.endDate = endDate;
    timesheet.username = localStorage["timesheetUsername"];

    return (dispatch) => {
        axios.post('/creatTimesheet', timesheet, config)
            .then(response => {
                dispatch(createTimeSheetEnd());
                dispatch(showTimesheet(startDate));
            });
    }

}

export const createTimeSheetEnd = () => {
    return {
        type: actionTypes.TIMESHEET_CREATE_END,
    }
}
//show timesheet
export const showTimesheet = (StartDate) => {
    let dateAndName = {};
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage["timesheettoken"]
        }
    }


    dateAndName = {
        startDate: StartDate,
        username: localStorage.getItem('timesheetUsername')
    }
    // console.log(startDate);
    return (dispatch) => {

        dispatch(showTimesheetLoading());
        axios.post('/showtimesheet', dateAndName, config)
            .then(response => {
                // console.log(response.data);
                if (Object.keys(response.data).length === 0) {
                    dispatch(SetCreateButton(false));
                    dispatch(SetSaveButton(true));
                    dispatch(editTimeSheetStatus(false));
                }else{
                    dispatch(SetSaveButton(false));
                    dispatch(SetCreateButton(true));
                    dispatch(editTimeSheetStatus(true));

                }
                
                setTimeout(() => {
                    dispatch(showTimesheetSuccess(response.data));
                }, 500);

            });
    }
}

export const showTimesheetSuccess = (show) => {
    return {
        type: actionTypes.TIMESHEET_SHOW,
        show: show
    }
}

export const showTimesheetLoading = () => {
    return {
        type: actionTypes.TIMESHEET_SHOW_LOADING
    }
}
//edit timesheet
export const editTimesheet = (editedTimesheet) => {
    return {
        type: actionTypes.EDIT_TIMESHEET,
        editedTimesheet: editedTimesheet
    }
}
export const editCreateTimesheet = (editedCreateTimesheet) => {
    return {
        type: actionTypes.EDIT_CREATE_TIMESHEET,
        editCreateTimesheet: editedCreateTimesheet
    }
}

export const saveTimesheet = (savedTimesheet, startDate) => {
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage["timesheettoken"]
        }
    }
    
    return (dispatch) => {
        axios.post('/savetimesheet', savedTimesheet, config)
            .then(response => {
                dispatch(showTimesheet(startDate));
                dispatch(editTimesheetEnd());
            });
    }
}
export const editTimeSheetStatus = (editMode) => {
    return {
        type: actionTypes.EDIT_TIMESHEET_MODE,
        editMode:editMode
    }
}
export const editTimesheetEnd = () =>{
    return {
        type: actionTypes.SAVE_TIMESHEET_END,
    }
}

export const SetSaveButton = (saveButton)=>{
    return{
        type:actionTypes.SET_SAVE_BUTTON,
        saveButton:saveButton
    }
}

export const SetCreateButton = (createButton)=>{
    return{
        type:actionTypes.SET_CREATE_BUTTON,
        createButton:createButton
    }
}