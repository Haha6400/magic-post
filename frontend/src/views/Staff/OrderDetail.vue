<template>
  <div class="container">
    <div class="header">
      <h1 class="loginHeader">Đơn hàng {{ $route.params.id }}</h1>
    </div>

    <div class="wrapper-stepper">
      <div class="stepper">
        <div class="stepper-progress">
          <div class="stepper-progress-bar" :style="'width:' + stepperProgress"></div>
        </div>

        <div
          class="stepper-item"
          :class="{ current: step == item, success: step > item }"
          v-for="item in numStep"
          :key="item"
        >
          <div class="stepper-item-counter">
            <img
              class="icon-success"
              src="https://www.seekpng.com/png/full/134-1348364_white-check-mark-transparent-background.png"
              alt=""
              style="color: black"
            />
            <span class="number">
              {{ item }}
            </span>
          </div>
          <span class="stepper-item-title" v-if="item == 1">Thông tin người gửi </span>
          <span class="stepper-item-title" v-if="item == 2">Thông tin người nhận </span>
          <span class="stepper-item-title" v-if="item == 3">Thông tin gói hàng </span>
        </div>
      </div>

      <div class="stepper-content">
        <div class="stepper-pane" v-if="step == 1">
          <form>
            <div class="form-container">
              <div class="input-container">
                <label for="exampleInputEmail1" class="form-label">Họ và tên</label>
                <input class="form-control" id="exampleInputEmail1" v-model="senderName" required />
              </div>

              <div class="input-container">
                <label for="exampleInputEmail1" class="form-label">Địa chỉ</label>
                <input
                  class="form-control"
                  id="exampleInputEmail1"
                  v-model="senderAddress"
                  required
                />
              </div>

              <div class="input-container">
                <label for="exampleInputEmail1" class="form-label">Số điện thoại</label>
                <input
                  class="form-control"
                  id="exampleInputEmail1"
                  v-model="senderPhone"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        <div class="stepper-pane" v-if="step == 2">
          <form>
            <div class="form-container">
              <div class="input-container">
                <label for="exampleInputEmail1" class="form-label">Họ và tên</label>
                <input
                  class="form-control"
                  id="exampleInputEmail1"
                  v-model="receiverName"
                  required
                />
              </div>

              <div class="input-container">
                <label for="exampleInputEmail1" class="form-label">Địa chỉ</label>
                <input
                  class="form-control"
                  id="exampleInputEmail1"
                  v-model="receiverAddress"
                  required
                />
              </div>

              <div class="input-container">
                <label for="exampleInputEmail1" class="form-label">Số điện thoại</label>
                <input
                  class="form-control"
                  id="exampleInputEmail1"
                  v-model="receiverPhone"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        <div class="stepper-pane" v-if="step == 3">
          <form>
            <div class="form-container">
              <div class="row-container"></div>

              <div class="row-container">
                <div class="input-container">
                  <label for="exampleInputEmail1" class="form-label">Trị giá</label>
                  <input class="form-control" id="exampleInputEmail1" v-model="fee" required />
                </div>
              </div>

              <div class="input-container">
                <label for="exampleInputEmail1" class="form-label">Dịch vụ đặc biệt</label>
                <input
                  class="form-control"
                  id="exampleInputEmail1"
                  v-model="special_service"
                  required
                />
              </div>

              <div class="input-container">
                <label for="exampleInputEmail1" class="form-label">Cam kết người gửi</label>
                <input class="form-control" id="exampleInputEmail1" v-model="note" required />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="controls">
        <button class="btn" @click="step--" :disabled="step == 1">Quay lại</button>

        <button
          v-if="step != 3"
          class="btn btn--green-1"
          @click="step++"
          :disabled="step == numStep"
        >
          Tiếp
        </button>

        <button v-if="step == 3" class="btn btn--green-1" v-on:click="updateOrder()">Lưu</button>
      </div>
      <p>{{ step }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      step: 1,
      numStep: 3,
      orderData: null,
      brachID: '',
      senderName: '',
      senderAddress: '',
      senderPhone: '',
      receiverName: '',
      receiverAddress: '',
      receiverPhone: '',
      type: '',
      amount: '',
      price: '',
      actual_mass: '',
      special_service: '',
      instruction: '',
      sender_commitment: '',
      note: '',
      fee: ''
    }
  },

  created() {
    let url = 'http://localhost:3000/api/orders/code/' + this.$route.params.id
    axios
      .get(url)
      .then((response) => {
        console.log(response.data)
        this.orderData = response.data
        this.senderName = response.data.senderName
        this.senderAddress = response.data.senderAddress
        this.senderPhone = response.data.senderPhone
        this.receiverName = response.data.receiverName
        this.receiverAddress = response.data.receiverAddress
        this.receiverPhone = response.data.receiverPhone
        this.fee = response.data.fee
        this.special_service = response.data.special_service
        this.note = response.data.note
      })
      .catch((error) => {
        console.log(error)
        toast.error('???', { position: toast.POSITION.BOTTOM_RIGHT }),
          {
            autoClose: 1000
          }
      })
  },

  methods: {
    async updateOrder() {
      let url = 'http://localhost:3000/api/orders/update/' + this.$route.params.id
      await axios
        .put(url, {
          //TODOOO
        })
        .then((response) => {
          console.log(response.data)
          // toast.success("Saved successfully", { position: toast.POSITION.BOTTOM_RIGHT }), {
          //   autoClose: 1000,
          // }
        })
        .catch((error) => {
          console.log(error)
          // toast.error("Saved failed", { position: toast.POSITION.BOTTOM_RIGHT }), {
          //   autoClose: 1000,
          // }
        })
    }
  }
}
</script>

<style scoped lang="scss">
$default: #c5c5c5;
$green-1: #75cc65;
$transiton: all 500ms ease;

.container {
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: center;
  min-width: 300px;
  background-color: #ffffff;
  gap: 10px;
  overflow-y: scroll;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
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

.wrapper-stepper {
  background-color: #fff;
  //   padding: 60px;
  border-radius: 32px;
  box-shadow: rgba($color: #000000, $alpha: 0.09);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 660px;
  position: relative;
  z-index: 0;
  margin-bottom: 24px;

  &-progress {
    position: absolute;
    background-color: $default;
    height: 2px;
    z-index: -1;
    left: 0;
    right: 0;
    margin: 0 auto;

    &-bar {
      position: absolute;
      left: 0;
      height: 100%;
      width: 0%;
      background-color: $green-1;
      transition: $transiton;
    }
  }
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $default;
  transition: $transiton;

  &-counter {
    height: 50px;
    width: 50px;
    display: grid;
    place-items: center;
    background-color: #fff;
    border-radius: 100%;
    border: 2px solid $default;
    position: relative;

    .icon-success {
      position: absolute;
      opacity: 0;
      transform: scale(0);
      color: black;
      width: 24px;
      transition: $transiton;
    }

    .number {
      font-size: 22px;
      transition: $transiton;
    }
  }

  &-title {
    position: absolute;
    font-size: 14px;
    bottom: -24px;
    font-family: 'Nunito Sans', sans-serif;
    min-width: 150px;
  }
}

.stepper-item.success {
  .stepper-item-counter {
    border-color: #f7b85e;
    background-color: #f7b85e;
    color: #fff;
    font-weight: 600;

    .icon-success {
      opacity: 1;
      color: black;
      transform: scale(1);
    }

    .number {
      opacity: 0;
      transform: scale(0);
    }
  }

  .stepper-item-title {
    color: #5d7283;
    font-family: 'Nunito Sans', sans-serif;
    min-width: 150px;
  }
}

.stepper-item.current {
  .stepper-item-counter {
    border-color: #ffe4b2;
    background-color: #ffe4b2;
    color: black;
    // font-weight: 600;
  }

  .stepper-item-title {
    color: #5d7283;
    font-family: 'Nunito Sans', sans-serif;
    min-width: 150px;
  }
}

.stepper-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stepper-pane {
  color: #333;
  text-align: center;
  align-items: center;
  width: 50%;
  min-width: 500px;
  margin: 40px 0;
}

.controls {
  display: flex;
  width: 80%;
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
  min-width: 500px;
}

.form-container {
  width: 100%;
  text-align: left;
  font-family: 'Nunito Sans', sans-serif;
  margin-bottom: 10px;
  display: flex;
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
</style>
