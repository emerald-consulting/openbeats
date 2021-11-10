import React from 'react'

import { Route } from 'react-router-dom'

import LandingNav from '../components/nav/LandingNav'

interface Props {
  exact?: boolean
  path: string
  component: React.ComponentType<any>
}
const LoggedOutRoute = ({ component: Component, ...otherProps }: Props) => {
  return (
    <>
      <Route
        render={otherProps => (
          <>
            <LandingNav />
            <Component {...otherProps} />
          </>
        )}
      />
    </>
  )
}

export default LoggedOutRoute
