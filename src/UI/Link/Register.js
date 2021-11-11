import React from 'react';
import classes from './Register.module.css'
import { NavLink } from 'react-router-dom';

const nevigationItem = (props) => (
    <div className={classes.divReg} style={{display: props.displayLogin}}>
        <NavLink className={classes.NavigationItem}
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active} 
            onClick={props.HandleClick}>
            {props.children}
        </NavLink>
    </div>
);

export default nevigationItem;