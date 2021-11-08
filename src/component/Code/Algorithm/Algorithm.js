import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Algorithm.module.css';
import { Button, Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';



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

    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.

        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    let Editbutton = (
        <div className={classes.headerRest}>
            <Button type="primary" className={classes.EditButton} size="large" danger>Delete</Button>
            <Button type="primary" className={classes.EditButton} size="large">ADD</Button>
            <Button type="primary" className={classes.EditButton} size="large">Merge Selected</Button>
        </div>
    );

    if (props.role === "user") {
        Editbutton = (
            <div className={classes.headerRest}>
                <Button type="primary" className={classes.EditButton} size="large">ADD</Button>
                <Button type="primary" className={classes.EditButton} size="large">Merge Selected</Button>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className={classes.header}>
                <p className={classes.p}>Algorithm</p>
                {Editbutton}
            </div>
            <Tree
                className={classes.tree}
                checkable
                onExpand={onExpand}
                defaultExpandedKeys={['0-0-0-0-1-0-0-0-1']}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={treeData}
            />
        </React.Fragment>

    );
};
const mapStateToProps = state => {

    return {
        edit: state.code.edit,
        role: state.auth.role

    };
}

export default connect(mapStateToProps, null)(Algorithm);