import React, { useState } from 'react';
import classes from './Tree.module.css';
import TreeNode from './TreeNode';
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';







<<<<<<< HEAD
const Tree = (props) => {

    
=======
const Tree = ({ treeData = [] }) => {
>>>>>>> ce3d5eb104d19c3b4b223010ba2ede35f1616a5a

    return (
        <React.Fragment>
            
            <div className={classes.dTree}>
                <ul className={classes.ul}>
<<<<<<< HEAD
                    {props.treeData.map(tree =>
                        <TreeNode key={tree.key} node={tree}/>
=======
                    {treeData.map(tree =>
                        <TreeNode key={tree.key} node={tree} />
>>>>>>> ce3d5eb104d19c3b4b223010ba2ede35f1616a5a
                    )}
                </ul>
            </div>

        </React.Fragment>

    );
};

export default Tree;