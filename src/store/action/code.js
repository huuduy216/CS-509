import * as actionTypes from './actionTypes';
import * as Db from '../../assets/treeData';
import axios from '../../axios/axios-local';

//post tree
export const postTree = (treeData) => {
    let tranData = {
        title: "root",
        key: '-1',
        type: 'root',
        children: [...treeData]
    };
    return (dispatch) => {
        axios.post('/normal/codetree', tranData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
            })
        return Promise.resolve();
    }
}

export const treeFresh = (fresh) => {
    return {
        type: actionTypes.SET_TREE_FRESH,
        fresh: fresh
    }
}


//Click Add Tree
export const treeChildAdd = (treeData, id) => {
    // let id = node.key;
    id = id.split("-").map((str) => parseInt(str));
    let changingNode = treeData[id[0]];

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
    let new_type = "sub_classification";
    if (changingNode.children.length > 0) {
        if (changingNode.children[0].type === "algorithm") {
            new_type = "algorithm_type";
        }
    }

    changingNode.children = [
        ...changingNode.children,
        {
            title: "New Item",
            key: id,
            type: new_type,
            children: undefined,
        }];
    return {
        type: actionTypes.SET_TREE_CHILD_ADD,
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
//Click Add Algorithm
export const treeAlgorithmAdd = (treeData, id) => {
    // let id = node.key;
    id = id.split("-").map((str) => parseInt(str));
    let changingNode = treeData[id[0]];

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
    let new_type = "algorithm_type";

    let changeId = (arr) => {
        arr.map((item) => {
            item.key = id + '-' + item.key;
            if (item.children && item.children.length > 0) {
                changeId(item.children)

            } return null;
        })
        return arr;
    }

    let newBenchmark = Db.BENCH_MARKS;
    let newProblem = Db.PROBLEM_INSTANCE;
    newBenchmark = changeId(newBenchmark);
    newProblem = changeId(newProblem);

    changingNode.children = [
        ...changingNode.children,
        {
            title: "New Algorithm",
            key: id,
            type: new_type,
            children: [newBenchmark[0], newProblem[0]],
        }];
    return {
        type: actionTypes.SET_TREE_CHILD_ADD,
        treeData: treeData
    }
}

export const treeAddAlgorClick = (treeData, id) => {

    return (dispatch) => {
        dispatch(treeAlgorithmAdd(treeData, id));
        dispatch(treeFresh(true));
        setTimeout(() => {
            dispatch(treeFresh(false));
        }, 10);

    }
}

//Click Add Classification
export const treeClassificationAdd = (treeData) => {
    const id = treeData.length ? `${treeData.length}` : "0";
    const newNode = {
        title: "New Classification",
        key: id,
        type: "classification",
        children: undefined,
    };

    const newtreeData = [...treeData, newNode];
    return {
        type: actionTypes.SET_TREE_Classification_ADD,
        treeData: newtreeData
    }
}

export const treeClassificationAddClick = (treeData) => {

    return (dispatch) => {
        dispatch(treeClassificationAdd(treeData));
        dispatch(treeFresh(true));
        setTimeout(() => {
            dispatch(treeFresh(false));
        }, 10);

    }
}
//Click Delete Tree
export const treeChildDelete = (treeData, id) => {
    id = id.split("-").map((str) => parseInt(str));

    const nodes = treeData;

    let treeDataEmpty = false;

    if (id.length === 1) {
        let newNodes = [];
        if(nodes.length===1){
            treeDataEmpty = true;
        }
        if (nodes.length > 1) {
            newNodes = [
                ...nodes.slice(0, id[0]),
            ]


            let changeId = (arr) => {
                arr.map((item) => {
                    let newId = (item.key).split("-").map((str) => parseInt(str));
                    newId[0] = newId[0] - 1;
                    item.key = `${newId.join("-")}`;
                    if (item.children && item.children.length > 0) {
                        changeId(item.children)
                    }
                    return null;
                })
                return arr;
            }
            let newNode_back = [...nodes.slice(id[0] + 1, nodes.length)];
            // console.log(newNode_back)
            newNode_back = changeId(newNode_back);
            newNodes = [
                ...newNodes,
                ...newNode_back,
            ]
        }



        return {
            type: actionTypes.SET_TREE_CHILD_DELETE,
            treeData: newNodes,
            treeDataEmpty:treeDataEmpty

        }
    } else {
        let changingNode = treeData[id[0]];

        for (let i = 2; i < id.length; i++) {
            changingNode = changingNode.children[id[i - 1]];
        }

        const index = id[id.length - 1];
        // console.log(changingNode.children.slice(0, index-1))
        // console.log(changingNode.children.slice(index + 1))
        // console.log(id)

        const newChildren = [
            ...changingNode.children.slice(0, index),
            ...changingNode.children.slice(index + 1),
        ];
        for (let i = 0; i < newChildren.length; i++) {
            let key = (newChildren[i].key).split("-").map((str) => parseInt(str));
            key[id.length - 1] = i;
            key = `${key.join("-")}`;
            newChildren[i].key = key;
        }



        changingNode.children = newChildren;
        return {
            type: actionTypes.SET_TREE_CHILD_DELETE,
            treeData: treeData
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
export const treeModify = (treeData, id, newTitle) => {

    id = id.split("-").map((str) => parseInt(str));
    let changingNode = treeData[id[0]];

    if (id.length > 1) {
        for (let i = 1; i < id.length; i++) {
            changingNode = changingNode.children[id[i]];
        }
    }
    changingNode.title = newTitle;
    return {
        type: actionTypes.SET_TREE_MODIFY,
        treeData: treeData
    }

}
//tree editable
export const treeEditable = () => {
    return {
        type: actionTypes.SET_TREE_EDITABLE,
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


export const setCodeStateClear = () => {
    return {
        type: actionTypes.SET_CODE_CLEAR,
    }
}
