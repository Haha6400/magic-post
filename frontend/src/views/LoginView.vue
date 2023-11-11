<template>
  <div class="container">
    <div class="login-container">
      <!-- <form @submit.prevent="Login()">
        <h1 class="loginHeader">Đăng nhập</h1>
        <div class="form-floating">
          <input
            class="form-control"
            id="floatingUsername"
            placeholder="username"
            name="username"
            v-model="username"
            required
          />
          <label for="floatingUsername">Tên đăng nhập</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingPass"
            placeholder="password"
            name="password"
            v-model="password"
            required
          />
          <label for="floatingPass" class="form-lable">Mật khẩu</label>
        </div>

        <div class="d-grid gap-1">
          <router-link to="/" v-if="auth">
            <button type="button" class="login1" v-on:click="Login()">
              Đăng nhập
            </button>
          </router-link>

          <button
            v-if="!auth"
            type="button"
            class="login1"
            v-on:click="Login()"
          >
            Đăng nhập
          </button>
        </div>

        <div class="forgotPass">
          <p class="forgotPass-p">Quên mật khẩu?</p>
          <router-link to="/forgotPassword" class="forgot">
            Click here
          </router-link>
        </div>
      </form> -->
      <form>
        <h1 class="loginHeader">Đăng nhập</h1>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Tên đăng nhập</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Mật khẩu</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <hr />
        <div class="forgotPass">
          <p class="forgotPass-p">Quên mật khẩu?</p>
          <router-link to="/forgotPassword" class="forgot">
            Click here
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

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
  height: 45vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.loginHeader {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 600;
  font-size: 30px;
  color: #3fa3f9;
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
  font-family: "Nunito Sans", sans-serif;
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
  font-family: "Nunito Sans", sans-serif;
  border-width: 0px;
}

.form-floating mb-3 {
  background-color: #f7b85e;
}

.d-grid {
  justify-items: center;
}

.form-control {
  background-color: #f7b85e;
  border-radius: 30px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Nunito Sans", sans-serif;
  width: 100%;
}

.mb-3 {
  text-align: left;
  font-family: "Nunito Sans", sans-serif;
  margin-bottom: 10px;
  width: 60%;
}

.form-label {
  margin-bottom: 0px;
}

.btn {
    color: white;

  /* color: #282225; */
  border: none;
  background-color: #f7b85e;
  border-radius: 30px;
  width: 90px;
  font-weight: 600;
}
.btn:focus {
  color: #282225;
  border: none;
  background-color: #f7b85e;
  border-radius: 30px;
  width: 90px;
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
