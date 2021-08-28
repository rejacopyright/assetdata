import {lazy} from 'react'

const routes = [
  { path: "/", exact: true, component: lazy(() => import(`views/home`)) },
  { path: "/dashboard", exact: true, component: lazy(() => import(`views/home`)) },
  { path: "/profile", exact: true, component: lazy(() => import(`views/profile`)) },
  { path: "/supplier", exact: true, component: lazy(() => import(`views/supplier`)) },

  // 404
  { path: "*", exact: true, component: lazy(() => import(`views/_layouts/pageNotFound`)) },
];

export default routes
