<template>
  <div class="container">
    <h1 class="loginHeader">Đơn hàng gửi</h1>
    <div class="buttonList">
      <ChipCard v-if="orderStatus" :title="'Trạng thái'" :content="orderStatus"></ChipCard>
      <ChipCard v-if="recieverName" :title="'Đến từ'" :content="recieverName"></ChipCard>
      <ChipCard v-if="start" :title="'Bắt đầu'" :content="start"></ChipCard>
      <ChipCard v-if="end" :title="'Kết thúc'" :content="end"></ChipCard>
      <button class="signup" type="button" @click="dialog = true">
        Bộ lọc
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
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>
      </button>
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

    <v-card flat title="">
      <v-data-table
        v-model:page="page"
        :headers="headers"
        :items-per-page="itemsPerPage"
        :items="dataList"
        :search="search"
      >
        <template v-slot:item.action="{ item }">
          <button v-on:click="deleteOrder(item.order_code)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.2"
              stroke="black"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>

          <button>
            <router-link :to="{ name: 'orderDetailbyHubStaff', params: { id: item.order_code } }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.2"
                stroke="black"
                class="w-6 h-6 icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </router-link>
          </button>
        </template>

        <template v-slot:bottom>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <div class="popupHeader">Bộ lọc</div>
        <div class="input-container">
          <label for="inputState">Trạng thái</label>
          <select id="inputState" class="form-control" v-model="orderStatus">
            <option>Còn trong kho</option>
          </select>
        </div>
        <div class="input-container">
          <label for="inputState">Nơi gửi</label>
          <select id="inputState" class="form-control" v-model="recieverName">
            <option v-for="item in warehouseList">
              {{ item }}
            </option>
          </select>
        </div>

        <div class="input-container">
          <label for="startDate">Ngày bắt đầu</label>
          <input id="startDate" class="form-control" type="date" v-model="start" />
        </div>

        <div class="input-container">
          <label for="startDate">Ngày kết thúc</label>
          <input id="startDate" class="form-control" type="date" v-model="end" />
        </div>

        <div class="bottomButton">
          <button
            @click="dialog = false"
            v-on:click="getListFiltered()"
            class="btn btn--green-1"
            style="width: fit-content"
          >
            Đóng
          </button>

          <button v-on:click="deleterFilter()" class="btn btn--green-1" style="width: fit-content">
            Xóa bộ lọc
          </button>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.common.authorization = localStorage.getItem('token')

// import ChipCard from '../../components/ChipCard.vue'

export default {
  data() {
    return {
      loading: true,
      //dialog
      dialog: false,
      recieverName: '',
      hubList: [],
      warehouseList: [],
      start: null,
      end: null,
      orderStatus: null,
      //table
      dataList: [],
      page: 1,
      itemsPerPage: 6,
      search: '',
      role: '',
      senderBranch: '',
      headers: [
        {
          align: 'center',
          key: 'order_code',
          title: 'Order Code'
        },
        { key: 'receiverName', title: 'Người nhận', align: 'center' },
        { key: 'fee', title: 'Chi phí', align: 'center' },
        { key: 'receiver_fee', title: 'Phí người nhận phải trả', align: 'center' },
        { key: 'status', title: 'Trạng thái đơn hàng', align: 'center' },
        { title: 'Chi tiết', sortable: false, align: 'center', text: 'Chi tiết', value: 'action' }
      ]
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.dataList.length / this.itemsPerPage)
    }
  },
  async created() {
    let user = localStorage.getItem('userData')
    let jsonUser = JSON.parse(user)
    this.role = jsonUser.account.role
    // this.senderBranch = 'All'

    // Get warehouse list
    let url = 'http://localhost:3000/api/workplace/all/warehouse/name'
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data)
        this.warehouseList = response.data.warehouseName
      })
      .catch((error) => {
        console.log(error)
      })

    this.getDefaultList()
  },
  methods: {
    deleterFilter() {
      this.senderName = null
      this.start = null
      this.end = null
      this.dialog = false
      this.orderStatus = null
      this.getDefaultList()
    },

    async getListFiltered() {
      this.dialog = false

      let url = ''

      if (!this.orderStatus) {
        // Người dùng filter có start end
        if (this.recieverName) {
          this.loading = true
          url = 'http://localhost:3000/api/hub/send/all/wh'
          await axios
            .post(url, {
              start: this.start,
              end: this.end,
              warehouseName: this.recieverName
            })
            .then((response) => {
              console.log(response.data)
              this.dataList = response.data.orders
              this.loading = false
            })
            .catch((error) => {
              console.log(error)
              toast.error('???', { position: toast.POSITION.BOTTOM_RIGHT }),
                {
                  autoClose: 1000
                }
            })
        }

        if (!this.recieverName) {
          this.loading = true
          url = 'http://localhost:3000/api/hub/send/all'
          await axios
            .post(url, {
              start: this.start,
              end: this.end
            })
            .then((response) => {
              console.log(response.data)
              this.dataList = response.data.order
              this.loading = false
            })
            .catch((error) => {
              console.log(error)
              toast.error('???', { position: toast.POSITION.BOTTOM_RIGHT }),
                {
                  autoClose: 1000
                }
            })
        }
      }

      if (this.orderStatus) {
        if (this.recieverName) {
          this.loading = true
          url = 'http://localhost:3000/api/hub/send/available/wh'
          await axios
            .post(url, {
              start: this.start,
              end: this.end,
              warehouseName: this.recieverName
            })
            .then((response) => {
              console.log(response.data)
              this.dataList = response.data.orders
              this.loading = false
            })
            .catch((error) => {
              console.log(error)
            })
        }

        if (!this.recieverName) {
          this.loading = true
          url = 'http://localhost:3000/api/hub/send/available'
          await axios
            .post(url, {
              start: this.start,
              end: this.end
            })
            .then((response) => {
              console.log(response.data)
              this.dataList = response.data.orders
              this.loading = false
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    },

    getDate() {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      return date
    },

    async getDefaultList() {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      let url = 'http://localhost:3000/api/hub/send/all'
      await axios
        .post(url, {
          start: '2023-11-01',
          end: date
        })
        .then((response) => {
          console.log(response.data)
          this.dataList = response.data.orders
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          toast.error('???', { position: toast.POSITION.BOTTOM_RIGHT }),
            {
              autoClose: 1000
            }
        })
    }
  },
  components: { ChipCard }
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

::-webkit-scrollbar {
  display: none;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loginHeader {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 600;
  font-size: 30px;
  color: #ffa500;
  line-height: 28px;
  text-align: center;
  margin-top: 32px;
}

.v-card {
  margin-right: 7%;
  margin-left: 7%;
  height: 70%;
  overflow-y: scroll;
}

.v-card-text {
  padding: 0;
}

.v-text-field {
  background-color: #ffe4b2;
  border: 0px;
  width: 100%;
}

.v-text-field:hover {
  background-color: #ffe4b2;
  /* border-radius: 30px; */
  border: 0px;
}
.buttonList {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  grid-gap: 30px;

  padding-bottom: 2%;
  gap: 10px;

  margin-right: 7%;
  margin-left: 7%;
}
.search-bar {
  box-sizing: border-box;
  /*width: 15%;*/
  min-width: 140px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: #ffe4b2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
.search-bar input {
  background: transparent;
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

.editCol {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.icon {
  width: 20px;
  height: 20px;
}

.signup {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #f7b85e;

  font-family: 'Nunito Sans', sans-serif;
  font-weight: regular;
  width: 10%;
  min-width: 90px;
  height: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  color: #000000;

  gap: 10px;
}

.form-control {
  border-radius: 18px;
  width: 100%;
  height: 50px;
  background-color: #ffe4b2;
}

label {
  margin-bottom: 5px;
  align-items: left;
}

.popupHeader {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #ffa500;
  line-height: 28px;
  text-align: center;
  margin-top: 10px;
  margin-left: 10%;
  margin-right: 10%;
}

.input-container {
  width: 50%;
  align-items: left;
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

.v-card {
  margin-right: 7%;
  margin-left: 7%;
  height: 70%;
  /* max-height: 65%; */
  overflow-y: scroll;
  /* min-height: 70%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
}

.bottomButton {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.bottomButton button:hover {
  background-color: #ffe4b2;
}
</style>
