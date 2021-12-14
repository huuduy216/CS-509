import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-local';

//post tree
export const postTree = (treeData, userHistory) => {
    let tranData = {
        title: "root",
        key: '-1',
        type: 'root',
        children: [...treeData]
    };

    let Data = [{ ...tranData }, { ...userHistory }, localStorage.getItem('username')]
    console.log("inside save ")
    return (dispatch) => {
        axios.post('/normal/codetree', Data, {
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

export const emptyUserHistory = () => {
    return {
        type: actionTypes.SET_EMPTY_USER_HISTORY
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
            children: [],
            dbId: "+1",
        }];
    return {
        type: actionTypes.SET_TREE_CHILD_ADD,
        treeData: treeData,
    }
}
export const updateUserHistory = (userHistory) => {
    return {
        type: actionTypes.SET_UPDATE_USER_HISTORY,
        userHistory: userHistory
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

    // let changeId = (arr) => {
    //     arr.map((item) => {
    //         item.key = id + '-' + item.key;
    //         if (item.children && item.children.length > 0) {
    //             changeId(item.children)

    //         } return null;
    //     })
    //     return arr;
    // }

    let probleminstance = {
        title: "Problem Instances",
        key: id + "-" + 1,
        type: 'algorithm_problem',
        children: [],
        dbId: "+1",
    }
    let implementation = {
        title: "Implementations",
        key: id + "-" + 0,
        type: 'algorithm_implementations',
        children: [],
        dbId: "+1",
    }
    changingNode.children = [
        ...changingNode.children,
        {
            title: "New Algorithm",
            key: id,
            type: new_type,
            dbId: "+1",
            // children: [newBenchmark[0], newProblem[0]],
            children: [implementation, probleminstance],
        }];
    return {
        type: actionTypes.SET_TREE_CHILD_ADD,
        treeData: treeData,
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
        dbId: "+1",
        children: [],
    };

    const newtreeData = [...treeData, newNode];
    return {
        type: actionTypes.SET_TREE_Classification_ADD,
        treeData: newtreeData,
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

//Click Add Classification
export const treeUrlAdd = (treeData, id, url) => {
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

    //new url type
    changingNode.children = [
        ...changingNode.children,
        {
            title: url,
            key: id,
            type: "url",
            children: [],
        }];
    return {
        type: actionTypes.SET_TREE_ADDURL,
        treeData: treeData
    }
}

export const treeUrlAddClick = (treeData, id, url) => {

    return (dispatch) => {
        dispatch(treeUrlAdd(treeData, id, url));
        dispatch(treeFresh(true));
        setTimeout(() => {
            dispatch(treeFresh(false));
        }, 10);

    }
}

//Click Delete Tree
export const treeChildDelete = (treeData, id) => {

    //add treeData
    id = id.split("-").map((str) => parseInt(str));

    const nodes = treeData;

    let treeDataEmpty = false;

    if (id.length === 1) {
        let newNodes = [];
        if (nodes.length === 1) {
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
            treeDataEmpty: treeDataEmpty,
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
            treeData: treeData,
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


//code drawer
export const setCodeDrawerDisplay = (drawerVisible) => {
    return {
        type: actionTypes.SET_CODEDRAWER_DISPLAY,
        drawerDisplay: drawerVisible
    }
}

export const setDrawerData = (codeDrawData) => {

    return {
        type: actionTypes.SET_CODEDRAWER_DATA,
        codeDrawData: codeDrawData
    }
}

//set Content
//set Content classification
export const postClassificationContent = (key, subtitle, textbody) => {
    let classcontent = {
        "key": key,
        "subtitle": subtitle,
        "textbody": textbody,
    }
    return (dispatch) => {
        axios.post('/normal/classification', classcontent, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
            })
        return Promise.resolve();
    }
}

export const getClassificationContent = (treeData) => {
    let codeDrawData = {
        "nodeType": treeData.type,
        "nodeTitle": treeData.title
    };

    let Nodekey = { "key": treeData.key };
    return (dispatch) => {
        axios.post('/all/getclassification', Nodekey
        )
            .then(response => {
                // console.log(response.data)
                codeDrawData = {
                    ...codeDrawData,
                    "subtitle": response.data.subtitle,
                    "textbody": response.data.textbody,
                }
                dispatch(setDrawerData(codeDrawData))
            })
        return Promise.resolve();
    }
}

export const editClassificationContent = (key) => {

    let Nodekey = { "key": key };

    return (dispatch) => {
        axios.post('/all/getclassification', Nodekey
        )
            .then(response => {
                dispatch(changeSubtitle(response.data.subtitle))
                dispatch(changeTextBody(response.data.textbody))
                dispatch(changeTitle(response.data.title))
                dispatch(changeContentType(response.data.type))
            })
        return Promise.resolve();
    }
}

export const changeSubtitle = (subtitle) => {
    return {
        type: actionTypes.SET_SUBTITLE,
        subtitle: subtitle
    }
}

export const changeContentType = (ContentType) => {
    return {
        type: actionTypes.SET_CONTENTTYPE,
        ContentType: ContentType
    }
}


export const changeTextBody = (textbody) => {
    return {
        type: actionTypes.SET_TEXTBODY,
        textbody: textbody
    }
}

export const changeTitle = (title) => {
    return {
        type: actionTypes.SET_TITLE,
        title: title
    }
}

export const changeCodeBody = (codeBody) => {
    return {
        type: actionTypes.SET_CODE_BODY,
        codeBody: codeBody
    }
}

export const changeCodeLanguage = (language) => {
    return {
        type: actionTypes.SET_CODE_LANGUAGE,
        language: language
    }
}

export const changeBenchmark = (benchmark) => {
    return {
        type: actionTypes.SET_BENCHMARK,
        benchmark: benchmark
    }
}
//set Content
//set Content subclassification
export const getSubClassificationContent = (treeData) => {
    let codeDrawData = {
        "nodeType": treeData.type,
        "nodeTitle": treeData.title
    };

    let Nodekey = { "key": treeData.key };
    return (dispatch) => {
        axios.post('/all/getsubclassification', Nodekey
        )
            .then(response => {
                // console.log(response.data)
                codeDrawData = {
                    ...codeDrawData,
                    "subtitle": response.data.subtitle,
                    "textbody": response.data.textbody,
                }
                dispatch(setDrawerData(codeDrawData))
            })
        return Promise.resolve();
    }
}

export const postSubClassificationContent = (key, subtitle, textbody) => {
    let subclasscontent = {
        "key": key,
        "subtitle": subtitle,
        "textbody": textbody,
    }
    return (dispatch) => {
        axios.post('/normal/subclassification', subclasscontent, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
            })
        return Promise.resolve();
    }
}

export const editSubClassificationContent = (key) => {

    let Nodekey = { "key": key };

    return (dispatch) => {
        axios.post('/all/getsubclassification', Nodekey
        )
            .then(response => {
                dispatch(changeSubtitle(response.data.subtitle))
                dispatch(changeTextBody(response.data.textbody))
                dispatch(changeTitle(response.data.title))
                dispatch(changeContentType(response.data.type))
            })
        return Promise.resolve();
    }
}
//set Content
//set Content algorithm
export const getAlgorithmContent = (treeData) => {
    let codeDrawData = {
        "nodeType": treeData.type,
        "nodeTitle": treeData.title
    };

    let Nodekey = { "key": treeData.key };
    return (dispatch) => {
        axios.post('/all/getalgorithm', Nodekey
        )
            .then(response => {
                // console.log(response.data)
                codeDrawData = {
                    ...codeDrawData,
                    "subtitle": response.data.subtitle,
                    "textbody": response.data.textbody,
                }
                dispatch(setDrawerData(codeDrawData))
            })
        return Promise.resolve();
    }
}

export const postAlgorithmContent = (key, subtitle, textbody) => {
    let algorithmcontent = {
        "key": key,
        "subtitle": subtitle,
        "textbody": textbody,
    }
    return (dispatch) => {
        axios.post('/normal/algorithm', algorithmcontent, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
            })
        return Promise.resolve();
    }
}


export const editAlgorithmContent = (key) => {

    let Nodekey = { "key": key };
    return (dispatch) => {
        axios.post('/all/getalgorithm', Nodekey
        )
            .then(response => {
                dispatch(changeSubtitle(response.data.subtitle))
                dispatch(changeTextBody(response.data.textbody))
                dispatch(changeTitle(response.data.title))
                dispatch(changeContentType(response.data.type))
            })
        return Promise.resolve();
    }
}
//set Content
//set Content implementation

export const getImplementationContent = (key, language) => {
    let newKey = key.substring(0, key.length - 2);
    let ImpleFkAndLanguage = { "fatherKey": newKey, "language": language };
    return (dispatch) => {
        axios.post('/all/getimplementation', ImpleFkAndLanguage
        )
            .then(response => {
                //    let codeDrawData = {
                //         "subtitle": "",
                //         "textbody": "",
                //         "code": ""
                //     }
                dispatch(changeCodeBody(response.data.code))
            })
        return Promise.resolve();
    }
}

export const editImplementationContent = (key, language) => {
    let newKey = key.substring(0, key.length - 2);
    let ImpleFkAndLanguage = { "fatherKey": newKey, "language": language };
    return (dispatch) => {
        axios.post('/all/getimplementation', ImpleFkAndLanguage
        )
            .then(response => {
                dispatch(changeSubtitle(response.data.subtitle))
                dispatch(changeTextBody(response.data.textbody))
                dispatch(changeCodeBody(response.data.code))
            })
        return Promise.resolve();
    }
}

export const postImplementationContent = (key, language, codebody) => {

    let newKey = key.substring(0, key.length - 2);
    let implcontent = {
        "key": newKey,
        "language": language,
        "codebody": codebody,
    }
    return (dispatch) => {
        axios.post('/normal/implementation', implcontent, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
            })
        return Promise.resolve();
    }
}

//set Content
//set Content Benchmark
export const postBenchmarkContent = (benchmarkBody) => {

    return (dispatch) => {
        axios.post('/all/benchmark', benchmarkBody
        )
            .then(response => {
                console.log(response)
            })
        return Promise.resolve();
    }
}

export const getBenchmark = (key, benchmarkType) => {

    let keyAndType = {
        "algorKey": key.substring(0, key.length - 2),
        "benchmarkType": benchmarkType,
    }
    let codeDrawData = {
        "nodeType": "algorithm_problem",
        "nodeTitle": "Problem Instance",
        "nodecode": "",
        "nodekey": key,
        "benchmarks": []
    };

    return (dispatch) => {
        axios.post('/all/getbenchmark', keyAndType
        )
            .then(response => {
                console.log(response.data)
                codeDrawData["benchmarks"] = response.data.benchmarks;
                dispatch(setDrawerData(codeDrawData))
            })
        return Promise.resolve();
    }
}

export const getBenchmarkContent = (key, benchmarkType) => {
    let keyAndType = {
        "algorKey": key.substring(0, key.length - 2),
        "benchmarkType": benchmarkType,
    }

    return (dispatch) => {
        axios.post('/all/getbenchmark', keyAndType
        )
            .then(response => {
                console.log(response)
                dispatch(changeBenchmark(response.data.benchmarks))
            })
        return Promise.resolve();
    }
}

export const deleteBenchmarkContent = (idBenchmark,key, benchmarkType) => {
    console.log(key)
                console.log(benchmarkType)
    let idbenchmark = {
        "idBenchmark": idBenchmark
    }

    return (dispatch) => {
        axios.post('/normal/deletebenchmark', idbenchmark, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
            .then(response => {
                console.log(key)
                console.log(benchmarkType)
                dispatch(getBenchmarkContent(key,benchmarkType))
            })
        return Promise.resolve();
    }
}

export const setContentClear = () => {
    return {
        type: actionTypes.SET_CONTENT_CLEAR
    }
}