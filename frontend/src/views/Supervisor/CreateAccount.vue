<template>
  <div class="container">
    <div class="header">
      <h1 class="loginHeader">Tạo tài khoản</h1>
      <p class="discription">Hoàn thiện đầy đủ thông tin để tạo tài khoản mới</p>
    </div>

    <div class="form-container">
      <div class="row-container">
        <div class="input-container">
          <label for="exampleInputEmail1" class="form-label">Họ và tên</label>
          <input class="form-control" id="exampleInputEmail1" v-model="userName" required />
        </div>
        <div class="input-container">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <input class="form-control" id="exampleInputEmail1" v-model="email" required />
        </div>
      </div>

      <div class="row-container">
        <div class="input-container">
          <label for="exampleInputEmail1" class="form-label">Số điện thoại</label>
          <input class="form-control" id="exampleInputEmail1" v-model="phoneNumber" required />
        </div>

        <div class="input-container">
          <label for="inputState">Vai trò</label>
          <select id="inputState" class="form-control" v-model="role">
            <option>supervisor</option>
            <option>hubManager</option>
            <option>warehouseManager</option>
            <option>hubStaff</option>
            <option>warehouseStaff</option>

          </select>
        </div>

        <div v-if="role == 'hubManager' || role == 'hubStaff'" class="input-container">
          <label for="inputState">Chi nhánh</label>
          <select id="inputState" class="form-control" v-model="branchName">
            <option v-for="item in hubList" :value="item.name" :key="item._id">
              {{ item.name }}
            </option>
          </select>
        </div>

        <div v-if="role == 'warehouseManager' || role == 'warehouseStaff'" class="input-container">
          <label for="inputState">Chi nhánh</label>
          <select id="inputState" class="form-control" v-model="branchName">
            <option v-for="item in warehouseList" :value="item.name" :key="item._id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="bottomButton">
      <button v-on:click="createAccount()" class="btn btn--green-1" style="width: fit-content">
        Tạo tài khoản
      </button>
    </div>

    <div class="image-bottom">
      <img alt="logo" src="@/assets/createAcc.png" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.common.authorization = localStorage.getItem("token");

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'


export default {
  data() {
    return {
      userName: '',
      email: '',
      phoneNumber: '',
      role: '',
      branch: '',
      hubList: null,
      warehouseList: null
    }
  },

  async created() {
    let url = 'http://localhost:3000/api/workplace/all/hub'
    console.log('check role')
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data)
        this.hubList = response.data.hub
      })
      .catch((error) => {
        console.log(error)
      })

    url = 'http://localhost:3000/api/workplace/all/warehouse'
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data)
        this.warehouseList = response.data.allWarehouse
      })
      .catch((error) => {
        console.log(error)
      })
  },

  methods: {
    async createAccount() {
      let url = 'http://localhost:3000/api/accounts/create'
      await axios
        .post(url, {
          userName: this.userName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          branchName: this.branchName,
          role: this.role,
        })
        .then((response) => {
          console.log(response.data)
          console.log("success")
          toast.success('Successfully Updated', { position: toast.POSITION.BOTTOM_RIGHT }),
            {
              autoClose: 100
            }
          this.userName = null
          this.email = null
          this.phoneNumber = null
          this.branchName = null
          this.role = null
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
$default: #c5c5c5;
$green-1: #75cc65;
$transiton: all 500ms ease;

::-webkit-scrollbar {
  display: none;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: center;
  min-width: 300px;
  background-color: #ffffff;
  gap: 30px;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
  overflow-y: scroll;
  height: 95vh;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.loginHeader {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 600;
  font-size: 30px;
  color: #ffa500;
  line-height: 28px;
  text-align: center;
  //   margin-top: 32px;
}

.discription {
  font-family: 'Nunito Sans', sans-serif;
  //   font-weight: 600;
  font-size: 18px;
  color: #5d7283;
  margin-bottom: 0px;
}

body {
  background-image: linear-gradient(60deg, #abecd6 0%, #fbed96 100%);
  color: #ffffff;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
}

.tx-green-1 {
  color: $green-1;
  font-weight: 600;
}

.btn {
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  border: 1px solid;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  line-height: 1.5;
  transition: all 150ms;
  border-radius: 30px;
  width: 100px;
  height: 40px;
  font-size: 14px;
  color: #333;
  background-color: #ffe4b2;
  border: 0;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    font-family: 'Nunito Sans', sans-serif;
    border: 0;
    background-color: #ffe4b2;
  }

  &--green-1 {
    background-color: #ffe4b2;
    border: 0;
    color: #000;
    margin-left: auto;
    font-family: 'Nunito Sans', sans-serif;
  }
}

.form-control {
  background-color: white;
  border-radius: 18px;
  width: 100%;
  height: 50px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Nunito Sans', sans-serif;
  width: 100%;
  //   height: 80px;
  //   min-width: 500px;
}

.form-container {
  margin-left: 20%;
  margin-right: 20%;
  text-align: left;
  font-family: 'Nunito Sans', sans-serif;
  margin-bottom: 10px;
  display: flex;
  width: 60%;
  flex-direction: column;
  gap: 15px;
}

.form-label {
  margin-bottom: 5px;
}

label {
  margin-bottom: 5px;
  align-items: left;
}

.row-container {
  display: flex;
  flex-direction: row;
  gap: 5%;
}

.input-container {
  width: 100%;
  align-items: left;
}

.bottomButton {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

img {
  width: 39%;
}
</style>
