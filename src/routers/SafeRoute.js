import React from 'react';
import {Redirect, Route} from 'react-router-dom'




function SafeRoute({component:Children,...rest}){


    return (
        
        <Route
        {...rest}
        render=
        {() =>
            {
            let auth =  localStorage.getItem('timesheetisAuthenticated')
            if(auth){return  <Children/>}
            else{return   <Redirect to={'/login'}/>} 
            }
        }
        />
    );
};

export default SafeRoute;