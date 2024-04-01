const Routes = [
  {
    path: '/login',
    component: 'Login',
    isPrivate: false,
  },
  {
    path: '/register',
    component: 'Register',
    isPrivate: false,
  },
  {
    path: '/dashboard',
    component: 'Dashboard',
    isPrivate: true,
  },
  {
    path: '/domains',
    component: 'Domains',
    isPrivate: true,
  },
  {
    path: '/domains/:id',
    component: 'Domain',
    isPrivate: true,
  },
];

export default Routes;
