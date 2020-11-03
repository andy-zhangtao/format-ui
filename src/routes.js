import React from 'react';
import { Redirect } from 'react-router-dom';
import Index from './compoment/index'

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />
  },
  {
    route: '*',
    component: Index,
    routes: [

    ]
  },

];

export default routes;
