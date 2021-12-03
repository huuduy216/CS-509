import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../container/Home'
import Employee from '../container/Employee'
import UserHome from '../container/UserHome'
import Content from '../container/Content'
import Auth from '../container/Auth'
import AuthRegister from '../container/AuthReg'
import Loading from '../container/Loading';

//user router authoirzation
import SafeRoute from './SafeRoute'
import Users from '../container/Users'


const Routes = (props) => {




    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Auth} exact />
            <Route path="/register" component={AuthRegister} exact />
            <SafeRoute path="/employee" component={Employee} exact/>
            <SafeRoute path="/content" component={Content} exact/>
            <SafeRoute path="/userhome" component={UserHome} exact/>
            <SafeRoute path="/loading" component={Loading} exact />
            <SafeRoute path ="/users" component ={Users} exact/>
        </Switch>

    )
}



export default Routes;