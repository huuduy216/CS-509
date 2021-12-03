import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import classes from "./UserContent.module.css"
import { List, Avatar, } from 'antd';

const content = (props)=>{

    const clicked = (item)=>{
        console.log(item);
    }
    return (
        <React.Fragment>
            <div  className = {classes.demo}>
         <List
    itemLayout="horizontal"
    dataSource={props.userActivityData}
    renderItem={item => ( 
      <List.Item
      actions={[<button onClick= {()=>clicked ({item})} key="list-loadmore-edit">delete</button>]}
      >
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={item.Name}
          description={item.History}
        />
      </List.Item>
    )}
  />
  </div>,
        </React.Fragment>
    )
}
export default content;