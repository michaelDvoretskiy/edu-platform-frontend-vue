import { createRouter, createWebHistory } from 'vue-router'
import { getLocale, setLocale, checkLocale } from "../locales";
import {Auth} from "/src/services/api/Auth";

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
        },
        {
          path: 'lesson/:lesson',
          name: 'Lesson',
          component: () => import('../views/myTheme/Lesson.vue')
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('../views/myTheme/Login.vue')
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('../views/myTheme/Register.vue')
        },
        {
          path: 'forgot-pass',
          name: 'ForgotPass',
          component: () => import('../views/myTheme/ForgotPass.vue')
        },
        {
          path: 'have-to-login',
          name: 'HaveToLoginInfo',
          component: () => import('../views/myTheme/HaveToLogin.vue')
        },
        {
          path: 'feedback',
          name: 'Feedback',
          component: () => import('../views/myTheme/Feedback.vue'),
          beforeEnter: [checkAuth]
        },
      ]
    }
  ];

function checkAuth(to, from) {
  if (!Auth.isUserLoggedIn()) {
    return { name: 'HaveToLoginInfo' }
  }
}

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
