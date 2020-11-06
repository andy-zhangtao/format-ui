import React from 'react';
import { Redirect } from 'react-router-dom';
import Index from './compoment/index'

const routes = [
  {
    path: '/',
    exact: true,
    strict: true,
    component: Index,
  },
];

export default routes;
