<template>
  <div class="container">
    <div class="login-container">
      <form>
        <h1 class="loginHeader">Quên mật khẩu</h1>
        <div class="mb-3">
          <!-- <label for="exampleInputEmail1" class="form-label"
            >Địa chỉ email</label
          > -->
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Địa chỉ email"
          />
        </div>
        <button type="submit" class="btn btn-primary">Gửi email</button>
        <hr />
        <div class="forgotPass">
          <p class="forgotPass-p">Tự dưng nhớ ra mật khẩu?</p>
          <router-link to="/login" class="forgot"> Đăng nhập </router-link>
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
  width: 100px;
  font-weight: 600;
}
.btn:focus {
  color: white;

  /* color: #282225; */
  border: none;
  background-color: #f7b85e;
  border-radius: 30px;
  width: 100px;
  font-weight: 600;
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
