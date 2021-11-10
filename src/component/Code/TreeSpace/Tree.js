import React from 'react';
import classes from './Tree.module.css';
import TreeNode from './TreeNode';









const Tree = (props) => {

    return (
        <React.Fragment>
            
            <div className={classes.dTree}>
                <ul className={classes.ul}>
                    {props.treeData.map(tree =>
                        <TreeNode key={tree.key} node={tree} editButton={props.editButton}/>
                 
                    )}
                </ul>
            </div>

        </React.Fragment>

    );
};

export default Tree;