<template>
  <div class="container">
    <h1 class="loginHeader">Tra cứu đơn hàng</h1>

    <div class="search-side">
      <form class="search-bar">
        <input
          class="search-box"
          type="text"
          placeholder="Tìm kiếm đơn hàng"
          v-model="order_code"
        />

        <button v-on:click="orderStatus()">
          <router-link
            v-if="order_code"
            :to="{ name: 'orderStatusByCustomer', params: { id: order_code } }"
          >
            <img src="@/assets/logo.png" />
          </router-link>
          <img v-if="!order_code" src="@/assets/logo.png" />
        </button>
      </form>
    </div>

    <div class="loading">
      <v-progress-circular
        v-if="loading"
        color="#ffa500"
        align-items="center"
        indeterminate
        :size="34"
      ></v-progress-circular>
    </div>

    <div class="responseData" v-if="auth">
      <p>Mã vận đơn: {{ this.order_status.order_code }} <br /></p>
      <p>
        Trạng thái đơn hàng: <span v-if="this.order_status.is_returned">Đã đến nơi</span>
        <span v-if="!this.order_status.is_returned">Đã vận chuyển</span><br />
      </p>
      <p>Địa điểm hiện tại: {{ this.order_status.currentAt }}</p>
    </div>

    <img alt="logo" src="../assets/home/header.jpg" />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      order_code: '',
      order_status: '',
      auth: false,
      loading: false
    }
  },

  async created() {
    if (localStorage.getItem('orderCode')) {
      this.loading = true
      this.order_code = localStorage.getItem('orderCode')
      localStorage.removeItem('orderCode')
      console.log(this.order_code)

      let url = 'http://localhost:3000/api/orders/code/' + this.order_code
      await axios
        .get(url)
        .then((response) => {
          console.log(response.data)
          this.order_status = response.data
          this.auth = true
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  methods: {
    async orderStatus() {
      this.$router.push({ name: 'orderStatusByCustomer', params: { id: this.order_code } })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: center;
  min-width: 300px;
  background-color: #ffffff;
  gap: 30px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
  overflow-y: scroll;
  height: 95vh;
  border-radius: 12px;
  transition: all 0.3s ease;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  max-width: 900px;
  max-height: 50%;
  align-self: center;
}
</style>
