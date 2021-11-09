import axios from '../../axios/axios-local'
import { userGet } from './user'
import * as actionTypes from './actionTypes';


export const treeFresh = (fresh) => {
    return {
        type: actionTypes.SET_TREE_FRESH,
        fresh: fresh
    }
}

export const save = (treeData)=>{
    return (dispatch) => {
        dispatch(startSave());
        axios.post('/authentication/save', (treeData))
        .then(response => {
            
            let token = response.data;
            console.log(token)
           
        }).catch(error =>{
          
           });;
    return Promise.resolve();


    }
}
export const startSave =()=>{
    return{
        type:actionTypes.SET_SAVE_STATE,
        save : "Saved"
    }
}
//Click Add Tree
export const treeChildAdd = (treeData, id) => {
    // let id = node.key;
    id = id.split("-").map((str) => parseInt(str));
    let changingNode = treeData[0];

    if (id.length > 1) {
        for (let i = 1; i < id.length; i++) {
            changingNode = changingNode.children[id[i]];
        }
    }

    if (changingNode.children === undefined) {
        changingNode.children = [];
    }

    id = `${id.join("-")}-${changingNode.children.length}`;
    //new item type
    let new_type="sub_classification";
    if(changingNode.children.length>0){
        if(changingNode.children[0].type==="algorithm"){
            new_type="algorithm_type";
        }
    }

    changingNode.children = [
        ...changingNode.children,
        {
            title: "New Item",
            key: id,
            type:new_type,
            children: undefined,
        }];
    return {
        type: actionTypes.SET_TREE_CHILD_ADD,
        treeData: treeData
    }
}
export const addRoot = (treeData,key)=>{
       console.log("inside add rooot", treeData)
        return {
            type: actionTypes.SET_ROOT_CLASSIFICATION,
            treeData: treeData
        }
}
export const treeAddClick = (treeData, id) => {

    return (dispatch) => {
        dispatch(treeChildAdd(treeData, id));
        dispatch(treeFresh(true));
        setTimeout(() => {
            dispatch(treeFresh(false));
        }, 10);

    }
}

//Click Delete Tree
export const treeChildDelete = (treeData, id) => { 
    console.log("id inside key",id)
    id = id.split("-").map((str) => parseInt(str));
    const nodes = treeData;


    if (id.length === 1) {
        const newNodes = [
            ...nodes.slice(0, [id[0]]),
        ];
        return {
            type: actionTypes.SET_TREE_CHILD_DELETE,
            treeData: newNodes

        }
    } else {
        let changingNode = treeData[0];

        for (let i = 2; i < id.length; i++) {
            changingNode = changingNode.children[id[i-1]];
        }
    
        const index = id[id.length - 1];
        // console.log(changingNode.children.slice(0, index-1))
        // console.log(changingNode.children.slice(index + 1))
        // console.log(id)
        
        const newChildren = [
            ...changingNode.children.slice(0, index),
            ...changingNode.children.slice(index + 1),
        ];
        for(let i=0;i<newChildren.length;i++){
            let key = (newChildren[i].key).split("-").map((str) => parseInt(str));
            key[id.length-1]=i;
            key = `${key.join("-")}`;
            newChildren[i].key = key;
        }
    
        
    
        changingNode.children = newChildren;
        console.log(treeData);
        return {
            type: actionTypes.SET_TREE_CHILD_DELETE,
            treeData:treeData
        }
    }

}

export const treeDeleteClick = (treeData, id) => {

    return (dispatch) => {
        dispatch(treeChildDelete(treeData, id));
        dispatch(treeFresh(true));
        setTimeout(() => {
            dispatch(treeFresh(false));
        }, 100);

    }
}

//tree modify
export const treeModify = (treeData, id,newTitle) => { 
    id = id.split("-").map((str) => parseInt(str));
    let changingNode = treeData[0];

    if (id.length > 1) {
        for (let i = 1; i < id.length; i++) {
            changingNode = changingNode.children[id[i]];
        }
    }
    changingNode.title = newTitle;
    return {
        type: actionTypes.SET_TREE_MODIFY,
        treeData:treeData
    }
    
}
export const algorithmEdit = () => {
    return {
        type: actionTypes.SET_Algorithm_BUTTON,
    }
}

export const homeEdit = () => {
    return {
        type: actionTypes.SET_Home_BUTTON,
    }
}

export const benchmarkEdit = () => {
    return {
        type: actionTypes.SET_BENCHMARK_BUTTON,
    }
}

