import React, { useState } from 'react';

import { connect } from 'react-redux';

import classes from './TreeNode.module.css';
import { RightOutlined, PlusOutlined, DownOutlined, DeleteOutlined,FontColorsOutlined } from '@ant-design/icons';
import Tree from './Tree';
import { Button,Spin,Input } from 'antd';
import { Upload } from 'antd';
import * as CodeAction from '../../../store/action/code';


import { UploadFile } from 'antd';





const TreeNode = (props) => {
    const [childVisible, setChildVisibility] = useState(false);
    const addButtonHidden = props.node.type!=="algorithm"&& (!props.node.type.includes('problem'))&& (!props.node.type.includes('benchmark'))? false : true;
    const hasChild = props.node.children ? true : false;
    const ClassificationItem = props.node.type.includes('classification')?true:false;
    const AlgorithmItem = props.node.type.includes('algorithm')?true:false;
    const ImplementationItem = props.node.type==="algorithm_implementations"||props.node.type==="algorithm_problem"?true:false;
    const deleteButtonHidden = true;
    // const deleteButtonHidden = (!node.type.includes('benchmark'))? true : false;

    let editItem = (
        <div className={classes.toggler + ' ' + (childVisible ? classes.active : '')}>
            <Button onClick={e => setChildVisibility(v => !v)} className={hasChild?classes.editButton:classes.editButtonHidden} size="small" icon={childVisible ? <DownOutlined /> : <RightOutlined />} type="text" />
            <Button onClick={()=>props.addChild(props.treeData,props.node.key)} className={!AlgorithmItem&&hasChild&&!addButtonHidden||ClassificationItem?classes.editButton:classes.editButtonHidden} size="small" icon={<PlusOutlined />} type="primary" />
            <Button onClick={()=>props.addAlgor(props.treeData,props.node.key)} className={!AlgorithmItem&&!addButtonHidden?classes.editButton:classes.editButtonHidden} size="small" icon={<FontColorsOutlined/>} type="primary" danger ghost/>
            <Button onClick={()=>props.deleteChild(props.treeData,props.node.key)} className={deleteButtonHidden?classes.editButton:classes.editButtonHidden} size="small" icon={<DeleteOutlined />} type="danger" />
           
            {/* <p className={classes.editTitle}>{props.node.title}</p> */}
            <Input onChange={({ target: { value } })=>props.modifyTree(props.treeData,props.node.key,value)} className={AlgorithmItem?classes.editTitleAlgorithm:classes.editTitle} placeholder="Basic usage" defaultValue={props.node.title} size="small"/>
             <div  className = {ImplementationItem? classes.upload:classes.hideUpload}><Upload className={classes.uploadButton} action={'/upload'}  >
             <Button>Upload</Button></Upload></div>
        </div>
    )
   
    if(props.fresh){
        editItem=(<Spin/>);
    }

    

    return (
        <React.Fragment>
            <li className={classes.dTreeNode}>
                <div className={classes.dFlex} >
                    {editItem}
                </div>
                {
                    hasChild && childVisible && <div className={classes.dTreeContent}>
                        <ul className={classes.dTreeContainer}>
                            <Tree treeData={props.node.children} />
                        </ul>
                    </div>
                }
            </li>

        </React.Fragment>

    );
};


const mapStateToProps = state => {

    return {
        treeData: state.code.treeData,
        fresh:state.code.fresh
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addChild:(node,id)=>dispatch(CodeAction.treeAddClick(node,id)),
        addAlgor:(node,id)=>dispatch(CodeAction.treeAddAlgorClick(node,id)),
        deleteChild:(node,id)=>dispatch(CodeAction.treeDeleteClick(node,id)),
        modifyTree:(node,id,newTitle)=>dispatch(CodeAction.treeModify(node,id,newTitle)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeNode);

