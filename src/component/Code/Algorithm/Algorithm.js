import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Algorithm.module.css';
import { Button, Divider } from 'antd';
import { AppstoreAddOutlined, MergeCellsOutlined, SaveOutlined, SelectOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import Tree from '../TreeSpace/Tree';
import {Icon} from 'antd';
import * as CodeAction from '../../../store/action/code';




const Algorithm = (props) => {

    let role = localStorage.getItem('role');
    props.getTreeData();
    let Editbutton = (
        <div className={classes.headerRest}>
            <Button type="primary" className={classes.EditButton} >Merge Selected</Button>
        </div>
    );

    const saveClick = () => {
        console.log(props.treeData);
        props.save(props.treeData);
    }

    if (role === "user") {
        Editbutton = (
            <div className={classes.headerRest}>
                <Button onClick={() => { props.addClass(props.treeData)}} type="primary" className={classes.EditButton} icon={<AppstoreAddOutlined />}>Add Classfifcation</Button>
                <Button type="primary" className={classes.EditButton} icon={<SelectOutlined />}>Merge Selected</Button>
                <Button type="primary" className={classes.EditButton} icon={<MergeCellsOutlined />}>Merge</Button>
                <Button onClick={saveClick} type="danger" className={classes.EditButton} icon={<SaveOutlined />}>Save</Button>
               <Upload  action={'/upload'} listType="picture-card"> <div  className = {classes.upload}>
                   <Button>Uplaod</Button></div></Upload>
            </div>
        );
    }




    return (
        <React.Fragment>
            <div className={classes.header}>
                {Editbutton}
            </div>
            <Divider />
            <Tree treeData={props.treeData} />

        </React.Fragment>

    );
};
const mapStateToProps = state => {

    return {
        treeData: state.code.treeData,
        edit: state.code.edit,
        role: state.auth.role

    };
}

const mapDispatchToProps = dispatch => {
    return {
        addClass: (treeData) => dispatch(CodeAction.treeClassificationAddClick(treeData)),
        getTreeData : ()=> dispatch(CodeAction.getTreeData()),
        save: (treeData) => dispatch(CodeAction.save(treeData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Algorithm);