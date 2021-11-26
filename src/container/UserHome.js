import React from 'react'

import { connect } from 'react-redux';
import * as AuthAction from '../store/action/auth';
import Toolbar from '../component/Navigation/Toolbar/Toolbar'
import ParticlesBg from 'particles-bg'

const UserHome = (props) => {

    return (
        <React.Fragment>
            <Toolbar />
            <ParticlesBg type="cobweb" bg={true} />
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {

        changeTree: (treeData) => dispatch(AuthAction.changeTree(treeData)),

    }
}

export default connect(null, mapDispatchToProps)(UserHome);