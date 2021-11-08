import axios from '../../axios/axios-local'
import { userGet } from './user'
import * as actionTypes from './actionTypes';


export const treeFresh = (fresh) => {
    return {
        type: actionTypes.SET_TREE_FRESH,
        fresh: fresh
    }
}

const initializedСopy=(nodes, location)=>{
    const nodesCopy = [];
    for (let i = 0; i < nodes.length; i++) {
        const { children, title } = nodes[i];
        const hasChildren = children !== undefined;
        const id = location ? `${location}.${i + 1}` : `${i + 1}`;
        nodesCopy[i] = { 
                children: hasChildren ? this.initializedСopy(children, id) : undefined,
                changeTitle: this.changeTitle(id),
                removeNode: this.removeNode(id),
                addChild: this.addChild(id),
                id,
                title,
        };
    }
    return nodesCopy;
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
    changingNode.children = [
        ...changingNode.children,
        {
            title: "New Item",
            key: id,
            type: "new",
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

//Click Delete Tree
export const treeChildDelete = (treeData, id) => { 
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
        console.log(index)
        console.log(newChildren[index].key)
        changingNode.children = newChildren;
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

