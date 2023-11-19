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
      path: "/hubStaff/newOrder",
      name: "newOrder",
      component: ()=>import('../views/HubStaff/NewOrders.vue')
    },
    {
      path: "/hubStaff/manage-orders",
      name: "manageOrders",
      component: ()=>import('../views/HubStaff/ManageOrders.vue')
    },
    {
      path: "/hubStaff/orderDetail?:id",
      name: "orderDetail",
      component: ()=>import('../views/HubStaff/OrderDetail.vue')
    },
    {
      path: "/supervisor/manage-accounts",
      name: "manageAccounts",
      component: ()=>import('../views/Supervisor/ManageAccounts.vue')
    },
    {
      path: "/supervisor/createAccount",
      name: "createAccount",
      component: ()=>import('../views/Supervisor/CreateAccount.vue')
    },
    {
      path: "/supervisor/accountDetail?:id",
      name: "accountDetail",
      component: ()=>import('../views/Supervisor/AccountDetail.vue')
    },
    {
      path: "/supervisor/manage-hubs",
      name: "manageHubs",
      component: ()=>import('../views/Supervisor/ManageHub.vue')
    },
    {
      path: "/supervisor/manage-warehouses",
      name: "manageWarehouses",
      component: ()=>import('../views/Supervisor/ManageWarehouse.vue')
    },
    {
      path: "/manager/createAccount",
      name: "createAccountByManager",
      component: ()=>import('../views/Manager/CreateAccountByManager.vue')
    },
    
  ]
})

export default router
