import React, { useState } from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux';

import classes from './TreeNode.module.css';
import { RightOutlined, PlusOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons';
import Tree from './Tree';
import { Button,Spin  } from 'antd';

import * as CodeAction from '../../../store/action/code';
=======
import classes from './TreeNode.module.css';
import { RightOutlined, PlusOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons';
import Tree from './Tree';
import { Button } from 'antd';
>>>>>>> ce3d5eb104d19c3b4b223010ba2ede35f1616a5a






<<<<<<< HEAD
const TreeNode = (props) => {

    const [childVisible, setChildVisibility] = useState(false);
    const addButtonHidden = props.node.type!=="algorithm"&& (!props.node.type.includes('implementation'))&& (!props.node.type.includes('problem'))&& (!props.node.type.includes('benchmark'))? true : false;
    const hasChild = props.node.children ? true : false;
    const deleteButtonHidden = true;
    // const deleteButtonHidden = (!node.type.includes('benchmark'))? true : false;
   
    let editItem = (
        <div className={classes.toggler + ' ' + (childVisible ? classes.active : '')}>
            <Button onClick={e => setChildVisibility(v => !v)} className={hasChild?classes.editButton:classes.editButtonHidden} size="small" icon={childVisible ? <DownOutlined /> : <RightOutlined />} type="text" />
            <Button onClick={()=>props.addChild(props.treeData,props.node.key)} className={hasChild&&addButtonHidden?classes.editButton:classes.editButtonHidden} size="small" icon={<PlusOutlined />} type="primary" />
            <Button onClick={()=>props.deleteChild(props.treeData,props.node.key)} className={deleteButtonHidden?classes.editButton:classes.editButtonHidden} size="small" icon={<DeleteOutlined />} type="danger" />
            <p className={classes.editTitle}>{props.node.title}</p>
        </div>
    )

    if(props.fresh){
        editItem=(<Spin/>);
    }
=======
const TreeNode = ({ node }) => {

    const [childVisible, setChildVisibility] = useState(false);
    const hasChild = node.children ? true : false;

    let editItem = (
        <div className={classes.toggler + ' ' + (childVisible ? classes.active : '')}>
            <Button onClick={e => setChildVisibility(v => !v)} className={hasChild?classes.editButton:classes.editButtonHidden} size="small" icon={childVisible ? <DownOutlined /> : <RightOutlined />} type="text" />
            <Button className={hasChild?classes.editButton:classes.editButtonHidden} size="small" icon={<PlusOutlined />} type="primary" />
            <Button className={classes.editButton} size="small" icon={<DeleteOutlined />} type="danger" />
            <p className={classes.editTitle}>{node.title}</p>
        </div>
    )

    
>>>>>>> ce3d5eb104d19c3b4b223010ba2ede35f1616a5a
    return (
        <React.Fragment>
            <li className={classes.dTreeNode}>
                <div className={classes.dFlex} >
                    {editItem}
                </div>
                {
                    hasChild && childVisible && <div className={classes.dTreeContent}>
                        <ul className={classes.dTreeContainer}>
<<<<<<< HEAD
                            <Tree treeData={props.node.children} />
=======
                            <Tree treeData={node.children} />
>>>>>>> ce3d5eb104d19c3b4b223010ba2ede35f1616a5a
                        </ul>
                    </div>
                }
            </li>

        </React.Fragment>

    );
};

<<<<<<< HEAD

const mapStateToProps = state => {

    return {
        treeData: state.code.treeData,
        fresh:state.code.fresh
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addChild:(node,id)=>dispatch(CodeAction.treeAddClick(node,id)),
        deleteChild:(node,id)=>dispatch(CodeAction.treeDeleteClick(node,id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeNode);
=======
export default TreeNode;
>>>>>>> ce3d5eb104d19c3b4b223010ba2ede35f1616a5a
