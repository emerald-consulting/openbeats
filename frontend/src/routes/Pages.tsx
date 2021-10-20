import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Feed from '../components/dashboard/Feed';
import LoggedOutRoute from './LoggedOutRoute';
import LoggedInRoute from './LoggedInRoute';
import NotFound from '../components/notFound/NotFound';
import Landing from '../components/landing/landing/LandingMain';
import Register from '../components/landing/login/Register';
import Login from '../components/landing/login/Login';
import Settings from '../components/settings/Settings';
import About from '../components/landing/about/About';
import Pricing from '../components/pricing/Pricing';
import Activity from '../components/dashboard/Activity';
import ResetPassword from '../components/landing/login/ResetPassword';

const Pages = () => {
  return (
    <Switch>
      <LoggedOutRoute path="/" component={Landing} />
      <LoggedOutRoute path="/login" component={Login} />
      <LoggedOutRoute path="/register" component={Register} />
      <LoggedOutRoute path="/about" component={About} />
      <LoggedInRoute path="/feed" component={Feed} />
      <LoggedInRoute path="/activity" component={Activity} />
      <LoggedInRoute path="/settings" component={Settings} />
      <LoggedOutRoute path="/pricing" component={Pricing} />
      <LoggedOutRoute path="/reset" component={ResetPassword} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Pages;
