import React from 'react';
import { connect } from 'react-redux';

import classes from './Algorithm.module.css';
import { Button, Divider } from 'antd';
import { AppstoreAddOutlined, MergeCellsOutlined, SaveOutlined, SelectOutlined } from '@ant-design/icons';
import Tree from '../TreeSpace/Tree';
import Loading from '../../../UI/Loading/Loading';

import * as CodeAction from '../../../store/action/code';
import * as AuthAction from '../../../store/action/auth';


const Algorithm = (props) => {



    let role = localStorage.getItem('role');

    let Editbutton = (
        <div className={classes.headerRest}>
            <Button type="primary" className={classes.EditButton} >Merge Selected</Button>
        </div>
    );

    const saveClick = () => {
        console.log(props.treeData);
        props.postTree(props.treeData);
        props.loadingtime(2000);
        window.location.reload(false);

    }

    if (role === "user") {
        Editbutton = (
            <div className={classes.headerRest}>
                <Button onClick={() => { props.addClass(props.treeData) }} type="primary" className={classes.EditButton} icon={<AppstoreAddOutlined />}>Add Classfifcation</Button>
                <Button onClick={() => { console.log(props.treeDataEmpty) }} type="primary" className={classes.EditButton} icon={<SelectOutlined />}>Merge Selected</Button>
                <Button type="primary" className={classes.EditButton} icon={<MergeCellsOutlined />}>Merge</Button>
                <Button onClick={() => saveClick()} type="danger" className={classes.EditButton} icon={<SaveOutlined />}>Save</Button>
            </div>
        );
    }

    if (Object.prototype.isPrototypeOf(props.treeData) && Object.keys(props.treeData).length === 0 && !props.treeDataEmpty) {
        props.getTree()
    }

    let algor = (
        <div className={classes.background}>
            <div className={classes.header}>
                {Editbutton}
            </div>
            <Divider />
            <Tree treeData={props.treeData} />
        </div>
    )

    if (props.loading) {
        algor = (<Loading />)
    }

    return (
        <React.Fragment>
            {algor}
        </React.Fragment>

    );
};
const mapStateToProps = state => {

    return {
        treeData: state.code.treeData,
        edit: state.code.edit,
        role: state.auth.role,
        loading: state.auth.loading,
        treeDataEmpty: state.code.treeDataEmpty
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addClass: (treeData) => dispatch(CodeAction.treeClassificationAddClick(treeData)),
        postTree: (treeData) => dispatch(CodeAction.postTree(treeData)),
        changeTree: (treeData) => dispatch(AuthAction.changeTree(treeData)),
        loadingtime: (time) => dispatch(AuthAction.setLoadingTime(time)),
        getTree: () => dispatch(AuthAction.getTree())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Algorithm);