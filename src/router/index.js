import { createRouter, createWebHistory } from 'vue-router'
import { getLocale, setLocale, checkLocale } from "../locales";

const routes = [
    { path: '/', redirect: to => `/uk`},
    {
      path: '/:locale?',
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/myTheme/Home.vue')
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('../views/myTheme/About.vue')
        },
        {
          path: 'categories',
          name: 'Categories',
          component: () => import('../views/myTheme/Categories.vue')
        },
        {
          path: 'courses/:category',
          name: 'Courses',
          component: () => import('../views/myTheme/Categoty.vue')
        },
        {
          path: 'lessons/:course',
          name: 'Lessons',
          component: () => import('../views/myTheme/Course.vue')
        }
      ]
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
  if (locale != checkLocale(locale)) {
    to.params.locale = checkLocale(locale);
    return next({name: to.name, params: to.params})
  }
  setLocale(to.params.locale)
  return next()
})


export default router
