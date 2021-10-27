import axios from '../../axios/axios-local'
import { userGet } from './user'
import * as actionTypes from './actionTypes';







export const algorithmEdit = ()=>{
    return{
        type:actionTypes.SET_Algorithm_BUTTON,
    }
}

export const homeEdit = ()=>{
    return{
        type:actionTypes.SET_Home_BUTTON,
    }
}

export const benchmarkEdit = ()=>{
    return{
        type:actionTypes.SET_BENCHMARK_BUTTON,
    }
}

