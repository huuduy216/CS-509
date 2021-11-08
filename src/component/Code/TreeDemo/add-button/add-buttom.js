import React from "react";
import classes from "./add-button.module.css";
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const AddButton = ({ onClick }) => {
  return (
    <div className="AddButton">

      <Button
        className={classes.AddButton}
        size="small"
        type="primary"
        icon={<PlusOutlined />}
        onClick={onClick}
      >New Classification</Button>


    </div>
  );
}

export default AddButton;