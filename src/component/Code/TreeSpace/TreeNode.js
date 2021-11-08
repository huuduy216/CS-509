import React, { useState } from 'react';
import classes from './TreeNode.module.css';
import { RightOutlined, PlusOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons';
import Tree from './Tree';
import { Button } from 'antd';






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

    
    return (
        <React.Fragment>
            <li className={classes.dTreeNode}>
                <div className={classes.dFlex} >
                    {editItem}
                </div>
                {
                    hasChild && childVisible && <div className={classes.dTreeContent}>
                        <ul className={classes.dTreeContainer}>
                            <Tree treeData={node.children} />
                        </ul>
                    </div>
                }
            </li>

        </React.Fragment>

    );
};

export default TreeNode;