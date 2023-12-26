<template>
  <section id="sidebar">
    <div class="topPart">
      <!-- Logo -->
      <router-link to="/" class="brand">
        <img class="logo" src="@/assets/logo.png" alt="logo" />
      </router-link>

      <div class="message" v-if="isLogin" style="margin-top: 5px">
        Welcome, <br />{{ userName }} - {{ role }}
      </div>

      <ul class="side-menu">
        <!-- Trang chủ -->
        <li>
          <router-link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            Trang chủ
          </router-link>
        </li>

        <!-- supervisor -->
        <!-- Quản lý tài khoản -->
        <li v-if="role == 'supervisor'">
          <router-link to="/supervisor/manage-accounts">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>

            Quản lý tài khoản
          </router-link>
        </li>

        <!-- Quản lý điểm giao dịch -->
        <li v-if="role == 'supervisor'">
          <router-link to="/supervisor/manage-hubs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>

            Điểm giao dịch
          </router-link>
        </li>

        <!-- Quản lý điểm tập kết -->
        <li v-if="role == 'supervisor'">
          <router-link to="/supervisor/manage-warehouses">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>

            Điểm tập kết
          </router-link>
        </li>

        <!-- Quản lý đơn hàng -->
        <li v-if="role == 'supervisor'">
          <router-link to="/supervisor/manage-orders">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>

            Quản lý đơn hàng
          </router-link>
        </li>

        <!-- hubStaff -->
        <!-- Tạo đơn hàng -->
        <li v-if="role == 'hubStaff'">
          <router-link to="/hubStaff/newOrder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            Tạo đơn hàng
          </router-link>
        </li>

        <!-- Đơn hàng đến -->
        <li v-if="role == 'hubStaff' || role == 'warehouseStaff'">
          <router-link to="/incomingOrders">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
              />
            </svg>

            Xác nhận đơn đến
          </router-link>
        </li>

        <!-- Đơn hàng đi -->
        <li v-if="role == 'hubStaff' || role == 'warehouseStaff'">
          <router-link to="/preSentOrders">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
              />
            </svg>

            Xác nhận đơn đi
          </router-link>
        </li>

        <!-- Cập nhật đơn hàng -->
        <li v-if="role == 'hubStaff'">
          <router-link to="/hubStaff/updateOrders">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
              />
            </svg>

            Cập nhật đơn hàng
          </router-link>
        </li>

        <!-- Thống kê -->
        <li v-if="role == 'hubStaff'">
          <router-link to="/hubStaff/staffStatistic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
              />
            </svg>

            Thống kê
          </router-link>
        </li>

        <!-- Manager -->
        <!-- Thống kê -->
        <li v-if="role == 'hubManager' || role == 'warehouseManager'">
          <router-link :to="{ name: 'workplaceStatistics', params: { id: this.branchId } }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
              />
            </svg>

            Thống kê
          </router-link>
        </li>

        <!-- Tạo tài khoản by Manager -->
        <li v-if="role == 'hubManager' || role == 'warehouseManager'">
          <router-link to="/manager/createAccount">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>

            Tạo tài khoản
          </router-link>
        </li>

        <li v-if="role == 'hubManager' || role == 'warehouseManager'">
          <router-link to="/manager/manage-accounts">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
              />
            </svg>

            Quản lý tài khoản
          </router-link>
        </li>

        <!-- Đơn hàng nhận -->
        <li v-if="role == 'hubManager' || role == 'warehouseManager'">
          <router-link to="/incomingOrders">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
              />
            </svg>

            Đơn hàng nhận
          </router-link>
        </li>

        <!-- Đơn hàng gửi -->
        <li v-if="role == 'hubManager' || role == 'warehouseManager'">
          <router-link to="/preSentOrders">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
              />
            </svg>

            Đơn hàng gửi
          </router-link>
        </li>

        <!-- customer -->
        <!-- Tra cứu đơn hàng -->
        <li v-if="!role">
          <router-link to="/orderStatus">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>

            Tra cứu đơn hàng</router-link
          >
        </li>

        <!-- Dịch vụ -->
        <li v-if="!role">
          <router-link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>

            Dịch vụ</router-link
          >
        </li>

        <!-- Tin tức -->
        <li v-if="!role">
          <router-link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
              />
            </svg>

            Tin tức</router-link
          >
        </li>

        <!-- About us -->
        <li v-if="!role">
          <router-link to="/about">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>

            Về Magic Post</router-link
          >
        </li>
      </ul>
    </div>

    <!-- Đăng nhập -->
    <div v-if="!isLogin" class="signinButton">
      <ul class="side-menu">
        <li>
          <router-link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            Đăng nhập
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Đăng xuất -->
    <div v-if="isLogin" class="">
      <ul class="side-menu bottom">
        <li>
          <router-link to="/" @click="logout()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            Đăng xuất
          </router-link>
        </li>
        <li class="account">
          <!-- <router-link to="/">
            <svg
              v-if="!this.avatar"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {{ userName }}
          </router-link> -->
          <router-link to="/">
            <img class="avatar" v-if="!this.avatar" src="@/assets/Sidebar/star.jpg" alt="ava" />
            {{ userName }}
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.common.authorization = localStorage.getItem('token')

export default {
  name: 'SideBar',
  props: {},

  data() {
    return {
      isLogin: false,
      role: '',
      userName: '',
      avatar: null,
      branchId: ''
    }
  },

  async created() {
    if (localStorage.getItem('userData')) {
      console.log('check login')
      let user = localStorage.getItem('userData')
      let jsonUser = JSON.parse(user)
      console.log(jsonUser)
      this.userName = jsonUser.account.userName
      this.isLogin = true
      this.role = jsonUser.account.role
      this.branchId = jsonUser.account.branch_id
    }
  },

  methods: {
    async logout() {
      let url = 'http://localhost:3000/api/accounts/logout'
      let token = localStorage.getItem('token').toString()
      console.log(typeof token)
      await axios
        .post(url, {
          headers: {
            authorization: token
          }
        })
        .then((response) => {
          console.log(response.data)
          localStorage.clear()
          this.isLogin = false
          this.userName = ''
          this.role = null
          this.avatar = null
          this.$router.go(0)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

li {
  list-style: none;
}

.topPart {
  display: flex;
  flex-direction: column;
}

.topPart a img {
  width: 50px;
}

#sidebar {
  position: sticky;
  max-width: 260px;
  /* max-height: 1000px; */
  width: 100%;
  height: 95vh;
  /* background: var(--light); */
  background-color: #ffffff;
  border-collapse: separate;
  border-radius: 12px;
  left: 15px;
  margin-top: 2.5vh;
  margin-left: 20px;
  border-radius: 12dp;
  overflow-y: auto;
  scrollbar-width: none;
  transition: all 0.3s ease;
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#sidebar::-webkit-scrollbar {
  display: none;
}

#sidebar .brand {
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  font-weight: 700;
  color: var(--blue);
  position: sticky;
  top: 10px;
  left: 0;
  z-index: 100;
  background: var(--light);
  transition: all 0.3s ease;
  padding: 0 6px;
}

#sidebar .icon {
  min-width: 48px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: left;
  margin-right: 6px;
}
#sidebar .side-menu {
  margin: 25px 0;
  padding: 0 20px;
  transition: all 0.3s ease;
}
#sidebar .side-menu a {
  display: flex;
  align-items: center;
  font-size: 18px;
  /* color: var(--dark); */
  color: #2c3e50;
  color: black;
  font-weight: 500;
  padding: 8px 16px 8px 0;
  transition: all 0.3s ease;
  border-radius: 10px;
  margin: 4px 0;
  white-space: nowrap;
  font-family: 'Nunito Sans', sans-serif;
}

#sidebar .side-menu a p {
  display: flex;
  align-items: center;
  font-size: 18px;
  /* color: var(--dark); */
  color: #2c3e50;
  color: black;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 10px;
  margin: 4px 0;
  white-space: nowrap;
  font-family: 'Nunito Sans', sans-serif;
}

#sidebar .side-menu > li > a:hover {
  /* background: var(--grey); */
  background-color: #f8b760;
  /* background-color: #AADFFF; */
}
#sidebar .side-menu > li > a.active .icon-right {
  transform: rotateZ(90deg);
}
#sidebar .side-menu > li > a.active,
#sidebar .side-menu > li > a.active:hover {
  background: var(--blue);
  color: var(--light);
}

.signinButton {
  align-items: flex-end;
}

.signinButton .side-menu a {
  background-color: #f8b760;
  padding: 8px 16px 8px 0;
  transition: all 0.3s ease;
  border-radius: 10px;
  margin: 4px 0;
}

.avatar {
  min-width: 42px;
  width: 18px;
  /* height: 25px; */
  display: flex;
  justify-content: center;
  align-items: left;
  margin-left: 5px;
  margin-right: 6px;
  border-radius: 100%;
}

.account {
  background-color: #ffffff;
}

.bottom {
  color: #f8b760;
}

#sidebar .icon-right {
  margin-left: auto;
  transition: all 0.3s ease;
}

@media (max-width: 1200px) {
  #sidebar {
    width: 60px;
    max-width: 60px;
    min-width: 60px;
  }

  #sidebar:hover {
    max-width: 260px;
  }

  #sidebar .side-menu {
    padding: 0 6px;
  }

  #sidebar:hover .side-menu {
    /* padding: 0 20px; */
  }

  #sidebar:hover .divider {
    text-align: left;
  }
  #sidebar .divider {
    text-align: center;
  }

  #sidebar .side-menu a p {
    visibility: hidden;
  }

  .topPart a img {
    width: 40px;
  }

  .message {
    visibility: hidden;
  }
}
</style>
