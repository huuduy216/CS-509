import axios from '../../axios/axios-local'
import * as actionTypes from './actionTypes';
import * as CodeAction from './code';

export const auth = (userName, password) => {

    const param = {
        username: userName,
        password: password
    }
    //send params instead of payload

    // return (dispatch) => {
    //     dispatch(authStart())
    //     if(userName==="admin" && password==="123"){
    //         dispatch(authAdminSuccess());

    //     }else if(userName==="demo1" && password==="123"){
    //         dispatch(authUserSuccess());
    //     }
    //     else{
    //         dispatch(authFail());
    //     }
    // }
    //test

    return (dispatch) => {
        dispatch(authStart())
        // dispatch(authStart());
        axios.post('/authentication/login', (param))
            .then(response => {
                if (!response.data.auth) {
                    dispatch(authFail(response.data.message));
                }
                else {
                    localStorage.setItem('token', response.data.token);
                    // localStorage.setItem('Authenticated', true);

                    if (response.data.role[0].authority === 'ROLE_ADMIN') {
                        // localStorage.setItem('role', 'admin');
                        // localStorage.setItem('iconName', 'AD');
                        dispatch(getTree());
                        dispatch(authAdminSuccess());
                    }
                    else {
                        // localStorage.setItem('role', 'user');
                        // localStorage.setItem('iconName', 'USER');
                        dispatch(getTree());
                        dispatch(authUserSuccess(param.username));
                    }

                }
            }).catch(error => {
                // console.log(console.error(error.status))

                dispatch(callFail())
            });;
        return Promise.resolve();


    }
    //----------------------
    // return (dispatch) => {

}
export const refresh = () => {
    return (dispatch) => {
        dispatch(authStart())
    }
}
export const reg = (userName, password) => {
    const param = {
        username: userName,
        password: password
    }

    return (dispatch) => {
        dispatch(authStart())



        axios.post('/authentication/register', param)

            .then(response => {

                if (response.data !== "") {

                    dispatch(regUserSuccess(""));

                } else {
                    dispatch(regFail("User Exists try different username"));
                }
            }).catch(error => {
                // console.log(console.error(error.status))
                console.log("----------")
                dispatch(callFail())
            });
        return Promise.resolve();

    }
}
//  if(userName==="demo1" && password==="123"){
//     dispatch(regUserSuccess("Registered!! Login Now"));
// }
// else{
//     dispatch(regFail("User Exists try different username"));
// }
//  }
// };

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authAdminSuccess = () => {
    return {
        type: actionTypes.AUTH_ADMINSUCCESS,
    }
}
export const callFail = () => {
    return {
        type: actionTypes.CALL_FAIL,
        loginMsg: "Contact Admin"
    }
}
export const authUserSuccess = (username) => {
    localStorage.setItem('username', username);
    return {
        type: actionTypes.AUTH_USERSUCCESS,
    }
}
export const regUserSuccess = (msg) => {
    return {
        type: actionTypes.REG_USERSUCCESS,
        loginMsg: msg
    }
}
export const authFail = (loginError) => {
    return {
        type: actionTypes.AUTH_FAIL,
        loginError: loginError
    }
}

export const regFail = (regError) => {
    return {
        type: actionTypes.REG_FAIL,
        loginError: regError
    }
}
export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('timesheetUsername');
    localStorage.removeItem('timesheetisAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('timesheeticonName');
    localStorage.removeItem('tree');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogoutNew = () => {
    return (dispatch) => {
        dispatch(CodeAction.setCodeStateClear())
        dispatch(authLogout());
    }
}

export const setLoadingTime = (time) => {
    return (dispatch) => {
        dispatch(authLoading(true))
        setTimeout(() => {
            dispatch(authLoading(false));
        }, time);
    }
}

export const authLoading = (loading) => {
    return {
        type: actionTypes.AUTH_LOADING,
        loading: loading
    }
}

//post tree
export const getTree = () => {
    return (dispatch) => {
        axios.get('/normal/getcodetree', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                dispatch(changeTree(response.data.children))
            })
        return Promise.resolve();
    }
}

export const changeTree = (treeData) => {
    return {
        type: actionTypes.SET_TREE_SET,
        treeData: treeData
    }
}

