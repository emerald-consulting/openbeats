import React, { useState } from 'react';
import LandingNav from '../nav/LandingNav';
import LandingBody from './LandingBody';

/**
 * The landing page for unauthenticated users.
 */
const Landing = () => {

    return (
        <>
            <LandingNav
            />
            <LandingBody />
        </>
    )
};

export default Landing;
