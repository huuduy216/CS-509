import React from 'react'

import Toolbar from '../component/Navigation/Toolbar/Toolbar';
import Setting from '../component/Setting/Setting';

function settings() {
    return (
        <React.Fragment>
            <Toolbar/>
            <Setting/>
        </React.Fragment>
    )
}

export default settings;