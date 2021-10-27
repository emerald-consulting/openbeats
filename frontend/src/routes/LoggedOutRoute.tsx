import React from 'react'

import { Route } from 'react-router-dom'

import LandingNav from '../components/nav/LandingNav'

interface Props {
  path: string
  component: React.ComponentType<any>
  exact?: boolean
}

const LoggedOutRoute: React.FC<Props> = ({
  path,
  component: Component,
  exact = false,
}: Props) => {
  return (
    <Route
      path={path}
      exact={exact}
      component={Component}
      render={() => (
        <>
          <LandingNav />
          <Component />
        </>
      )}
    />
  )
}

export default LoggedOutRoute
