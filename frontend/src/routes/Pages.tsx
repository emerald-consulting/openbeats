import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Activity from '../components/dashboard/Activity'
import Feed from '../components/dashboard/Feed'
import About from '../components/landing/about/About'
import Landing from '../components/landing/landing/LandingMain'
import Login from '../components/landing/login/Login'
import Register from '../components/landing/login/Register'
import ResetPassword from '../components/landing/login/ResetPassword'
import NotFound from '../components/notFound/NotFound'
import Pricing from '../components/pricing/Pricing'
import Settings from '../components/settings/Settings'
import LoggedInRoute from './LoggedInRoute'
import LoggedOutRoute from './LoggedOutRoute'

const Pages: React.FC = () => {
  return (
    <Switch>
      <LoggedOutRoute exact path="/" component={Landing} />
      <LoggedOutRoute exact path="/login" component={Login} />
      <LoggedOutRoute exact path="/register" component={Register} />
      <LoggedOutRoute exact path="/about" component={About} />
      <LoggedInRoute exact path="/feed" component={Feed} />
      <LoggedInRoute exact path="/activity" component={Activity} />
      <LoggedInRoute exact path="/settings" component={Settings} />
      <LoggedOutRoute exact path="/pricing" component={Pricing} />
      <LoggedOutRoute exact path="/reset" component={ResetPassword} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Pages
