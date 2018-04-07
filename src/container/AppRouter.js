import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AppProvider } from '../AppContext';
import { repository } from '../modules/data';

import Page from './Page';
import RepositoryLink from '../components/RepositoryLink';

const AppRouter = () => (
  <React.Fragment>
    <div className='app'>
      <BrowserRouter>
        <AppProvider>
          <Switch>
            <Route exact path='/' component={Page} />
            <Route exact path='/calculations/:calculation' component={Page} />
          </Switch>
        </AppProvider>
      </BrowserRouter>
    </div>

    <RepositoryLink {...repository} />
  </React.Fragment>
);

export default AppRouter;
