import React from 'react';

import Authenticaton from '../component/Authentication/Authentication'

const Timetoolbar = (props) => {


    return (
        <React.Fragment>
            <Authenticaton history={props.history}/>   
        </React.Fragment>
        
    );
};

export default Timetoolbar;