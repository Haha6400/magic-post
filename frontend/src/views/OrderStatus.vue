<template>
  <div class="container">
    <h1 class="loginHeader">Tra cứu đơn hàng</h1>

    <div class="search-side">
      <form class="search-bar">
        <input class="search-box" type="text" placeholder="Tìm kiếm đơn hàng" v-model="search" />
        <button type="submit">
          <img src="@/assets/logo.png" />
        </button>
        <!-- <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="black"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button> -->
      </form>
      <!-- <router-link class="searchButton" type="button" to="/orderStatus">Tra cứu</router-link> -->
    </div>

    <div class="responseData">
      a
    </div>

    <img alt="logo" src="../assets/home/header.jpg" />
  </div>
</template>

<script>
export default {
  data() {
    order_code: ''
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: center;
  min-width: 300px;
  background-color: #ffffff;
  gap: 30px;
}

.loginHeader {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 600;
  font-size: 36px;
  color: #ffa500;
  line-height: 28px;
  text-align: center;
  margin-top: 32px;
}

.search-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
}

.search-bar {
  box-sizing: border-box;
  width: 50%;
  min-width: 140px;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: #ffe4b2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
.search-bar input {
  background: transparent;
  font-size: 16px;
  flex: 1;
  border: 0;
  outline: none;
  padding: 2% 3%;
  font-family: 'Nunito Sans', sans-serif;
}
.search-bar button img {
  width: 45px;
  padding-right: 15px;
}
.search-bar button {
  border: none;
  background: none;
}

.searchButton {
  background-color: #f7b85e;
  text-decoration: none;
  border-radius: 30px;
  width: 7%;
  height: 25px;
  font-family: 'Nunito Sans', sans-serif;
  color: #000000;
  text-align: center;
}

.searchButton:hover {
  background-color: #f7b85e;
  text-decoration: none;
  border-radius: 30px;
  width: 40%;
  height: 25px;
  font-family: 'Nunito Sans', sans-serif;
  color: #000000;
  text-align: center;
}

.responseData {
  height: 200px;
  width: 50%;
  background-color: #ffe4b2;
  border-radius: 18px;
  align-self: center;
}

img {
  max-width: 900px;
  max-height: 50%;
  align-self: center;
}
</style>
