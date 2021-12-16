import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Algorithm.module.css';
import { Button, PageHeader, Modal, TreeSelect } from 'antd';
import { ArrowDownOutlined, AppstoreAddOutlined, MergeCellsOutlined, SaveOutlined, EditOutlined, EyeOutlined, PullRequestOutlined } from '@ant-design/icons';
import Tree from '../TreeSpace/Tree';
import Loading from '../../../UI/Loading/Loading';

import * as CodeAction from '../../../store/action/code';
import * as AuthAction from '../../../store/action/auth';


const Algorithm = (props) => {

    //transfer datatree

    let role = localStorage.getItem('role');

    let Editbutton = (
        <div className={classes.headerRest}>
            <Button type="primary" className={classes.EditButton} >Merge Selected</Button>
        </div>
    );
    //save Button
    const saveClick = () => {

        props.postTree(props.treeData,);
        props.saveHistory(props.userHistory,localStorage.getItem('username'));

        props.loadingtime(1000);
        window.location.reload(false);
    }

    //eidtButton
    const ClickEditButton = () => {

        SetEditButton(!editButton);
        if (!props.changeTreeEnable) {
            props.changeTree(props.spaceTreeData);
            props.treeEditEnable();
        }
    }

    //reclassify Button
    const treeChildDelete = (treeData, id) => {
        //add treeData
        id = id.split("-").map((str) => parseInt(str));

        const nodes = treeData;

    

        if (id.length === 1) {
            let newNodes = [];

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

            return newNodes;
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
            return treeData;
        }
    }

    const treeChildGet = (treeData, id) => {
        id = id.split("-").map((str) => parseInt(str));
        let changingNode = treeData[id[0]];

        if (id.length > 1) {
            for (let i = 1; i < id.length; i++) {
                changingNode = changingNode.children[id[i]];
            }
        }
        return changingNode;
    }

    const treeChildAdd = (treeData, id, originalNode) => {
        // let id = node.key;
        let oldIdLength = originalNode.key.length;
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
        let NewId;
        if (changingNode.children.length === undefined || changingNode.children.length === 0) {
            NewId = id.join("-") + "-0";
        } else {
            let NowNumber = changingNode.children.length;
            NewId = id.join("-") + "-" + NowNumber;
        }
        originalNode.key = NewId;
        if (originalNode.children && originalNode.children.length > 0) {
            originalNode.children = comformToRootId(originalNode.children, oldIdLength, NewId);
        }
        changingNode.children = [
            ...changingNode.children,
            originalNode
        ];
        return treeData;
    }

    const comformToRootId = (arr, oldIdlen, newId) => {
        arr.map((item) => {
            let oldKey = item.key
            item.key = newId + oldKey.substring(oldIdlen);
            if (item.children && item.children.length > 0) {
                comformToRootId(item.children, oldIdlen, newId)
            }
            return item;
        })
        return arr;
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        let newSpaceTreeDataThree = JSON.parse(JSON.stringify(props.treeData));
        newSpaceTreeDataThree = treeChildAdd(newSpaceTreeDataThree, targetValue, originalNode)
        newSpaceTreeDataThree = treeChildDelete(newSpaceTreeDataThree, originalValue);
        props.changeTree(newSpaceTreeDataThree)
        props.loadingtime(1000)
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setOriginalValue(undefined)
        setTargetValue(undefined)
        setIsModalVisible(false);
    };
    //reclassify Button  -- Select classificaiton

    const [originalValue, setOriginalValue] = useState(undefined);
    const [targetValue, setTargetValue] = useState(undefined);
    const [originalNode, setOriginalNode] = useState(undefined);
    const [targetNode, setTargetNode] = useState(undefined);
    const onChangeOriginal = (value) => {
        setOriginalNode(treeChildGet(props.treeData, value));
        setOriginalValue(value);
    };
    const onChangeTarget = (value) => {
        setTargetNode(treeChildGet(props.treeData, value));
        setTargetValue(value);
    };
    const [classAndAlgorLeft, SetClassAndAlgorLeft] = useState([]);
    let OriginalClassificaiton = (

        <div>
            <TreeSelect
                style={{ width: '70%' }}
                value={originalValue}
                dropdownStyle={{ maxHeight: 4000, overflow: 'auto' }}
                treeData={classAndAlgorLeft}
                placeholder="Please select"
                treeDefaultExpandAll
                onChange={onChangeOriginal}
            />
        </div>
    );
    const [classLeft, SetClassLeft] = useState(undefined);
    let TargetClassificaiton = (

        <div>
            <TreeSelect
                style={{ width: '70%' }}
                value={targetValue}
                dropdownStyle={{ maxHeight: 4000, overflow: 'auto' }}
                treeData={classLeft}
                placeholder="Please select"
                treeDefaultExpandAll
                onChange={onChangeTarget}
            />
        </div>
    );

    let reclassifyModal = (
        <Modal title="Reclassify" visible={isModalVisible} onOk={handleOk} okButtonProps={{ disabled: (originalValue === undefined || targetValue === undefined || targetNode.type === "algorithm_type") }} onCancel={handleCancel} width={"80%"}>
            {OriginalClassificaiton}
            <ArrowDownOutlined style={{ marginLeft: "35%", marginTop: "20px", marginBottom: "20px" }} />
            {TargetClassificaiton}
        </Modal>
    );
    let treelist = {};
    let changeId = (arr) => {
        arr.map((item) => {
            item.value = item.key
            treelist[item.value] = item.type
            if (item.children && item.children.length > 0) {
                changeId(item.children)
            }
            return item;
        })
        return arr;
    }

    let leaveClassAndAlgor = (arr) => {
        arr.map((item) => {
            if (item.children && item.children.length > 0) {
                if (item.children[0].type === "algorithm_implementations") {
                    item.children = []
                } else {
                    leaveClassAndAlgor(item.children)
                }
            }
            return item;
        })
        return arr;
    }
    let leaveClass = (arr) => {
        arr.map((item) => {
            if (item.children && item.children.length > 0) {
                if (item.children[0].type === "algorithm_implementations") {
                    item.children = []
                } else {
                    leaveClassAndAlgor(item.children)
                }
            }
            return item;
        })
        return arr;
    }
    const ClickReclassify = () => {


        let newSpaceTreeData = JSON.parse(JSON.stringify(props.treeData));
        let newSpaceTreeDataTwo = JSON.parse(JSON.stringify(props.treeData));


        changeId(newSpaceTreeData);
        SetClassAndAlgorLeft(leaveClassAndAlgor(newSpaceTreeData))
        changeId(newSpaceTreeDataTwo);
        SetClassLeft(leaveClass(newSpaceTreeDataTwo))
        setIsModalVisible(true);
    }
    //Merge Button
    const ClickMerge = () => {
        let newSpaceTreeData = JSON.parse(JSON.stringify(props.treeData));
        let newSpaceTreeDataTwo = JSON.parse(JSON.stringify(props.treeData));


        changeId(newSpaceTreeData);
        SetClassAndAlgorLeft(leaveClassAndAlgor(newSpaceTreeData))
        changeId(newSpaceTreeDataTwo);
        SetClassLeft(leaveClass(newSpaceTreeDataTwo))
        setIsMergeModalVisible(true);
    }

    const handleMergeOk = () => {
        let newSpaceTreeDataThree = JSON.parse(JSON.stringify(props.treeData));
      
        if (originalNode.children && originalNode.children.length > 0) {
            for(let i=0;i<originalNode.children.length;i++){
                newSpaceTreeDataThree = treeChildAdd(newSpaceTreeDataThree, targetValue, originalNode.children[i])
            }
        }
        newSpaceTreeDataThree = treeChildDelete(newSpaceTreeDataThree, originalValue);
        props.changeTree(newSpaceTreeDataThree)
        props.loadingtime(1000)
        setIsMergeModalVisible(false);
    };

    const handleMergeCancel = () => {
        setOriginalValue(undefined)
        setTargetValue(undefined)
        setIsMergeModalVisible(false);
    };
    //Merge Button //mergeBody
    const [isMergeModalVisible, setIsMergeModalVisible] = useState(false);
    let mergeyModal = (
        <Modal title="Merge" visible={isMergeModalVisible} onOk={handleMergeOk} okButtonProps={{ disabled: (originalValue === undefined || targetValue === undefined || targetNode.type === "algorithm_type" || originalNode.type === "algorithm_type") }} onCancel={handleMergeCancel} width={"80%"}>
            {OriginalClassificaiton}
            <ArrowDownOutlined style={{ marginLeft: "35%", marginTop: "20px", marginBottom: "20px" }} />
            {TargetClassificaiton}
        </Modal>
    );
    //add classification
    const AddClass = () => {
        props.addClass(props.treeData);
        let history = props.userHistory
        let element = 'Added New Classification||'
        history.push(element)
        props.updateUserHistory(history);


    }

    // const ShowConsole = () => {
    //     console.log(props.treeData)
    // }

    const [editButton, SetEditButton] = useState(true);
    let EditButton;
    if (editButton) {
        EditButton = (<Button onClick={ClickEditButton} type="primary" className={classes.EditButton} icon={<EditOutlined />}>Edit</Button>);
    } else {
        EditButton = (<Button onClick={ClickEditButton} className={classes.EditButton} icon={<EyeOutlined />}>View</Button>);
    }

    if (role === "user" || role === "admin") {
        Editbutton = (
            <div className={classes.headerRest}>
                {EditButton}
                <Button disabled={editButton} onClick={() => { AddClass() }} type="primary" className={classes.EditButton} icon={<AppstoreAddOutlined />}>Add Classfifcation</Button>
                <Button disabled={editButton} onClick={ClickReclassify} type="primary" className={classes.EditButton} icon={<PullRequestOutlined />}>Reclassify</Button>
                <Button disabled={editButton} onClick={ClickMerge} type="primary" className={classes.EditButton} icon={<MergeCellsOutlined />}>Merge</Button>
                {/* <Button disabled={editButton} onClick={ShowConsole} type="primary" className={classes.EditButton} icon={<MergeCellsOutlined />}>SHOW</Button> */}
                <Button disabled={editButton} onClick={() => { saveClick() }} type="danger" className={classes.EditButton} icon={<SaveOutlined />}>Save</Button>
            </div>
        );
    }

    // if (Object.prototype.isPrototypeOf(props.treeData) && Object.keys(props.treeData).length === 0 && !props.treeDataEmpty) {
    //     props.getTree()
    // }

    let treeStatus = props.spaceTreeData;
    if (props.changeTreeEnable) {
        treeStatus = props.treeData;
    }

    let algor = (
        <div className={classes.background}>
            <div className={classes.header}>
                <PageHeader
                    className={classes.pageheader}
                    onBack={() => window.history.back()}
                    title="Structure"
                    subTitle="Edit structure"
                >
                    {Editbutton}
                </PageHeader>
            </div>
            <Tree treeData={treeStatus} editButton={editButton} />
        </div>
    )

    if (props.loading) {
        algor = (<Loading />)
    }

    return (
        <React.Fragment>
            {mergeyModal}
            {reclassifyModal}
            {algor}
        </React.Fragment>

    );
};
const mapStateToProps = state => {

    return {
        treeData: state.code.treeData,
        edit: state.code.edit,
        role: state.auth.role,
        userHistory: state.code.userHistory,
        loading: state.auth.loading,
        treeDataEmpty: state.code.treeDataEmpty,
        changeTreeEnable: state.code.changeTreeEnable,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addClass: (treeData) => dispatch(CodeAction.treeClassificationAddClick(treeData)),
        postTree: (treeData, userhistory) => dispatch(CodeAction.postTree(treeData, userhistory)),
        changeTree: (treeData) => dispatch(AuthAction.changeTree(treeData)),
        loadingtime: (time) => dispatch(AuthAction.setLoadingTime(time)),
        getTree: () => dispatch(AuthAction.getTree()),
        treeEditEnable: () => dispatch(CodeAction.treeEditable()),
        updateUserHistory: (userhistory) => dispatch(CodeAction.updateUserHistory(userhistory)),
        saveHistory: (userHistory, username) => dispatch(CodeAction.saveHistory(userHistory, username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Algorithm);