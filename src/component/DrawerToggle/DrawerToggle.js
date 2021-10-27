import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './DrawerToggle.module.css'
import DrawerButton from './DrawerButton/DrawerButton'

import { Drawer,Button} from 'antd';
import { MenuOutlined,UserAddOutlined,CalendarOutlined,ShareAltOutlined,ArrowLeftOutlined,ApiOutlined} from '@ant-design/icons';


const Drawtroggle = (props) => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    let adminDrawButton;
    if(props.role==="admin" || localStorage.getItem('timesheetisAuthenticated')==="admin")
    adminDrawButton=( 
    <Drawer
        width="264"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        className={classes.drawer}
    >
     <DrawerButton icon={<UserAddOutlined style={{fontSize:'23px'}}/>} title={"Users"} to ="/users"/>
     <DrawerButton icon={<ArrowLeftOutlined style={{fontSize:'23px'}}/>} title={"Home"} to ="/employee"/>
    </Drawer>
    );

    

    if(props.role==="user" || localStorage.getItem('timesheetisAuthenticated')==="admin")
    adminDrawButton=null;
    // <Drawer
    //     width="264"
    //     placement="left"
    //     closable={false}
    //     onClose={onClose}
    //     visible={visible}
    //     className={classes.drawer}
    // >
    //  <DrawerButton icon={<ArrowLeftOutlined style={{fontSize:'23px'}}/>} title={"Home "} edit={props.editHome}/>
    // </Drawer>
    

    return (
        <React.Fragment>
            <Button type="link" onClick={showDrawer} icon={<MenuOutlined />} style={{ display: props.display }} />
            {adminDrawButton}
        </React.Fragment>
    );
};

const mapStateToProps = state => {

    return {
        role: state.auth.role
    };
}



export default connect(mapStateToProps,null)(Drawtroggle);
