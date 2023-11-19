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
      name: "newOrderbyHubStaff",
      component: ()=>import('../views/HubStaff/NewOrders.vue')
    },
    {
      path: "/hubStaff/manage-orders",
      name: "manageOrdersbyHubStaff",
      component: ()=>import('../views/HubStaff/ManageOrders.vue')
    },
    {
      path: "/hubStaff/orderDetail?:id",
      name: "orderDetailbyHubStaff",
      component: ()=>import('../views/HubStaff/OrderDetail.vue')
    },
    {
      path: "/supervisor/manage-accounts",
      name: "manageAccountsbySupervisor",
      component: ()=>import('../views/Supervisor/ManageAccounts.vue')
    },
    {
      path: "/supervisor/createAccount",
      name: "createAccountbySupervisor",
      component: ()=>import('../views/Supervisor/CreateAccount.vue')
    },
    {
      path: "/supervisor/accountDetail?:id",
      name: "accountDetail",
      component: ()=>import('../views/Supervisor/AccountDetail.vue')
    },
    {
      path: "/supervisor/manage-hubs",
      name: "manageHubsbySupervisor",
      component: ()=>import('../views/Supervisor/ManageHub.vue')
    },
    {
      path: "/supervisor/manage-warehouses",
      name: "manageWarehousesbySupervisor",
      component: ()=>import('../views/Supervisor/ManageWarehouse.vue')
    },
    {
      path: "/supervisor/manage-orders",
      name: "manageOrdersbySupervisor",
      component: ()=>import('../views/Supervisor/ManageOrders.vue')
    },
    {
      path: "/manager/createAccount",
      name: "createAccountsByManager",
      component: ()=>import('../views/Manager/CreateAccountsByManager.vue')
    },
    {
      path: "/manager/manage-accounts",
      name: "manageAccountsByManager",
      component: ()=>import('../views/Manager/ManageAccountsByManager.vue')
    },
    
  ]
})

export default router
