import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';

import Dashboard from '../components/dashboard/Dashboard';
import LoggedOutRoute from './LoggedOutRoute';
import LoggedInRoute from './LoggedInRoute';
import NotFound from '../components/notFound/NotFound';
import Landing from '../components/landing/LandingMain';
import Register from '../components/landing/Register';
import Login from '../components/landing/Login';
import Example from '../components/dashboard/Example';

const Pages = () => {


    return (
        <Switch>
            <LoggedOutRoute path='/' exact={true} component={Landing} />
            <LoggedOutRoute path='/login' exact={true} component={Login} />
            <LoggedOutRoute path='/register' exact={true} component={Register} />
            <LoggedInRoute path='/dashboard' exact={true} component={Dashboard} />
            <LoggedInRoute path='/example' exact={true} component={Example} />

            <Route component={NotFound} />
        </Switch>
    )
}

export default Pages;
