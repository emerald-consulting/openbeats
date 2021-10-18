import { Route, Switch } from 'react-router-dom';

import Feed from '../components/dashboard/Feed';
import LoggedOutRoute from './LoggedOutRoute';
import LoggedInRoute from './LoggedInRoute';
import NotFound from '../components/notFound/NotFound';
import Landing from '../components/landing/landing/LandingMain';
import Register from '../components/landing/login/Register';
import Login from '../components/landing/login/Login';
import Settings from '../components/settings/Settings'
import About from '../components/landing/about/About';
import Pricing from '../components/pricing/Pricing';
import Activity from '../components/dashboard/Activity';
import ResetPassword from '../components/landing/login/ResetPassword';

const Pages = () => {


    return (
        <Switch>
            <LoggedOutRoute path='/' exact={true} component={Landing} />
            <LoggedOutRoute path='/login' exact={true} component={Login} />
            <LoggedOutRoute path='/register' exact={true} component={Register} />
            <LoggedOutRoute path='/about' exact={true} component={About} />
            <LoggedInRoute path='/feed' exact={true} component={Feed} />
            <LoggedInRoute path='/activity' exact={true} component={Activity} />
            <LoggedInRoute path='/settings' exact={true} component={Settings} />
            <LoggedOutRoute path='/pricing' exact={true} component={Pricing} />
            <LoggedOutRoute path='/reset' exact={true} component={ResetPassword} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Pages;
