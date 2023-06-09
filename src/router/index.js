import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import MySupportsView from '@/views/supports/MySupportsView.vue'
import ModulesAndLessons from '@/views/modules/ModulesAndLessons.vue'
import AuthView from '@/views/auth/AuthView.vue'
import ForgetPasswordView from '@/views/auth/ForgetPasswordView'
import ResetPasswordView from '@/views/auth/ResetPasswordView'

import store from "@/store"
import { TOKEN_NAME } from "@/configs"

const routes = [
  {
    path: '/campus',
    component: () => import('@/layouts/DefaultTemplate.vue'),
    children: [
      {
        path: 'modulos',
        name: 'campus.modules',
        component:ModulesAndLessons
      },
      {
        path: 'minhas-duvidas',
        name: 'campus.my.supports',
        component:MySupportsView
      },
      {
        path: '',
        name: 'campus.home',
        component:HomeView
      },
      
      
    ]
  },
  {
    path: '/',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/recuperar-senha',
    name: 'forget.password',
    component: ForgetPasswordView
  },
  {
    path: '/reset/:token',
    name: 'reset-senha',
    component: ResetPasswordView,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, _, next) => {
  const loggedIn = store.state.users.loggedIn
  if (to.name != 'reset.password' && !loggedIn) {
    const token = await localStorage.getItem(TOKEN_NAME)
    if (!token && to.name != 'auth' && to.name != 'forget.password') {
      return router.push({name: 'auth'})
    }

    await store.dispatch('getMe')
                .catch(() => {
                  if (to.name != 'auth') return router.push({name: 'auth'})
                })
  }

  next()
})

export default router
