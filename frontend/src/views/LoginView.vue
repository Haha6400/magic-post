<template>
  <div class="container">
    <div class="login-container">
      <form @submit.prevent="Login()">
        <h1 class="loginHeader">Đăng nhập</h1>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Tên đăng nhập</label>
          <input
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Mật khẩu</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="password"
            required
          />
        </div>
        <button v-if="!auth" type="submit" class="btn btn-primary">Đăng nhập</button>

        <hr />
        <div class="forgotPass">
          <p class="forgotPass-p">Quên mật khẩu?</p>
          <router-link to="/forgotPassword" class="forgot"> Click here </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      auth: false
    }
  },
  methods: {
    async Login() {
      let url = 'http://localhost:3000/api/accounts/login'
      await axios
        .post(url, { email: this.email, password: this.password })
        .then((response) => {
          console.log(response.data)
          localStorage.setItem('userData', JSON.stringify(response.data))
          localStorage.setItem('token', response.data.accessToken)
          this.auth = true
          this.$router.push({ path: '/' })
        })
        .catch((error) => {
          console.log(error)
          toast.error('Wrong user', { position: toast.POSITION.BOTTOM_RIGHT }),
            {
              autoClose: 1000
            }
        })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
}

.login-container {
  background-color: #ffffff;
  border-radius: 18px;
  min-width: 300px;
  width: 50%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.loginHeader {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 600;
  font-size: 30px;
  color: #ffa500;
  line-height: 28px;
  text-align: center;
  margin-bottom: 20px;
}
.forgotPass {
  /* padding-top: 10px; */
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  gap: 10px;
}
.forgotPass-p {
  width: fit-content;
  margin-bottom: 0%;
  font-family: 'Nunito Sans', sans-serif;
}
.forgot {
  color: #282225;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 90px;
  height: 35px;

  background: #f7b85e;
  border-radius: 6px;
  text-align: center;

  text-decoration: none;
  font-family: 'Nunito Sans', sans-serif;
  border-width: 0px;
}

.form-control {
  background-color: #f7b85e;
  border-radius: 30px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Nunito Sans', sans-serif;
  width: 100%;
}

.mb-3 {
  text-align: left;
  font-family: 'Nunito Sans', sans-serif;
  margin-bottom: 10px;
  width: 60%;
}

.form-label {
  margin-bottom: 0px;
}

.btn {
  color: #000000;
  /* color: #282225; */
  border: none;
  background-color: #f7b85e;
  border-radius: 30px;
  width: 115px;
  /* font-weight: 600; */
}
.btn:focus {
  color: #000000;
  border: none;
  background-color: #f7b85e;
  border-radius: 30px;
  width: 115px;
}

hr {
  border: 0;
  clear: both;
  display: block;
  width: 60%;
  background-color: #000000;
  height: 2px;
  /* margin-top: 10px; */
}
</style>
