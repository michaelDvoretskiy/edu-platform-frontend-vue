import { createRouter, createWebHistory } from 'vue-router'
import { locales, getLocale, setLocale } from "../locales";

const routes = [
    { path: '/', redirect: to => `/uk`},
    {
      path: '/:locale?',
      children: [{
        path: '',
        name: 'Home',
        component: () => import('../views/myTheme/Home.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/myTheme/About.vue')
      }]
    }
  ];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const { locale } = to.params
  if((!locale && to.name)) {
    return next({name: to.name, params: {... to.params, locale: getLocale()}});
  }
  if (locales.indexOf(locale) == -1) {
    to.params.locale = getLocale();
    return next({name: to.name, params: to.params})
  }
  setLocale(to.params.locale)
  return next()
})


export default router
