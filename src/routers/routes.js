import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../container/Home'
import Employee from '../container/Employee'
import Auth from '../container/Auth'
import AuthRegister from '../container/AuthReg'
import Setting from '../container/Setting'
import Loading from '../container/Loading';
import Calendar from '../container/Calendar';

//user router authoirzation
import SafeRoute from './SafeRoute'


const Routes = (props) => {




    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Auth} exact />
            <Route path="/register" component={AuthRegister} exact />
            <Route path ="/users"   component = {Setting} exact/>
            <SafeRoute path="/employee" component={Employee} exact/>
            <SafeRoute path="/setting" component={Setting} exact />
            <SafeRoute path="/loading" component={Loading} exact />
            <SafeRoute path="/calendar" component={Calendar} exact />
        </Switch>

    )
}



export default Routes;