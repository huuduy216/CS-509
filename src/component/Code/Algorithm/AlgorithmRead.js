import React from 'react';
import { connect } from 'react-redux';

import * as AuthAction from '../../../store/action/auth';
import classes from './AlgorithmRead.module.css';
import Tree from '../TreeSpace/Tree';






const AlgorithmRead = (props) => {

    // if (Object.prototype.isPrototypeOf(props.treeData) && Object.keys(props.treeData).length === 0) {
    //     props.getTree()
    // }
    return (
        <React.Fragment>
            <div className={classes.body}>
                <Tree treeData={props.spaceTreeData} readMode={true}/>
            </div>

        </React.Fragment>

    );
};
const mapStateToProps = state => {

    return {
        treeData: state.code.treeData,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getTree: () => dispatch(AuthAction.getTree())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlgorithmRead);
