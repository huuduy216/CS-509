import React from 'react';

import Authenticaton from '../component/AuthenticationReg/AuthenticationReg'
import ParticlesBg from 'particles-bg'

const Timetoolbar1 = (props) => {


    return (
        <React.Fragment>
            <Authenticaton history={props.history} />
            <ParticlesBg type="circle" bg={true} />

        </React.Fragment>

    );
};

export default Timetoolbar1;