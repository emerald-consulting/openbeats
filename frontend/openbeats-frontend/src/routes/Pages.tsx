import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';

import Dashboard from '../components/dashboard/Dashboard';
import LoggedOutRoute from './LoggedOutRoute';
import LoggedInRoute from './LoggedInRoute';
import NotFound from '../components/notFound/NotFound';
import Landing from '../components/landing/landing/LandingMain';
import Register from '../components/landing/login/Register';
import Login from '../components/landing/login/Login';
import Example from '../components/dashboard/Example';
import Settings from '../components/settings/Settings'
import About from '../components/landing/about/About';

const Pages = () => {


    return (
        <Switch>
            <LoggedOutRoute path='/' exact={true} component={Landing} />
            <LoggedOutRoute path='/login' exact={true} component={Login} />
            <LoggedOutRoute path='/register' exact={true} component={Register} />
            <LoggedOutRoute path='/about' exact={true} component={About} />
            <LoggedInRoute path='/dashboard' exact={true} component={Dashboard} />
            <LoggedInRoute path='/example' exact={true} component={Example} />
            <LoggedInRoute path='/settings' exact={true} component={Settings} />


            <Route component={NotFound} />
        </Switch>
    )
}

export default Pages;
