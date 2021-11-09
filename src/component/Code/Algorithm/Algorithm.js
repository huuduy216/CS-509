import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Algorithm.module.css';
import { Button, Divider } from 'antd';
import { AppstoreAddOutlined, MergeCellsOutlined, SaveOutlined, SelectOutlined } from '@ant-design/icons';
import Tree from '../TreeSpace/Tree';
import * as codeActions from "../../../store/action/code";



const Algorithm = (props) => {
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
     const sendSaveRequest = (values) => {
   
       return ()=>{
        console.log(values)
        props.save(values);
       }
    
  }
  const  addRootElement =()=> {
    console.log(props);
    const key = props.treeData.length ? `${props.treeData.length }` : "1";
    const newNode = { 
        children: undefined,
        // changeTitle: this.changeTitle(id),
        // removeNode: this.removeNode(id),
        // addChild: this.addChild(id),
        // addAlgorithm:this.addAlgorithmChildNode(id),
         key,
        title: "Classfifcation",
    };
    
    const treeData = [...props.treeData, newNode];
    console.log(treeData)
     props.addRoot(treeData,key);
     
}
    // const treeData = [
    //     {
    //       title: "0-0",
    //       key: "0-0",
    //       children: [
    //         {
    //           title: "0-0-0",
    //           key: "0-0-0",
    //           children: [
    //             { title: "0-0-0-0", key: "0-0-0-0" },
    //             { title: "0-0-0-1", key: "0-0-0-1" },
    //             { title: "0-0-0-2", key: "0-0-0-2" },
    //           ],
    //         },
    //         {
    //           title: "0-0-1",
    //           key: "0-0-1",
    //           children: [
    //             { title: "0-0-1-0", key: "0-0-1-0" },
    //             { title: "0-0-1-1", key: "0-0-1-1" },
    //             { title: "0-0-1-2", key: "0-0-1-2" },
    //           ],
    //         },
    //         {
    //           title: "0-0-2",
    //           key: "0-0-2",
    //         },
    //       ],
    //     },
    //     {
    //       title: "0-1",
    //       key: "0-1",
    //       children: [
    //         { title: "0-1-0-0", key: "0-1-0-0" },
    //         { title: "0-1-0-1", key: "0-1-0-1" },
    //         { title: "0-1-0-2", key: "0-1-0-2" },
    //       ],
    //     },
    //     {
    //       title: "0-2",
    //       key: "0-2",
    //     },
    //   ];

    let role = localStorage.getItem('role');

    let Editbutton = (
        <div className={classes.headerRest}>
            <Button type="primary" className={classes.EditButton} >Merge Selected</Button>
        </div>
    );

    const saveClick = () => {
        console.log(props.treeData);
    }

    if (role === "user") {
        Editbutton = (
            <div className={classes.headerRest}>
                <Button type="primary" className={classes.EditButton} onClick ={addRootElement} icon={<AppstoreAddOutlined />}>Add Classfifcation</Button>
            
                <Button type="primary" className={classes.EditButton} icon={<SelectOutlined />}>Merge Selected</Button>
                <Button type="primary" className={classes.EditButton} icon={<MergeCellsOutlined />}>Merge</Button>
                <Button type="primary" className={classes.EditButton} icon={<SaveOutlined />} onClick ={sendSaveRequest(props.treeData)}>Save</Button>
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
     console.log("sstttt",state)
    return {
        treeData: state.code.treeData,
        edit: state.code.edit,
        role: state.auth.role

    };
}
const mapDispatchToProps = dispatch => {
  return {
      save: (treeData) => dispatch(codeActions.save(treeData)),
      addRoot : (treeData,key) => dispatch(codeActions.addRoot(treeData,key))
      
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Algorithm);