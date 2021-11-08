import React from 'react';
import Tree from './tree/tree'
import { DEFAULT_NODES } from "../treeData";




const TreeDemo = (props) => {



    return (
        <React.Fragment>

            <Tree data={DEFAULT_NODES} />

        </React.Fragment>

    );
};

export default TreeDemo;