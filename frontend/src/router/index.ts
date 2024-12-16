import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/Main.view.vue'
import RegisterForm from '../components/RegisterForm.vue'
import LoginForm from '../components/LoginForm.vue'
import LoggedView from '../views/Logged.view.vue'
import Card from '../components/Card.vue'
import store from '../store'
import HomePage from '../components/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainView,
      children: [
        {
          path: '/register',
          name: 'Register',
          component: RegisterForm,
        },
        {
          path: '/',
          name: 'Login',
          component: LoginForm,
        },
      ],
    },
    {
      path: '/home',
      name: 'Home',
      component: LoggedView,
      children: [
        {
          path: '/home',
          name: 'Inicial',
          component: HomePage,
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Card,
        },
      ],
    },
  ],
})

router.beforeEach(async (Home, Main, next) => {
  await store.dispatch('getInformation')
  const { isLogged } = store.state.frontHandler
  if ((Home.path === '/home' && !isLogged) || (Home.path === '/profile' && !isLogged)) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
