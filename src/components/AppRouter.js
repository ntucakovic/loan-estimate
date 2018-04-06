import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AppProvider } from '../AppContext';
import { repository } from '../modules/data';

import CreditInputPage from '../container/CreditInputPage';
import RepositoryLink from './RepositoryLink';

const AppRouter = () => (
  <React.Fragment>
    <div className='app'>
      <BrowserRouter>
        <AppProvider>
          <Switch>
            <Route exact path='/' component={CreditInputPage} />
            <Route exact path='/calculations/:calculation' component={CreditInputPage} />
          </Switch>
        </AppProvider>
      </BrowserRouter>
    </div>

    <RepositoryLink {...repository} />
  </React.Fragment>
);

export default AppRouter;
