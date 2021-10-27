import React from 'react'

import Toolbar from '../component/Navigation/Toolbar/Toolbar'
import Timesheet from '../component/TimeSheet/Timesheet'
import Code from '../component/Code/Code'

function employee() {
    return (
        <React.Fragment>
            <Toolbar/>
             <Code/>
        </React.Fragment>
    )
}

export default employee;