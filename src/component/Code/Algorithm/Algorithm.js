import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Algorithm.module.css';
import { Button, PageHeader } from 'antd';
import { AppstoreAddOutlined, MergeCellsOutlined, SaveOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import Tree from '../TreeSpace/Tree';
import Loading from '../../../UI/Loading/Loading';

import * as CodeAction from '../../../store/action/code';
import * as AuthAction from '../../../store/action/auth';


const Algorithm = (props) => {



    let role = localStorage.getItem('role');

    let Editbutton = (
        <div className={classes.headerRest}>
            <Button type="primary" className={classes.EditButton} >Merge Selected</Button>
        </div>
    );
    //save Button
    const saveClick = () => {
        console.log("==============")
        props.postTree(props.treeData,props.userHistory);
        console.log("==============")
        props.loadingtime(1000);
       // window.location.reload(false);
    }

    //eidtButton
    const ClickEditButton = () => {
        
        SetEditButton(!editButton);
        if (!props.changeTreeEnable) {
            props.changeTree(props.spaceTreeData);
            props.treeEditEnable();
        }
    } 
    const ClickMerge = ()=>{
        console.log(props.treeData)
    }
    //add classification
    const AddClass=()=>{
        props.addClass(props.treeData);
        let history =props.userHistory
        let element= "Added New Classification"
        history.push(element)
        props.updateUserHistory(history);
        console.log(history);

    }
    const [editButton, SetEditButton] = useState(true);
    let EditButton;
    if (editButton) {
        EditButton = (<Button onClick={ClickEditButton} type="primary" className={classes.EditButton} icon={<EditOutlined />}>Edit</Button>);
    } else {
        EditButton = (<Button onClick={ClickEditButton} className={classes.EditButton} icon={<EyeOutlined />}>View</Button>);
    }

    if (role === "user"|| role ==="admin") {
        Editbutton = (
            <div className={classes.headerRest}>
                {EditButton}
                <Button disabled={editButton} onClick={() => { AddClass() }} type="primary" className={classes.EditButton} icon={<AppstoreAddOutlined />}>Add Classfifcation</Button>
                <Button disabled={editButton} onClick={ClickMerge} type="primary" className={classes.EditButton} icon={<MergeCellsOutlined />}>Merge</Button>
                <Button disabled={editButton} onClick={() => {saveClick()}} type="danger" className={classes.EditButton} icon={<SaveOutlined />}>Save</Button>
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
            <Tree treeData={treeStatus} editButton={editButton}/>
        </div>
    )

    if (props.loading) {
        algor = (<Loading />)
    }

    return (
        <React.Fragment>
            {algor}
        </React.Fragment>

    );
};
const mapStateToProps = state => {

    return {
        treeData: state.code.treeData,
        edit: state.code.edit,
        role: state.auth.role,
        userHistory : state.code.userHistory,
        loading: state.auth.loading,
        treeDataEmpty: state.code.treeDataEmpty,
        changeTreeEnable: state.code.changeTreeEnable,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addClass: (treeData) => dispatch(CodeAction.treeClassificationAddClick(treeData)),
        postTree: (treeData,userhistory) => dispatch(CodeAction.postTree(treeData,userhistory)),
        changeTree: (treeData) => dispatch(AuthAction.changeTree(treeData)),
        loadingtime: (time) => dispatch(AuthAction.setLoadingTime(time)),
        getTree: () => dispatch(AuthAction.getTree()),
        treeEditEnable: () => dispatch(CodeAction.treeEditable()),
        updateUserHistory:(userhistory)=>dispatch(CodeAction.updateUserHistory(userhistory)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Algorithm);