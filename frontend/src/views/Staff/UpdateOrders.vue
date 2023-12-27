<template>
  <div class="container">
    <h1 class="loginHeader">Cập nhật đơn hàng</h1>
    <div class="buttonList">
      <ChipCard v-if="orderStatus" :title="'Trạng thái'" :content="orderStatus"></ChipCard>

      <form class="search-bar">
        <input class="search-box" type="text" placeholder="Tìm kiếm đơn hàng" v-model="search" />
        <button type="submit">
          <img src="@/assets/logo.png" />
        </button>
      </form>

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
        <template v-slot:item.statusDetail="{ item }">
          <v-dialog v-model="updateOrderDialog" persistent width="800">
            <v-card>
              <div class="popupHeader">Cập nhật trạng thái đơn hàng</div>
              <div class="input-container">
                <label for="inputState">Trạng thái</label>
                <select id="inputState" class="form-control" v-model="newOrderStatus">
                  <option>PRE_TRANSIT</option>
                  <option>TRANSIT</option>
                  <option>DELIVERING</option>
                  <option>DELIVERED</option>
                  <option>PRE-RETURN</option>
                  <option>RETURNED</option>
                </select>
              </div>

              <div class="bottomButton">
                <button
                  @click="updateOrderDialog = false"
                  class="btn btn--green-1"
                  style="width: fit-content"
                >
                  Đóng
                </button>

                <button
                  v-on:click="updateOrderStatus(updateOrderDialog, newOrderStatus)"
                  class="btn btn--green-1"
                  style="width: fit-content"
                >
                  Cập nhật
                </button>
              </div>
            </v-card>
          </v-dialog>

          <button
            @click="updateOrderDialog = true"
            v-if="item.status == 'DELIVERING'"
            class="status"
          >
            <p style="background-color: #ffe4b2">{{ item.status }}</p>
          </button>

          <button @click="updateOrderDialog = item.order_code" v-if="item.status == 'TRANSIT'" class="status">
            <p style="background-color: #99d9f2">{{ item.status }}</p>
          </button>

          <button @click="updateOrderDialog = item.order_code" v-if="item.status == 'PRE_TRANSIT'" class="status">
            <p style="background-color: #FFB9B9">{{ item.status }}</p>
          </button>

          <button @click="updateOrderDialog = item.order_code" v-if="item.status == 'DELIVERING'" class="status">
            <p style="background-color: #D5FFB9">{{ item.status }}</p>
          </button>

          <button @click="updateOrderDialog = item.order_code" v-if="item.status == 'DELIVERED'" class="status">
            <p style="background-color: #B9F9FF">{{ item.status }}</p>
          </button>

          <button @click="updateOrderDialog = item.order_code" v-if="item.status == 'PRE-RETURN'" class="status">
            <p style="background-color: #B9D7FF">{{ item.status }}</p>
          </button>

          <button @click="updateOrderDialog = item.order_code" v-if="item.status == 'RETURNED'" class="status">
            <p style="background-color: #B9D7FF">{{ item.status }}</p>
          </button>
        </template>

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

    <v-dialog v-model="dialog" persistent width="800">
      <v-card>
        <div class="popupHeader">Bộ lọc</div>
        <div class="input-container">
          <label for="inputState">Trạng thái</label>
          <select id="inputState" class="form-control" v-model="orderStatus">
            <option>Còn trong kho</option>
          </select>
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
// import ChipCard from '../../components/ChipCard.vue'

import axios from 'axios'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  data() {
    return {
      loading: true,
      dialog: false,
      orderStatus: null,

      updateOrderDialog: false,
      newOrderStatus: '',
      

      dataList: [],
      page: 1,
      itemsPerPage: 6,
      search: '',
      headers: [
        {
          align: 'center',
          key: 'order_code',
          title: 'Order Code'
        },
        { key: 'receiverName', title: 'Người nhận', align: 'center' },
        { key: 'fee', title: 'Chi phí', align: 'center' },
        { key: 'receiver_fee', title: 'Phí người nhận trả', align: 'center' },
        { title: 'Trạng thái đơn hàng', sortable: false, align: 'center', text: 'Trạng thái đơn hàng', value: 'statusDetail' },
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
    let url = 'http://localhost:3000/api/dashboard/avail'
    await axios
      .post(url)
      .then((response) => {
        console.log(response.data)
        this.dataList = response.data.result
        this.loading = false
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
    deleterFilter() {
      this.dialog = false
      this.orderStatus = null
    },

    deleteOrder(id) {
      console.log(id)
      this.loading = true
      let url = 'http://localhost:3000/api/orders/delete/' + id
      axios
        .delete(url)
        .then((response) => {
          console.log(response.data)
          console.log('delete')
          this.getList()
          this.loading = true
          toast.success('Deleted successfully', { position: toast.POSITION.BOTTOM_RIGHT }),
            {
              autoClose: 1000
            }
        })
        .catch((error) => {
          console.log(error)
          toast.error('Delete failed', { position: toast.POSITION.BOTTOM_RIGHT }),
            {
              autoClose: 1000
            }
        })
    },

    updateOrderStatus(orderCode, newStatus) {
      console.log(orderCode)
      let url = 'http://localhost:3000/api/orders/update/' + orderCode
      axios
        .put(url, {
          status: this.newOrderStatus
        })
        .then((response) => {
          console.log(response.data)
          this.loading = true
          this.getList()
          toast.success('Successfully Updated', { position: toast.POSITION.BOTTOM_RIGHT }),
            {
              autoClose: 100
            }
          this.updateOrderDialog = null
        })
        .catch((error) => {
          console.log(error)
          toast.error('Update failed', { position: toast.POSITION.BOTTOM_RIGHT }),
            {
              autoClose: 100
            }
        })
    },

    async getList() {
      let url = 'http://localhost:3000/api/dashboard/avail'
      await axios
        .post(url)
        .then((response) => {
          console.log(response.data)
          this.dataList = response.data.result
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
  /* max-height: 65%; */
  overflow-y: scroll;
  /* min-height: 70%; */
}

.v-card-text {
  padding: 0;
}

.v-text-field {
  background-color: #ffe4b2;
  /* border-radius: 30px; */
  border: 0px;
  /* border-color: #ffe4b2; */
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
  gap: 20px;

  margin-right: 7%;
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

.searchButton {
  background-color: #f7b85e;
  text-decoration: none;
  border-radius: 30px;
  width: 80%;
  height: 25px;
  font-family: 'Nunito Sans', sans-serif;
  color: #000000;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 5px;
}

.searchButton:hover {
  background-color: #f7b85e;
  text-decoration: none;
  border-radius: 30px;
  width: 80%;
  height: 25px;
  font-family: 'Nunito Sans', sans-serif;
  color: #000000;
  text-align: center;
}

.signup {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #f7b85e;

  font-family: 'Nunito Sans', sans-serif;
  font-weight: regular;
  width: 12%;
  min-width: 140px;
  height: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  color: #000000;
}

button {
  margin: 2px;
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

.form-control {
  border-radius: 18px;
  width: 100%;
  height: 50px;
  background-color: #ffe4b2;
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

.status p {
  font-size: 14px;
  font-style: italic;
  background-color: #ffe4b2;
  border-radius: 30px;

  width: 130px;
  height: 35px;

  margin-bottom: 0px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
