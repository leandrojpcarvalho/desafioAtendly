import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/Main.view.vue'
import RegisterForm from '../components/RegisterForm.vue'
import LoginForm from '../components/LoginForm.vue'

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
  ],
})

export default router
