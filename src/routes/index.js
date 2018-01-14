import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import List from '../pages/list';

// router config
const router = [
  {
    path: '/',
    exact: true,
    render: props => <Redirect to='/new' />
  },
  {
    path: '/new',
    component: List
  },
  {
    path: '/recommend',
    component: List
  },
  {
    path: '/local',
    component: List
  }
];

const routes = router.map((route, index) => {
  return <Route key = { index } { ...route } />;
})

export default routes;