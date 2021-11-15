import * as actionTypes from '../action/actionTypes';
import * as update from '../../Utility/update'

const initalState = {
    registered: false,
    isAuthenticated: false,
    logout: false,
    loginError: "",
    loading: false,
    redirect: "",
    role: ""
};

const authStart = (state, action) => {
    return update.updateObject(state, { isAuthenticated: false, loginError: "", loading: false, redirect: "", role: "", logout: false });

}

const authAdminSuccess = (state, action) => {
    return update.updateObject(state, { isAuthenticated: true, role: "admin", logout: false });
}

const authUserSuccess = (state, action) => {
    return update.updateObject(state,{isAuthenticated:true,role:"user",logout:false});
}

const authFail = (state, action) => {
    return update.updateObject(state,{loginError:action.loginError,isAuthenticated:false,loading:false,role:"",logout:false});
}

const authLoading = (state, action) => {
    return update.updateObject(state, { loading: action.loading,logout:false});
}

const authLogout = (state, action) => {
    return update.updateObject(state, { isAuthenticated: false, role: "",logout:true})
}
const regUserSuccess = (state, action) => {
    return update.updateObject(state, { loginError: action.loginMsg, isAuthenticated: false, loading: false, role: "", registered: true ,logout:false});

}
const callFail = (state, action) => {
    return update.updateObject(state, { loginError: action.loginMsg, isAuthenticated: false, loading: false, role: "",logout:false });

}
const regFail = (state, action) => {
    return update.updateObject(state, { loginError: action.loginError, isAuthenticated: false, loading: false, role: "" ,logout:false});
}


const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return (authStart(state, action));
        case actionTypes.AUTH_ADMINSUCCESS: return (authAdminSuccess(state, action));
        case actionTypes.AUTH_USERSUCCESS: return (authUserSuccess(state, action));
        case actionTypes.REG_USERSUCCESS: return (regUserSuccess(state, action));
        case actionTypes.CALL_FAIL: return (callFail(state, action));
        case actionTypes.AUTH_FAIL: return (authFail(state, action));
        case actionTypes.REG_FAIL: return (regFail(state, action));
        case actionTypes.AUTH_LOGOUT: return (authLogout(state, action));
        case actionTypes.AUTH_LOADING: return (authLoading(state, action));
        default:
            return state;
    }
};

export default reducer;