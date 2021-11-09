import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../container/Home'
import Employee from '../container/Employee'
import Auth from '../container/Auth'
import AuthRegister from '../container/AuthReg'
import Loading from '../container/Loading';

//user router authoirzation
import SafeRoute from './SafeRoute'


const Routes = (props) => {




    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Auth} exact />
            <Route path="/register" component={AuthRegister} exact />
            <SafeRoute path="/employee" component={Employee} exact/>
            <SafeRoute path="/loading" component={Loading} exact />
        </Switch>

    )
}



export default Routes;