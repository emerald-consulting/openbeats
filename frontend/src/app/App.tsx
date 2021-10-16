import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import Pages from '../routes/Pages';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const App = () => {

   
    const isAuthenticated = true; // placeholder for now
    
    const app = (isAuthenticated === null ? null :
        (
            <BrowserRouter>
                <Route component={Pages} />
            </BrowserRouter>
        )
    );

    return (
        <>
            {app}
        </>
    );
};

export default App;