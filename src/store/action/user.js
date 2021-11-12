import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-local'




export const userGet = (username,token) => {
    let config = {
        headers: { 
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization':token
        }
    }

    return (dispatch) => {
        axios.post('/getuser', username, config)
            .then(response => {
                // console.log(response);
                dispatch(userLogin(response.data));
            })
    }
}

export const userLogin = (user) => {
    return {
        type: actionTypes.USER_GET,
        user: user
    };
}