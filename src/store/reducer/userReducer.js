import * as actionTypes from '../action/actionTypes';
import * as update from '../../Utility/update'

const initalState = {
    user:{},
    
};

const userGet=(state,action)=>{
    return update.updateObject(state,{user:action.user});
}


const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.USER_GET:return (userGet(state,action));
        
        default:
            return state;
    }
};

export default reducer;