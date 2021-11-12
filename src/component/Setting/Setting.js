import React from 'react';

import classes from './Setting.module.css'
import SettingItem from './SettingItem/SettingItem'



function settings(props) {
    const setting = (
        <div className={classes.background}>
            <p className={classes.title}>Profile settings</p>
            <div className={classes.body}>
                <SettingItem title={"Personal info"}/>
            </div>
        </div>
    )

    return (
        <React.Fragment>
            {setting}
        </React.Fragment>

    );
};

export default settings;