import React from 'react';

import Authenticaton from '../component/AuthenticationReg/AuthenticationReg'

const Timetoolbar1 = (props) => {


    return (
        <React.Fragment>
            <Authenticaton history={props.history}/>   
        </React.Fragment>
        
    );
};

export default Timetoolbar1;