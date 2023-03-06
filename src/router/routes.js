
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'home', meta: { id: 1, name: 'Home', authRequired: true }, component: () => import('pages/Index.vue') },
      // { path: 'search', name: 'search', meta: { id: 2, name: 'Search', authRequired: true }, component: () => import('pages/Search.vue') },
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'login', name: 'auth.login', meta: { name: 'Login', authRequired: false }, component: () => import('pages/Login.vue') },
      // { path: 'register', name: 'auth.register', meta: { name: 'Register', authRequired: false }, component: () => import('pages/Register.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
