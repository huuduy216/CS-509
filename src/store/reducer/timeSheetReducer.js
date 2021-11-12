import * as actionTypes from '../action/actionTypes';
import * as update from '../../Utility/update'

const initalState = {
    weekDate: [],
    loading: false,
    //createMode and editMode
    create: false,
    edit:false,
    //create and save Button
    saveDisable: true,
    createDisable:true,
    //show create edit data
    show: {},
    timesheet: {},
    editCreateTimesheet:{}
};
//create Timesheet
const createTimeSheetStart = (state, action) => {
    return update.updateObject(state, {
        timesheet: {}, show: {}, loading: false, create: true, saveDisable: true
    })
}
const createTimeSheet = (state, action) => {
    return update.updateObject(state, { timesheet: action.timesheet });
}

const createTimeSheetEnd = (state, action) => {
    return update.updateObject(state, {
        timesheet: {}, loading: false, create: false, saveDisable: true
    })
}
//get date
const getWeekDate = (state, action) => {
    return update.updateObject(state, { weekDate: action.weekDate, create: false});
}
//show timesheet
const showTimeSheet = (state, action) => {
    return update.updateObject(state, { show: action.show, loading: false});
}

const showTimeSheetLoading = (state, action) => {
    return update.updateObject(state, { loading: true });
}
//editTimesheet
const editTimeSheetStatus = (state, action) => {
    return update.updateObject(state, {
        edit:action.editMode
    })
}
const editTimeSheet = (state, action) => {
    return update.updateObject(state, { show: action.editedTimesheet })
}

const editCreateTimesheet = (state, action) => {
    return update.updateObject(state, { editCreateTimesheet: action.editCreateTimesheet })
}

const editTimesheetEnd = (state,action) =>{
    return update.updateObject(state, {editCreateTimesheet:{}});
}
//set Button
const setSaveButton = (state,action) =>{
    return update.updateObject(state,{saveDisable:action.saveButton})
}

const setCreateButton = (state,action) =>{
    return update.updateObject(state,{createDisable:action.createButton})
}
const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TIMESHEET_START: return (createTimeSheetStart(state, action));
        case actionTypes.WEEK_DATE_GET: return (getWeekDate(state, action));
        case actionTypes.TIMESHEET_CREATE: return (createTimeSheet(state, action));
        case actionTypes.TIMESHEET_CREATE_END: return (createTimeSheetEnd(state, action));
        case actionTypes.TIMESHEET_SHOW: return (showTimeSheet(state, action));
        case actionTypes.TIMESHEET_SHOW_LOADING: return (showTimeSheetLoading(state, action));
        case actionTypes.EDIT_TIMESHEET: return (editTimeSheet(state, action));
        case actionTypes.EDIT_CREATE_TIMESHEET:return(editCreateTimesheet(state,action));
        case actionTypes.SAVE_TIMESHEET_END:return(editTimesheetEnd(state,action));
        case actionTypes.SET_CREATE_BUTTON:return(setCreateButton(state,action));
        case actionTypes.SET_SAVE_BUTTON:return(setSaveButton(state,action));
        case actionTypes.EDIT_TIMESHEET_MODE:return(editTimeSheetStatus(state,action));
        default:
            return state;
    }
};

export default reducer;