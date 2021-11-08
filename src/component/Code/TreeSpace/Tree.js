import React, { useState } from 'react';
import classes from './Tree.module.css';
import TreeNode from './TreeNode';
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';







const Tree = ({ treeData = [] }) => {

    return (
        <React.Fragment>
            
            <div className={classes.dTree}>
                <ul className={classes.ul}>
                    {treeData.map(tree =>
                        <TreeNode key={tree.key} node={tree} />
                    )}
                </ul>
            </div>

        </React.Fragment>

    );
};

export default Tree;