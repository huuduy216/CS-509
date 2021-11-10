import * as actionTypes from '../action/actionTypes';
import * as update from '../../Utility/update'

const initalState = {
    edit: "12",
    treeData: [],
    treeDataEmpty: false,
    fresh: false,
    changeTreeEnable: false
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
    return update.updateObject(state, { treeData: action.treeData, treeDataEmpty: false });
}

const treeAlgorithmAdd = (state, action) => {
    return update.updateObject(state, { treeData: action.treeData, treeDataEmpty: false });
}

const treeClassificationAdd = (state, action) => {
    return update.updateObject(state, { treeData: action.treeData, treeDataEmpty: false });
}

const treeChildDelete = (state, action) => {
    return update.updateObject(state, { treeData: action.treeData, treeDataEmpty: action.treeDataEmpty });
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
        case actionTypes.SET_TREE_SET: return (treeSet(state, action))
        case actionTypes.SET_TREE_EDITABLE: return (treeEditable(state, action))
        case actionTypes.SET_CODE_CLEAR: return (setCodeClear(state, action))
        default:
            return state;
    }
};

export default reducer;