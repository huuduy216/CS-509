import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Algorithm.module.css';
import { Button, Divider } from 'antd';
import { AppstoreAddOutlined, FunctionOutlined, MergeCellsOutlined, SaveOutlined } from '@ant-design/icons';

import Tree from '../TreeSpace/Tree';

const Algorithm = (props) => {

    let role = localStorage.getItem('role');

    let Editbutton = (
        <div className={classes.headerRest}>
            <Button type="primary" className={classes.EditButton} >Merge Selected</Button>
        </div>
    );

    if (role === "user") {
        Editbutton = (
            <div className={classes.headerRest}>
                <Button type="primary" className={classes.EditButton} icon={<MergeCellsOutlined />}>Merge Selected</Button>
                <Button type="primary" className={classes.EditButton} icon={<FunctionOutlined />}>Add Algorithm</Button>
                <Button type="primary" className={classes.EditButton} icon={<AppstoreAddOutlined />}>Add Classfifcation</Button>
                <Button type="primary" className={classes.EditButton} icon={<SaveOutlined />}>Save</Button>
            </div>
        );
    }




    return (
        <React.Fragment>
            <div className={classes.header}>
                {Editbutton}
            </div>
            <Divider />
            <Tree treeData={props.treeData} />

        </React.Fragment>

    );
};
const mapStateToProps = state => {

    return {
        treeData: state.code.treeData,
        edit: state.code.edit,
        role: state.auth.role

    };
}

export default connect(mapStateToProps, null)(Algorithm);