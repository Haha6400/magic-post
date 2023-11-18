import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: "/login",
      name: "login",
      component: ()=>import('../views/LoginView.vue')
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: ()=>import('../views/ForgotPasswordView.vue')
    },
    {
      path: "/orderStatus",
      name: "orderStatus",
      component: ()=>import('../views/OrderStatus.vue')
    },
    {
      path: "/createAccount",
      name: "createAccount",
      component: ()=>import('../views/CreateAccount.vue')
    },
    {
      path: "/hubManager/newOrder",
      name: "newOrder",
      component: ()=>import('../views/HubManager/NewOrders.vue')
    },
    {
      path: "/hubManager/manage-orders",
      name: "manageOrders",
      component: ()=>import('../views/HubManager/ManageOrders.vue')
    },
    {
      path: "/hubManager/orderDetail?:id",
      name: "orderDetail",
      component: ()=>import('../views/HubManager/OrderDetail.vue')
    },
    {
      path: "/supervisor/manage-accounts",
      name: "manageAccounts",
      component: ()=>import('../views/Supervisor/ManageAccounts.vue')
    },
    
  ]
})

export default router
