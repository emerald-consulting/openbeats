import { Route, BrowserRouter } from 'react-router-dom';
import React from 'react';

import Pages from '../routes/Pages';

const App: React.FC = () => {
  const isAuthenticated = true; // placeholder for now

  const app =
    isAuthenticated === null ? null : (
      <BrowserRouter>
        <Route component={Pages} />
      </BrowserRouter>
    );
  return <>{app}</>;
};

export default App;
