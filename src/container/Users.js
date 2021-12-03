import React from 'react'

import { connect } from 'react-redux';
import * as AuthAction from '../store/action/auth';
import Toolbar from '../component/Navigation/Toolbar/Toolbar'
import UserActivity from "../component/UserActivity/UserActivity"


const Users = (props) => {

    return (
        <React.Fragment>
            <Toolbar />
            <UserActivity/>
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {

        changeTree: (treeData) => dispatch(AuthAction.changeTree(treeData)),

    }
}

export default connect(null, mapDispatchToProps)(Users);