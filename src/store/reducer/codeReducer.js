import * as actionTypes from '../action/actionTypes';
import * as update from '../../Utility/update'

const initalState = {
    edit: "12",
    treeData: [],
    treeDataEmpty: false,
    fresh: false,
    changeTreeEnable: false,
    codeDrawerDisplay:false,
    //content
    codeDrawData:{},
    codeDrawDataSubtitle:"",
    codeDrawDataBodytext:"",
    codeDrawDataType:"",
    codeDrawDataTitle:"",
    //content implementation
    codeDrawDataCode:"",
    codeDrawDataLanguage:undefined,

};
const setCodeClear = (state, action) => {
    return update.updateObject(state, {
        edit: "", treeData: [], treeDataEmpty: false,
        fresh: false,
        changeTreeEnable: false})
}


const algorithmEdit = (state, action) => {
    return update.updateObject(state, { edit: "algorithm" });
}

const homemEdit = (state, action) => {
    return update.updateObject(state, { edit: "home" });
}

const benchmarkEdit = (state, action) => {
    return update.updateObject(state, { edit: "benchmark" });
}

const treeChildAdd = (state, action) => {
    return update.updateObject(state, { treeData: action.treeData, treeDataEmpty: false,treeDB:action.treeDB });
}

const treeAlgorithmAdd = (state, action) => {
    return update.updateObject(state, { treeData: action.treeData, treeDataEmpty: false });
}

const treeClassificationAdd = (state, action) => {
    return update.updateObject(state, { treeData: action.treeData, treeDataEmpty: false,treeDB:action.treeDB });
}


const setTreeAddUrl = (state, action) => {
    return update.updateObject(state, { treeData: action.treeData, treeDataEmpty: false });
}
const treeChildDelete = (state, action) => {
    return update.updateObject(state, { treeData: action.treeData, treeDataEmpty: action.treeDataEmpty,treeDB:action.treeDB});
}

const treeModify = (state, action) => {
    return update.updateObject(state, { treeData: action.treeData, treeDataEmpty: false });
}

const treeSet = (state, action) => {
    return update.updateObject(state, { treeData: action.treeData, treeDataEmpty: false });
}

const treeFresh = (state, action) => {
    return update.updateObject(state, { fresh: action.fresh });
}

const treeEditable = (state, action) => {
    return update.updateObject(state, { changeTreeEnable: true });
}

const codeDrawVisible = (state, action) => {
    return update.updateObject(state, { codeDrawerDisplay: action.drawerDisplay });
}

const codeDrawData = (state, action) => {
    return update.updateObject(state, { codeDrawData: action.codeDrawData });
} 

const setSubtitle = (state, action) => {
    return update.updateObject(state, { codeDrawDataSubtitle:action.subtitle });
} 

const setTextBody = (state, action) => {
    return update.updateObject(state, { codeDrawDataBodytext: action.textbody });
} 

const setContentType = (state, action) => {
    return update.updateObject(state, { codeDrawDataType: action.ContentType });
} 


const setTitle = (state, action) => {
    return update.updateObject(state, { codeDrawDataTitle: action.title });
} 


const setCodeBody = (state, action) => {
    return update.updateObject(state, { codeDrawDataCode: action.codeBody });
} 

const setCodeLanguage = (state, action) => {
    return update.updateObject(state, { codeDrawDataLanguage: action.language});
}

const setContentClear = (state,action)=>{
    return update.updateObject(state,{codeDrawDataSubtitle:"",codeDrawDataBodytext:"",codeDrawDataType:"",codeDrawDataTitle:"",codeDrawDataCode:"",codeDrawData:{}})
}


const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.SET_Algorithm_BUTTON: return (algorithmEdit(state, action));
        case actionTypes.SET_Home_BUTTON: return (homemEdit(state, action));
        case actionTypes.SET_BENCHMARK_BUTTON: return (benchmarkEdit(state, action));
        case actionTypes.SET_TREE_CHILD_ADD: return (treeChildAdd(state, action));
        case actionTypes.SET_TREE_CHILD_DELETE: return (treeChildDelete(state, action));
        case actionTypes.SET_TREE_MODIFY: return (treeModify(state, action));
        case actionTypes.SET_TREE_FRESH: return (treeFresh(state, action));
        case actionTypes.SET_TREE_ALGORITHM_ADD: return (treeAlgorithmAdd(state, action));
        case actionTypes.SET_TREE_Classification_ADD: return (treeClassificationAdd(state, action));
        case actionTypes.SET_TREE_ADDURL: return (setTreeAddUrl(state, action));
        case actionTypes.SET_TREE_SET: return (treeSet(state, action));
        case actionTypes.SET_TREE_EDITABLE: return (treeEditable(state, action));
        case actionTypes.SET_CODE_CLEAR: return (setCodeClear(state, action));
        case actionTypes.SET_CODEDRAWER_DISPLAY: return (codeDrawVisible(state, action));
        case actionTypes.SET_CODEDRAWER_DATA: return (codeDrawData(state,action));
        case actionTypes.SET_SUBTITLE: return (setSubtitle(state,action));
        case actionTypes.SET_TEXTBODY: return (setTextBody(state,action));
        case actionTypes.SET_CONTENTTYPE: return (setContentType(state,action));
        case actionTypes.SET_TITLE: return(setTitle(state,action));
        case actionTypes.SET_CODE_BODY: return(setCodeBody(state,action));
        case actionTypes.SET_CODE_LANGUAGE: return(setCodeLanguage(state,action));
        case actionTypes.SET_CONTENT_CLEAR: return(setContentClear(state,action));
        default:
            return state;
    }
};

export default reducer;