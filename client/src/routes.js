import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { CreatePage } from './pages/CreatePage';
import { DetailPage } from './pages/DetailPage';
import { LinksPage } from './pages/LinksPage';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/links' exact>
          <LinksPage />
        </Route>
        <Route path='/create' exact>
          <CreatePage />
        </Route>
        <Route path='/detail/:id' >
          <DetailPage />
        </Route>
        <Redirect to='/create' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route to='/'>
        <AuthPage />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}
