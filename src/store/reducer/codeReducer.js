import * as actionTypes from '../action/actionTypes';
import * as update from '../../Utility/update'
import * as treeData from '../../assets/treeData';

const initalState = {
    edit:"12",
    treeData:treeData.allData,
    fresh:false
};

const algorithmEdit=(state,action)=>{
    return update.updateObject(state,{edit:"algorithm"});
}

const homemEdit=(state,action)=>{
    return update.updateObject(state,{edit:"home"});
}

const benchmarkEdit=(state,action)=>{
    return update.updateObject(state,{edit:"benchmark"});
}

const treeChildAdd=(state,action)=>{
    return update.updateObject(state,{treeData:action.treeData});
}

const treeChildDelete=(state,action)=>{
    return update.updateObject(state,{treeData:action.treeData});
}

const treeFresh=(state,action)=>{
    return update.updateObject(state,{fresh:action.fresh});
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.SET_Algorithm_BUTTON:return (algorithmEdit(state,action));
        case actionTypes.SET_Home_BUTTON:return(homemEdit(state,action));
        case actionTypes.SET_BENCHMARK_BUTTON:return(benchmarkEdit(state,action));
        case actionTypes.SET_TREE_CHILD_ADD:return(treeChildAdd(state,action));
        case actionTypes.SET_TREE_CHILD_DELETE:return(treeChildDelete(state,action));
        case actionTypes.SET_TREE_FRESH:return(treeFresh(state,action));
        default:
            return state;
    }
};

export default reducer;