import React  from 'react'
import { connect } from 'react-redux';
import classes from "./UserContent.module.css"
import { List, Avatar, } from 'antd';
import * as authActions from "../../store/action/auth"
const Usercontent = (props)=>{

    const deleteItem = (item)=>{
        props.deleteUser(item);
        props.SetUserActivityData( [{
            "Name":"User1",
        "History" : " did this",
        "Id":"1"
      
      
    }])
      
    }
    return (
        <React.Fragment>
            <div  className = {classes.demo}>
         <List
    itemLayout="horizontal"
    dataSource={props.userActivityData}
    renderItem={item => ( 
      <List.Item
      actions={[<button onClick= {()=>deleteItem ({item})} key="list-loadmore-edit">delete</button>]}
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
const mapDispatchToProps = dispatch => {
    return {
       
       
        deleteUser : (id) => dispatch(authActions.deleteUser(id)),
    }
}
export default connect(null, mapDispatchToProps)(Usercontent);
