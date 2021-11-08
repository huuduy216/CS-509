import React from "react";
import EditableItem from "../editable-item/editable-item";
import  classes from "./tree-node.module.css";

const TreeNode = ({ children, ...otherProps }) => {
 
    const hasChildren = children !== undefined;

    const renderChildren = (children) => {
        return (
            <ul className={classes.ul}>
                {children.map((nodeProps) => {
                    const { id, ...others } = nodeProps;
    
                    return (
                        <TreeNode
                            key={id}
                            {...others}
                           
                        />
                    );
                })}
            </ul>
        );
    }

    return (
        <li>
                <div className="TreeNode">
                    <EditableItem {...otherProps} />
                </div>
                {hasChildren && renderChildren(children)}
        </li>
    );
}

export default TreeNode;