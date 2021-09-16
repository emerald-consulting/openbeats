import React, { useState } from 'react';
import LandingNav from '../nav/LandingNav';
import LandingBody from './LandingBody';
import Shell from '../Shell';
import LandingFooter from './LandingFooter';
import LandingCTA from './LandingCTA';
import LandingAbout from './LandingAbout';
import LandingAbout2 from './LandingAbout2';
/**
 * The landing page for unauthenticated users.
 */
const Landing = () => {

    return (
        <>
            <LandingNav
            />
            <Shell>
                <LandingBody />
                <LandingAbout/>
                <LandingAbout2/>
                <LandingCTA/>
                <LandingFooter/>
            </Shell>
        </>
    )
};

export default Landing;
