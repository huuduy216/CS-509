import React from 'react';
import Login from '../../../UI/Link/Login';
import classes from './NavgationItems.module.css';
const nevigationItems = () => (
    <ul className={classes.NavigationItems}>
        <li className={classes.li}>
            <Login link="/" exact>
                    Burger Builder
            </Login>
        </li>
        <li>
            <Login link="/orders">
                    Orders
            </Login>
        </li>

    </ul>
)

export default nevigationItems;