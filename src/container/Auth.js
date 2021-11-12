import React from 'react';

import Authenticaton from '../component/Authentication/Authentication'
import ParticlesBg from 'particles-bg'

const Timetoolbar = (props) => {


    return (
        <React.Fragment>
            <Authenticaton history={props.history}/> 
            <ParticlesBg type="circle" bg={true} />
  
        </React.Fragment>
        
    );
};

export default Timetoolbar;