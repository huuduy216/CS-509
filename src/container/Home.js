import React from 'react'
import Toolbar from '../component/Navigation/Toolbar/Toolbar'
import Code from '../component/Code/Code'

import ParticlesBg from 'particles-bg'
function Index(){
    return (
        <React.Fragment>
            <Toolbar/>
            <Code/>
            <ParticlesBg type="circle" bg={true} />

        </React.Fragment>
    )
}

export default Index;