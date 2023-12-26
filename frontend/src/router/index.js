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
      path: "/orderStatus/:id",
      name: "orderStatusByCustomer",
      component: ()=>import('../views/OrderStatusWithOrderCode.vue'),
      props: route => ({ id: Number(route.params.id) }),
    },
    {
      path: "/hubStaff/newOrder",
      name: "newOrderbyHubStaff",
      component: ()=>import('../views/Staff/NewOrders.vue')
    },
    {
      path: "/incomingOrders",
      name: "incomingOrdersbyHubStaff",
      component: ()=>import('../views/Staff/IncomingOrders.vue')
    },
    {
      path: "/preSentOrders",
      name: "preSentOrdersbyHubStaff",
      component: ()=>import('../views/Staff/PreSentOrders.vue')
    },
    {
      path: "/hubStaff/updateOrders",
      name: "updateOrdersbyHubStaff",
      component: ()=>import('../views/Staff/UpdateOrders.vue')
    },
    {
      path: "/hubStaff/staffStatistic",
      name: "staffStatistic",
      component: ()=>import('../views/Staff/StaffStatistic.vue')
    },
    // {
    //   path: "/supervisor/manage-orders",
    //   name: "manageOrdersbySupervisor",
    //   component: ()=>import('../views/ManageOrders.vue')
    // },
    {
      path: "/staff/orderDetail/:id",
      name: "orderDetailbyHubStaff",
      component: ()=>import('../views/Staff/OrderDetail.vue')
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
      path: "/supervisor/accountDetail/:id",
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
    {
      path: "/manager/recieved-orders",
      name: "recieveOrdersbyManager",
      component: ()=>import('../views/Manager/RecievedOrders.vue')
    },
    {
      path: "/manager/sent-orders",
      name: "sentOrdersbyManager",
      component: ()=>import('../views/Manager/SentOrders.vue')
    },
    {
      path: "/workplaceStatistics/:id",
      name: "workplaceStatistics",
      component: ()=>import('../views/WorkplaceStatistics.vue')
    },
    
  ]
})

export default router
