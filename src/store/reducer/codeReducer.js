import * as actionTypes from '../action/actionTypes';
import * as update from '../../Utility/update'

const initalState = {
    edit:"12",
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



const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.SET_Algorithm_BUTTON:return (algorithmEdit(state,action));
        case actionTypes.SET_Home_BUTTON:return(homemEdit(state,action));
        case actionTypes.SET_BENCHMARK_BUTTON:return(benchmarkEdit(state,action));
        default:
            return state;
    }
};

export default reducer;