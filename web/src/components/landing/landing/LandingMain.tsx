import React from 'react'

import Shell from '../../Shell'
import LandingAbout from './LandingAbout'
import LandingAbout2 from './LandingAbout2'
import LandingBody from './LandingBody'
import LandingCTA from './LandingCTA'
import LandingFooter from './LandingFooter'

/**
 * The landing page for unauthenticated users.
 */
const Landing: React.FC = () => {
  return (
    <Shell>
      <LandingBody />
      <LandingAbout />
      <LandingAbout2 />
      <LandingCTA />
      <LandingFooter />
    </Shell>
  )
}

export default Landing
