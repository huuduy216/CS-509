import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Algorithm.module.css';
import { Button, Divider } from 'antd';
import { AppstoreAddOutlined, FunctionOutlined, MergeCellsOutlined, SaveOutlined } from '@ant-design/icons';

<<<<<<< HEAD
import Tree from '../TreeSpace/Tree';

const Algorithm = (props) => {
=======


const Algorithm = (props) => {
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    
    const treeData = [
        {
          title: "0-0",
          key: "0-0",
          children: [
            {
              title: "0-0-0",
              key: "0-0-0",
              children: [
                { title: "0-0-0-0", key: "0-0-0-0" },
                { title: "0-0-0-1", key: "0-0-0-1" },
                { title: "0-0-0-2", key: "0-0-0-2" },
              ],
            },
            {
              title: "0-0-1",
              key: "0-0-1",
              children: [
                { title: "0-0-1-0", key: "0-0-1-0" },
                { title: "0-0-1-1", key: "0-0-1-1" },
                { title: "0-0-1-2", key: "0-0-1-2" },
              ],
            },
            {
              title: "0-0-2",
              key: "0-0-2",
            },
          ],
        },
        {
          title: "0-1",
          key: "0-1",
          children: [
            { title: "0-1-0-0", key: "0-1-0-0" },
            { title: "0-1-0-1", key: "0-1-0-1" },
            { title: "0-1-0-2", key: "0-1-0-2" },
          ],
        },
        {
          title: "0-2",
          key: "0-2",
        },
      ];
>>>>>>> ce3d5eb104d19c3b4b223010ba2ede35f1616a5a

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