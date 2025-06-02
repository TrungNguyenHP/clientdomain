import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Domains from '@/pages/Domains.vue'
import RegisterDomain from '@/pages/RegisterDomain.vue'
import Checkout from '@/pages/Checkout.vue'
import News from '@/pages/News.vue'
import Renew from '@/pages/Renew.vue'
import Profile from '@/pages/Profile.vue'
import UserServices from '@/pages/UserServices.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import OrderSuccess from '@/pages/OrderSuccess.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import ChangePassword from '@/pages/ChangePassword.vue'
import Cancelled from '@/pages/Cancelled.vue'
import ResetPassword from '@/pages/ResetPassword.vue'
const routes = [
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'domains', name: 'Domains', component: Domains },
      { path: 'registerdomain/:domain', name: 'RegisterDomain', component: RegisterDomain },
      { path: 'checkout', name: 'Checkout', component: Checkout },
      { path: 'news', name: 'News', component: News },
      { path: 'renew', name: 'Renew', component: Renew },
      { path: 'profile', name: 'Profile', component: Profile },
      { path: 'profile/userservices', name: 'UserServices', component: UserServices },
      { path: 'OrderSuccess', name: 'OrderSuccess', component: OrderSuccess },
      { path: 'change-password', name: 'ChangePassword', component: ChangePassword },
      { path: 'profile/cancelled', name: 'Cancelled', component: Cancelled },
    ],
  },
  {
    path: '/login',
    component: GuestLayout,
    children: [
      { path: '', name: 'Login', component: Login },
    ],
  },
  {
    path: '/register',
    component: GuestLayout,
    children: [
      { path: '', name: 'Register', component: Register },
    ],
  },
  {
    path: '/forgot-password',
    component: GuestLayout,
    children: [
      { path: '', name: 'ForgotPassword', component: ForgotPassword },
    ],
  },
  {
    path: '/reset-password',
    component: GuestLayout,
    children: [
      { path: '', name: 'ResetPassword', component: ResetPassword },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})



export default router
