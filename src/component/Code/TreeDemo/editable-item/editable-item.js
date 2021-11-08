import React from "react";
import classes from "./editable-item.module.css";
import { Button, Input } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const EditableItem = (props) => {
  const { title, changeTitle, removeNode, addChild,addAlgorithm } = props;

  let input = (
    <input
      className={classes.normal_input}
      onChange={(e) => { changeTitle(e.target.value) }}
      value={title}
      placeholder="New"
      
    />);

  let addButton = (
    <Button
      className={classes.button}
      size="small"
      type="primary"
      icon={<PlusOutlined />}
      onClick={addChild}
    />);



  let deleteButton = (
    <Button
      className={classes.button}
      type="danger"
      size="small"
      icon={<DeleteOutlined />}
      onClick={removeNode}
    />
  );

  let addAlgorithmButton =(
    <Button
      className={classes.button}
      type="danger"
      size="small"
      icon={<PlusOutlined />}
      onClick={addAlgorithm}
    >Add Algorithm</Button>
  );

  if (title === "Algorithm" || title === "Problem Instances" || title === "") {
    addButton = (
      <Button
        className={classes.button}
        size="small"
        type="primary"
        icon={<PlusOutlined />}
        onClick={addChild}
      />);
  }
  if (title === "Algorithm" || title === "Implementations" || title === "Problem Instances") {

    deleteButton = (
      <Button
        className={classes.button}
        type="danger"
        size="small"
        icon={<DeleteOutlined />}
        onClick={removeNode}
      />)

  }

  if (title === "Algorithm" || title === "Problem Instances" ||title === "Implementations" ) {
    input = (
      <input
        className={classes.normal_input}
        onChange={(e) => { changeTitle(e.target.value) }}
        value={title}
        placeholder="New Item"
        disabled
      />);
  }
// if(title === "Algorithm"){
//   editableItem = (deleteButton,input,addProblemInstance,addImplementation)
// }

  return (
   
    <div className="EditableItem">
      {addButton}
      {deleteButton}
      {addAlgorithmButton}
      {input}
      
    </div>
  );
}

export default EditableItem;